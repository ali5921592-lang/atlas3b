# Anatomi Atlas v14 — düzeltme ve doğrulama

## Uygulanan değişiklikler

- Dar, dikey, yatay ve kısa telefon ekranlarında yerleşim; güvenli ekran kenarları ve visualViewport desteği. Kısa yatay ekranda 3B alanın sıfıra inmesi düzeltildi. Tam okuma paneli kapanırken görünüm durumu temizlenir. Hareket azaltma tercihi desteklenir.
- Arama 60 sonuçluk sayfalara ayrıldı; klavye ile sonuç seçimi, Latince adlar ve kapsam bilgisi görünür. Seçili referansta bulunmayan yapı diğer referansta varsa geçiş önerilir. Referans geçişinde seçici eşzamanlanır; yükleme başarısız olursa önceki referans ve kamera geri gelir.
- Yakınlaştırma sınırları, bozuk sınav kayıtlarının okunması ve ilgisiz yapı önerilerinin oluşmasına yol açan boş konu anahtarı düzeltildi.
- Favori/not/görünüm kayıtları depolamaya yazma başarılı olduktan sonra güncellenir. Kota hatası bellekteki kaydı bozmaz. JSON yedeği hazırlama, metin olarak kopyalama, dosya indirme isteği ve açık kullanıcı işlemiyle birleştirme eklendi. Farklı not çakışmasında mevcut not korunur. Sadece metin yapıştırmak kayıt yapmaz.
- Gerçek kesit yükleme isteği pencere kapatıldığında iptal edilir; eski yanıt yeniden açılan pencereye yazamaz. Eğik kesit çizim isteği ve gözlemciler temizlenir. Hacim ayrıca çevrimdışı saklanabilir. İndirme işlemlerine zaman aşımı ve hata sonrası yeniden deneme eklendi.
- Bursa, seröz zar, yağ, göz, periferik ganglion, organ ve destek dokusu ayrımı iyileştirildi. Meme bezi yağ olarak, tensor fasciae latae fasya olarak boyanmaz. Bursa yanlış kas bağlantısı almaz.
- Kaynak bağlantılı kemik, duyu organı, merkezi sinir sistemi ve motor sinir/kas kartları genişletildi. Yapının özel açıklaması, ana yapı, yapı grubu ve genel doku bilgisi ayrı kapsamlarla gösterilir. İşlev kaybı notu genel ise seçili parçaya özel sonuç olarak sunulmaz.
- Kas–motor sinir bağlantıları ve sinirden mevcut kas hedeflerine dönüş eklendi. Sadece sinir eşleşmesi bulunan kartlarda damar/tutunma yüzeyi gösterildiği iddia edilmez. İlgili renk açıklamaları da bu kapsamla sınırlıdır.
- TA2 2.07 terimlerinin İngiliz ve Amerikan İngilizcesi alanlarıyla eşleşme genişletildi. Kesin olmayan karşılıklar otomatik uydurulmaz.

## Güncel içerik kapsamı

Toplam **3.370 model kaydı**: erkek 2.338, kadın 956 + 76 ek alt ekstremite kası. **2.732 kayıtta Latince eşleşme**, **638 kayıtta bekleyen eşleşme** bulunur.

Klinik kart kapsamı: **353 yapı/organ**, **123 ana yapı**, **26 yapı grubu**, **2.868 genel doku/sistem** kaydı. Her kayıtta kart görünmesi, her parçaya özgü klinik metnin tamamlandığı anlamına gelmez. Bu sayılar anatomi uzmanının doğruluk onayı değildir.

26 kas parçasında sinir–damar–kemik ilişki tanımı vardır; 20 tanımda bütün hedefler kaynakta eşleşir, 6 tanımda eksikler bildirilir. Ayrıca 138 parçada motor ilişki tanımı bulunur; bunların 78'inde mevcut sinir geometrisi eşleşir, kalan 60'ında eksik sinir belirtilir. 34 sinir kaydında eşleştirilmiş kas hedefleri; 97 kalp kaydında akış/yapısal ilişki bulunur. Bunlar bütün anatomik bağlantılar değildir.

Kayıt bazında ayrıntı: pakette `ACIKLAMA-KAPSAMI.json`; çalışma alanında `outputs/anatomi-v14-icerik-kapsami.json`.

## Yapılan doğrulamalar

