import {readFile,writeFile,mkdir} from 'node:fs/promises';
import path from 'node:path';
import {explanationFor} from '../dist/explanations.js';
import {clinicalProfile} from '../dist/clinical-study.js';
import {terminologyFor} from '../dist/terminology.js';
import {cleanName,displayName,sideOf} from '../dist/content.js';
import {setLanguage} from '../dist/i18n.js';

setLanguage('tr');

const root=path.resolve('.');
const ontologyFile=path.join(root,'data/authoritative/uberon-human-view-v2026-10-01.obo');
const ontologyRelease='https://github.com/obophenotype/uberon/releases/tag/v2026-10-01';
const ta2='https://ta2viewer.openanatomy.org/';
const sourceFiles=[['catalog.json','male'],['catalog-female.json','female'],['catalog-female-muscles.json','female']];
const layerLabels={cardiovascular:'kalp-damar sistemi',muscular:'kas sistemi',nervous:'sinir sistemi',skeleton:'iskelet sistemi',surface:'vücut yüzeyi',tendons:'tendon ve bağ dokusu',visceral:'iç organlar'};

function unescapeObo(value=''){
  return value.replace(/\\n/g,' ').replace(/\\"/g,'"').replace(/\\:/g,':').replace(/\\,/g,',').replace(/\\\\/g,'\\').trim();
}

function parseObo(text){
  const terms=new Map();
  for(const block of text.split(/\r?\n\[Term\]\r?\n/).slice(1)){
    const lines=block.split(/\r?\n/);const term={synonyms:[],parents:[],partOf:[],xrefs:[],subsets:[]};
    for(const line of lines){
      let m;
      if((m=line.match(/^id: (\S+)/)))term.id=m[1];
      else if((m=line.match(/^name: (.+)/)))term.name=unescapeObo(m[1]);
      else if((m=line.match(/^def: "((?:\\.|[^"])*)"/)))term.definition=unescapeObo(m[1]);
      else if((m=line.match(/^synonym: "((?:\\.|[^"])*)" (EXACT|BROAD|NARROW|RELATED)/)))term.synonyms.push({text:unescapeObo(m[1]),scope:m[2]});
      else if((m=line.match(/^is_a: (UBERON:\d+)/)))term.parents.push(m[1]);
      else if((m=line.match(/^relationship: (?:BFO:0000050|part_of) (UBERON:\d+)/)))term.partOf.push(m[1]);
      else if((m=line.match(/^xref: (\S+)/)))term.xrefs.push(m[1]);
      else if((m=line.match(/^subset: (\S+)/)))term.subsets.push(m[1]);
      else if(line==='is_obsolete: true')term.obsolete=true;
    }
    if(term.id&&term.name&&!term.obsolete)terms.set(term.id,term);
  }
  return terms;
}

function normalize(value=''){
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\b(left|right|female|male)\b/g,' ').replace(/\bmusculus\b/g,'muscle').replace(/\bos\b/g,'bone').replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
}
function variants(value){
  const base=normalize(value),out=new Set([base]);
  out.add(base.replace(/\b(of the|of)\b/g,' ').replace(/\s+/g,' ').trim());
  out.add(base.replace(/\b(head|body|branch|surface|part|wall|segment)\b/g,' ').replace(/\s+/g,' ').trim());
  return [...out].filter(x=>x.length>2);
}

const ontology=parseObo(await readFile(ontologyFile,'utf8'));
const nameIndex=new Map();
for(const term of ontology.values()){
  for(const label of [term.name,...term.synonyms.filter(s=>s.scope==='EXACT').map(s=>s.text)]){
    for(const key of variants(label)){if(!nameIndex.has(key))nameIndex.set(key,[]);nameIndex.get(key).push(term);}
  }
}

function kindOf(row){
  const n=cleanName(row.name).toLowerCase();
  if(/artery|aorta|aortic|arterial/.test(n))return 'artery';
  if(/vein|vena|venous|sinus/.test(n)&&row.layer==='cardiovascular')return 'vein';
  if(/nerve|plexus|ganglion|root/.test(n)&&row.layer==='nervous')return 'nerve';
  if(/ligament|meniscus/.test(n))return 'ligament';
  if(/tendon|aponeuro/.test(n)||row.layer==='tendons')return 'tendon';
  if(row.layer==='muscular')return 'muscle';
  if(row.layer==='skeleton')return 'bone';
  if(/gyrus|sulcus|cortex|nucleus|tract|fascicul|brain|cerebr|cerebell|medulla|pons|thalam|hippocamp|amygdal/.test(n)&&row.layer==='nervous')return 'neural';
  if(row.layer==='surface')return 'surface';
  if(row.layer==='cardiovascular')return 'cardiovascular';
  return 'organ';
}

