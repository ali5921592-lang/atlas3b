import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
import * as THREE from '../dist/vendor/build/three.module.js';
import {installNavigation} from '../dist/navigation-v15.js';
import {isCover,separationVector,separatedView,installCoverControl} from '../dist/dissection-v15.js';
const dom=new JSDOM('<header><nav></nav></header><div class="viewer-toolbar"></div><div class="view-controls"></div><div id="mount"></div><div id="workspace-explore"></div><p class="gesture"></p><p id="label">Katmanlar</p><textarea id="note">kişisel not</textarea>',{url:'http://localhost'});
for(const key of ['document','localStorage','CustomEvent','MutationObserver','NodeFilter'])globalThis[key]=dom.window[key];
let updates=0,cancelled=0;
const camera=new THREE.PerspectiveCamera(45,1,.01,20);camera.position.set(0,1,1);
const controls={target:new THREE.Vector3(0,1,0),mouseButtons:{},touches:{},update(){updates++;}};
const navigation=installNavigation({THREE,camera,controls,mount:document.querySelector('#mount'),requestRender(){},cancelMotion(){cancelled++;}});
navigation.setMode(true);assert.equal(controls.touches.ONE,THREE.TOUCH.PAN);assert.equal(controls.mouseButtons.LEFT,THREE.MOUSE.PAN);
navigation.setMode(false);assert.equal(controls.touches.ONE,THREE.TOUCH.ROTATE);
const distance=camera.position.distanceTo(controls.target),before=camera.position.clone();
navigation.shift(1);assert(camera.position.y>before.y);assert.equal(camera.position.distanceTo(controls.target),distance);
navigation.shift(-1);assert(camera.position.distanceTo(before)<1e-10);assert(updates===2&&cancelled===4);
let changed=0;installCoverControl(()=>changed++);const cover=document.querySelector('#showOrganCovers');assert.equal(cover.checked,false);cover.dispatchEvent(new dom.window.Event('change'));assert.equal(changed,1);
assert(isCover({layer:'visceral',name:'Greater omentum.001'}));assert(isCover({layer:'visceral',name:'Omentum.001'}));assert(!isCover({layer:'cardiovascular',name:'Greater omentum artery.001'}));assert(!isCover({layer:'visceral',name:'Jejunum.001'}));
const center=new THREE.Vector3(.1,1,0),a={id:'organ:a',name:'Jejunum.001',layer:'visceral'},b={id:'organ:b',name:'Ileum.001',layer:'visceral'};
const av=separationVector(THREE,a,center),bv=separationVector(THREE,b,center);
assert(av.distanceTo(bv)>.1,'individual organs at the same center must not move together');
assert.deepEqual(av.toArray(),separationVector(THREE,a,center).toArray(),'returning to a value must preserve each part trajectory');
assert(av.distanceTo(separationVector(THREE,{...a,id:'other-subpart'},center))>.05,'same-name subparts retain distinct trajectories');
for(const p of [new THREE.Vector3(-.2,.4,.1),new THREE.Vector3(.2,1.5,-.1),new THREE.Vector3(0,.86,.035)]){const d=separationVector(THREE,a,p),radial=new THREE.Vector3(p.x*2.8,(p.y-.86)*1.05,(p.z-.035)*2.8);assert(d.toArray().every(Number.isFinite));if(radial.lengthSq()>0)assert(d.dot(radial)>0,'parts must travel outward');}
for(const aspect of [.65,2.2]){const box=new THREE.Box3(new THREE.Vector3(-.8,-.3,-.4),new THREE.Vector3(.9,2.1,.5)),cam=new THREE.PerspectiveCamera(39,aspect,.005,25);cam.position.set(1,1,4);cam.lookAt(0,.8,0);const view=separatedView(THREE,box,cam,aspect);cam.position.copy(view.position);cam.lookAt(view.center);cam.updateMatrixWorld(true);for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z]){const p=new THREE.Vector3(x,y,z).project(cam);assert(Math.abs(p.x)<=.92&&Math.abs(p.y)<=.92&&p.z<1,'exploded anatomy fits portrait and landscape viewports');}}
const {setLanguage,installI18n,localName,translateText}=await import('../dist/i18n.js');
const {searchText,normalize,displayName}=await import('../dist/content.js');
const {translationData}=await import('../dist/i18n-data.js');
const {clinicalProfile}=await import('../dist/clinical-study.js');
const {explanationFor}=await import('../dist/explanations.js');
const {heartPart}=await import('../dist/thorax-data.js');
const {terminologyFor}=await import('../dist/terminology.js');
assert.equal(heartPart({name:'Marginal artery.001',layer:'cardiovascular'}),null);
assert.equal(heartPart({name:'Marginal artery.l.001',layer:'cardiovascular',sex:'female'}),'coronary');
assert.equal(terminologyFor('Marginal artery.l.001'),null);
installI18n();
for(const lang of ['tr','en','de','es','ar']){
 setLanguage(lang);await new Promise(resolve=>setTimeout(resolve,0));
 assert.equal(document.documentElement.lang,lang);assert.equal(document.documentElement.dir,lang==='ar'?'rtl':'ltr');
 assert.equal(document.querySelector('#note').value,'kişisel not');assert.equal(localStorage.getItem('anatomy-language'),lang);
 const query=localName('heart','Kalp',lang);assert(normalize(searchText('Heart.001','visceral')).includes(normalize(query)));
 assert(normalize(searchText('Left ventricle.001','cardiovascular')).includes(normalize(query)));
 assert(normalize(searchText('Femur.l.001','skeleton')).includes('femur'));assert(displayName('Femur.l.001').includes(localName('Femur','Uyluk kemiği',lang)));
 assert.equal(document.querySelector('#label').textContent,translateText('Katmanlar'));
}
assert.equal(localName('Unmapped source name','Türkçe karşılık','de'),'Unmapped source name');
const records=[];for(const file of ['catalog.json','catalog-female.json','catalog-female-muscles.json'])records.push(...JSON.parse(await readFile('dist/'+file)));
let checked=0,missing=[];
for(const r of records){const p=clinicalProfile(r),e=explanationFor(r);for(const field of ['normal','injury','loss','tissue','check','relations']){
 const value=p[field];if(!value||!/[^\x00-\x7f]|\b(ve|bir|ile)\b/.test(value))continue;
 const key=value.replace(/\s+/g,' ').trim();checked++;if(!translationData.text.en?.[key])missing.push(key);
 }assert(e.function&&e.intro);}
