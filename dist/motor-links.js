import {muscleStudy}from'./muscle-study.js';
const targets={
 'Aksiller sinir':['Axillary nerve'],'Dorsal skapular sinir':['Dorsal scapular nerve'],'Torakodorsal sinir':['Thoracodorsal nerve'],'Medial pektoral sinir':['Medial pectoral nerve'],'Uzun torasik sinir':['Long thoracic nerve'],'Supraskapular sinir':['Suprascapular nerve'],
 'Muskulokütan sinir':['Musculocutaneous nerve'],'Başlıca muskulokütan sinir':['Musculocutaneous nerve'],'Radial sinir':['Radial nerve'],'Median sinir':['Median nerve'],'Median sinirin anterior interosseöz dalı':['Anterior interosseous nerve'],'Radial sinirin derin dalı':['Deep branch of radial nerve'],
 'Superior gluteal sinir':['Superior gluteal nerve'],'İnferior gluteal sinir':['Inferior gluteal nerve'],'Femoral sinir':['Femoral nerve'],'Obturator sinir':['Obturator nerve'],'Derin fibular sinir':['Deep fibular nerve','Deep peroneal nerve'],'Yüzeyel fibular sinir':['Superficial fibular nerve','Superficial peroneal nerve'],'Tibial sinir':['Tibial nerve'],
 'Siyatik sinirin tibial bölümü':['Sciatic nerve'],'Siyatik sinirin ortak fibular bölümü':['Sciatic nerve'],'Obturator sinir ve siyatik sinirin tibial bölümü':['Obturator nerve','Sciatic nerve']
};
const clean=s=>s.toLowerCase().replace(/\.[lr]\.\d+$|\.\d+$/g,'').trim();
const mappedNerves=new Set(Object.values(targets).flat().map(clean));
export function resolveMotorConnections(r,records){
 const study=muscleStudy(r),names=study&&targets[study.nerve],side=/\.([lr])\./i.exec(r.name)?.[1];if(!study||!names||!side)return null;
 const rows=records.filter(x=>(x.sex||'male')===(r.sex||'male')&&x.layer==='nervous'&&/\.([lr])\./i.exec(x.name)?.[1]===side&&names.some(n=>clean(x.name)===clean(n))).map(record=>({record,role:'nerve'}));
 return{motorOnly:true,rows,missing:rows.length?[]:[{name:study.nerve,role:'nerve'}],site:'Başlangıç: '+study.origin+'. Tutunma: '+study.insertion+'.',note:'Motor bağlantısı: '+study.nerve+'. Bu görünümde besleyici damar ve kemik tutunma yüzeyleri henüz eşleştirilmedi.'+(study.nerve.includes('Siyatik')||study.nerve.includes('siyatik')?' Modelde siyatik sinirin bütün gövdesi gösterilir; belirtilen lif bölümü ayrı bir mesh değildir.':''),url:study.source};
}

export function resolveNerveTargets(r,records){
 if(r.layer!=='nervous'||!mappedNerves.has(clean(r.name)))return null;const rows=[],sources=new Set;for(const muscle of records){if(muscle.layer!=='muscular')continue;const info=resolveMotorConnections(muscle,records);if(info?.rows.some(x=>x.record.id===r.id)){rows.push({record:muscle,role:'muscle'});sources.add(info.url);}}
 return rows.length?{motorOnly:true,motorReverse:true,rows,missing:[],site:'Bu modelde eşleştirilmiş kas hedefleri',note:'Yalnızca kaynakla eşleştirilen ve seçili referansta bulunan kaslar listelenir. Bu liste sinirin bütün motor hedeflerini veya duyu alanını temsil etmez. Siyatik sinir için ilgili lif bölümleri kas kartlarında belirtilir.',url:[...sources][0]}:null;
}