function layerCompatible(term,row){
  const text=`${term.name} ${term.synonyms.map(s=>s.text).join(' ')}`.toLowerCase();
  const kind=kindOf(row);
  if(kind==='artery')return /arter|aorta/.test(text);
  if(kind==='vein')return /vein|venous|vena|sinus/.test(text);
  if(kind==='muscle')return /muscle|muscular/.test(text);
  if(kind==='bone')return /bone|vertebra|rib|tooth|cartilage|skelet/.test(text);
  if(kind==='nerve')return /nerve|plexus|ganglion|root/.test(text);
  return true;
}

function matchTerm(row,term){
  const labels=[{text:cleanName(row.name),base:100},{text:term?.latin,base:125}].filter(x=>x.text),hits=[];
  for(const label of labels)for(const [i,key] of variants(label.text).entries())for(const candidate of nameIndex.get(key)||[]){
    if(!layerCompatible(candidate,row))continue;
    hits.push({term:candidate,score:label.base-i*8+(candidate.definition?3:0)+(candidate.subsets.includes('human_reference_atlas')?8:0)+(candidate.subsets.includes('uberon_slim')?2:0)});
  }
  hits.sort((a,b)=>b.score-a.score||a.term.name.length-b.term.name.length);
  if(!hits.length)return null;
  const best=hits[0];
  return {...best,ambiguous:hits.some(x=>x.term.id!==best.term.id&&x.score===best.score)};
}

const trGlossary=new Map([
  ['anatomical entity','anatomik yapı'],['organ','organ'],['bone','kemik'],['muscle organ','kas'],['muscle','kas'],['nerve','sinir'],['artery','atardamar'],['vein','toplardamar'],['skin','deri'],['heart','kalp'],['brain','beyin'],['spinal cord','omurilik'],['thorax','göğüs'],['abdomen','karın'],['pelvis','pelvis'],['upper limb','üst ekstremite'],['lower limb','alt ekstremite'],['head','baş'],['neck','boyun'],['eye','göz'],['kidney','böbrek'],['liver','karaciğer'],['lung','akciğer'],['stomach','mide'],['small intestine','ince bağırsak'],['large intestine','kalın bağırsak'],['uterus','rahim'],['ovary','yumurtalık'],['testis','testis']
]);
function turkishOntologyName(name){return trGlossary.get(name.toLowerCase())||name;}
function relatedNames(ids){return [...new Set(ids.map(id=>ontology.get(id)?.name).filter(Boolean))];}
function sentence(value){const s=String(value||'').replace(/\s+/g,' ').trim();return s&&!/[.!?]$/.test(s)?s+'.':s;}
function joinSentences(...values){const seen=new Set(),out=[];for(const raw of values.flat(Infinity)){const s=sentence(raw);if(!s)continue;const k=s.toLocaleLowerCase('tr');if(!seen.has(k)){seen.add(k);out.push(s);}}return out.join(' ');}