assert.equal(new Set(missing).size,0,'Missing English clinical fallbacks: '+[...new Set(missing)].slice(0,6).join(' | '));
assert.equal(records.length,3370);
for(const lang of ['en','de','es','ar']){
 assert(!/[ğışçöü]/i.test(translateText('Areola üzerindeki küçük kabarıklıklardır.',lang)),'New female card must have English fallback');
 assert(!/[ğışçöü]/i.test(translateText('Bacağın iç tarafında bulunan uzun kemiktir.',lang)),'Bone card must have English fallback');
 const ductNote=translateText('Kanal sistemi çok dallıdır; basitleştirilmiş 3B parça mikroskobik dallanmayı bütünüyle göstermez.',lang);
 assert(!ductNote.includes('Kanal sistemi'),'Duct clinical note must be localized');
 const veinNote=translateText('Seçili kayıt: Superior rectal vein. Aşağıdaki açıklama toplardamar için genel bilgidir.',lang);
 assert(veinNote.includes(localName('Superior rectal vein','Üst rektal ven',lang)),'Generic note must use the localized structure name');
 assert(!veinNote.includes('toplardamar')&&!veinNote.includes('Seçili kayıt'),'Generic note must translate its tissue type and template');
}
setLanguage('tr');assert.match(displayName('Radius.l.001'),/ön kol/);assert.doesNotMatch(displayName('Radius.l.001'),/Yarıçap/);
assert.match(displayName('Proper palmar digital branches of median nerve.l.001'),/özel palmar/);
console.log('PASS pan/zoom distance, mouse/touch modes, distinct stable dissection, covers, five locales, multilingual/Latin search, RTL, note preservation, '+checked+' clinical field fallbacks.');
dom.window.close();
