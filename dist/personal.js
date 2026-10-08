// Stable model names survive catalog re-indexing. Mutations commit atomically.
export const recordKey=r=>(r.sex||'male')+':'+(r.original||r.name);
const safeKey=k=>typeof k==='string'&&/^(male|female):/.test(k)&&k.length<500;
function cleanData(raw,strict=false){
 if(!raw||typeof raw!=='object'||Array.isArray(raw))throw Error('Kayıt biçimi okunamadı.');
 if(strict&&(!Array.isArray(raw.favorites)||!raw.notes||typeof raw.notes!=='object'||Array.isArray(raw.notes)))throw Error('Yedek alanları eksik veya geçersiz.');
 const favorites=[...new Set((Array.isArray(raw.favorites)?raw.favorites:[]).filter(safeKey))];
 const notes=Object.fromEntries(Object.entries(raw.notes&&typeof raw.notes==='object'&&!Array.isArray(raw.notes)?raw.notes:{}).filter(([k,v])=>safeKey(k)&&typeof v==='string'&&v.length<=4000));
 if(strict&&(favorites.length>10000||Object.keys(notes).length>10000))throw Error('Yedek çok büyük.');
 return{favorites,notes,view:validView(raw.view)?structuredClone(raw.view):null};
}
export function validView(v){return !!(v&&v.version===1&&['male','female'].includes(v.sex)&&Array.isArray(v.layers)&&v.layers.every(x=>typeof x==='string')&&['camera','target'].every(k=>Array.isArray(v[k])&&v[k].length===3&&v[k].every(n=>Number.isFinite(n)&&Math.abs(n)<30))&&Array.isArray(v.hidden)&&v.hidden.every(x=>typeof x==='string')&&v.cut&&typeof v.cut==='object'&&!Array.isArray(v.cut));}
export function parseStudyBackup(text){
 if(typeof text!=='string'||text.length>2_000_000)throw Error('Yedek en fazla 2 MB olabilir.');
 let raw;try{raw=JSON.parse(text);}catch{throw Error('Geçerli bir JSON yedeği gir.');}
 if(raw?.format!=='anatomy-study-backup'||raw.version!==1)throw Error('Bu dosya desteklenen bir Anatomi Atlas yedeği değil.');
 return cleanData(raw.study,true);
}
export function studyStore(storage){
 const key='anatomy-study-v1';let data={favorites:[],notes:{},view:null};
 try{const raw=JSON.parse(storage.getItem(key)||'null');if(raw)data=cleanData(raw);}catch{}
 const commit=next=>{storage.setItem(key,JSON.stringify(next));data=next;};
 return{
  has:r=>data.favorites.includes(recordKey(r)),note:r=>data.notes[recordKey(r)]||'',favorites:records=>records.filter(r=>data.favorites.includes(recordKey(r))),
  toggle(r){const k=recordKey(r),favorites=data.favorites.includes(k)?data.favorites.filter(x=>x!==k):[...data.favorites,k];commit({...data,favorites});return data.favorites.includes(k);},
  setNote(r,value){if(typeof value!=='string'||value.length>4000)throw Error('Not en fazla 4.000 karakter olabilir.');const k=recordKey(r),notes={...data.notes};if(value.trim())notes[k]=value;else delete notes[k];commit({...data,notes});},
  saveView(view){if(!validView(view))throw Error('Görünüm kaydı geçersiz.');commit({...data,view:structuredClone(view)});},getView:()=>data.view?structuredClone(data.view):null,
  exportBackup(){return JSON.stringify({format:'anatomy-study-backup',version:1,createdAt:new Date().toISOString(),study:data},null,2);},
  mergeBackup(text){const incoming=parseStudyBackup(text),notes={...incoming.notes,...data.notes};let conflicts=0;for(const k of Object.keys(incoming.notes))if(data.notes[k]!==undefined&&data.notes[k]!==incoming.notes[k])conflicts++;commit({favorites:[...new Set([...data.favorites,...incoming.favorites])],notes,view:data.view||incoming.view});return{favorites:incoming.favorites.length,notes:Object.keys(incoming.notes).length,conflicts};}
 };
}
