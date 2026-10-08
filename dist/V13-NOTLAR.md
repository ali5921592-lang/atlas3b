# V13 — Telefon, gerçek kesit ve klinik çalışma kartları

## Uygulanan değişiklikler

- Dikey telefon düzeni; güvenli ekran kenarları, bağımsız kaydırılan paneller, büyütülebilen yapı kartı ve dokunma kontrolleri.
- Kurulu web uygulaması için `portrait-primary` yön tercihi.
- Gerçek hacimde Aksiyel / Koronal / Sagittal / Üçü birden seçimi. Fotoğraflar fiziksel piksel aralıklarına göre oranlanır, kaynak sınırlarının tamamı ekrana sığdırılır. Tıklama koordinatı görüntünün kendi sınırından hesaplanır.
- Latince ad tüm öğrenme düzeylerinde görünür. Türkçe, İngilizce ve Latince arama.
- Klinik sekmesinde normal işlev, hasar ve kayıp, doku düzeni, anatomik bağlantılar, inceleme noktaları ve kaynaklar.
- Belirli kaslarda hareket, origo, insertio ve motor sinir; belirli periferik sinirlerde hedefler ve lezyon düzeyi ayrımı.

## Doğrulanmış içerik kapsamı

3.370 model kaydı: 2.699 kaynakla eşleştirilmiş Latince ad; 671 eşleştirme bekliyor. Aynı anatomik yapının sağ/sol model kayıtları ayrı sayılır.

Yeni klinik kartlarda 257 kayıt yapı/organ düzeyinde, 107 ana organ düzeyinde, 3.006 doku/sistem düzeyinde not içerir. Önceden mevcut yapıya özel görev açıklamaları korunur. Genel notlar her parçaya özel doğrulanmış açıklama sayılmaz. Alt parçaya bütün organın kayıp sonucu uygulanmaz. Parçaya özel içeriği eksik kayıtlar uygulamada açıkça belirtilir.

Terim kaynağı: IFAA / Open Anatomy TA2 Viewer, TA2 2.07: https://ta2viewer.openanatomy.org/ . Tamamlayıcı sözlük: https://github.com/nqwrc/3d-anatomy/blob/master/public/data/lexicon.json . Kaynakta standart dışı olarak işaretli adlar bu durumuyla gösterilir. Terimler değiştirilmeden eşleştirilmiştir; uygulama modeli için resmî doğruluk onayı değildir.

Klinik notların kaynakları kartların içindedir: OpenStax Anatomy and Physiology, NCBI Bookshelf, MRC periferik sinir muayene rehberi, NIDDK ve CDC. Klinik editör incelemesi bekliyor. Kişisel tanı veya tedavi önerisi değildir.

## Gerçek kesit verisinin sınırı

NLM Visible Human erkek göğüs hacmi: 384 × 228 × 160 RGB örnek; yaklaşık 1,76 × 1,76 × 1 mm aralık. İlk ve son kesit merkezleri arasında 159 mm vardır. Koronal görünüm yaklaşık 676 × 160 mm, sagittal görünüm 401 × 160 mm görüntü alanı gösterir. Göğsün devamı veya tüm vücut bu veri içinde bulunmaz. Bu sınıra bağlı bant biçimi ekran kırpılması değildir.

Hacim GLB yüzey modeliyle hizalanmamıştır. DICOM hasta yön matrisi yoktur; fotoğrafın özgün yönü korunmuştur. Kaynaklar arasındaki kaymalar düzeltilmemiştir. Mikroskobik veya hücresel ayrıntı sunmaz.

## Kontroller

- Entegrasyon: arama, kadın/erkek kapsamı, tek yapı ve bağlantılar, kesit açma/kapatma, kaydedilen notlar ve görüntüler, soru akışı, klinik sekmesi ve kart büyütme.
- 3.370 kart için boş alan, kaynak bağlantısı ve kapsam denetimi.
- Hacim: üç düzlemin piksel indeksleri, dosya boyutu ve SHA-256, 160 ardışık kaynak, bağlı nokta, kaydırıcı sınırları, fiziksel görüntü oranı ve düzlem değişimi.
- Tarayıcıda 320 × 568, 360 × 800, 390 × 844, 430 × 932 dikey görünüm; koronal/sagittal görüntü sığması ve yatay taşma kontrolü.

Gerçek Android/iOS cihaz performansı, sistem klavyesi, tüm cihazların güvenli kenar davranışı ve tıbbi uzman onayı henüz doğrulanmadı. Her bileşenin özel Latince ve klinik içeriği tamamlanmış değildir.
