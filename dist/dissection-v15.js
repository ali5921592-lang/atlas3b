export function isCover(r){return r.layer==='visceral'&&/^(?:greater omentum|lesser omentum|omentum|mesocolon)(?:\.\d+)?$/i.test(r.name);}
export function separationVector(THREE,r,center){
 let seed=2166136261;for(const ch of (r.sex||'male')+r.name)seed=Math.imul(seed^ch.charCodeAt(0),16777619)>>>0;
 const side=/\.l\./i.test(r.name)?1:/\.r\./i.test(r.name)?-1:center.x<0?-1:1;
 const layer={skeleton:.6,muscular:1.05,tendons:1.22,visceral:1.35,cardiovascular:1.65,nervous:1.95,surface:2.15}[r.layer]||1;
 const angle=(seed%6283)/1000;
 const spread=new THREE.Vector3(side*(.3+Math.abs(center.x)*.7)+Math.sin(angle)*.2,(center.y-.9)*.12+Math.cos(angle)*.16,(center.z-.04)*.5+Math.cos(angle*.73)*.3);
 return spread.multiplyScalar(layer);
}
export function installCoverControl(onChange){
 const block=document.createElement('section');block.className='cover-controls';block.innerHTML='<label class="check-label"><input id="showOrganCovers" type="checkbox"> Organ örtülerini göster</label><p>Omentum ve mezokolon ayrı açılır. Örtüler kaldırıldığında bağırsaklar daha rahat görünür; kaynak geometrisi korunur.</p>';document.querySelector('#workspace-explore').append(block);block.querySelector('input').onchange=onChange;
}
