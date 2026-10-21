# Abonelik ve mağaza hazırlığı — 21 Ekim 2026

## Uygulamada mevcut akış

- İndirme ücretsizdir. İlk açılışta bu cihazda yedi günlük tam erişim başlar; ödeme bilgisi istenmez ve sürenin sonunda otomatik ücret alınmaz.
- Süre bitince kullanıcı aylık veya yıllık otomatik yenilenen abonelik ya da tek seferlik ömür boyu erişim seçebilir. Satın alma yalnızca mağaza ödeme ekranındaki kullanıcı onayıyla tamamlanır.
- Native iOS/Android uygulaması RevenueCat `atlas_pro` entitlement durumunu denetler. Satın alma, geri yükleme ve mağazadan gelen yerel para birimi/fiyat gösterimi kodlanmıştır. Tarayıcı sürümünde mağaza satın alması yoktur.
- Bu deneme cihaz verisinde tutulur; uygulama verisi silinince veya uygulama yeniden yüklenince sıfırlanabilir. Kişi başına tek deneme garantisi verilmez.

## Google Play Console'da doğrulanan taslaklar

Uygulama `com.anatomiatlasi.app` (konsol kimliği `4972748025383490726`) ücretsiz indirme olarak kayıtlıdır. Yeni abonelik kodunu içeren, yükleme anahtarıyla imzalı AAB **Kapalı test - Alpha taslak sürümüne** yüklendi; incelemeye veya kullanıcılara gönderilmedi.

| Ürün | Plan / tür | ABD | Türkiye | Durum |
| --- | --- | ---: | ---: | --- |
| `atlas_monthly` | `monthly-auto`, aylık yenileme | 4,99 USD | vergiler dahil 99,99 TL | Taslak |
| `atlas_yearly` | `yearly-auto`, yıllık yenileme | 24,99 USD | vergiler dahil 549,99 TL | Taslak |
| `atlas_lifetime` | `lifetime-buy`, tek seferlik satın alma | 46,99 USD | vergiler dahil 989,99 TL | Taslak |

Üç ürün şimdilik yalnızca ABD ve Türkiye için seçildi. Yıllık ürünün avantajları/adı/açıklaması, ömür boyu ürünün adı/açıklaması Türkçe, İngilizce, Almanca, İspanyolca ve Arapça olarak kaydedildi. Aylık ürünün aynı beş dildeki metinleri de kaydedildi. Google Play fiyat girişi vergi ve yuvarlama nedeniyle hedef rakamlardan farklı olabilir; yukarıdaki rakamlar konsolda **son gösterilen** fiyatlardır. Bu ürünleri etkinleştirmeden veya test sürümünü incelemeye göndermeden önce haklar ve ödeme bağlantıları tamamlanmalıdır.

## RevenueCat ve Apple durumu

- RevenueCat proje kimliği `d9cc12e9`; Android uygulaması ve `atlas_pro` entitlement vardır. Android aylık, yıllık ve ömür boyu ürün kayıtlarının her biri `atlas_pro` entitlement'a bağlandı. Varsayılan offering'in aylık/yıllık/ömür boyu paketlerinde hem Play ürünleri (`atlas_monthly:monthly-auto`, `atlas_yearly:yearly-auto`, `atlas_lifetime`) hem Test Store ürünleri görünür. Google Play servis hesabı JSON'u yüklenmediğinden RevenueCat mağaza durumunu doğrulayamadı (`Could not check`); gerçek satın alma/geri yükleme testi tamamlanmadı.
- Apple App Store Connect taslak uygulaması `6823613363`, bundle ID `com.anatomiatlasi.app`. Apple ürünleri/fiyatları, RevenueCat Apple uygulaması ve IAP anahtarı henüz doğrulanmış biçimde kurulmadı. iOS herkese açık RevenueCat SDK anahtarı boş olduğundan iOS ücretli erişim yayımlanmaya hazır değildir. Hesap oturumu ve bekleyen geliştirici sözleşmesi ayrıca kontrol edilmelidir.
- Abonelik kodunu içeren yeni AAB, [GitHub Actions 39396558693](https://github.com/ali5921592-lang/atlas3b/actions/runs/39396558693) içindeki imzalı Android işinden indirildi. Dosya `outputs/mobile/subscription-aab/app-release.aab` (93.773.058 bayt), SHA-256 `21A1D7C02E49A64185539FB0803150CB46C9316ECECC828FAEB074FAA011E24C`; `jarsigner -verify` çıktısı `jar verified.` oldu. Bu iş akışının tamamı önceki iOS imza hatası yüzünden başarısızdır.
- Düzeltilmiş [GitHub Actions 39396907558](https://github.com/ali5921592-lang/atlas3b/actions/runs/39396907558) Android, iOS simülatör, imzalı AAB ve imzalı IPA işlerini başarıyla bitirdi. İndirilen `outputs/mobile/subscription-ipa/App.ipa` 95.204.860 bayt; SHA-256 `6BE6090F3D477337232BC996CF9D5A76B4DC1357B7DCEBF43142E4511727827B`. IPA'da kod imzası ve gömülü dağıtım profili bulundu. Bu dosyalar Git'e eklenmez.

## Mağaza gönderimi öncesi açık engeller

1. OpenStax ile ilişkili CC BY-NC-SA 4.0 açıklamaların **ticari kullanım izni doğrulanmadı**; diğer üçüncü taraf model/terim/hacim kaynaklarının hak zinciri de eksik. Ücretli yayın öncesinde izin veya bağımsız yeniden yazım/uygun lisanslı içerik gerekir.
2. Kadın anatomisi eksiksiz değildir; Latin eşlemeleri ve bazı kartlar genel düzeydedir. Klinik doğruluk ve beş dilin uzman incelemesi bekler. Uygulama klinik karar desteği veya eksiksiz atlas olarak tanıtılmamalıdır.
3. Google Play servis hesabı ile RevenueCat işlem doğrulaması, Apple IAP ürünleri/anahtarları, sandbox satın alma/geri yükleme ve fiziksel cihaz testleri tamamlanmadı. Yedi günlük cihaz-yerel deneme, yeniden yüklemede tekrarlanabilir.
4. Apple App Privacy ve Google Play Data safety son imzalı ikili dosya ile RevenueCat veri akışına göre yeniden beyan edilmeli; yaş/sağlık içeriği, ekran görüntüleri ve mağaza sözleşmeleri son ürün üzerinden doğrulanmalıdır.

Bu kayıt taslak/derleme durumunu gösterir; mağaza incelemesi, yayını, satın alma başarısı veya tıbbi doğruluk kanıtı değildir.
