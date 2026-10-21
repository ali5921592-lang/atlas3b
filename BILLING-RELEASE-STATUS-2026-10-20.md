# Abonelik ve mağaza hazırlığı — 20 Ekim 2026

> Tarihsel durum kaydıdır. Güncel, doğrulanmış durum için [21 Ekim kaydına](BILLING-RELEASE-STATUS-2026-10-21.md) bakın.

## Kesinleşen ürün davranışı

- İndirme ücretsizdir. Bu cihazda ilk açılışla başlayan yedi günlük tam erişim ödeme bilgisi istemez; süre sonunda otomatik ücret alınmaz.
- Sonrasında aylık veya yıllık otomatik yenilenen abonelik ya da tek ödemelik ömür boyu erişim seçilebilir. Satın alma kullanıcı seçimiyle Apple/Google mağaza ödeme ekranında başlar.
- Ödeme durumu RevenueCat `atlas_pro` entitlement üzerinden denetlenir. Ücret ve para birimi mağazadan gelir; uygulama sabit fiyat göstermemelidir.
- Yerel deneme cihaz verisi silinince veya uygulama yeniden yüklenince sıfırlanabilir. Kişi başına tek deneme için hesap ve sunucu doğrulaması gerekir; bu sürüm böyle bir garanti vermez.

## Mağazada hedeflenen fiyatlar (henüz tanımlanmadı)

| Pazar | Aylık | Yıllık | Ömür boyu |
| --- | ---: | ---: | ---: |
| Türkiye | 99,99 TL | 549,99 TL | 990 TL |
| ABD ve benzer fiyat düzeyindeki ülkeler | yaklaşık 4,99 USD | yaklaşık 25 USD | yaklaşık 47 USD |

Diğer ülkeler için fiyatlar, mağazaların ülke bazlı fiyat kademeleri, vergi ve para birimi kuralları görüldükten sonra ayrı ayrı girilecek. Tüm gelişmekte olan ülkeleri tek fiyat bölgesi saymayın. Türkiye fiyatları ve deneme akışı kullanıcı tarafından onaylandı.

## Hesap ve derleme durumu

- Google Play taslağı `com.anatomiatlasi.app` (konsol uygulama kimliği `4972748025383490726`) ücretsiz indirme olarak kayıtlı. Play Abonelikler sayfası yeni bir APK/AAB yüklenmesini istiyor; gerçek abonelik ürünleri henüz oluşturulmadı.
- RevenueCat proje kimliği `d9cc12e9`; `atlas_pro` entitlement ve varsayılan offering oluşturuldu. `$rc_monthly`, `$rc_annual`, `$rc_lifetime` paketleri şu anda yalnızca Test Store ürünlerine bağlı. Android uygulama kaydı ve herkese açık SDK anahtarı projeye eklendi. Google Play servis hesabı bağlantısı ve gerçek ürün eşlemesi eksik.
- Apple App Store Connect uygulama kimliği `6823613363`; bundle ID `com.anatomiatlasi.app`. Apple RevenueCat uygulama bağlantısı, özel IAP anahtarı, ürünler ve fiyatlar henüz tamamlanmadı. Apple oturumu yeniden doğrulama gerektirebilir.
- RevenueCat Capacitor SDK, yerel deneme, paywall, satın alma/geri yükleme akışı ve beş dilde koşul/gizlilik sayfaları kodlandı. Gerçek mağaza satın alma testi yapılmadı. iOS herkese açık RevenueCat SDK anahtarı bilinçli olarak boş; iOS ücretli yayın için eklenmesi zorunlu.
- Eski signed AAB/IPA, bu abonelik kodunu içermez. Bu değişiklik için yeni CI imzalı derleme ve fiziksel cihazlarda satın alma/geri yükleme testi gerekir.

## Yayın engelleri

1. OpenStax bağlantılı CC BY-NC-SA 4.0 notlar için ticari kullanım izni doğrulanmadı. Diğer üçüncü taraf model/varlık lisansları ve atıfları da son kez denetlenmeli. Ücretli mağaza yayınına bunlar çözülmeden geçmeyin.
2. Anatomi kapsamı, kadın referansı ve çok dilli klinik metinler uzman incelemesinden geçmedi. Pazarlama metni bunu eksiksiz klinik atlas olarak sunmamalı.
3. Gerçek Apple/Google ürünleri, yerel fiyatlar ve RevenueCat servis bağlantıları tamamlanmalı; sandbox/lisans testleri yapılmalı.
4. Apple App Privacy ve Google Play Data safety, RevenueCat satın alma işleme dahil edilerek son ikili dosya üzerinden beyan edilmeli. Sağlık içeriği ve yaş derecelendirmesi de son içerikle uyumlu olmalı.
5. Mağaza sözleşmeleri ve hesap sahibi tarafından verilmesi gereken yasal/onay adımları ayrı doğrulanmalı; bu kayıt bunların kabul edildiği anlamına gelmez.

Bu belge hazırlık kaydıdır; mağazalara gönderim veya onay kanıtı değildir.
