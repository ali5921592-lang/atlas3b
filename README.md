# Anatomi Atlas · v5

Türkçe, mobil uyumlu eğitim prototipi. Statik ES modülleri, yerel Three.js 0.180.0 ve Draco modelleri. API anahtarı veya yapay zekâ hesabı gerektirmez.

## Çalıştırma

`dist/` klasörünü HTTP üzerinden sunun. İndirilebilir pakette `node server.mjs` veya Windows'ta `BASLAT.cmd` çalıştırın. Adres: `http://127.0.0.1:5173`. file:// üzerinden çalışmaz. Bu adres yalnızca sunucunun çalıştığı bilgisayarda açılır.

## Bu güncelleme

- Erkek/kadın kaynaklarında favoriler; yapıya özel 4.000 karakterlik kişisel notlar. Veriler bu tarayıcıda tutulur, hesaplar veya cihazlar arasında eşitlenmez. Notlar Kaydet düğmesiyle saklanır; tarayıcı verileri silinirse kaybolur.
- Görünümü kaydet / Kayda dön: kamera, hedef, referans, açık katmanlar, gizli parçalar, saydamlıklar, seçili yapı, kesit ve ayrıştırma ayarları. Tek kayıt tutulur.
- Tasarruflu görüntü seçeneği piksel yoğunluğunu düşürür.
- Önbellekteki referansa geri dönüldüğünde animasyon grupları yenilenir. Kesit ve ayrıştırma birlikte etkin kalmaz. Palet değişiminde bağlantı renkleri korunur.
- Değişmeyen v4 model indirmeleri v5 önbelleğine taşınır; çevrimdışı indirmenin hazır olduğu ağ olmadan da doğrulanır.
- Doğrulama: JSDOM akışları, notların güvenli metin olarak gösterilmesi, favori/nota kalıcı erişim, depolama hatasında geri alma, görünüm geri yükleme, çevrimdışı önbellek geçişi geçti. Gerçek telefon/GPU görsel testi yapılmadı.

## Özellikler

- Erkek / kadın seçimi: Z-Anatomy erkek referansında 2.338; HRA kadın referansında 956 seçilebilir parça.
- Bağımsız katman saydamlığı, gizleme/geri alma, bölge filtreleri, izole inceleme ve yapboz ayrıştırma.
- Aksiyel, koronal, sagittal ve iki açıyla ayarlanan oblik kesit; ters yön, 5–200 mm çift düzlemli dilim, 5 hazır bölge ve düzlem kılavuzu. Kapalı kesişim konturları doku desenli kesim yüzeyine çevrilir; modeldeki delikler korunur. Açık konturlar kapatılmaz. Gözenek/lif dokusu temsili olup BT/MR veya histoloji değildir.
- Kalp ve akciğerlerde açılıp kapatılabilir temsili hareket; kalp ve solunum hızları ayarlanır. Kesitte, ayrıştırılmış görünümde ve sekme arka plandayken duraklar.
- Biseps, triseps, deltoid, pektoralis major, supraspinatus ve infraspinatus için 26 sağ/sol kas parçasında sinir–arter–başlangıç kemiği–tutunma kemiği birlikte vurgulanır. Kemik bütün olarak renklendirilir; tutunma yeri metinde tarif edilir, hassas yüzey noktası değildir. Eksik eşleştirmeler açıkça belirtilir.
- Doku materyalleri, doğal/atlas paletleri ve temsili yüzey ayrıntısı.
- 34 temel konu; 27 genişletilmiş kart, 6 üreme anatomisi kartı ve 3 kas için başlangıç–tutunma–sinir–hareket bilgisi. Kaynağı/özel açıklaması olmayan alt parçalar açıkça belirtilir.
- 12 soruluk havuz: erkekte 10, kadında 8 soru. Cevap açıklaması, modelde inceleme, yanlışları bu cihazda saklama ve tekrar turu.
- Model adlarını gizleyerek çalışma.
- Erkek referansının sol kol kemikleri ve bisepsiyle şematik 0–110° dirsek fleksiyonu. Sabit menteşe ve basitleştirilmiş kas deformasyonu; kuvvet, çarpışma veya hasta hareket açıklığı hesaplanmaz.
- PWA ve kullanıcı tarafından başlatılan model indirme. Çevrimdışı çekirdek arayüz ve seçili model önbelleği; hata sonrası yeniden deneme. Tarayıcı verileri silinirse indirme kaybolur.

