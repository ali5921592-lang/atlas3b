// Coverage checks are structural evidence, never clinical or translation approval.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {explanationFor} from '../dist/explanations.js';
import {clinicalProfile} from '../dist/clinical-study.js';
import {terminologyFor} from '../dist/terminology.js';
import {cleanName,displayName} from '../dist/content.js';
import {translateText,setLanguage} from '../dist/i18n.js';
import {translationData} from '../dist/i18n-data.js';
import {reviewedText} from '../dist/i18n-overrides.js';
import {clinicalLabelTranslations} from '../dist/clinical-label-translations.js';
import {contentFallbackEn} from '../dist/content-fallback-en.js';
const load=async name=>JSON.parse(await readFile('dist/'+name,'utf8'));
const sources={male:await load('catalog.json'),femaleHRA:await load('catalog-female.json'),femaleLegMuscles:await load('catalog-female-muscles.json')};
const auditDate=new Date().toISOString().slice(0,10);
const result={auditDate,checkedAtHostUTC:new Date().toISOString(),readyForPaidStoreRelease:false,method:'Unique source meshes, not duplicated UI records. Field presence and translation dictionary coverage do not establish factual correctness.',sources:{},translations:{},publicURLs:[]};
const backlog=[];
const texts=new Set();
for(const [source,rows]of Object.entries(sources)){
 const stats={meshes:rows.length,latinMapped:0,latinPending:0,explanationScopes:{},clinicalScopes:{},missingCoreFields:[],missingLatinSamples:[]};
 for(const r of rows){
  const e=explanationFor(r),p=clinicalProfile(r),t=terminologyFor(r);
  stats.explanationScopes[e.scope]=(stats.explanationScopes[e.scope]||0)+1;
  stats.clinicalScopes[p.scope]=(stats.clinicalScopes[p.scope]||0)+1;
  if(t?.latin)stats.latinMapped++;else{stats.latinPending++;if(stats.missingLatinSamples.length<8)stats.missingLatinSamples.push(r.name);}
  if(!t?.latin||e.scope!=='specific'||p.scope!=='specific')backlog.push({source,id:r.id,name:r.name,latin:t?.latin||'',explanation:e.scope,clinical:p.scope,needsLatin:!t?.latin});
  for(const [key,value]of Object.entries({function:e.function,normal:p.normal,injury:p.injury,loss:p.loss,tissue:p.tissue,check:p.check}))if(!value)stats.missingCoreFields.push({id:r.id,name:r.name,field:key});
  for(const key of ['intro','function','relations','clinical'])if(e[key])texts.add(e[key]);
  for(const key of ['normal','injury','loss','tissue','check','relations'])if(p[key])texts.add(p[key]);
  for(const value of Object.values(p.facts||{}))if(value)texts.add(value);
 }
 result.sources[source]=stats;
}
const norm=s=>s.replace(/\s+/g,' ').trim(),codes=['tr','en','de','es','ar'];
for(const lang of codes){
 setLanguage(lang);
 const s={uniqueStudyTexts:texts.size,dictionaryEntries:0,englishFallbacks:0,templateTranslations:0,untranslated:0,untranslatedSamples:[],unchangedSamples:[],nameCount:0,namesWithTurkishCharacters:0,nameSamples:[]};
 for(const text of texts){const k=norm(text),index=codes.indexOf(lang),direct=lang==='tr'||reviewedText[k]?.[index-1]||clinicalLabelTranslations[k]?.[index]||translationData.text?.[lang]?.[k];
  if(direct)s.dictionaryEntries++;else if(translationData.text?.en?.[k]||contentFallbackEn[k])s.englishFallbacks++;else if(/^Seçili kayıt:\s*.+?\.\s*Aşağıdaki açıklama .+? için genel bilgidir\.$/.test(k)&&translateText(text,lang)!==text)s.templateTranslations++;else {s.untranslated++;if(s.untranslatedSamples.length<12)s.untranslatedSamples.push(k.slice(0,220));}
  if(lang!=='tr'&&translateText(text,lang)===text&&s.unchangedSamples.length<8)s.unchangedSamples.push(text.slice(0,170));
 }
 for(const rows of Object.values(sources))for(const r of rows){const name=displayName(r.name);s.nameCount++;if(lang!=='tr'&&/[ğışİĞŞ]/.test(name)){s.namesWithTurkishCharacters++;if(s.nameSamples.length<5)s.nameSamples.push({source:cleanName(r.name),display:name});}}
 result.translations[lang]=s;
}
setLanguage('tr');
for(const url of ['https://ali5921592-lang.github.io/atlas3b/privacy-policy.html','https://ali5921592-lang.github.io/atlas3b/support.html']){
 try{const response=await fetch(url,{signal:AbortSignal.timeout(20000)});result.publicURLs.push({url,status:response.status,ok:response.ok});}catch(error){result.publicURLs.push({url,error:error.message,ok:false});}
}
const gradle=await readFile('android/app/build.gradle','utf8');
result.android={versionCode:Number(/versionCode\s+(\d+)/.exec(gradle)?.[1]),versionName:/versionName\s+"([^"]+)"/.exec(gradle)?.[1],releaseSigning:'Conditional on external upload-key environment variables; check the final artifact separately.'};
await mkdir('outputs',{recursive:true});
await writeFile('outputs/release-audit-'+auditDate+'.json',JSON.stringify(result,null,2)+'\n');
const quote=s=>'"'+String(s).replace(/"/g,'""')+'"';
await writeFile('outputs/content-review-backlog-'+auditDate+'.csv','\uFEFF'+['source,id,name,latin,explanation,clinical,needsLatin',...backlog.map(r=>Object.values(r).map(quote).join(','))].join('\n'));
console.log(JSON.stringify({...result,translations:Object.fromEntries(Object.entries(result.translations).map(([k,v])=>[k,{...v,unchangedSamples:undefined,nameSamples:undefined}]))},null,2));
