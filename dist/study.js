export const questions=[
 {id:'q1',target:'Femur',q:'Uyluğun uzun kemiği hangisidir?',options:['Femur','Humerus','Radius','Sternum'],correct:0,why:'Femur kalça ile diz arasında uzanır.',sex:'both'},
 {id:'q2',target:'Left ventricle',q:'Sistemik dolaşıma kanı hangi odacık pompalar?',options:['Sağ kulakçık','Sol karıncık','Sağ karıncık','Sol kulakçık'],correct:1,why:'Sol karıncık kanı aort üzerinden vücuda pompalar.',sex:'both'},
 {id:'q3',target:'Calcaneal tendon',q:'Aşil tendonu hangi kemiğe kuvvet aktarır?',options:['Patella','Talus','Kalkaneus','Femur'],correct:2,why:'Baldır kaslarının kuvvetini topuk kemiği olan kalkaneusa iletir.',sex:'male'},
 {id:'q4',target:'Biceps brachii',q:'Biseps brachii hangi hareket çiftine katkı verir?',options:['Fleksiyon ve supinasyon','Ekstansiyon ve pronasyon','Abdüksiyon ve eversiyon','Plantar fleksiyon ve inversiyon'],correct:0,why:'Dirseği büker ve ön kolun supinasyonuna katkı verir.',sex:'male'},
 {id:'q5',target:'Kidney',q:'İdrarı böbrekten mesaneye taşıyan yapı hangisidir?',options:['Renal arter','Üretra','Üreter','Renal ven'],correct:2,why:'Üreter böbrek pelvisini mesaneye bağlar; üretra mesaneden dışarı uzanır.',sex:'both'},
 {id:'q6',target:'Lung',q:'Normal erişkin anatomisinde sol akciğerde kaç lob bulunur?',options:['Bir','İki','Üç','Dört'],correct:1,why:'Sol akciğerde iki, sağ akciğerde üç lob bulunur.',sex:'both'},
 {id:'q7',target:'Median nerve',q:'Karpal tünelden hangi sinir geçer?',options:['Ulnar','Radial','Aksiller','Median'],correct:3,why:'Median sinir karpal tünelden ele geçer.',sex:'male'},
 {id:'q8',target:'Uterus',q:'Uterusun alt bölümünde vajinaya açılan kısım hangisidir?',options:['Fundus','Serviks','Ovaryum','Fimbria'],correct:1,why:'Serviks uterusun alt, dar bölümüdür.',sex:'female'},
 {id:'q9',target:'Ovary',q:'Oositlerin geliştiği organ hangisidir?',options:['Mesane','Uterin tüp','Ovaryum','Serviks'],correct:2,why:'Oositler over foliküllerinde gelişir.',sex:'female'},
 {id:'q10',target:'Gallbladder',q:'Safra nerede üretilir?',options:['Safra kesesi','Karaciğer','Dalak','Mide'],correct:1,why:'Karaciğer safra üretir; safra kesesi onu depolar ve yoğunlaştırır.',sex:'both'},
 {id:'q11',target:'Cerebellum',q:'Beyincik en çok hangi işlevle ilişkilidir?',options:['Safra üretimi','İdrar depolama','Hareket koordinasyonu','Gaz alışverişi'],correct:2,why:'Beyincik koordinasyon, denge ve motor öğrenmeye katkı verir.',sex:'both'},
 {id:'q12',target:'Deltoid',q:'Kolun gövdeden yana uzaklaşmasına ne denir?',options:['Addüksiyon','Abdüksiyon','Pronasyon','Fleksiyon'],correct:1,why:'Abdüksiyon orta hattan uzaklaşmadır; deltoid bu harekete katılır.',sex:'male'}
];
export function questionSet(sex,wrongOnly=[]){return questions.filter(q=>(q.sex==='both'||q.sex===sex)&&(!wrongOnly.length||wrongOnly.includes(q.id)));}
export function answerQuestion(q,index){if(!Number.isInteger(index)||index<0||index>=q.options.length)throw Error('Geçersiz cevap');return{correct:index===q.correct,explanation:q.why};}
export const shoulderFacts={
'biceps brachii':{origin:'Uzun baş: supraglenoid tüberkül. Kısa baş: korakoid çıkıntı.',insertion:'Radius tüberozitesi ve biseps aponevrozu.',innervation:'Muskulokütan sinir.',action:'Dirsek fleksiyonu ve ön kol supinasyonu.'},
'deltoid muscle':{origin:'Klavikulanın lateral bölümü, akromion ve skapula dikeni.',insertion:'Humerusun deltoid tüberozitesi.',innervation:'Aksiller sinir.',action:'Orta lifler abdüksiyona; ön ve arka lifler farklı hareketlere katılır.'},
'pectoralis major':{origin:'Klavikula, sternum ve üst kostal kıkırdaklarla ilişkili bölümler.',insertion:'Humerusun intertüberküler oluğunun lateral dudağı.',innervation:'Medial ve lateral pektoral sinirler.',action:'Kolun addüksiyonu ve iç rotasyonu.'}
};
