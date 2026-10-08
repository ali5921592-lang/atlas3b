const book='https://openstax.org/books/anatomy-and-physiology-2e/pages/';
// Explicit structure aliases. Tissue variants receive a parent-level note.
const rows=[
 ['clavicle','Klavikula','Omuz kuşağını gövdeden uzakta destekler.','Sternum ve skapula akromionuyla eklemleşir.','8-1-the-pectoral-girdle'],
 ['scapula','Skapula','Glenoid yüzeyi ve kas tutunmaları omuz hareketine katılır.','Humerus, klavikula ve rotator manşetle ilişkilidir.','8-1-the-pectoral-girdle'],
 ['humerus','Humerus','Kolun kemik desteğini ve omuz–dirsek arasında kuvvet aktarımını sağlar.','Proksimalde skapula; distalde radius ve ulna.','8-2-bones-of-the-upper-limb'],
 ['radius','Radius','Ön kol rotasyonuna ve el bileğinde yük aktarımına katılır.','Ulna, humerus ve proksimal karpal sıra.','8-2-bones-of-the-upper-limb'],
 ['ulna','Ulna','Dirseğin kemik stabilitesine ve ön kol desteğine katılır.','Trochlear çentik humerusla, radial çentik radiusla ilişkilidir.','8-2-bones-of-the-upper-limb'],
 ['femur','Femur','Kalça ile diz arasında yük taşır ve kaslar için kaldıraç oluşturur.','Baş asetabulumla; kondiller tibia ve patellayla ilişkilidir.','8-4-bones-of-the-lower-limb'],
 ['patella','Patella','Kuadriseps tendonundaki sesamoid kemik, ekstansör düzene katkı verir.','Femur patellar yüzeyi ve tibial tüberoziteye uzanan patellar bağ.','8-4-bones-of-the-lower-limb'],
 ['tibia','Tibia','Bacağın başlıca yük taşıyan kemiğidir.','Femur, fibula ve talusla eklem ilişkileri vardır.','8-4-bones-of-the-lower-limb'],
 ['fibula','Fibula','Kas tutunmalarına ve lateral ayak bileği stabilitesine katılır.','Tibia ve talusla ilişkilidir; femurla doğrudan eklemleşmez.','8-4-bones-of-the-lower-limb'],
 ['talus','Talus','Bacaktan ayağa yük aktarır.','Tibia–fibula mortisi, kalkaneus ve naviküler kemik.','8-4-bones-of-the-lower-limb'],
 ['calcaneus','Kalkaneus','Topuk desteğini sağlar; aşil tendonundan kuvvet alır.','Talus, küboid ve kalkaneal tendon.','8-4-bones-of-the-lower-limb'],
 ['navicular bone','Naviküler kemik','Medial ayak kemerindeki yük aktarımına katılır.','Talus ile kuneiformlar arasında bulunur.','8-4-bones-of-the-lower-limb'],
 ['cuboid bone','Küboid kemik','Ayağın lateral sütununu destekler.','Kalkaneus ve lateral metatarslarla ilişkilidir.','8-4-bones-of-the-lower-limb'],
 ['medial cuneiform|intermediate cuneiform|lateral cuneiform','Kuneiform kemik','Ayak ön bölümündeki destek ve yük aktarımına katılır.','Naviküler ve ilgili metatarslarla komşudur; üç kemik ayrıdır.','8-4-bones-of-the-lower-limb'],
 ['ilium|ischium|pubis|hip bone','Pelvis kemiği','Pelvik halka, yükün gövdeden alt ekstremiteye aktarılmasını destekler.','Asetabulum, sakroiliak eklem ve pubik simfiz birlikte incelenir.','8-3-the-pelvic-girdle-and-pelvis'],
 ['sacrum|fused sacrum','Sakrum','Omurga ile pelvik halka arasında yük aktarır.','L5, koksiks ve iki sakroiliak eklem.','7-3-the-vertebral-column'],
 ['coccyx','Koksiks','Pelvik taban dokuları için tutunma alanıdır.','Sakrumun inferiorunda bulunur.','7-3-the-vertebral-column'],
 ['sternum|manubrium','Sternum bölgesi','Göğüs kafesinin ön desteği ve kostal bağlantılarında rol alır.','Klavikulalar ve kostal kıkırdaklar.','7-4-the-thoracic-cage'],
 ['mandible','Mandibula','Alt dişleri taşır ve çiğneme hareketinde kaldıraç oluşturur.','Temporomandibular eklem, dişler ve çiğneme kasları.','7-2-the-skull'],
 ['maxilla','Maksilla','Üst dişleri taşır; ağız, burun ve orbita sınırlarına katılır.','Sert damak ve komşu yüz kemikleri.','7-2-the-skull'],
 ['frontal bone|parietal bone|occipital bone|temporal bone|sphenoid bone|ethmoid bone','Kafatası kemiği','Kranial veya yüz iskeletinin desteğine ve korumaya katılır.','Sütürleri, foraminaları ve komşu boşlukları ayrı değerlendir.','7-2-the-skull'],
 ['hyoid bone','Hyoid','Dil ve boyun kasları için tutunma sağlar.','Mandibula ile larenks arasındadır; başka kemikle doğrudan eklemleşmez.','7-2-the-skull'],
 ['scaphoid bone|lunate bone|triquetral bone|pisiform bone|trapezium bone|trapezoid bone|capitate bone|hamate bone','Karpal kemik','El bileğinde hareket ve yük aktarımına katılır.','Proksimal ve distal sıra, metakarpal bağlantılar ve retinakulum.','8-2-bones-of-the-upper-limb']
];
const cards=new Map();for(const[names,label,normal,relations,chapter]of rows)for(const name of names.split('|'))cards.set(name,{label,normal,relations,source:book+chapter});
const clean=s=>s.toLowerCase().replace(/\.[lr]\.\d+$|\.\d+$/g,'').trim();
export function regionalStudy(r){
 if(r.layer!=='skeleton')return null;const n=clean(r.name),exact=cards.get(n);if(exact)return{...exact,scope:exact.label==='Kafatası kemiği'?'group':'specific'};
 if(/^(cervical|thoracic|lumbar) vertebra(?: \d+)?$/.test(n)||/^atlas c1|^axis c2/.test(n))return{label:'Omur',normal:'Omurgayı destekler; vertebral kanalın çevresinde kemik sınır oluşturur.',relations:'Komşu omurlar, diskler ve faset eklemleri; servikal, torakal ve lomber bölgeler farklıdır.',source:book+'7-3-the-vertebral-column',scope:'group'};
 if(/^rib(?: \d+)?$/.test(n))return{label:'Kaburga',normal:'Göğüs kafesinde koruma ve solunum hareketine katılır.',relations:'Torakal omurlar, interkostal aralık ve kostal kıkırdaklar; bütün kaburgalar sternuma aynı biçimde bağlanmaz.',source:book+'7-4-the-thoracic-cage',scope:'group'};
 for(const[key,value]of cards)if(n===key+' compact bone'||n===key+' spongy bone')return{...value,scope:'parent'};
 return null;
}