function damageText(kind,name){
  const subject=`${name} hasarı`;
  const map={
    artery:`${subject}, beslediği bölgede kan akımını azaltabilir; sonuç tıkanmanın düzeyine, kollateral dolaşıma ve etkilenen dokuya bağlıdır. Tam kopma ayrıca ciddi kanamaya yol açabilir.`,
    vein:`${subject}, venöz dönüşü bozarak şişlik, basınç artışı veya trombozla ilişkili sorunlara yol açabilir. Sonuç etkilenen drenaj alanı ve alternatif venöz yollarla değişir.`,
    nerve:`${subject}, taşıdığı motor, duyusal veya otonom liflere göre güçsüzlük, duyu değişikliği ya da organ işlev bozukluğu oluşturabilir. Belirti dağılımı lezyon seviyesine bağlıdır.`,
    muscle:`${subject}, kasın katkı verdiği hareketlerde güç azalmasına ve eklem kontrolünde bozulmaya yol açabilir. Tek bir kasın etkisi sinerjist kaslar, ağrı ve hasarın derecesiyle değişir.`,
    tendon:`${subject}, kas kuvvetinin kemiğe aktarılmasını azaltabilir; kısmi ve tam yırtık aynı işlev kaybını oluşturmaz.`,
    ligament:`${subject}, sınırladığı yönde eklem veya organ desteğinde gevşeklik yaratabilir. Etki bağın konumuna, yırtığın derecesine ve eşlik eden yapılara bağlıdır.`,
    bone:`${subject}; kırık, şekil bozukluğu veya eklem yüzeyi etkilenmesine bağlı olarak yük aktarımı, hareket ya da komşu yapıların korunmasını bozabilir. Seçili kemik çıkıntısının kaybı bütün kemiğin yokluğuyla aynı değildir.`,
    neural:`${subject}, işlevsel olarak bağlı sinir ağlarında seçici nörolojik bulgular oluşturabilir. Klinik sonuç taraf, alt bölge ve bağlantı yollarına göre değişir; model parçası tek başına tanı koydurmaz.`,
    surface:`${subject}, bariyer bütünlüğünü, duyuyu veya yerel kanlanmayı etkileyebilir. Derinlik ve yüzey alanı klinik sonucu belirler.`,
    cardiovascular:`${subject}, kalp içi akım, duvar bütünlüğü veya iletimle ilgili sorunlara yol açabilir; seçili alt yapının rolü bütün kalbin işleviyle eş tutulmamalıdır.`,
    organ:`${subject}, ait olduğu organın işlevini kısmen etkileyebilir. Sonuç tek/çift organ oluşuna, sağlam kalan dokuya, karşı tarafın telafisine ve hasarın yaygınlığına bağlıdır.`
  };return map[kind]||map.organ;
}

function functionText(kind,name,existing){
  const generic=/seçili kayıt|genel bilgidir|kalp ve damarlar|her alt yapının|bu katmanda|destek, korunma ve hareket|sinir sistemi duyusal bilgiyi|kasılma yoluyla hareket, duruş/i;
  if(existing&&existing.length>35&&!generic.test(existing))return existing;
  const map={
    artery:`${name}, kanı kalpten ilgili anatomik bölgeye taşıyan arteriyel ağın bir parçasıdır.`,
    vein:`${name}, ilgili bölgeden kanı kalbe doğru taşıyan venöz drenaj ağının bir parçasıdır.`,
    nerve:`${name}, bağlı olduğu sinir sistemi bölümünde duyusal, motor veya otonom iletime katılabilir; kesin lif içeriği seçilen sinire özgüdür.`,
    muscle:`${name}, kasılma yoluyla geçtiği eklemlerde hareket ve stabilizasyona katkı verir; kesin hareket başlangıç, tutunma ve sinir bağlantısıyla belirlenir.`,
    tendon:`${name}, kas kuvvetinin tutunma bölgesine aktarılmasına katılan yoğun bağ dokusu yapısıdır.`,
    ligament:`${name}, ilişkili yapılar arasında pasif destek sağlar ve aşırı hareketi sınırlamaya katkı verir.`,
    bone:`${name}, iskeletin destek, yük aktarımı, kas tutunması veya koruma görevlerine seçili konumunda katkı verir.`,
    neural:`${name}, merkezi sinir sisteminde bilgi işleme veya iletim ağlarının anatomik bir bileşenidir; işlev alt bölge ve bağlantılarına göre değişir.`,
    surface:`${name}, vücut yüzeyinin bariyer, duyu ve yerel koruma işlevlerine katılan bir bölgesidir.`,
    cardiovascular:`${name}, dolaşım sisteminde kan akımının yönlendirilmesi, pompalanması veya damar bağlantısına katkı veren bir yapıdır.`,
    organ:`${name}, ait olduğu organın özgül anatomik bölümüdür; görevi bütün organın işleviyle aynı kabul edilmemelidir.`
  };return map[kind]||map.organ;
}

