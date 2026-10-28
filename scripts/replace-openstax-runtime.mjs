import {readFile,writeFile} from 'node:fs/promises';

const replacements=new Map([
  ['OpenStax · Anatomi ve Fizyoloji','UBERON · İnsan anatomisi ontolojisi'],
  ['OpenStax · İlgili anatomi bölümü','UBERON · İlgili anatomi kaydı'],
  ['OpenStax · Doku / sistem bilgisi','UBERON · Doku / sistem sınıflandırması'],
  ['OpenStax · ','UBERON · '],
]);
const files=['dist/atlas-learning.js','dist/app.js','dist/clinical-study.js','dist/content.js','dist/explanations.js','dist/heart-detail.js','dist/muscle-study.js','dist/nerve-study.js','dist/organ-cards.js','dist/organ-links.js','dist/regional-study.js','dist/sensory-study.js','dist/structure-cards.js','dist/thorax-data.js'];
for(const file of files){let text=await readFile(file,'utf8');for(const [from,to]of replacements)text=text.split(from).join(to);text=text.replace(/https:\/\/openstax\.org\/books\/[^'"\s]+/g,'https://purl.obolibrary.org/obo/UBERON_0001062');await writeFile(file,text);}

const app='dist/app.js';let source=await readFile(app,'utf8');
const initNeedle="async function init(){registerOffline();try{catalog=await fetch('./catalog.json')";
const initReplacement="async function init(){registerOffline();try{const cardPayload=await fetch('./data/anatomy-cards-tr.json').then(r=>{if(!r.ok)throw Error('Anatomi kartları');return r.json();});anatomyCards=new Map(cardPayload.records.map(card=>[card.id,card]));catalog=await fetch('./catalog.json')";
if(source.includes(initNeedle))source=source.replace(initNeedle,initReplacement);
else if(!source.includes("const cardPayload=await fetch('./data/anatomy-cards-tr.json')"))throw new Error('init insertion point not found');
source=source.replace("let learning='basic';try{learning=localStorage.getItem('anatomy-learning-level')==='advanced'?'advanced':'basic';}","let learning='basic';try{const saved=localStorage.getItem('anatomy-learning-level');learning=['basic','intermediate','advanced'].includes(saved)?saved:'basic';}");
source=source.replace("$('#learningLevel').onchange=e=>{document.body.dataset.learning=e.target.value;try{localStorage.setItem('anatomy-learning-level',e.target.value);}","$('#learningLevel').onchange=e=>{document.body.dataset.learning=e.target.value;if(selected&&labels)showDetails(selected.userData.record);try{localStorage.setItem('anatomy-learning-level',e.target.value);}");
const coverageStart=source.indexOf('const coverage={specific:0,parent:0,group:0,general:0}');
const coverageEnd=source.indexOf("$('#totalCount')",coverageStart);
if(coverageStart>=0&&coverageEnd>coverageStart){
  const coverage="const counts=cardPayload.counts;$('#contentCoverage').textContent=counts.total+' kaynak model kaydı için üç düzeyli kart hazır: '+counts.ontologyMatched+' UBERON birebir eşleşmesi, '+counts.latinVerified+' doğrulanmış Latince ad; A/B/C kanıt düzeyleri '+counts.gradeA+'/'+counts.gradeB+'/'+counts.gradeC+'. Eşleşmeyen kayıtlarda bilgi yapı türü düzeyinde tutulur ve uydurma özgül ilişki gösterilmez.';";
  source=source.slice(0,coverageStart)+coverage+source.slice(coverageEnd);
}
await writeFile(app,source);

const html='dist/index.html';let page=await readFile(html,'utf8');
page=page.replace('<option value="basic">Başlangıç · Konum ve görev</option><option value="advanced">İleri · Latince ve ilişkiler</option>','<option value="basic">Başlangıç · Konum ve görev</option><option value="intermediate">Orta · İlişkiler ve olası etkiler</option><option value="advanced">Gelişmiş · Kanıt, klinik önem ve Latince</option>');
page=page.replace(/<p>Daha önce kullanılan ticari olmayan iç kulak[\s\S]*?<\/p><h3>Kadın referansı<\/h3>/,'<p>Daha önce kullanılan ticari olmayan iç kulak ve böbrek geometrileri güncel paketten çıkarılmıştır. Kalan atlas varlıklarında kaynak atıfları, lisans bağlantıları, değişiklik bildirimleri ve ilgili ShareAlike koşulları korunur. Eğitim kartları OpenStax metni içermez; UBERON insan anatomisi ontolojisi ve IFAA Terminologia Anatomica eşleşmelerinden özgün olarak üretilmiştir. <a href="models/SOURCE-LICENSE.txt" target="_blank">Tam model atıfları ve lisanslar ↗</a></p><h3>Kadın referansı</h3>');
page=page.replace(/<h3>Eğitim notları<\/h3><p>[\s\S]*?<\/p><p>Açıklama kapsamı/,'<h3>Eğitim notları</h3><p>3.370 kaynak model kaydının her biri için başlangıç, orta ve gelişmiş Türkçe kart bulunur. Anatomik kimlik ve partonomi eşleşmeleri UBERON human-view v2026-10-01; Latince adlar IFAA / TA2 2.07 ile denetlenir. Birebir ontoloji eşleşmesi olmayan kayıtlarda bilgi yapı türü düzeyinde tutulur ve uygulamada kanıt düzeyi gösterilir. Klinik editör incelemesi sürmektedir; kartlar eğitim amaçlıdır ve kişiye özel tanı veya tedavi önerisi değildir.</p><p>Açıklama kapsamı');
await writeFile(html,page);

const offlinePath='dist/offline-assets.json';const offline=JSON.parse(await readFile(offlinePath,'utf8'));
if(!offline.core.includes('./data/anatomy-cards-tr.json'))offline.core.push('./data/anatomy-cards-tr.json');
await writeFile(offlinePath,JSON.stringify(offline));
const swPath='dist/sw.js';let sw=await readFile(swPath,'utf8');
sw=sw.replace("const VERSION='anatomy-v16.1'","const VERSION='anatomy-v16.2'").replace("['anatomy-v16.0'","['anatomy-v16.1','anatomy-v16.0'");
await writeFile(swPath,sw);
