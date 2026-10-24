/** Source frames must never be overlaid without validated registration. */
const maleSpecific=/penis|penile|prostat|testic|spermat|scrot|deferens|seminal|cremaster|bulbospongios|ischiocavernos/i;
const pelvicFloor=/coccygeus|iliococcygeus|pubo.?analis|pubococcygeus|levator ani|perineal membrane/i;
const supportTissue=/tendon|ligament|retinacul|fascia(?!e)|aponeurosis|bursa|intermuscular septum|iliotibial tract|linea alba|iliopectineal arch|tarsus|trochlea of/i;
const aliases=new Map([
 ['cardiac atrium','atrium'],['heart ventricle','ventricle'],
 ['great vein of heart','great cardiac vein'],['aortic arch','arch of aorta'],
 ['circumflex branch of coronary artery','circumflex artery of heart'],
 ['anterior descending branch of pulmonary artery','anterior interventricular artery'],
 ['hepatic artery proper','proper hepatic artery'],['hepatic vein','hepatic vein'],
 ['biceps femoris long head','long head of biceps femoris'],['biceps femoris short head','short head of biceps femoris'],
 ['gastrocnemius medial','medial head of gastrocnemius'],['gastrocnemius lateral','lateral head of gastrocnemius'],
 ['fused sacrum','sacrum'],['epiglotic cartilage','epiglottic cartilage']
]);
export function anatomyKey(record){
 const raw=record.name.toLowerCase(),match=/\.([lr])\./.exec(raw);
 let side=match?.[1]||(/\bleft\b/.test(raw)?'l':/\bright\b/.test(raw)?'r':'');
 let name=raw.replace(/\.[lr]\.\d+$/,'').replace(/\.\d+$/,'').replace(/\b(left|right)\b/g,'').replace(/\bmuscles?\b/g,'').replace(/\bperoneus\b/g,'fibularis').replace(/\bplus branches\b/g,'').replace(/[()]/g,'').replace(/\s+/g,' ').trim();
 name=aliases.get(name)||name;
 // These coronary structures have a unique position; an explicit L in HRA
 // denotes coronary origin, not an independently paired body structure.
 if(/^(anterior interventricular artery|circumflex artery of heart|arch of aorta)$/.test(name))side='';
 return name+'|'+side;
}
export function femaleSharedRecords(generalRecords){
 // This is a separate, internally consistent reference frame, never an HRA
 // overlay. Retain the entire source skeleton so joints and muscles agree.
 return generalRecords.filter(r=>!maleSpecific.test(r.name)&&!pelvicFloor.test(r.name)).map(r=>({...r,id:'female-shared:'+r.id,sex:'female',sharedReference:true,sourceSex:'male',sourceLayer:r.layer,sourceRecordId:r.id,layer:supportTissue.test(r.name)?'tendons':r.layer}));
}
export const femaleFrames=['native','general','muscles'];
export function referenceFrame(r){return r.sharedReference?'general':r.file==='female-muscles'?'muscles':'native';}
export function inReference(r,sex,frame='native'){return(r.sex||'male')===sex&&(sex!=='female'||referenceFrame(r)===frame);}
export function referenceRecords(records,sex,frame='native'){return records.filter(r=>inReference(r,sex,frame));}
const frameLabels={tr:['Kadın referansı · HRA','Ortak anatomi · ayrı model','Kadın bacak kasları · ayrı kaynak'],en:['Female reference · HRA','General anatomy · separate model','Female leg muscles · separate source'],de:['Weibliche Referenz · HRA','Allgemeine Anatomie · separates Modell','Weibliche Beinmuskeln · separate Quelle'],es:['Referencia femenina · HRA','Anatomía general · modelo separado','Músculos femeninos de las piernas · fuente separada'],ar:['المرجع الأنثوي · HRA','تشريح عام · نموذج منفصل','عضلات الساق الأنثوية · مصدر منفصل']};
export function referenceLabel(frame,lang='en'){return(frameLabels[lang]||frameLabels.en)[Math.max(0,femaleFrames.indexOf(frame))];}
export function layerFiles(records,sex,layer){
 return [...new Set(records.filter(r=>(r.sex||'male')===sex&&r.layer===layer).map(r=>r.file))];
}
const noticeText={
 tr:['Ortak atlas referansı','Bu yapı genel Z-Anatomy / BodyParts3D atlasından eklenmiştir. Kadın donör geometrisi değildir; HRA kadın gövdesiyle ölçümsel uyumu doğrulanmamıştır.'],
 en:['Shared atlas reference','This structure is added from the general Z-Anatomy / BodyParts3D atlas. It is not female-donor geometry; quantitative alignment with the HRA female body has not been validated.'],
 de:['Allgemeine Atlasreferenz','Diese Struktur stammt aus dem allgemeinen Atlas Z-Anatomy / BodyParts3D. Sie stammt nicht von einer weiblichen Spenderin; die geometrische Übereinstimmung mit dem weiblichen HRA-Körper wurde nicht validiert.'],
 es:['Referencia anatómica general','Esta estructura procede del atlas general Z-Anatomy / BodyParts3D. No corresponde a una donante femenina; no se ha validado su alineación geométrica con el cuerpo femenino de HRA.'],
 ar:['مرجع تشريحي عام','أُضيفت هذه البنية من أطلس Z-Anatomy / BodyParts3D العام. وهي ليست نموذجًا لمتبرعة أنثى، ولم يُتحقق من تطابقها الهندسي مع جسم الأنثى في HRA.']
};
export function sharedReferenceNotice(lang='en'){const [title,body]=noticeText[lang]||noticeText.en;return{title,body};}
export function femaleReferenceSummary(records,lang='en',frame='native'){
 const rows=referenceRecords(records,'female',frame),n=rows.length.toLocaleString(lang==='tr'?'tr-TR':lang);
 const messages={tr:{native:'Bu kaynak kadın donöre ait seçili yapıları içerir. Tam vücut kas ve iskelet atlası değildir. Farklı kaynaklar bu gövdeye eklenmez.',general:'Aynı Z-Anatomy kaynak gövdesinin kemik, kas, damar ve sinirleri birlikte gösterilir. Bu görünüm kadın donöre ait değildir; HRA ile birleştirilmez.',muscles:'76 kadın alt ekstremite kasının yaklaşık uyarlanmış yerleşimidir. Diğer kaynakların kemikleriyle üst üste gösterilmez; ölçüm için kullanılamaz.'},en:{native:'Selected structures from a female donor. This is not a complete whole-body musculoskeletal atlas. Other sources are not overlaid.',general:'Bones, muscles, vessels and nerves from the same Z-Anatomy source body. This is not female-donor geometry and is not combined with HRA.',muscles:'76 female lower-limb muscles with approximate adapted placement. Other sources are not overlaid; not for measurement.'},de:{native:'Ausgewählte Strukturen einer weiblichen Spenderin. Kein vollständiger Ganzkörper-Muskel-Skelett-Atlas. Andere Quellen werden nicht überlagert.',general:'Knochen, Muskeln, Gefäße und Nerven desselben Z-Anatomy-Quellmodells. Kein weibliches Spendermodell; keine Kombination mit HRA.',muscles:'76 weibliche Beinmuskeln mit annähernd angepasster Lage. Keine Überlagerung anderer Quellen; nicht für Messungen.'},es:{native:'Estructuras seleccionadas de una donante femenina. No es un atlas musculoesquelético completo. No se superponen otras fuentes.',general:'Huesos, músculos, vasos y nervios del mismo modelo de Z-Anatomy. No corresponde a una donante femenina ni se combina con HRA.',muscles:'76 músculos femeninos de las extremidades inferiores con colocación aproximada. Sin superposición de otras fuentes; no apto para mediciones.'},ar:{native:'بنى مختارة من متبرعة أنثى. ليس أطلسًا عضليًا هيكليًا كاملًا للجسم. لا تُدمج معه مصادر أخرى.',general:'عظام وعضلات وأوعية وأعصاب من نموذج Z-Anatomy نفسه. ليس نموذجًا لمتبرعة أنثى ولا يُدمج مع HRA.',muscles:'76 عضلة أنثوية للطرف السفلي بمواضع تقريبية معدّلة. لا تُضاف عظام من مصادر أخرى ولا يُستخدم للقياس.'}};
 return referenceLabel(frame,lang)+' · '+n+' · '+(messages[lang]||messages.en)[frame];
}
