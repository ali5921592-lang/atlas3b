export function isCover(r){return r.layer==='visceral'&&/^(?:greater omentum|lesser omentum|omentum|mesocolon)(?:\.\d+)?$/i.test(r.name);}
export function separationVector(THREE,r,center){
 // Translate each mesh without scaling its geometry. Position supplies the
 // outward direction; stable identity separates coincident substructures.
 let seed=2166136261;
 for(const ch of `${r.id||r.original||r.name}:${r.layer}`)seed=Math.imul(seed^ch.charCodeAt(0),16777619)>>>0;
 const sample=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const radial=new THREE.Vector3(center.x*2.8,(center.y-.86)*1.05,(center.z-.035)*2.8);
 const outward=radial.lengthSq()>1e-8?radial.clone().normalize():new THREE.Vector3(0,0,1);
 const azimuth=sample()*Math.PI*2,z=sample()*2-1,radius=Math.sqrt(1-z*z);
 const individual=new THREE.Vector3(Math.cos(azimuth)*radius,z,Math.sin(azimuth)*radius);
 if(individual.dot(outward)<0)individual.negate();
 const depth=.25+sample()*.4;
 return radial.addScaledVector(outward,.2+depth*.2).addScaledVector(individual,depth);
}
export function separatedView(THREE,box,camera,aspect){
 const center=box.getCenter(new THREE.Vector3()),inverse=camera.quaternion.clone().invert();
 const tangent=Math.tan((camera.fov||39)*Math.PI/360);
 let distance=.12;
 for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z]){
  const local=new THREE.Vector3(x,y,z).sub(center).applyQuaternion(inverse);
  distance=Math.max(distance,Math.abs(local.x)*1.1/(tangent*Math.max(.1,aspect))+local.z,Math.abs(local.y)*1.1/tangent+local.z);
 }
 const direction=new THREE.Vector3(0,0,1).applyQuaternion(camera.quaternion);
 return {center,distance,position:center.clone().addScaledVector(direction,distance)};
}
export function installCoverControl(onChange){
 const block=document.createElement('section');block.className='cover-controls';block.innerHTML='<label class="check-label"><input id="showOrganCovers" type="checkbox"> Organ örtülerini göster</label><p>Omentum ve mezokolon ayrı açılır. Örtüler kaldırıldığında bağırsaklar daha rahat görünür; kaynak geometrisi korunur.</p>';document.querySelector('#workspace-explore').append(block);block.querySelector('input').onchange=onChange;
}
