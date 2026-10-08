import {heartPart} from './thorax-data.js';
const root='https://www.ncbi.nlm.nih.gov/books/';
export function heartDetail(r){
 if(r.layer!=='cardiovascular'||!heartPart(r))return null;
 const n=r.name.toLowerCase().replace(/\.[lr]\.\d+$|\.\d+$/g,''),side=/\.l\./.test(r.name)?'Sol':/\.r\./.test(r.name)?'Sağ':'';
 let tr,intro,fn,relations,url;
 if(n.includes('leaflet')){
  const which=n.includes('right atrioventricular')?'Triküspit':n.includes('left atrioventricular')?'Mitral':n.includes('pulmonary')?'Pulmoner':'Aort';
  const part=n.startsWith('non-coronary')?'Nonkoroner':n.startsWith('left coronary')?'Sol koroner':n.startsWith('right coronary')?'Sağ koroner':n.startsWith('anterior')?'Ön':n.startsWith('posterior')?'Arka':n.startsWith('inferior')?'Alt':n.startsWith('septal')?'Septal':n.startsWith('left')?'Sol':'Sağ';
  tr=which+' kapağı · '+part.toLocaleLowerCase('tr')+' yaprakçık';intro='Seçili yüzey bir kapak yaprakçığıdır; bütün kapağı temsil etmez.';fn='Basınç farklarıyla yer değiştirerek tek yönlü akışa katılır.';relations=['Triküspit','Mitral'].includes(which)?'Korda ve papiller kaslar destek sistemine katılır.':'Yarımay kapak yaprakçığıdır; korda tendineaya bağlanmaz.';url='https://openstax.org/books/anatomy-and-physiology-2e/pages/19-1-heart-anatomy';
 }else if(n.includes('papillary')){
  const chamber=n.includes('right')?'Sağ':'Sol',part=n.startsWith('anterolateral')?'Anterolateral baş':n.startsWith('posteromedial')?'Posteromedial baş':n.startsWith('anterior')?'Ön':n.startsWith('posterior')?'Arka':n.startsWith('inferior')?'Alt':'Septal';
  tr=chamber+' karıncık · '+part.toLocaleLowerCase('tr')+' papiller kas';intro='Karıncığın iç duvarından uzanan kas bileşenidir.';fn='Kasılma sırasında korda gerilimine katkı verir; kapağı doğrudan açmaz.';relations=chamber==='Sağ'?'Triküspit kapağın destek sistemi.':'Mitral kapağın destek sistemi.';url=root+'NBK557802/';
 }else if(n==='interventricular septum'){
  tr='Karıncıklar arası septum';intro='Sağ ve sol karıncıklar arasındaki duvar.';fn='İki karıncığın boşluklarını ayırır.';relations='Kaslı ve membranöz bölümleri bulunur; bu model bunları ayrı göstermeyebilir.';url='https://www.nhlbi.nih.gov/health/heart/anatomy';
 }else if(/^(great|middle|small|anterior) cardiac vein$|^coronary sinus$/.test(n)){
  const details={'great cardiac vein':['Büyük kardiyak ven','Ön interventriküler oluk ve koroner oluk boyunca ilerler.','Koroner sinüse katılır.'],'middle cardiac vein':['Orta kardiyak ven','Arka interventriküler olukta seyreder.','Koroner sinüse katılır.'],'small cardiac vein':['Küçük kardiyak ven','Kalbin sağ tarafının venöz dönüşüne katılır.','Genellikle koroner sinüse dökülür.'],'anterior cardiac vein':['Ön kardiyak ven','Sağ karıncığın ön yüzünden dönüşe katılır.','Doğrudan sağ kulakçığa açılabilir.'],'coronary sinus':['Koroner sinüs','Kalbin arka koroner oluğunda yer alır.','Sağ kulakçığa açılır.']};[tr,intro,relations]=details[n];fn='Kalp dokusundan venöz kanın dönüşünü sağlar.';url=root+'NBK549786/';
 }else if(/coronary.*arter|coronary artery|circumflex|anterior interventricular artery|^marginal artery$|marginal branch of right coronary/.test(n)){
  const title=n==='right coronary artery'||n==='coronary artery'&&side==='Sağ'?'Sağ koroner arter':n==='left coronary artery'||n==='coronary artery'&&side==='Sol'?'Sol koroner arter':n.includes('septal')?'Ön interventriküler arterin septal dalları':n.includes('diagonal')?'Ön inen arterin diagonal dalı':n.includes('posterior descending')?'Sirkumfleks arterin arka inen dalı':n.includes('posterior ventricular')?'Sirkumfleks arterin arka ventriküler dalı':n.includes('inferolateral')?'Sağ koroner arterin inferolateral dalı':n.includes('circumflex')?'Sirkumfleks dal':n.includes('marginal')?'Marjinal koroner dal':'Ön interventriküler arter';
  tr=title;intro='Koroner arter ağındaki seçili damardır.';fn='Miyokardın kanlanmasına katılır.';relations='Dallanma ve beslenen alanlar kişiler arasında değişir; bu yüzey modeli tüm mikrodolaşımı içermez.';url=root+'NBK470522/';
 }else return null;
 return{match:n,tr,intro,function:fn,relations,url,sourceLabel:'Kalp anatomisi · Yapıya özel kaynak',group:'Kalp'};
}
