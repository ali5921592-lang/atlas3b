const book='https://openstax.org/books/anatomy-and-physiology-2e/pages/';
const sensory=book+'14-1-sensory-perception',brain=book+'13-2-the-central-nervous-system';
const rows=[
 ['retina','Retina','Işığa duyarlı reseptörlerle görsel sinyali başlatır.','Fotoreseptör, bipolar ve ganglion hücreleri ardışık devre oluşturur.','Ganglion hücrelerinin aksonları optik sinire katılır.',sensory],
 ['cornea','Kornea','Işığın kırılmasına ve gözün ön yüzünün korunmasına katılır.','Saydam, damarsız doku düzeni optik işlev için önemlidir.','Sklera, ön kamara ve gözyaşı filmi.',sensory],
 ['lens','Lens','Işığı retinaya odaklamaya katılır.','Saydam lens lifleri kapsül içinde düzenlenir.','Siliyer yapı ve zonüler lifler odaklanmayla ilişkilidir.',sensory],
 ['iris','İris','Pupilla açıklığını değiştirerek ışık girişini düzenler.','Düz kas ve pigmentli doku içerir.','Pupilla, siliyer cisim ve ön–arka kamaralar.',sensory],
 ['macula lutea','Makula','Merkezi görmenin önemli bölgesidir.','Fovea bölgesi ile çevresindeki retina aynı hücre dağılımına sahip değildir.','Retinanın alt bölgesidir; ayrı bir göz organı değildir.',sensory],
 ['cochlea','Koklea','Sesin mekanik etkisini işitsel sinyale dönüştürme düzenini barındırır.','Koklear kanal ve duyu epiteli sıvı dolu kompartımanlarla ilişkilidir.','Vestibulokoklear sinirin işitsel bölümü.',sensory],
 ['thalamus','Talamus','Kortekse ulaşan birçok duyusal ve motor devrede aktarım ve işleme sağlar.','Çok sayıda çekirdek ve bağlantıdan oluşur.','Korteks, bazal çekirdekler ve beyin sapıyla bağlantılıdır.',brain],
 ['hypothalamus','Hipotalamus','Homeostaz, otonom düzenleme ve hormonal eksenlerin kontrolüne katılır.','İşlevleri farklı çekirdek ve bağlantı ağlarına dağılmıştır.','Hipofiz, limbik ağlar ve otonom merkezler.',brain],
 ['cerebellum','Serebellum','Hareket koordinasyonunu ve duyusal geri bildirimle ayarlamayı destekler.','Korteks, beyaz madde ve derin çekirdekler ayrı bileşenlerdir.','Pedinküller üzerinden beyin sapı ve diğer motor devreler.',brain],
 ['pons','Pons','Beyin ve serebellum arasında iletim ve beyin sapı devrelerine katılır.','Çekirdekler ve çıkan–inen lif yolları birlikte bulunur.','Orta beyin, medulla ve serebellum.',brain],
 ['medulla oblongata','Medulla oblongata','Solunum ve kardiyovasküler düzenleme dahil beyin sapı işlevlerine katılır.','Çekirdekler ile duyu ve motor yolları içerir.','Pons, omurilik ve kraniyal sinir bağlantıları.',brain],
 ['midbrain','Orta beyin','Duyu–motor iletim ve görsel–işitsel refleks devrelerine katılır.','Tektum, tegmentum ve lif yolları farklı bölgelerdir.','Diensefalon, pons ve serebellum.',brain],
 ['corpus callosum','Corpus callosum','İki serebral hemisfer arasında bilgi iletimine katılır.','Komissüral beyaz madde lifleri içerir.','Sağ ve sol hemisfer kortikal bölgeleri.',brain],
 ['spinal cord','Omurilik','Duyu–motor iletim, refleksler ve segmental işlevlere katılır.','Gri madde ve beyaz madde yolları ayrı düzenlenir.','Spinal kökler, periferik sinirler ve beyin sapı.',brain]
];
const clean=s=>s.toLowerCase().replace(/\.[lr]\.\d+$|\.\d+$/g,'').replace(/^allen /,'').replace(/ [lr]$/,'').trim();
const cards=new Map(rows.map(([name,label,normal,tissue,relations,source])=>[name,{label,normal,tissue,relations,source}]));
export function sensoryStudy(r){if(r.layer!=='nervous')return null;const exact=cards.get(clean(r.name));return exact?{...exact,scope:'specific'}:null;}
