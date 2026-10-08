import {heartDetail} from './heart-detail.js';
import{heartPart,partNames}from'./thorax-data.js';
const facts={
 ra:['Atrium dextrum','Vücuttan dönen kanı alır.','Ana toplardamarlar → sağ kulakçık → triküspit kapak.'],
 rv:['Ventriculus dexter','Kanı akciğer dolaşımına gönderir.','Triküspit kapak → sağ karıncık → pulmoner kapak.'],
 la:['Atrium sinistrum','Akciğerlerden dönen kanı alır.','Pulmoner venler → sol kulakçık → mitral kapak.'],
 lv:['Ventriculus sinister','Kanı sistemik dolaşıma gönderir.','Mitral kapak → sol karıncık → aort kapağı.'],
 tricuspid:['Valva atrioventricularis dextra','Sağ kulakçık ile sağ karıncık arasındaki geri akışı sınırlar.','Sağ atriyoventriküler açıklık.'],
 mitral:['Valva atrioventricularis sinistra','Sol karıncıktan sol kulakçığa geri akışı sınırlar.','Sol atriyoventriküler açıklık.'],
 pulmonary:['Valva trunci pulmonalis','Pulmoner gövdeden sağ karıncığa geri akışı sınırlar.','Sağ karıncık çıkışı.'],
 aortic:['Valva aortae','Aorttan sol karıncığa geri akışı sınırlar.','Sol karıncık çıkışı.'],
 coronary:['Vasa coronaria','Kalp kasının oksijen ve besin gereksinimine hizmet eder.','Koroner arterler aorttan ayrılır; koroner venler kanı sağ kalbe döndürür.'],
 inside:['','Kalbin iç duvar ve destek yapılarıyla ilişkilidir.','Septum odacıkları ayırır; papiller kaslar kapak destek sistemine katılır.']
};
export function cardioTopic(r){const detail=heartDetail(r);if(detail)return detail;const key=heartPart(r),f=facts[key];if(!f)return null;const sub=/leaflet|papillary|septum|branch/i.test(r.name);return{match:r.name.replace(/\.[lr]\.\d+$|\.\d+$/g,'').toLowerCase(),tr:partNames[key]+(sub?' · Alt yapı':''),latin:f[0],group:'Kalp',intro:sub?'Seçili parça bu yapının bir bileşenidir; tüm organı temsil etmez.':'Kalp atlasındaki '+partNames[key].toLocaleLowerCase('tr')+' yapısıdır.',function:f[1],relations:f[2],takeaway:key==='coronary'?'Kalp içindeki dolaşım ile kalp kasının beslenmesi farklı yollardır.':null,url:key==='inside'?'https://www.nhlbi.nih.gov/health/heart/anatomy':'https://www.nhlbi.nih.gov/health/heart/blood-flow',sourceLabel:'NIH / NHLBI · Kalbin yapısı ve dolaşım',refs:[]};}
