import assert from 'node:assert/strict';
import vm from 'node:vm';
import * as THREE from '../dist/vendor/build/three.module.js';
import {separationVector} from '../dist/dissection-v15.js';
import {readFile} from 'node:fs/promises';
import {terminologyFor} from '../dist/terminology.js';
import {femaleNameTranslation} from '../dist/female-name-data.js';
import {explanationFor} from '../dist/explanations.js';
import {searchText} from '../dist/content.js';
import {femaleSharedRecords,referenceRecords,inReference,femaleFrames,layerFiles,sharedReferenceNotice,femaleReferenceSummary} from '../dist/female-shared.js';
import {resolveConnections} from '../dist/connections.js';

const female=JSON.parse(await readFile('dist/catalog-female.json','utf8'));
const muscles=JSON.parse(await readFile('dist/catalog-female-muscles.json','utf8'));
const records=[...female,...muscles];
assert.equal(female.length,956);
assert.equal(muscles.length,76);
assert.equal(new Set(records.map(r=>r.id)).size,records.length,'Female catalog IDs must be unique');
assert(records.every(r=>r.name&&r.original&&r.layer),'Every female model mesh must retain name, source ID, and layer');

const byId=new Map(female.map(r=>[r.id,r]));
assert.equal(byId.get('female:764').name,'Superior rectal vein.001');
assert.match(byId.get('female:764').original,/superior_rectal_vein/i);
assert.equal(byId.get('female:790').name,'Inferior mesenteric vein.001');
assert.match(byId.get('female:790').original,/inferior_mesenteric_vein/i);
for(const r of female){
  const name=r.name.toLowerCase(),source=r.original.toLowerCase();
  if(/artery/.test(source))assert.match(name,/artery/,`Artery label mismatch: ${r.name} / ${r.original}`);
  if(/vein/.test(source))assert.match(name,/vein/,`Vein label mismatch: ${r.name} / ${r.original}`);
  if(/artery/.test(name))assert.doesNotMatch(source,/vein/,`Artery/vein mismatch: ${r.name} / ${r.original}`);
  if(/vein/.test(name))assert.doesNotMatch(source,/artery/,`Vein/artery mismatch: ${r.name} / ${r.original}`);
}

const verifyLatin=new Map([
 ['Areolar tubercle.l.001',[7108,'Tubercula areolae']],['Female areola.l.001',[7106,'Areola mammae']],
 ['Mammary lobe.l.001',[7101,'Lobi glandulae mammariae']],['Main lactiferous duct.l.001',[7103,'Ductus lactiferi']],
 ['Lactiferous sinus.l.001',[7104,'Sinus lactiferi']],['Suspensory ligament of left breast.l.001',[7109,'Ligamenta suspensoria mammaria']],
 ['Fimbria of right uterine tube.r.001',[3489,'Fimbriae tubae uterinae']],['Suspensory ligament of right ovary.r.001',[3805,'Ligamentum suspensorium ovarii']],
 ['Uterine cervix.001',[3508,'Cervix uteri']],['Uterine vein.l.001',[5046,'Venae uterinae']],
 ['Marginal artery.l.001',[4152,'Ramus marginalis sinister arteriae circumflexae cordis']],['Patellar surface of right femur.r.001',[1386,'Facies patellaris ossis femoris']]
]);
assert.equal(records.filter(r=>terminologyFor(r)).length,507,'Female Latin coverage should remain measured against the current catalogs');
for(const [name,[id,latin]] of verifyLatin){const r=records.find(x=>x.name===name);assert(r,name);const t=terminologyFor(r);assert.equal(t?.ta2,id,name);assert.equal(t?.latin,latin,name);assert.equal(t?.source,'TA2 2.07',name);}
assert.equal(terminologyFor(records.find(r=>r.name==='Interlobar adipose tissue of left mammary gland.l.001')),null,'Unverified Latin must remain explicitly unmatched');
assert.equal(terminologyFor('Marginal artery.l.001'),null,'Female-only colon artery Latin must not overwrite the male coronary label');
const femaleMarginal=records.find(r=>r.name==='Marginal artery.l.001');
assert(searchText(femaleMarginal.name,femaleMarginal.layer,femaleMarginal).includes('ramus marginalis sinister'),'Female Latin must be searchable without leaking into the male anatomy record');

