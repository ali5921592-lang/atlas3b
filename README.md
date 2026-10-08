# Anatomi Atlası · v15

Mobil uyumlu, beş dilli eğitim prototipi. Yerel Three.js modelleri ve RGB kesit hacmi; Android/iOS için Capacitor 8 projeleri. API anahtarı gerektirmez.

## Çalıştırma

Node 22+ ile `npm ci`, ardından `npm start`. Adres: http://127.0.0.1:5173 . `file://` ile çalışmaz. Bu localhost adresi yalnızca sunucunun çalıştığı bilgisayara aittir.

## Güncel özellikler

Yakınlaştırdıktan sonra başa/ayağa kaydırma, dokunma/fare hareket modu; farklı yönlerde katman ayırma; omentum örtüsünü ayrı gösterme; seçili yapı için parlak turkuaz vurgu. Kadın/erkek referansı, tek yapı ve bağlantı görünümü; kesit, ders, soru, favori, not ve çalışma yedeği akışları korunur.

Türkçe, İngilizce, Almanca, İspanyolca ve Arapça sözlükleri çevrimdışı gelir. Latin adları korunur, yerel adla birlikte gösterilir; arama yerel/Latin adlarını ve organ anahtar kelimelerini destekler. Arapça RTL, cihazda kalıcı dil seçimi, çevrilmemiş terimler için İngilizce geri dönüş. Çeviriler tıbbi dil uzmanı/klinik editör onayı bekleyen taslaklardır.

## İçerik ve doğrulama sınırları

3.370 model kaydı; 2.731 Latince eşleşme, 639 bekleyen kayıt. Klinik içerik: 353 özel yapı/organ, 123 ana yapı, 26 grup ve 2.868 genel doku/sistem kartı. Her parçaya özgü klinik açıklama tamamlanmış değildir. Kadın kaynak modelinin eksik bölgeleri ve yaklaşık kas yerleşimi vardır. RGB hacim sadece erkek göğüs bölgesindeki 160 kaynak kesittir; GLB ile anatomik eş-kayıt veya tüm vücut hacmi değildir.

`npm test` özellik/regresyon kontrollerini çalıştırır. Telefon boyutunda tarayıcı kontrolü fiziksel cihaz testi yerine geçmez. Model kaynak/lisansları [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md), ayrıntılı değişiklikler [dist/V15-NOTLAR.md](dist/V15-NOTLAR.md) içinde.

## Mobil paketleme

[MOBILE-BUILD.md](MOBILE-BUILD.md): `npm run native:sync`, `npm run android:build`; debug imzalı APK ve yayın imzası sağlanmadığında imzasız AAB. iOS projesi Mac/Xcode 26+ ve Apple Developer imzasıyla IPA için hazırlanmıştır. Windows'ta IPA üretilmiş değildir. GitHub Actions Android ve iOS simülatör derleme iş akışını içerir.

## Önceki sürümler

Aşağıdaki notlar tarihsel kapsam ve test sonuçlarını içerir.

## v10 · Arayüz ve açıklama düzeni

- Sol panel Keşfet, İncele, Öğren ve Çalışma sekmelerine ayrıldı. Arama tüm sekmelerden erişilebilir; mevcut araçlar ve kimlikleri korunur.
- Sekmelerde ok tuşları, Home/End ve erişilebilir seçili durumları. Mobilde araç panelini kapatma ve yapı bilgisine geri dönme düğmeleri; daha büyük dokunma hedefleri ve okunaklı metinler.
- Yapı kartlarında sabit işlem düğmeleri, açıklama bölümlerine geçiş, kaynakları doğrudan açma. Başlangıç/ileri düzey ayrımı korunur.
- 47 yeni konu 90 mevcut model kaydında özel açıklama sağlar. Sindirim, idrar, solunum, endokrin, bağışıklık, merkezi sinir sistemi ve ekstremite kemikleri kapsanır. Çeviri sistemi veya yeni dil eklenmedi.
- Tüm 3.370 kayıtta açıklama kapsamı gösterilir: 330 kayıtta yapıya özel, 374 kayıtta ana yapıya ait ve 2.666 kayıtta genel doku/sistem açıklaması. Bu sayılar anatomik doğruluk onayı değildir; genel açıklamalar özel açıklama olarak sunulmaz. Her parçaya özgü kapsamlı klinik açıklama tamamlanmış değildir.
- Kalp kartlarında daha önce görünmeyen mevcut klinik notlar ve kaynaklar korunarak birleştirildi. Karaciğerin koroner bağı kalp konusuyla eşleştirilmez.
- Node/JSDOM kontrolleri: sekme/klavye/panel geçişleri, kalıcı arama, yeni kart eşleştirmeleri, tüm katalogda kapsam bilgisi, mevcut çalışma akışları ve çevrimdışı geçiş. Tarayıcı görüntü testi ve gerçek telefon testi yapılmadı.

## v9 · Kas ayrıntısı, yapı kartları ve 3B kesit görünümü

