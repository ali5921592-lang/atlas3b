import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

// Coordinates are the source RGB volume's own image frame, not a GLB registration.
export function voxelToWorld(p,m){return new THREE.Vector3((p.x-(m.width-1)/2)*m.spacingMm[0],((m.depth-1)/2-p.z)*m.spacingMm[2],((m.height-1)/2-p.y)*m.spacingMm[1]);}
export function worldToVoxel(w,m){return{x:Math.round(w.x/m.spacingMm[0]+(m.width-1)/2),y:Math.round((m.height-1)/2-w.z/m.spacingMm[1]),z:Math.round((m.depth-1)/2-w.y/m.spacingMm[2])};}
export function planeCorners(axis,p,m){const W=m.width-1,H=m.height-1,D=m.depth-1;const points=axis==='z'?[[0,0,p.z],[W,0,p.z],[W,H,p.z],[0,H,p.z]]:axis==='y'?[[0,p.y,0],[W,p.y,0],[W,p.y,D],[0,p.y,D]]:[[p.x,0,0],[p.x,H,0],[p.x,H,D],[p.x,0,D]];return points.map(([x,y,z])=>voxelToWorld({x,y,z},m));}
export class VolumeSpace{
 constructor(mount,meta,onPick){
  this.mount=mount;this.meta=meta;this.scene=new THREE.Scene();this.scene.background=new THREE.Color('#101b1c');
  this.renderer=new THREE.WebGLRenderer({antialias:true});this.renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));this.renderer.outputColorSpace=THREE.SRGBColorSpace;mount.append(this.renderer.domElement);
  this.camera=new THREE.PerspectiveCamera(42,1,1,5000);this.controls=new OrbitControls(this.camera,this.renderer.domElement);this.controls.addEventListener('change',()=>this.render());this.meshes=[];
  for(const axis of ['x','y','z']){const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.BufferAttribute(new Float32Array(12),3));geometry.setAttribute('uv',new THREE.Float32BufferAttribute([0,1,1,1,1,0,0,0],2));geometry.setIndex([0,1,2,0,2,3]);const material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});const mesh=new THREE.Mesh(geometry,material);mesh.userData.axis=axis;this.scene.add(mesh);this.meshes.push(mesh);}
  this.marker=new THREE.Mesh(new THREE.SphereGeometry(3,12,8),new THREE.MeshBasicMaterial({color:0x73ffdb,depthTest:false}));this.marker.renderOrder=10;this.scene.add(this.marker);
  const size=new THREE.Vector3((meta.width-1)*meta.spacingMm[0],(meta.depth-1)*meta.spacingMm[2],(meta.height-1)*meta.spacingMm[1]);this.frame=new THREE.Box3Helper(new THREE.Box3(size.clone().multiplyScalar(-.5),size.clone().multiplyScalar(.5)),0x526c6a);this.scene.add(this.frame);
  this.controls.minDistance=30;this.controls.maxDistance=3000;this.reset();
  this.observer=new ResizeObserver(()=>this.resize());this.observer.observe(mount);this.resize();
  let start=null;this.renderer.domElement.addEventListener('pointerdown',e=>{start={x:e.clientX,y:e.clientY};});this.renderer.domElement.addEventListener('pointerup',e=>{if(!start||Math.hypot(e.clientX-start.x,e.clientY-start.y)>5)return;const rect=this.renderer.domElement.getBoundingClientRect(),ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2(2*(e.clientX-rect.left)/rect.width-1,1-2*(e.clientY-rect.top)/rect.height),this.camera);const hit=ray.intersectObjects(this.meshes)[0];if(hit){const p=worldToVoxel(hit.point,meta);p.x=Math.max(0,Math.min(meta.width-1,p.x));p.y=Math.max(0,Math.min(meta.height-1,p.y));p.z=Math.max(0,Math.min(meta.depth-1,p.z));onPick(p);}});
 }
 reset(){this.camera.position.set(750,650,800);this.controls.target.set(0,0,0);this.controls.update();this.render();}
 resize(){const w=Math.max(1,this.mount.clientWidth),h=Math.max(1,this.mount.clientHeight);this.renderer.setSize(w,h);this.camera.aspect=w/h;this.camera.updateProjectionMatrix();this.render();}
 update(point,canvases){for(const mesh of this.meshes){const axis=mesh.userData.axis,positions=mesh.geometry.attributes.position;planeCorners(axis,point,this.meta).forEach((v,i)=>positions.setXYZ(i,v.x,v.y,v.z));positions.needsUpdate=true;mesh.geometry.computeBoundingSphere();if(!mesh.material.map){mesh.material.map=new THREE.CanvasTexture(canvases[axis]);mesh.material.map.colorSpace=THREE.SRGBColorSpace;mesh.material.map.minFilter=THREE.LinearFilter;mesh.material.map.generateMipmaps=false;mesh.material.needsUpdate=true;}mesh.material.map.needsUpdate=true;}this.marker.position.copy(voxelToWorld(point,this.meta));this.render();}
 render(){if(!this.disposed)this.renderer.render(this.scene,this.camera);}
 dispose(){this.disposed=true;this.observer.disconnect();this.controls.dispose();this.scene.traverse(o=>{o.geometry?.dispose();o.material?.map?.dispose();o.material?.dispose();});this.renderer.dispose();this.renderer.forceContextLoss();this.renderer.domElement.remove();}
}
