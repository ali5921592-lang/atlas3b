import {cleanName} from './content.js';

// Curated, named organ-level relationships. These represent continuity or
// established vascular/duct connections, not spatial proximity inferred from
// mesh coordinates. Matches stay within the selected sex reference.
const groups=[
 {match:/stomach|gastric mucosa/i,targets:[[/oesophagus|esophagus/i,'upstream'],[/duodenum/i,'downstream'],[/left gastric artery/i,'artery'],[/hepatic portal vein/i,'vein']]},
 {match:/liver|hepatic lobe|hepatic segment/i,targets:[[/hepatic portal vein/i,'vein'],[/proper hepatic artery|common hepatic artery/i,'artery'],[/hepatic veins?/i,'vein'],[/gallbladder/i,'neighbor']]},
 {match:/gallbladder/i,targets:[[/liver/i,'neighbor'],[/cystic duct|common bile duct|bile duct/i,'downstream']]},
 {match:/pancreas|pancreatic/i,targets:[[/duodenum/i,'neighbor'],[/pancreatic duct/i,'downstream'],[/pancreaticoduodenal artery/i,'artery'],[/splenic artery/i,'artery']]},
 {match:/kidney|renal pelvis|renal cortex|renal hilum/i,targets:[[/^(right|left) renal artery\b|^renal artery\b/i,'artery'],[/^(right|left) renal vein\b|^renal vein\b/i,'vein'],[/renal pelvis/i,'downstream'],[/ureter/i,'downstream']]},
 {match:/lung|pulmonary lobe|bronchus|bronchial/i,targets:[[/main bronchus|lobar bronchus/i,'downstream'],[/pulmonary artery/i,'artery'],[/pulmonary veins?/i,'vein'],[/diaphragm/i,'neighbor']]},
 {match:/trachea|carina/i,targets:[[/larynx/i,'upstream'],[/right main bronchus|left main bronchus/i,'downstream']]},
 {match:/urinary bladder|bladder|ureteral orifice/i,targets:[[/ureter/i,'upstream'],[/urethra/i,'downstream']]},
 {match:/ureter|renal pelvis/i,targets:[[/kidney|renal pelvis/i,'upstream'],[/urinary bladder|bladder/i,'downstream']]},
 {match:/uterus|uterine cervix/i,targets:[[/uterine tube/i,'neighbor'],[/uterine cervix|vagina/i,'downstream'],[/broad ligament of uterus|round ligament of uterus/i,'neighbor'],[/uterine artery/i,'artery']]},
 {match:/ovary|ovarian/i,targets:[[/uterine tube/i,'neighbor'],[/ovarian ligament/i,'neighbor'],[/ovarian artery|ovarian vein/i,'artery']]},
 {match:/testis|epididymis|ductus deferens|seminal gland/i,targets:[[/epididymis/i,'downstream'],[/ductus deferens/i,'downstream'],[/testicular artery|testicular vein/i,'artery']]},
 {match:/oesophagus|esophagus/i,targets:[[/pharynx/i,'upstream'],[/stomach/i,'downstream']]},
 {match:/duodenum|jejunum|ileum/i,targets:[[/stomach/i,'upstream'],[/small intestine|jejunum|ileum|colon/i,'downstream'],[/pancreas/i,'neighbor']]},
 {match:/colon|rectum|sigmoid/i,targets:[[/ileum|small intestine/i,'upstream'],[/rectum|sigmoid colon|anal canal/i,'downstream']]}
];
function side(name){const n=String(name).toLowerCase();return /\bright\b|\.r\./.test(n)?'right':/\bleft\b|\.l\./.test(n)?'left':null;}
export function resolveOrganLinks(r,records){
 if(!['visceral','surface'].includes(r.layer))return null;
 const name=cleanName(r.name),group=groups.find(g=>g.match.test(name));if(!group)return null;
 const originSide=side(r.name),rows=[],seen=new Set();
 for(const [pattern,role] of group.targets){
  const candidates=records.filter(x=>x.id!==r.id&&x.layer!=='surface'&&pattern.test(cleanName(x.name)));
  const sided=candidates.filter(x=>!originSide||!side(x.name)||side(x.name)===originSide);
  // Keep the relationship map concise while still showing distinct bilateral
  // branches when the source model represents them as separate structures.
  for(const record of sided.slice(0,4))if(!seen.has(record.id)){seen.add(record.id);rows.push({record,role});}
 }
 if(!rows.length)return null;
 const url=/lung|bronchus|trachea|carina/i.test(name)?'https://www.ncbi.nlm.nih.gov/books/NBK470197/':/stomach|oesophagus|esophagus|duodenum|gallbladder|liver|pancreas/i.test(name)?(/stomach|oesophagus|esophagus/i.test(name)?'https://purl.obolibrary.org/obo/UBERON_0001062':'https://purl.obolibrary.org/obo/UBERON_0001062'):/kidney|renal|ureter|bladder|urethra/i.test(name)?'https://purl.obolibrary.org/obo/UBERON_0001062':/uterus|ovary|uterine|vagina|testis|epididymis|deferens|seminal/i.test(name)?'https://purl.obolibrary.org/obo/UBERON_0001062':'https://purl.obolibrary.org/obo/UBERON_0001062';
 return{organ:true,rows,missing:[],site:name,note:'Bu harita, kaynak modelde bulunabilen adlandırılmış organ devamlılıklarını ve temel damar / kanal ilişkilerini gösterir. Her küçük dal, lenfatik ağ, sinir pleksusu veya kişisel varyasyon modele dahil değildir.',url};
}
