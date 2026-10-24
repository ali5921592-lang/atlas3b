import {readFile} from 'node:fs/promises';
import {terminologyData} from '../dist/terminology-data.js';

const files=['catalog-female.json','catalog-female-muscles.json'];
const records=[];
for(const file of files) records.push(...JSON.parse(await readFile(new URL('../dist/'+file,import.meta.url),'utf8')));
const csv=await (await fetch('https://raw.githubusercontent.com/Z-Anatomy/Models-of-human-anatomy/master/TA2.csv')).text();
const terms=[];
for(const line of csv.split(/\r?\n/)){
  const row=line.trim().replace(/^"|"$/g,'').split(';');
  if(/^\d+$/.test(row[0]||'')&&row[1]&&row[2])terms.push({id:Number(row[0]),english:row[1],latin:row[2]});
}
const norm=value=>value.toLowerCase().replace(/\.[lr]\.\d+$|\.\d+$/,'').replace(/\b(left|right|female)\b/g,'').replace(/\s+/g,' ').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const index=new Map();
for(const term of terms){const key=norm(term.english);if(!index.has(key))index.set(key,[]);index.get(key).push(term);}
const counts={records:records.length,exactExisting:0,officialNameMatch:0,ambiguous:0,missing:0};
const candidates=[];
for(const record of records){
  if(terminologyData[record.name]){counts.exactExisting++;continue;}
  const matches=index.get(norm(record.name))||[];
  if(matches.length===1){counts.officialNameMatch++;candidates.push({name:record.name,...matches[0]});}
  else if(matches.length>1){const ids=new Set(matches.map(x=>x.id));if(ids.size===1){counts.officialNameMatch++;candidates.push({name:record.name,...matches[0]});}else counts.ambiguous++;}
  else counts.missing++;
}
console.log(JSON.stringify(counts,null,2));
console.log('CANDIDATES');
for(const item of candidates)console.log(`${item.name}\t${item.id}\t${item.latin}`);
console.log('TERMINOLOGY_LOOKUP');
for(const query of ['vesicouterine','excavatio vesicouterina','mammary lobe','areolar tubercle','lactiferous duct','lactiferous sinus','suspensory ligaments of breast','fimbriae of uterine tube','uterine veins','cervix of uterus','anterior wall of uterus','posterior wall of uterus']){
  const matches=terms.filter(x=>x.english.toLowerCase().includes(query.toLowerCase()));
  console.log(query+': '+matches.slice(0,5).map(x=>`${x.id} ${x.english} = ${x.latin}`).join(' | '));
}
