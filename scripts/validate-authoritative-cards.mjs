import {readFile} from 'node:fs/promises';

const catalogs=['dist/catalog.json','dist/catalog-female.json','dist/catalog-female-muscles.json'];
const expected=(await Promise.all(catalogs.map(file=>readFile(file,'utf8').then(JSON.parse)))).flat();
const payload=JSON.parse(await readFile('dist/data/anatomy-cards-tr.json','utf8'));
const ids=new Set(),errors=[];
if(payload.records.length!==expected.length)errors.push(`card count ${payload.records.length} != catalog count ${expected.length}`);
for(const card of payload.records){
  if(ids.has(card.id))errors.push(`duplicate id ${card.id}`);ids.add(card.id);
  for(const key of ['basic','intermediate','advanced'])if(!card.tiers?.[key]||card.tiers[key].length<80)errors.push(`${card.id}: incomplete ${key} tier`);
  for(const key of ['location','function','absenceOrDamage','clinicalRelevance'])if(!card.sections?.[key])errors.push(`${card.id}: missing ${key}`);
  if(!['A','B','C'].includes(card.evidenceGrade))errors.push(`${card.id}: invalid evidence grade`);
  if(card.ontology&&!/^UBERON:\d+$/.test(card.ontology.id))errors.push(`${card.id}: invalid ontology id`);
  if(card.sources.some(source=>/openstax/i.test(source.url+source.label)))errors.push(`${card.id}: OpenStax source remains`);
}
for(const record of expected)if(!ids.has(record.id))errors.push(`missing id ${record.id}`);
const canaries=new Map([['Aortic arch','UBERON:0001508'],['Kidney','UBERON:0002113'],['Liver','UBERON:0002107'],['Femur','UBERON:0000981'],['Sciatic nerve','UBERON:0001322']]);
for(const [name,id]of canaries){const matches=payload.records.filter(card=>card.sourceName===name);if(!matches.length||matches.some(card=>card.ontology?.id!==id))errors.push(`${name}: expected ${id}`);}
if(errors.length){console.error(errors.slice(0,100).join('\n'));process.exit(1);}
console.log(`Validated ${payload.records.length} cards; ${payload.counts.ontologyMatched} UBERON matches, ${payload.counts.latinVerified} Latin terms.`);