- Yedi GLB dosyasının Draco verisi gerçekten çözüldü; **3.370 mesh katalogla eşleştirildi**.
- Node/JSDOM akışları: referans bazlı görünürlük, arama/sayfalama, kesit/dilim/oblik, gizleme/geri alma, tek yapı/bağlantı, sınav/tekrar, etiket gizleme, favori/not/görünüm, ders açma/kapatma, kamera geri dönüşü ve kapsam bilgileri geçti.
- Analitik kesit alanı/boşluk korunması, fiziksel yeniden kesit koordinatları, eğik görüntü örnekleme ve hacim boyut/SHA-256 denetimleri geçti. Hata toparlama testleri: bozuk yedek, depolama kotası, eski kesit yükleme yanıtı, başarısız referans geçişi ve bozuk sınav kaydı geçti.
- Servis çalışanı test düzeneğinde çekirdek kurulum, eski model önbelleği taşıma, tekrar indirmede dosyaları koruma, ağ kapalı gezinme/varlık alma ve geçersiz ileti reddi geçti.
- Gerçek Chromium uygulama içi tarayıcıda arama, kadın referansına aramadan geçiş, kas bağlantısı, klinik kart/tam okuma, geçersiz yedek reddi, hazır yedek metni, sınav cevabı/modelde inceleme ve gerçek hacim yükleme denendi. Koronal/sagittal tuval boyutları kaynak oranını koruyarak çerçeveye sığdı. Model ve gerçek hacim için çevrimdışı kaydetme başarı durumu görüldü.
- Yerel HTTP sunucusu durdurularak adresin erişilemez olduğu doğrulandı. Tarayıcı yeniden yüklendi; atlas çekirdeği ve ilk kemik/kas görünümü önbellekten açıldı. Retina araması, sonradan açılan sinir modeli/kartı ve gerçek RGB kesit hacmi önbellekten yüklendi. Ardından sunucu yeniden başlatıldı. Bu kontrol bilgisayardaki Chromium içindir; telefon veya tüm dış kaynaklar için çevrimdışı garantisi değildir.
- 320×568, 360×800, 390×844, 430×932, 844×390 ve 390×450 tarayıcı ölçülerinde sayfa taşması ve 3B alan ölçüldü; yatay taşma yok, 3B alanın yüksekliği sıfır değil. Son kısa ekran, daralmış kullanılabilir alan testidir; gerçek telefon klavyesi testi değildir.

## Devam eden veri ve cihaz sınırları

- Kadın üst gövde/üst ekstremite kasları ve kafatası eksikleri devam eder. Ek kadın kaslarının yerleşimi yaklaşık kaynak uyarlamasıdır; nicel karşılaştırma veya hasta ölçümü için anatomik eş-kayıt değildir.
- Gerçek RGB hacmi yalnızca erkek göğsünün **159 mm** kaynak aralığıdır. 384×228×160 örnekleme, 1,76×1,76×1 mm aralık. Tüm vücut, hücresel ayrıntı, BT/MR veya GLB eş-kaydı yoktur. Koronal/sagittal görüntünün kısa görünmesi bu veri sınırını da yansıtır.
- GLB kesim yüzeylerindeki lif/gözenek desenleri temsili eğitim dokusudur; gerçek ölçülmüş organ iç geometrisi değildir. Açık konturlar otomatik kapatılmaz. Kalp/solunum hareketleri biyomekanik simülasyon değildir.
- Eksik Latince adlar, her parçaya özgü klinik içerik, tam damar/sinir/tutunma haritası ve ayrıntılı iç organ geometrisi için kaynak çalışma ve uzman incelemesi gerekir. Genel metinle bu eksikler tamamlanmış sayılmaz.
- Fiziksel Android/iPhone, Safari, gerçek ekran klavyesi, cihaz GPU performansı ve insan anatomi uzmanı değerlendirmesi yapılmadı. APK/iOS mağaza paketi yoktur. Dış kalp gömme referansı çevrimiçidir.
- Uygulama içi tarayıcıda JSON dosyası indirmesinin tamamlanması doğrulanamadı; bu nedenle hazır yedek metni ve kopyalama yolu eklendi. Çalışma verileri hesap/cihaz arasında eşitlenmez.

## İçerik kaynakları

[FIPAT TA2 terim görüntüleyicisi](https://ta2viewer.openanatomy.org/), [OpenStax üst ekstremite kemikleri](https://openstax.org/books/anatomy-and-physiology-2e/pages/8-2-bones-of-the-upper-limb), [alt ekstremite kemikleri](https://openstax.org/books/anatomy-and-physiology-2e/pages/8-4-bones-of-the-lower-limb), [merkezi sinir sistemi](https://openstax.org/books/anatomy-and-physiology-2e/pages/13-2-the-central-nervous-system), [periferik sinir sistemi](https://openstax.org/books/anatomy-and-physiology-2e/pages/13-4-the-peripheral-nervous-system), [duyu algısı](https://openstax.org/books/anatomy-and-physiology-2e/pages/14-1-sensory-perception). Her kart kendi kaynağını gösterir; model atıfları/lisansları `models/` içinde korunur.
