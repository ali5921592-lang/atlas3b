# Mağaza ve ödeme durumu — 25 Ekim 2026

Bu kayıt yalnız doğrulanmış panel ve kod durumunu özetler. Ürünler henüz genel mağaza incelemesine veya üretim yayınına gönderilmedi.

## Uygulama adı

Apple ve Google Play taslakları ile Android, iOS ve web kaynakları şu yerel adlarla eşlendi: Türkçe **İnsan Atlası 3B**, İngilizce **Human Atlas 3D**, Almanca **Atlas des Menschen 3D**, İspanyolca **Atlas Humano 3D**, Arapça **أطلس الإنسان 3D**. Apple'ın ilk İngilizce ad olan “Human Atlas” için kullanım çakışması uyarısı üzerine 3D eki kullanıldı. Apple birincil dil Türkçe olarak kaydedildi. Google Play'in beş dildeki ad, kısa açıklama ve tam açıklama kayıtları taslak olarak kaydedildi.

## Apple ürünleri

- App Store Connect Business ekranında Paid Applications Schedule etkin olarak doğrulandı.
- `Atlas Pro` abonelik grubu (`22509776`) oluşturuldu ve beş dilde grup adı kaydedildi.
- `atlas_monthly` aylık aboneliği (`6826543394`), ABD **4,99 USD** ve Türkiye **99,99 TL** olarak; `atlas_yearly` yıllık aboneliği (`6826614014`), ABD **24,99 USD** ve Türkiye **549,99 TL** olarak kaydedildi. Beş dilde ad ve açıklamaları var. İkisi de **Prepare for Submission** durumunda; başka ülkelerdeki fiyatlar Apple'ın otomatik hesapladığı değerlerdir.
- Tek seferlik, tüketilemeyen `atlas_lifetime` (`6826688873`) ürünü **Prepare for Submission** durumunda oluşturuldu. ABD **46,99 USD**, Türkiye **989,99 TL** fiyatları, tüm ülkelerde kullanılabilirlik ve beş dilde ürün adı/açıklaması kaydedildi. İnceleme ekran görüntüsü ve gerçek satın alma testi bekliyor.

## RevenueCat iOS bağlantısı

- App Store uygulaması `com.anatomiatlasi.app`, RevenueCat proje `d9cc12e9` içinde `app7927b2333a` kimliğiyle oluşturuldu. Apple In-App Purchase anahtarı `BCN9B849GW` yüklendi; panel **Valid credentials** gösterdi. Özel `.p8` içeriği depoya veya uygulamaya eklenmedi.
- `atlas_monthly`, `atlas_yearly` ve tüketilemeyen `atlas_lifetime` iOS ürünleri RevenueCat'e eklendi. Üçü de `atlas_pro` yetkisine bağlandı. Varsayılan teklifte `$rc_monthly`, `$rc_annual` ve `$rc_lifetime` paketlerine sırasıyla eşlendi; kaydedilmiş teklif ekranında üç eşleme doğrulandı.
- RevenueCat'in **genel** iOS SDK anahtarı `dist/billing-config.js` dosyasına eklendi ve `npm run native:sync` ile iOS/Android web varlıklarına kopyalandı. `npm test` geçti. Bu adımlar cihazda satın alma testinin yerini tutmaz.
- App Store Connect > App Information bölümünde RevenueCat'in bu uygulamaya özel Apple Server Notification URL'si hem **Production Server URL** hem **Sandbox Server URL** alanına kaydedildi. İki alanın kayıtlı değerleri arayüzde doğrulandı; henüz gerçek bir olay teslimi görülmedi.
- GitHub Actions'ın `40198896293` çalışmasında Android, iOS simülatör ve imzalı App Store IPA işleri **success** tamamlandı. App Store Connect TestFlight ekranında **1.0 (Build 23), Ready to Submit** görüldü; bu Apple'a yükleme ve işlemeyi doğrular, genel yayın anlamına gelmez. `*.p8` dosyaları `.gitignore` kapsamına alındı.

## Çalışmayan veya doğrulanmayan akışlar

- iOS RevenueCat uygulaması ve ürün eşlemesi kuruldu; App Store Connect API bağlantısı henüz eklenmediği için RevenueCat'te otomatik ürün içe aktarma/fiyat senkronizasyonu açık değil. Ürünler elle eşlendi. Bildirim URL'leri kayıtlı olsa da yenileme/iptal/iade olaylarının uçtan uca teslimi henüz test edilmedi.
- Android yerelleştirilmiş ad kaynakları `:app:processDebugResources` derlemesinden geçti. Beş web dilinde başlık değişimi tarayıcıda doğrulandı; iOS projesi ayrıştırılabildi ancak yeni iOS ikilisi cihazda henüz test edilmedi.
- Gerçek iOS/Android sandbox satın alma, abonelik yenileme, iptal ve geri yükleme testleri yapılmadı. Yedi günlük yerel deneme, cihaz verileri silinirse yeniden başlayabilir.
- Google Play ürünleri ve dahili test sürümü için önceki doğrulamalar [24 Ekim kaydında](./BILLING-RELEASE-STATUS-2026-10-24.md) yer alır. Bu kayıt yeni satın alma doğrulaması yapıldığı anlamına gelmez.
- Eski ekran görüntüleri yeni markayı yansıtmıyor; nihai ikili dosyadan yeniden çekilip mağazalara ayrıca yüklenmeli. Apple/Google gizlilik ve sağlık beyanları ile içerik hakları ve uzman anatomik inceleme kapanmadan genel yayın yapılmamalı.