## Sınırlar

Kadın modeline HRA v1.5 kaynağından 8 pubis/ischium kompakt ve süngerimsi kemik parçası eklendi; ortak ilium parçalarının dönüşümleri eşleşti ve orijinal koordinatlar korundu. Kadın modeli ayrı HRA kaynağıdır; gövde yüzeyi ve seçili organları içerir. Bazı kas/iskelet bölgeleri, özellikle üst ekstremite, eksiktir. Erkek parçalarıyla doldurulmadı. İki kaynak doğrudan nicel karşılaştırmaya uygun değildir. Kadın kaynağından 8 gebelik referansı çıkarıldı; dönüşümler korunarak Draco sıkıştırması yapıldı ve model sahneye ötelendi. Kadın dosyası yaklaşık 24 MB'dır.

Henüz APK, imzalı iOS paketi veya mağaza dağıtımı yoktur. PWA ve çevrimdışı özellikler HTTPS/localhost ve destekleyen tarayıcı gerektirir. Telefon için çevrimiçi bir HTTPS adresi gerekir. Fiziksel cihaz performansı, GPU görüntü kalitesi ve tıbbi içerik uzman incelemesi bekliyor.

## Doğrulama

v4: 956 kadın parçası çözülüp eşleştirildi. Gerçek kadın modelinden 12 kesit örneğinin 7’sinde kapalı kesim yüzeyi üretildi; kalan açık konturlar doldurulmadı. Analitik kutu ve boşluk içeren geometride kesit alanı/boşluk korunması, 26 kas bağlantısında taraf doğruluğu, animasyon dönüşümlerinin başlangıca dönmesi, shader kancaları, arayüz kontrolleri ve çevrimdışı senaryolar doğrulandı.

Önceki doğrulama: Her iki modelin tüm geometri kayıtları Draco ile çözülüp GLTFLoader ile eşleştirildi. Node/JSDOM kontrolleri model bazlı arama/görünürlük, kesit, diseksiyon geri alma, sınav puanlama/tekrar ve ad gizlemeyi geçti. Servis çalışanı test düzeneğinde önbellek, başarısız indirmeyi yeniden deneme ve çevrimdışı açılış kontrol edildi. Gerçek tarayıcı, fiziksel telefon, hareket doğruluğu veya canlı WebMCP doğrulaması yapılmadı.

## Kaynaklar ve lisanslar

Erkek: Z-Anatomy / Gauthier Kervyn ve katkıda bulunanlar; BodyParts3D / DBCLS / Kousaku Okubo. GLB dönüşümleri: https://github.com/Liyucheng1997/242_lab-human-anatomy. Tam atıflar: `dist/models/SOURCE-LICENSE.txt`. Bazı bileşenlerin ticari olmayan kullanım koşulları nedeniyle bu prototip ticari olmayan eğitim içindir.

Kadın: Human Reference Atlas / HuBMAP, Kristen Browne ve Heidi Schlehlein; Visible Human Dataset / NLM, Female v1.10 (2026), CC BY 4.0. Kaynak ve dönüşüm kaydı: `dist/models/FEMALE-LICENSE.txt`.

Eğitim notları OpenStax (J. Gordon Betts ve diğerleri / Rice University), NIH/NHLBI, NIDDK ve NCBI kaynaklarına bağlantı verir. Notlar CC BY-NC-SA 4.0 kapsamında paylaşılır. Three.js lisansı: `dist/vendor/LICENSE`.