- Kadın referansına 76 ayrı kalça/bacak kası eklendi; toplam 1.032 parça. Kaslar Andreassen ve arkadaşlarının 2023 verisinin CC BY 4.0 türevinden gelir. Kaynak HRA yerleşimi yaklaşık uyarlamadır (kemik uyumu 17,4–36,1 mm); anatomik eş-kayıt olarak kullanılmaz. Üst gövde kasları ve kafatası eksikliği devam eder.
- Kas katmanını aç veya “Kadın kalça ve bacak kaslarını aç” düğmesini kullan. Ek parçaların kartlarında kaynak ve yaklaşık yerleşim açıkça belirtilir.
- 38 kas için özel Türkçe başlık, konum, görev ve sinir bilgisi eklendi; 76 sağ/sol ek parçada ve tam adları eşleşen erkek kaslarında kullanılır. Tendon veya başka alt parçaya yanlışlıkla aktarılmaz.
- Dundee Üniversitesi / Alexandra Wilkins “Internal Human Heart Anatomy” modeli resmi Sketchfab gömme bağlantısıyla ayrı çevrimiçi inceleme penceresine eklendi. Kaynak modeli kordalar, kapaklar, papiller kaslar ve trabeküller içerir. Yerel geometri indirilmedi; çevrimdışı, yerel katman seçimi ve kesit eş-kaydı bu referansa uygulanmaz. Resmi oEmbed model adı/yazar/embed adresini doğruladı; canlı tarayıcı görüntüsü test edilmedi. Kaynak: https://sketchfab.com/3d-models/internal-human-heart-anatomy-9f48eaa481cc4a43baeb9e1f03882cff
- Kalpte yaprakçık, papiller kas, septum ve koroner damar seçimine özel başlık ve notlar eklendi. Kalp iç geometrisi bu sürümde tamamlanmadı; yeni kordalar veya eksik yaprakçık geometrisi eklenmedi.
- Gerçek RGB kesit hacminde “3B kesişim görünümünü aç” ile üç düzlemi uzayda döndür; bir noktaya dokunduğunda aynı hacimdeki 2B görüntüler birlikte güncellenir. Bu, kaynak fotoğraf hacminin koordinat gösterimidir; atlas GLB yüzeyleri ile kayıt değildir.
- Solunumda mevcut kaburga/sternum parçaları da hareket eder. Kaynak kapak yüzeylerine kalp fazıyla eşzamanlı, yumuşak geçişli temsili deformasyon uygulanır. Açıklık sızdırmazlığı, kuvvet, akışkan ve doku biyomekaniği hesaplanmaz; dinlenim geometrisine geri dönüş korunur.
- Kontroller: 76 kasın Draco çözümü/sağ-sol eşleşmesi, özel kartlar, hacim 2B/3B nokta dönüşümleri, hareketin geri alınması, önceki ders/çalışma akışları ve yeni çevrimdışı model indirme senaryosu. Kullanıcının isteği doğrultusunda gerçek cihaz ve insan uzman değerlendirmesi yapılmadı.
- Üniversitenin doğrudan STL/DICOM indirme bağlantıları bu oturumda HTTP 403 döndürdü. Veri atıfları ve türev dönüşümleri dist/models/FEMALE-MUSCLES-LICENSE.txt içinde. Uyumlu tam kalp, kadın üst gövdesi ve GLB–fotoğraf eş-kaydı tamamlanmış sayılmaz.

## Öğrenme düzeyi ve kalp bağlantıları · v8

- Başlangıç düzeyi temel işlevi öne çıkarır. İleri düzey Latince adları, anatomik ilişkileri ve klinik notları açar. Seçim bu cihazda saklanır.
- Kalp odacıkları ve kapaklarında önceki/sonraki akış yapıları birlikte vurgulanır. Papiller kas ve septum seçiminde mevcut modeldeki yapısal ilişkiler gösterilir. Erkek ve kadın kayıtları ayrı eşleştirilir; eksik eşler belirtilir.
- Sekiz odacık/kapak kartına kaynak bağlantılı ileri notlar eklendi. Koroner ilişki genel dolaşım bağlantısıdır; tek tek damar sonlanmasını göstermez.
- v7 model indirmeleri v8 çevrimdışı önbelleğine korunarak aktarılır.
- Arayüz, bağlantı vurgusu, düzeyin saklanması, dersler ve çevrimdışı geçiş testleri geçti. Yeni ayrıntılı organ geometrisi veya GLB–kesit eş-kaydı eklenmedi.
- Öğrenci/uzman değerlendirme planı pakette KULLANICI-TESTI.md içindedir; katılımcı testi ve uzman onayı henüz yapılmadı.
## Gerçek kesit hacmi ve koroner dolaşım

