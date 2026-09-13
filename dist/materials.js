import * as THREE from 'three';

// Display materials only: these do not add anatomical structures or measured histology.
const palettes={
  bone:{color:'#d9ccb2',roughness:.68,coat:0,grain:0},
  muscle:{color:'#9e4947',roughness:.49,coat:.09,grain:1},
  tendon:{color:'#e2dbc4',roughness:.4,coat:.15,grain:1},
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
};
export function tissueFor(name,layer){const n=name.toLowerCase();
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
export const materialState={detail:{value:.65}};
export function createTissueMaterial(record,geometry){const kind=tissueFor(record.name,record.layer),p=palettes[kind];
  geometry.computeBoundingBox();const size=geometry.boundingBox.getSize(new THREE.Vector3());
  const axis=size.x>size.y&&size.x>size.z?new THREE.Vector3(1,0,0):size.z>size.y?new THREE.Vector3(0,0,1):new THREE.Vector3(0,1,0);
  const m=new THREE.MeshPhysicalMaterial({color:p.color,roughness:p.roughness,metalness:0,clearcoat:p.coat,clearcoatRoughness:.55,side:THREE.DoubleSide});
  m.userData.tissue=kind;m.userData.naturalColor=new THREE.Color(p.color);
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
      vec3 crossP=tissueP-uFiberAxis*dot(tissueP,uFiberAxis)*.965;
      float fiber=tissueNoise(crossP*8.);
      float appearance=mix(mottling,fiber,uFiberWeight*.65);
      diffuseColor.rgb*=1.+(appearance-.5)*.29*uTissueDetail;
    `);
    shader.fragmentShader=shader.fragmentShader.replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\nroughnessFactor = clamp(roughnessFactor + (appearance-.5)*.15*uTissueDetail,.22,.85);');
  };
  m.customProgramCacheKey=()=>`anatomy-tissue-v2`;
  return m;
}
export function applyPalette(material,mode){const kind=material.userData.tissue;material.color.copy(material.userData.naturalColor);if(mode==='atlas'){if(kind==='vein')material.color.set('#426f98');else if(kind==='artery')material.color.set('#b93840');else if(kind==='nerve')material.color.set('#d6b65f');}}
