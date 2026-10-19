# Mağaza hesapları ve taslak durumu — 18 Ekim 2026

Bu kayıt, App Store Connect ve Google Play Console'da gerçekten görülen durumu, mağazaya henüz gönderilmemiş yerel hazırlıklardan ayırır. Mağaza incelemesi veya yayına gönderim yapılmadı.

**19 Ekim ek notu:** Kullanıcı mağazadan ücretsiz indirme, uygulama içinde daha sonra isteğe bağlı satın alma istiyor. Aşağıdaki Google Play formunda 18 Ekim'de seçilen “ücretli” seçenek uygulama kaydı oluşturulmadan önce “ücretsiz” olarak değiştirilmelidir. Uygulama içi satın alma ve yetki akışı henüz yapılmadı; mağaza hesabındaki fiyat ayarları bu notla değiştirilmedi. Yerel Android AAB imzalandı ve doğrulandı. [GitHub çalışmasında](https://github.com/ali5921592-lang/atlas3b/actions/runs/39226770828) imzalı AAB ve App Store IPA üretildi; indirilen AAB imzası, IPA arşivinin yükü ve imza/profil dosyaları kontrol edildi. Bu, mağaza kabulü veya gerçek cihaz testi değildir.

## Apple App Store Connect

- `Anatomi Atlası` uygulama kaydı oluşturuldu. Apple ID: `6823613363`; bundle ID: `com.anatomiatlasi.app`; SKU: `anatomi-atlasi-ios`; sürüm: `1.0`.
- Yayın modu elle yayınlama olarak ayarlandı. İnceleme için kullanıcı hesabı gerekmiyor.
- Türkçe, İngilizce (ABD), Almanca, İspanyolca (İspanya) ve Arapça uygulama adı, alt başlık ve mağaza metinleri taslağa kaydedildi. Kategori Eğitim / Başvuru olarak ayarlandı. Destek ve pazarlama adresleri eklendi. Almanca `koronale Schnitte` terimi düzeltildi.
- İnceleme iletişim e-postası ve telefon numarası, kullanıcının açık onayıyla yalnızca Apple'ın özel inceleme iletişim alanına girildi. Telefon mağaza açıklamasında veya herkese açık sayfalarda yer almıyor.
- Beş dilde herkese açık gizlilik sayfaları ve destek sayfası GitHub Pages üzerinde yayınlandı; her biri HTTP 200 ile doğrulandı. Apple App Privacy içinde beş dilin politika URL'leri ayrı ayrı kaydedildi:
  - Türkçe: https://ali5921592-lang.github.io/atlas3b/privacy-policy.html
  - English: https://ali5921592-lang.github.io/atlas3b/privacy-policy-en.html
  - Deutsch: https://ali5921592-lang.github.io/atlas3b/privacy-policy-de.html
  - Español: https://ali5921592-lang.github.io/atlas3b/privacy-policy-es.html
  - العربية: https://ali5921592-lang.github.io/atlas3b/privacy-policy-ar.html
  - https://ali5921592-lang.github.io/atlas3b/support.html
- Kullanıcının açık izniyle `atekin592@gmail.com` bu sayfalarda herkese açık destek adresi olarak yayımlandı.
- Ekran görüntüsü veya derleme yüklenmedi. Taslakta uygulama simgesi/ekran görüntüsü/derleme varlığı tamamlanmış sayılmaz.
- Apple App Privacy veri toplama beyanı ve yaş derecelendirmesi tamamlanmadı. Uygulamadaki isteğe bağlı Sketchfab gömülü görüntüleyici üçüncü taraf verilerini işleyebilir; nihai imzalı sürüm ve bu entegrasyonun veri uygulamaları kontrol edilmeden “veri toplanmıyor” beyanı yayımlanmadı.
- Apple Developer hesabında güncellenmiş Program License Agreement hâlâ bekliyor; hesap sayfası 29 Ekim 2026'ya kadar kabul edilmesini istiyor. Hesap sahibi şartları kendisi inceleyip kabul etmeli. App Store Connect oturumu şu anda açık ve taslak alanları düzenlenebildi.

## Google Play Console

- İmzalı kullanıcı `Arcadian Store` geliştirici hesabında `Anatomi Atlası` için yeni uygulama formu dolduruldu: Türkçe, oyun değil, ücretli ve `com.anatomiatlasi.app` paket adı kullanılabilir bulundu.
- Uygulama kaydı oluşturulmadı. Geliştirici Program Politikası ve ABD ihracat mevzuatı için gereken hukuki onay kutuları işaretlenmedi. Mevcut ticari içerik hakları açıklığa kavuşmadığından bu beyanları doğrulanmış gibi kabul etmek uygun değil.
- Google Play uygulama kayıt numarası yok; Mağaza girişi ve ekran görüntüleri yüklenmedi.

## Yayına hazır olmasını engelleyen işler

- OpenStax bağlantılı içerik için ticari kullanım izni doğrulanmadı; diğer atlas/model kaynaklarının lisans koşulları ve atıfları da ticari dağıtım için tamamıyla kapatılmadı.
- Uygulamanın anatomik doğruluğu ve beş dildeki metinleri yetkin klinik ve dil editörleri tarafından baştan sona onaylanmadı. Kadın referansının kas-iskelet kapsamı kısmi ve kaynak bileşenleri ayrıdır.
- Apple yaş derecelendirmesi son anatomik/reprodüktif görsellere göre cevaplanmalı; gizlilik beyanı son imzalı ikili dosyaya göre doğrulanmalı.
- Google Play kaydı, hukuki beyanlar doğrulanabilir olduğunda oluşturulmalı; mağaza fiyatı ve dağıtım bölgeleri seçilmedi.
- Apple güncel hesap sözleşmesi hesap sahibi tarafından incelenmeli/kabul edilmeli; her iki platform için imzalı üretim derlemeleri ve gerçek cihaz doğrulaması eksik.
- Son Android, iPhone ve iPad sürümlerinden mağaza ekran görüntüleri daha sonra kullanıcıyla birlikte hazırlanıp yüklenmeli.

Yerel alan metinleri ve hazırlık işaretleri `store/metadata.json` dosyasındadır. Önceki 16 Ekim denetiminde gizlilik/destek sayfalarının 404 olduğu yazıyordu; bu durum 18 Ekim'de düzeltilip GitHub Pages üzerinde doğrulandı. Önceki denetim tarihsel kayıt olarak korunmuştur.