- NLM Visible Human Male kaynağından a_vm1380–a_vm1539 arasındaki 160 ardışık renkli anatomik kesit. Kaynak görüntüler 2048×1216, hacim 384×228×160 RGB. Yatay örnekleme 1,76 mm, kesit aralığı 1 mm. Gzip dosyası yaklaşık 31,8 MB; açılmış RGB veri 42 MB.
- Aksiyel, koronal ve sagittal yeniden kesitler aynı hacimden hesaplanır. Bir görüntüye dokunmak diğer iki düzlemi aynı noktaya taşır; kaynak kesit numarası gösterilir. Fiziksel piksel aralıkları görüntü oranına uygulanır.
- Hacim yalnızca kullanıcı yüklemeyi seçtiğinde indirilir. Çekirdek çevrimdışı indirmeye dahil değildir. Bu sürümde hacim oturum belleğinde tutulur; yeniden açılış için ağ gerekebilir.
- Piksel verisi gerçek renkli kriyokesitlerden gelir; BT/MR değildir. In-plane çözünürlük azaltılmıştır. Kaynak fotoğraf kaymaları ve kesim artefaktları korunur. GLB modeline anatomik kayıt ve yön matrisi uygulanmadı; hacim aralığı tüm göğüs/vücut değildir.
- Her kaynak dosyanın ve açılmış hacmin SHA-256 özeti dist/volume/manifest.json içinde tutulur. Tarayıcı destekliyorsa yüklemede bütünlük doğrulanır.
- Kalbi besleyen damarlar dersi eklendi: erkek 10, kadın 12 mevcut koroner damar parçası. Kapaklar, odacıklar ve iç yapı grupları için doğrudan NIH bağlantılı açıklamalar ve Türkçe arama terimleri eklendi.
- Kontroller: üç düzlemde RGB indeksleme, kesişim noktası sınırları, 160 kesitin ardışıklığı, veri boyutu/hash, koroner eşleştirme ve ders/önceki özellik testleri geçti. Üç gerçek yeniden kesit görüntüsü dosya olarak incelendi; tarayıcı/GPU ve fiziksel telefon testi yapılmadı.

## Kalp ve göğüs eğitim modülü

- 8 rehberli adım: konum, odacıklar, iç yapılar, kanın yolu, kalp döngüsü, solunum ve gerçek kesit karşılaştırması.
- Erkek ve kadın kataloglarında kalp odacıkları/kapakları ayrı eşleştirilir. İç yapı adımında kalp duvarları saydamlaşır; geometriye olmayan yapı eklenmez. Erkekte AV kapak yaprakçıkları eksiktir.
- 12 kan yolu adımı ve 5 kalp döngüsü fazı; şematik kapak hareketleri. 3B odacık deformasyonları temsili; 3B kapak biyomekaniği veya gerçek kan akışı çözücüsü yoktur. Faz süreleri eşitlenmiştir.
- Erkekte diyafram hareketi akciğer hareketiyle birlikte gösterilir. Kadın kaynağında diyafram geometrisi yoktur.
- 4 model üzerinde bulma sorusu; yanlış yanıtta doğru yapıya odaklanma ve açıklama. İlk yanıt puanlanır.
- NLM'den iki özgün renkli anatomik göğüs kesiti, yakınlaştırma ve kaydırma. Bu fotoğraflar GLB ile hizalanmamıştır; sürekli kesit hacmi değildir. Atıf: dist/reference/SOURCE.txt.
- Uzman inceleme dökümü: outputs/anatomi-uzman-inceleme.md. İnsan uzman onayı henüz alınmadı.
- Yeni akışlar Node/JSDOM ile sınandı. GPU/tarayıcı görsel incelemesi ve gerçek cihaz testi yapılmadı.

## Önceki güncelleme

- Erkek/kadın kaynaklarında favoriler; yapıya özel 4.000 karakterlik kişisel notlar. Veriler bu tarayıcıda tutulur, hesaplar veya cihazlar arasında eşitlenmez. Notlar Kaydet düğmesiyle saklanır; tarayıcı verileri silinirse kaybolur.
- Görünümü kaydet / Kayda dön: kamera, hedef, referans, açık katmanlar, gizli parçalar, saydamlıklar, seçili yapı, kesit ve ayrıştırma ayarları. Tek kayıt tutulur.
- Tasarruflu görüntü seçeneği piksel yoğunluğunu düşürür.
- Önbellekteki referansa geri dönüldüğünde animasyon grupları yenilenir. Kesit ve ayrıştırma birlikte etkin kalmaz. Palet değişiminde bağlantı renkleri korunur.
- Değişmeyen v4 model indirmeleri v5 önbelleğine taşınır; çevrimdışı indirmenin hazır olduğu ağ olmadan da doğrulanır.
- Doğrulama: JSDOM akışları, notların güvenli metin olarak gösterilmesi, favori/nota kalıcı erişim, depolama hatasında geri alma, görünüm geri yükleme, çevrimdışı önbellek geçişi geçti. Gerçek telefon/GPU görsel testi yapılmadı.

## Özellikler

- Erkek / kadın seçimi: Z-Anatomy erkek referansında 2.338; kadın referansında 956 HRA + 76 ek kas = 1.032 seçilebilir parça.
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
