import * as THREE from 'three';

// Display materials only: these do not add anatomical structures or measured histology.
const palettes={
  bone:{color:'#e2d6c1',roughness:.68,coat:0,grain:0},
  muscle:{color:'#ad5b50',roughness:.54,coat:.06,grain:1},
  tendon:{color:'#e9dfca',roughness:.47,coat:.08,grain:1},
  cartilage:{color:'#cfdbd2',roughness:.32,coat:.22,grain:0},
  fascia:{color:'#d2c6b5',roughness:.48,coat:.12,grain:.4},
  artery:{color:'#9b3e40',roughness:.4,coat:.18,grain:0},
  vein:{color:'#68505c',roughness:.42,coat:.18,grain:0},
  nerve:{color:'#dfd4ab',roughness:.5,coat:.06,grain:.6},
  brain:{color:'#c7aaa0',roughness:.58,coat:.1,grain:0},
  heart:{color:'#88453f',roughness:.39,coat:.22,grain:.55},
  lung:{color:'#b78e90',roughness:.62,coat:.08,grain:0},
  liver:{color:'#743c38',roughness:.34,coat:.26,grain:0},
  kidney:{color:'#914c45',roughness:.4,coat:.24,grain:0},
  pancreas:{color:'#c5a08b',roughness:.57,coat:.1,grain:0},
  gallbladder:{color:'#889174',roughness:.38,coat:.23,grain:0},
  spleen:{color:'#76505c',roughness:.43,coat:.2,grain:0},
  bowel:{color:'#c29b91',roughness:.43,coat:.2,grain:0},
  sclera:{color:'#e1ddd0',roughness:.3,coat:.3,grain:0},
  iris:{color:'#756449',roughness:.36,coat:.25,grain:0},
  organ:{color:'#bd9684',roughness:.46,coat:.16,grain:0},
  skin:{color:'#c5a08b',roughness:.61,coat:.04,grain:0},
  fat:{color:'#d0bd85',roughness:.66,coat:.03,grain:0},
};
export function tissueFor(name,layer){const n=name.toLowerCase();
  if(/bronchopulmonary segment/.test(n))return'lung';
  if(/adipose|fat/.test(n))return'fat';if(/mammary|breast/.test(n)&&!/ligament/.test(n))return'organ';if(n.includes('tensor fasciae')&&layer==='muscular')return'muscle';
  if(layer==='surface')return /adipose|fat/.test(n)?'fat':'skin';
  if(/cartilage|meniscus|intervertebral disc/.test(n))return'cartilage';
  if(/fascia|aponeurosis|retinaculum|sheath|bursa|peritoneum|pleura|leaflet|valve|chordae/.test(n))return'fascia';
  if(/tendon|tendinous|ligament/.test(n))return'tendon';
  if(layer==='skeleton')return'bone';
  if(layer==='muscular')return'muscle';
  if(layer==='tendons')return'tendon';
  if(layer==='cardiovascular')return/\bveins?\b|venous|vena|sinus/.test(n)?'vein':/arter|aort|arterial|trunk|striate branch|palmar arch|plantar arch|anastomosis/.test(n)?'artery':'heart';
  if(layer==='nervous'){if(/sclera|cornea|lens/.test(n))return'sclera';if(/\biris\b/.test(n))return'iris';return/nerve|tract|chiasm|plexus|gangli|root/.test(n)?'nerve':'brain';}
  for(const kind of ['lung','liver','kidney','pancreas','gallbladder','spleen'])if(n.includes(kind))return kind;
  if(/stomach|colon|intestin|jejun|ileum|duoden|rectum|cecum|oesophagus|esophagus/.test(n))return'bowel';
  return'organ';
}
export const materialState={detail:{value:.85}};
// Shape-derived direction is a display approximation, not measured muscle architecture.
export function fiberAxis(geometry){
 geometry.computeBoundingBox();const size=geometry.boundingBox.getSize(new THREE.Vector3()),axis=size.x>size.y&&size.x>size.z?new THREE.Vector3(1,0,0):size.z>size.y?new THREE.Vector3(0,0,1):new THREE.Vector3(0,1,0),position=geometry.attributes.position;
 const mean=new THREE.Vector3(),p=new THREE.Vector3(),step=Math.max(1,Math.floor(position.count/512));let count=0;for(let i=0;i<position.count;i+=step){mean.add(p.fromBufferAttribute(position,i));count++;}mean.divideScalar(count||1);
 const c=new Array(9).fill(0);for(let i=0;i<position.count;i+=step){p.fromBufferAttribute(position,i).sub(mean);const a=[p.x,p.y,p.z];for(let r=0;r<3;r++)for(let k=0;k<3;k++)c[r*3+k]+=a[r]*a[k];}
 for(let i=0;i<10;i++){p.set(c[0]*axis.x+c[1]*axis.y+c[2]*axis.z,c[3]*axis.x+c[4]*axis.y+c[5]*axis.z,c[6]*axis.x+c[7]*axis.y+c[8]*axis.z);if(p.lengthSq()<1e-20)break;axis.copy(p.normalize());}return axis;
}
export function createTissueMaterial(record,geometry){const kind=tissueFor(record.name,record.layer),p=palettes[kind];
  const axis=fiberAxis(geometry);
  const m=new THREE.MeshPhysicalMaterial({color:p.color,roughness:p.roughness,metalness:0,clearcoat:p.coat,clearcoatRoughness:.55,side:THREE.DoubleSide});
  m.userData.tissue=kind;m.userData.naturalColor=new THREE.Color(p.color);m.userData.fiberAxis=axis;
  m.onBeforeCompile=shader=>{shader.uniforms.uTissueDetail=materialState.detail;shader.uniforms.uFiberAxis={value:axis};shader.uniforms.uFiberWeight={value:p.grain};
    shader.vertexShader='varying vec3 vTissuePosition;\n'+shader.vertexShader;
    shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvTissuePosition = position;');
    shader.fragmentShader=`uniform float uTissueDetail;uniform vec3 uFiberAxis;uniform float uFiberWeight;varying vec3 vTissuePosition;
      float tissueHash(vec3 p){p=fract(p*.1031);p+=dot(p,p.yzx+33.33);return fract((p.x+p.y)*p.z);}
      float tissueNoise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(tissueHash(i),tissueHash(i+vec3(1,0,0)),f.x),mix(tissueHash(i+vec3(0,1,0)),tissueHash(i+vec3(1,1,0)),f.x),f.y),mix(mix(tissueHash(i+vec3(0,0,1)),tissueHash(i+vec3(1,0,1)),f.x),mix(tissueHash(i+vec3(0,1,1)),tissueHash(i+vec3(1,1,1)),f.x),f.y),f.z);}
      `+shader.fragmentShader;
    shader.fragmentShader=shader.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
      vec3 tissueP=vTissuePosition*175.;
      float mottling=tissueNoise(tissueP)*.65+tissueNoise(tissueP*2.7)*.35;
      vec3 crossP=tissueP-uFiberAxis*dot(tissueP,uFiberAxis)*.993;
      float fiber=tissueNoise(crossP*8.);
      float appearance=mix(mottling,fiber,uFiberWeight*.85);
      float phase=dot(crossP,vec3(6.1,7.3,5.2))+tissueNoise(crossP*.8)*2.;
      float bundles=.5+.5*sin(phase)*(1.-smoothstep(.6,2.8,fwidth(phase)));
      appearance=mix(appearance,bundles,uFiberWeight*.40);
      float broad=tissueNoise(vTissuePosition*38.);
      diffuseColor.rgb*=1.+((appearance-.5)*.50+(broad-.5)*.13)*uTissueDetail;
    `);
    shader.fragmentShader=shader.fragmentShader.replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\nroughnessFactor = clamp(roughnessFactor + (appearance-.5)*.15*uTissueDetail,.22,.85);');
  };
  m.onBeforeCompileOriginal=m.onBeforeCompile;
  m.onBeforeCompile=shader=>{m.onBeforeCompileOriginal(shader);shader.fragmentShader=shader.fragmentShader.replace('#include <normal_fragment_maps>',`#include <normal_fragment_maps>
    vec3 tissueDx=normalize(dFdx(-vViewPosition)),tissueDy=normalize(dFdy(-vViewPosition));
    vec3 tissueR1=cross(tissueDy,normal),tissueR2=cross(normal,tissueDx);
    float tissueDet=dot(tissueDx,tissueR1)*faceDirection;
    vec2 tissueSlope=vec2(dFdx(appearance),dFdy(appearance))*.085*uTissueDetail;
    if(abs(tissueDet)>.00001)normal=normalize(abs(tissueDet)*normal-sign(tissueDet)*(tissueSlope.x*tissueR1+tissueSlope.y*tissueR2));
  `);};
  m.customProgramCacheKey=()=>`anatomy-tissue-v12`;
  return m;
}
export function applyPalette(material,mode){const kind=material.userData.tissue;material.color.copy(material.userData.naturalColor);if(mode==='atlas'){if(kind==='vein')material.color.set('#426f98');else if(kind==='artery')material.color.set('#b93840');else if(kind==='nerve')material.color.set('#d6b65f');}}
