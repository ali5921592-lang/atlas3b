import {muscleStudy} from './muscle-study.js';
import {nerveStudy} from './nerve-study.js';
import {studyKind,clinicalProfile} from './clinical-study.js';
import {regionalStudy} from './regional-study.js';
import {sensoryStudy} from './sensory-study.js';
import {topicFor,isExactTopic,cleanName} from './content.js';
import {structureCard} from './structure-cards.js';
import {cardioTopic} from './cardio-content.js';
import {organCard} from './organ-cards.js';
import {heartPart} from './thorax-data.js';
const book='https://openstax.org/books/anatomy-and-physiology-2e/pages/';
const general={
 bone:['Kemik dokusu','Destek, korunma ve hareket için kaldıraç görevi görür.','Eklem yüzeylerini ve kas tutunma bölgelerini birlikte incele.','6-1-the-functions-of-the-skeletal-system'],
 cartilage:['Kıkırdak dokusu','Bulunduğu yere göre esnek destek sağlar veya eklem yüzeylerindeki sürtünmeyi azaltır.','Kıkırdak türü ve görevi konuma göre değişir.','4-3-connective-tissue-supports-and-protects'],
 tooth:['Diş yapısı','Besinlerin mekanik işlenmesine katılır.','Mine, dentin ve pulpa aynı doku değildir.','23-3-the-mouth-pharynx-and-esophagus'],
 tendon:['Tendon / aponevroz','Kasın ürettiği kuvvetin tutunma yerine iletilmesine katılır.','Başlangıç ve tutunma noktaları her kas için farklıdır.','10-2-skeletal-muscle'],
 ligament:['Bağ dokusu yapısı','Birçok bağ, kemikleri birleştirip eklem hareketini sınırlar. Organ bağları farklı ilişkiler taşıyabilir.','Tam görevi için adlandırılan bağın konumu dikkate alınmalıdır.','4-3-connective-tissue-supports-and-protects'],
 artery:['Atardamar','Kanı kalpten uzaklaştırır. Taşınan kanın oksijen düzeyi dolaşım bölgesine bağlıdır.','Başlangıç, dallar ve beslenen bölge aynı kavram değildir.','20-1-structure-and-function-of-blood-vessels'],
 vein:['Toplardamar','Kanı kalbe doğru geri taşır; tüm toplardamarlar aynı oksijen içeriğine sahip değildir.','Yüzeyel ve derin venlerin bağlantılarını ayırt et.','20-1-structure-and-function-of-blood-vessels'],
 nerve:['Periferik sinir','Duyusal, motor veya otonom lifler taşıyabilir; her sinirde aynı lif dağılımı bulunmaz.','Bir sinirin seyri ile uyardığı kas ve duyu alanı ayrı incelenir.','13-4-the-peripheral-nervous-system'],
 nervous:['Sinir sistemi yapısı','Sinir sistemi duyusal bilgiyi işler, hareketi ve iç organların düzenlenmesini koordine eder.','Kıvrım, oluk, çekirdek ve lif demeti farklı anatomik yapı türleridir.','12-1-basic-structure-and-function-of-the-nervous-system'],
 muscular:['Kas dokusu','Kasılma yoluyla hareket, duruş ve eklem kontrolüne katılır.','Kasın işlevi seyri, geçtiği eklemler ve tutunma yerleriyle birlikte değerlendirilir.','10-2-skeletal-muscle'],
 surface:['Vücut yüzeyi','Deri dış ortamla sınır oluşturur; korunma, duyu ve sıcaklık düzenlenmesine katılır.','Görünen yüzey, deri tabakalarının tümünü ayrı ayrı göstermez.','5-1-layers-of-the-skin'],
 visceral:['İç organlar katmanı','Bu katmanda farklı görevleri olan organ, kanal ve destek yapıları birlikte bulunur.','Seçili adın organı mı, organ bölümünü mü yoksa bir kanalı mı belirttiğini karşılaştır.','1-2-structural-organization-of-the-human-body'],
 cardiovascular:['Dolaşım sistemi yapısı','Kalp ve damarlar kanın taşınmasını sağlar; her alt yapının rolü farklıdır.','Bir kapak, damar veya duvar parçasını aynı işlevle değerlendirme.','19-1-heart-anatomy']
};
export function generalCard(r){const n=r.name.toLowerCase();let kind=r.layer;
 if(/tooth|incisor|canine|premolar|molar/.test(n)&&r.layer==='skeleton')kind='tooth';else if(/cartilage|meniscus/.test(n))kind='cartilage';else if(/ligament/.test(n))kind='ligament';else if(/tendon|aponeuro/.test(n)||r.layer==='tendons')kind='tendon';else if(r.layer==='skeleton')kind='bone';else if(r.layer==='cardiovascular'&&/artery|arteries|aorta/.test(n))kind='artery';else if(r.layer==='cardiovascular'&&/vein|vena/.test(n))kind='vein';else if(r.layer==='nervous'&&/nerve/.test(n))kind='nerve';
 const typed=studyKind(r);if(['bursa','serous','fat','heart','eye','ganglion'].includes(typed)){const p=clinicalProfile(r);return{match:cleanName(r.name).toLowerCase(),tr:cleanName(r.name),intro:'Seçili kaydın türü: '+p.title+'. Açıklama doku / yapı grubu düzeyindedir.',function:p.normal,relations:p.relations||p.check,url:p.refs[0].url,sourceLabel:'Kaynaklı yapı türü bilgisi',scope:p.scope==='specific'?'specific':'general'};}const item=general[kind]||general.visceral;
 return{match:cleanName(r.name).toLowerCase(),tr:item[0],intro:'Seçili kayıt: '+cleanName(r.name)+'. Aşağıdaki açıklama '+item[0].toLocaleLowerCase('tr')+' için genel bilgidir.',function:item[1],relations:item[2],url:book+item[3],sourceLabel:'OpenStax · Doku / sistem bilgisi',scope:'general'};
}
export function explanationFor(r){let base=topicFor(r.name);if(base?.match==='coronary'&&!heartPart(r))base=null;const motor=muscleStudy(r),nerve=nerveStudy(r),regional=regionalStudy(r)||sensoryStudy(r);const specific=organCard(r)||structureCard(r)||cardioTopic(r)||(motor?{tr:cleanName(r.name),intro:'Başlangıç: '+motor.origin+'. Tutunma: '+motor.insertion+'.',function:motor.normal,relations:'Motor sinir: '+motor.nerve+'.',url:motor.source}:nerve?{tr:cleanName(r.name),intro:nerve.relations,function:nerve.normal,relations:nerve.check,clinical:nerve.injury,url:nerve.source}:null)||(regional?{tr:cleanName(r.name),intro:regional.label+' · Seçili kaynak yapısı.',function:regional.normal,relations:regional.relations,url:regional.source}:null);if(specific){const prior=isExactTopic(r.name,base)?base:{};return{...prior,...specific,refs:[...(prior.refs||[]),...(specific.refs||[])],scope:regional&&regional.scope!=='specific'?'parent':'specific'};}if(['bursa','serous','fat','heart','eye','ganglion','fascia','tendon','ligament'].includes(studyKind(r)))return generalCard(r);if(base)return{...base,scope:isExactTopic(r.name,base)?'specific':'parent'};return generalCard(r);}
export function explanationScope(t){return t.scope==='general'?'Doku / sistem düzeyinde açıklama. Bu parçaya özgü görev ve bağlantı ayrıntıları henüz bulunmuyor.':t.scope==='parent'?'Ana yapıya ait açıklama. Seçili alt parçanın özel işleviyle aynı kabul edilmemelidir.':'Seçili yapıya ait açıklama · Kaynak bağlantıları aşağıda.';}