function buildCard(row,sex){
  const term=terminologyFor(row),match=matchTerm(row,term),u=match?.term;
  const name=displayName(row.name),sourceName=cleanName(row.name),side=sideOf(row.name),kind=kindOf(row);
  const parents=u?relatedNames(u.parents):[],parts=u?relatedNames(u.partOf):[];
  const relationBits=[];
  if(parts.length)relationBits.push(`${name}, UBERON partonomi kaydında ${parts.map(turkishOntologyName).join(', ')} yapısının parçası olarak ilişkilendirilir.`);
  if(parents.length)relationBits.push(`Üst anatomi sınıfları: ${parents.map(turkishOntologyName).join(', ')}.`);
  const legacy=explanationFor(row),profile=clinicalProfile(row);
  const location=joinSentences(`${name}, ${sex==='female'?'kadın':'erkek/genel'} referans modelinde ${layerLabels[row.layer]||row.layer} katmanında gösterilir`,side?`Model kaydı ${side.toLocaleLowerCase('tr')} tarafa aittir`:null,relationBits[0]);
  const fn=functionText(kind,name,legacy.function||profile.normal);
  const relations=joinSentences(relationBits,legacy.relations&&!/OpenStax/i.test(legacy.relations)?legacy.relations:null);
  const damage=damageText(kind,name);
  const clinical=joinSentences(damage,profile.check&&profile.scope==='specific'?profile.check:null,'Klinik değerlendirme; taraf, varyasyon, lezyon düzeyi ve eşlik eden damar-sinir-doku etkilenimi birlikte incelenerek yapılır');
  const basic=joinSentences(location,fn,damage);
  const intermediate=joinSentences(location,fn,relations,damage,profile.tissue&&profile.scope==='specific'?profile.tissue:null);
  const advanced=joinSentences(`${name}${term?.latin?` (${term.latin})`:''}${u?`, ${u.id} ile eşleştirilen ${u.name} kaydıdır`:''}`,location,fn,relations,clinical,u?.definition?`UBERON özgün tanımı (İngilizce): ${u.definition}`:null);
  const sources=[];
  if(u)sources.push({label:`UBERON ${u.id} · ${u.name}`,url:`https://purl.obolibrary.org/obo/${u.id.replace(':','_')}`,kind:'anatomy-ontology'});
  if(term?.latin)sources.push({label:`IFAA / TA2 2.07 · ${term.latin}`,url:term.url||ta2,kind:'terminology'});
  const notes=[];
  if(!u)notes.push('UBERON insan görünümünde güvenilir birebir eşleşme bulunamadı; kart yalnız model adı, katman ve yapı türü düzeyinde anlatım içerir.');
  if(match?.ambiguous)notes.push('Aynı ada sahip birden fazla ontoloji kaydı bulundu; klinik editör eşleşmeyi kontrol etmelidir.');
  if(!term?.latin)notes.push('Latince ad TA2 ile doğrulanmadı; uydurulmadı.');
  notes.push('Hasar/yokluk bölümü olası etkileri açıklar; kişide beklenen kesin sonuç olarak yorumlanmamalıdır.');
  return {id:row.id,sex,layer:row.layer,sourceName,turkishName:name,latinName:term?.latin||null,ontology:u?{id:u.id,label:u.name,definition:u.definition||null,parents,partOf:parts,matchScore:match.score,ambiguous:match.ambiguous}:null,tiers:{basic,intermediate,advanced},sections:{location,function:fn,relations:relations||null,absenceOrDamage:damage,clinicalRelevance:clinical},sources,reviewNotes:notes.join(' '),evidenceGrade:u&&!match.ambiguous&&term?.latin?'A':u&&!match.ambiguous?'B':'C'};
}

const records=[];
for(const [file,sex] of sourceFiles){for(const row of JSON.parse(await readFile(path.join(root,'dist',file),'utf8')))records.push(buildCard(row,sex));}
records.sort((a,b)=>a.id.localeCompare(b.id));
const unique=new Set(records.map(r=>r.id));
if(unique.size!==records.length)throw new Error(`Duplicate ids: ${records.length-unique.size}`);
const counts={total:records.length,ontologyMatched:records.filter(r=>r.ontology).length,latinVerified:records.filter(r=>r.latinName).length,gradeA:records.filter(r=>r.evidenceGrade==='A').length,gradeB:records.filter(r=>r.evidenceGrade==='B').length,gradeC:records.filter(r=>r.evidenceGrade==='C').length};
await mkdir(path.join(root,'dist/data'),{recursive:true});
await writeFile(path.join(root,'dist/data/anatomy-cards-tr.json'),JSON.stringify({schema:'authoritative-anatomy-cards-v1',generated:'2026-10-28',sources:[{name:'UBERON human view v2026-10-01',url:ontologyRelease,license:'CC BY 3.0'},{name:'IFAA / Terminologia Anatomica 2.07',url:ta2}],counts,records})+'\n');
await writeFile(path.join(root,'dist/data/anatomy-card-audit.json'),JSON.stringify({schema:'authoritative-anatomy-card-audit-v1',...counts,unmatched:records.filter(r=>!r.ontology).map(r=>({id:r.id,name:r.sourceName,sex:r.sex,layer:r.layer,reviewNotes:r.reviewNotes}))},null,2)+'\n');
console.log(JSON.stringify(counts,null,2));