const cards=[
 'Areolar tubercle.l.001','Female areola.l.001','Mammary lobe.l.001','Main lactiferous duct.l.001','Lactiferous sinus.l.001',
 'Suspensory ligament of left breast.l.001','Fimbria of right uterine tube.r.001','Ampulla of left uterine tube.l.001',
 'Isthmus of right uterine tube.r.001','Infundibulum of left uterine tube.l.001','Uterovesical pouch.001',
 'Suspensory ligament of right ovary.r.001','Mesosalpinx.l.001','Mesovarium.r.001','Ovarian ligament.l.001',
 'Body of uterus.001','Fundus of uterus.001','Lower uterine segment.001','Posterior wall of uterus.001',
 'Anterior wall of uterus.001','Uterine cervix.001','Uterine artery.l.001','Uterine vein.r.001'
];
for(const name of cards){const r=records.find(x=>x.name===name);assert(r,`Missing female structure ${name}`);const e=explanationFor(r);assert(e.intro&&e.function&&e.relations&&e.clinical,`Incomplete learning card for ${name}`);assert.equal(e.scope,'specific',`Card should be structure-specific: ${name}`);}

const translated=[...records.filter(r=>/areola|mammary|lactifer|breast|fimbria|uterine|mesosalpinx|mesovarium|ovarian ligament/i.test(r.name))];
for(const r of translated)for(const lang of ['tr','en','de','es','ar'])assert(femaleNameTranslation(r.name,lang),`Missing ${lang} female-anatomy label: ${r.name}`);
const html=await readFile('dist/index.html','utf8');
assert.match(html,/kadın donör geometrisi değildir/i);
assert.match(html,/ölçümsel olarak eşleşmez/i);
const male=JSON.parse(await readFile('dist/catalog.json','utf8'));
const shared=femaleSharedRecords(male,records),byLayer=Object.groupBy(shared,r=>r.layer);
assert.equal(shared.length,2310,'Separate general reference retains its source anatomy');
assert.equal(byLayer.skeleton.length,277);assert.equal(byLayer.muscular.length,458);assert.equal(byLayer.tendons.length,217);
assert(shared.every(r=>r.sex==='female'&&r.sharedReference&&r.id.startsWith('female-shared:')));
assert(new Set(shared.map(r=>r.id)).size===shared.length);
const app=await readFile('dist/app.js','utf8');
assert.match(app,/femaleSharedRecords\(maleCatalog,femaleCatalog\)/);assert.match(app,/o\.userData\.sourceNode=node/);
assert(sharedReferenceNotice('tr').body.includes('kadın'));assert(sharedReferenceNotice('en').body.includes('female'));for(const lang of ['tr','en','de','es','ar'])assert(femaleReferenceSummary([...records,...shared],lang).length>100);
const offline=JSON.parse(await readFile('dist/offline-assets.json','utf8'));
for(const file of ['skeleton','muscular','cardiovascular','nervous'])assert(offline.female.includes('./models/'+file+'.glb'));
assert(offline.core.includes('./female-shared.js'));
const responsive=await readFile('dist/interface-v15.css','utf8');
assert.match(responsive,/@media\(max-width:850px\) and \(orientation:landscape\) and \(max-height:500px\)/);
assert.match(responsive,/#canvasMount\{top:40px!important;bottom:38px!important\}/);
console.log(`PASS female anatomy audit: ${female.length} HRA meshes + ${muscles.length} lower-limb muscles + ${shared.length} explicitly labeled shared atlas structures; vascular label corrections, TA2 verification and ${cards.length} complete female-specific cards.`);

const requiredNames=['Scaphoid bone.r.001','Scaphoid bone.l.001','Distal phalanx of fifth finger of hand.r.001','Distal phalanx of fifth finger of hand.l.001','Talus.r.001','Talus.l.001','Pronator quadratus.r.001','Pronator quadratus.l.001','Supinator.r.001','Mentalis muscle.r.001','Nasalis muscle.r.001'];
for(const name of requiredNames)assert(shared.some(r=>r.name===name),'Missing shared reference: '+name);
assert(shared.some(r=>/^Femur\./.test(r.name))&&shared.some(r=>/^Hip bone\./.test(r.name)),'Separate general source needs its own femur and pelvis for continuous joints');
const originalRecord=male.find(r=>r.id===shared[0].sourceRecordId),femaleRecord=shared[0],base=new THREE.Vector3(.2,1,0),root=new THREE.Group(),source=new THREE.Mesh(new THREE.BoxGeometry(.1,.1,.1),new THREE.MeshStandardMaterial());
source.position.copy(base).add(new THREE.Vector3(2,3,4));source.userData={record:originalRecord,sourceNode:originalRecord.node,basePosition:base.clone()};root.add(source);
const bound=new Map([[originalRecord.id,source]]),context=vm.createContext({THREE,catalog:[originalRecord,femaleRecord],objects:bound,sex:'female',recordSex:r=>r.sex||'male',createTissueMaterial:()=>new THREE.MeshStandardMaterial(),applyPalette(){},paletteMode:'natural',cutPlanes:[],separationVector});
vm.runInContext(app.slice(app.indexOf('function bindFileRecords('),app.indexOf('async function loadFile(')),context);context.root=root;context.file=originalRecord.file;vm.runInContext('bindFileRecords(file,root)',context);
const clone=bound.get(femaleRecord.id);assert(clone&&clone!==source);assert(clone.position.distanceTo(base)<1e-8,'sex switching must clone assembled position, not exploded position');assert(clone.userData.worldCenter.distanceTo(base)<1e-8);assert.notEqual(clone.material,source.material);assert(source.position.distanceTo(base)>1);
vm.runInContext('bindFileRecords(file,root)',context);assert.equal(root.children.length,2,'repeated layer selection must not duplicate meshes');
console.log('PASS female distal bone/face/forearm coverage and sex switch from exploded geometry preserves assembly position.');

assert.equal(byLayer.cardiovascular.length,666);assert.equal(byLayer.nervous.length,580);
const merged=[...records,...shared];
assert.equal(referenceRecords(merged,'female','native').length,956);
assert.equal(referenceRecords(merged,'female','muscles').length,76);
assert.equal(referenceRecords(merged,'female','general').length,2310);
for(const r of merged)assert.equal(femaleFrames.filter(frame=>inReference(r,'female',frame)).length,1,'Each structure belongs to exactly one source frame');
for(const frame of femaleFrames){const rows=referenceRecords(merged,'female',frame);assert(rows.every(r=>frame==='general'?r.sharedReference:frame==='muscles'?r.file==='female-muscles':r.file==='female'));}
assert(!shared.some(r=>/penis|penile|prostat|testic|spermat|scrot|deferens|seminal|cremaster/i.test(r.name)),'male reproductive structures must never enter the female view');
for(const [layer,pattern] of [['nervous',/musculocutaneous nerve/i],['nervous',/median nerve/i],['nervous',/sciatic nerve/i],['cardiovascular',/^brachial artery/i],['cardiovascular',/leaflet/i],['tendons',/calcaneal tendon/i],['tendons',/iliotibial tract/i]])assert(shared.some(r=>r.layer===layer&&pattern.test(r.name)),layer+' '+pattern);
assert(shared.filter(r=>/ligament|retinaculum|fascia(?!e)|iliotibial tract/i.test(r.name)).every(r=>r.layer==='tendons'));
for(const layer of ['skeleton','muscular','cardiovascular','nervous','tendons'])for(const r of merged.filter(r=>r.layer===layer))assert(layerFiles(merged,'female',layer).includes(r.file),'each rendered layer must load all underlying model files');
assert.deepEqual(layerFiles(referenceRecords(merged,'female','general'),'female','cardiovascular'),['cardiovascular']);assert.deepEqual(layerFiles(referenceRecords(merged,'female','native'),'female','nervous'),['female']);
const glbJson=new Map();for(const file of new Set(shared.map(r=>r.file))){const bytes=await readFile('dist/models/'+file+'.glb');glbJson.set(file,JSON.parse(bytes.subarray(20,20+bytes.readUInt32LE(12)).toString()));}
for(const r of shared){const source=male.find(x=>x.id===r.sourceRecordId),gltf=glbJson.get(r.file);assert(source&&source.file===r.file&&source.node===r.node);assert(gltf.nodes[r.node]?.mesh!==undefined,'shared record must refer to actual GLB mesh: '+r.id);assert.equal(r.sourceSex,'male');}
const femaleBiceps=shared.find(r=>r.name==='Long head of biceps brachii.l.001');const links=resolveConnections(femaleBiceps,shared);assert(links&&links.rows.some(x=>x.role==='nerve')&&links.rows.some(x=>x.role==='artery')&&links.rows.some(x=>x.role==='insertion'));assert(links.rows.every(x=>x.record.sex==='female'&&x.record.sharedReference));
assert.equal(terminologyFor({...femaleMarginal,sharedReference:true}),null,'generic-source structures must not inherit a female-source-only Latin override');
console.log('PASS isolated source frames, complete general source skeleton, real GLB nodes, source-specific Latin, sex exclusion, connective classification and same-source muscle artery/nerve/bone links.');
