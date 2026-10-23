# Abonelik ve mağaza durumu — 24 Ekim 2026

Bu kayıt, kod ile mağaza panellerinde doğrulanan durumu ayırır. Genel mağaza yayınına hazır olduğumuzu veya gerçek satın almanın çalıştığını göstermez.

## Uygulama ve derleme

- Native Android/iOS kodunda ödeme bilgisi istemeyen, ilk açılışta başlayan yedi günlük cihaz-yerel erişim; süre bitince aylık/yıllık/ömür boyu seçimli ödeme duvarı; RevenueCat `atlas_pro` kontrolü, satın alma ve geri yükleme akışı vardır. Web sürümünde mağaza satın alması yoktur. Cihaz verisi silinirse deneme yeniden başlayabilir.
- Android RevenueCat genel SDK anahtarı kodda vardır. **iOS SDK anahtarı boştur; iOS satın alma çalışır durumda değildir.**
- [GitHub Actions çalıştırması 39937332911](https://github.com/ali5921592-lang/atlas3b/actions/runs/39937332911) bütün işleri başarıyla bitirdi; iOS IPA doğrulaması ve App Store Connect aktarımı araç günlüklerinde başarılıdır. Apple'ın derlemeyi TestFlight'ta işlediği ve satın almanın çalıştığı ayrıca doğrulanmadı.
- Otomatik IPA yükleme workflow değişikliği `codex/anatomy-release-prep` dalındadır. Varsayılan `main` dalına henüz alınmadığından `main` üzerindeki her push için otomatik yükleme henüz etkin değildir.

## Google Play

| Ürün | ABD | Türkiye | Son doğrulanan durum |
| --- | ---: | ---: | --- |
| `atlas_monthly:monthly-auto` | 4,99 USD/ay | 99,99 TL/ay | Temel plan etkin |
| `atlas_yearly:yearly-auto` | 24,99 USD/yıl | 549,99 TL/yıl | Temel plan etkin |
| `atlas_lifetime:lifetime-buy` | 46,99 USD | 989,99 TL | Satın alma seçeneği etkin |

Fiyatlar yalnız ABD ve Türkiye için ayarlıdır. Uygulamanın mağazadan indirilmesi ücretsizdir. Önceden yüklenmiş imzalı AAB (sürüm kodu 1, görünen sürüm 1.0) 24 Ekim'de **dahili test** kanalında etkinleştirildi; yalnız `atekin592@gmail.com` adresinin bulunduğu ayrı test listesi seçildi. Konsol bu sürümü "İncelenmedi" ve geçici uygulama adıyla gösteriyor. Kapalı test Alpha taslağı ayrıca duruyor. Bu işlem herkese açık üretim yayını değildir.

## RevenueCat

- `d9cc12e9` projesinde Android uygulaması, `atlas_pro` entitlement'ı ve aylık/yıllık/ömür boyu Play ürünleriyle varsayılan offering kayıtlıdır. Özel uygulama içi ödeme duvarı kodlanmıştır; RevenueCat'in sunucu tarafından yönetilen Paywalls ekranında ayrıca bir paywall yoktur.
- Google servis hesabı JSON'u RevenueCat'e yüklenmiştir. 24 Ekim'deki yeniden kontrolde ürün kataloğu ve temel planlar okunabiliyor; **abonelik satın alımı yetkisi doğrulanamıyor**: "No application was found for the given package name." Dahili sürüm yeni etkinleştirildiği için Google yayılımı sonrasında yeniden denetlenmeli; gerçek sandbox satın alma/geri yükleme testi yapılmadı.
- iOS uygulaması RevenueCat projesine eklenmedi. Form, App Store Connect'teki ayrı In-App Purchase `.p8` anahtarını ve kimliklerini zorunlu tutuyor. Mevcut CI yükleme anahtarı bu anahtarın yerini almıyor. iOS ürünleri ve offering eşlemeleri yok.

## Apple

- App Store Connect hesabındaki Paid Apps Agreement, bankacılık ve vergi kayıtları etkin görünüyordu. Buna rağmen Apple Developer hesabı 24 Ekim'de güncel Program License Agreement için **Review agreement** uyarısını gösterdi. Hesap sahibinin sözleşmeyi bizzat inceleyip kabul ettiği ekranda henüz doğrulanmadı.
- Apple aylık/yıllık abonelik grubu ve ömür boyu uygulama içi satın alma ürünü oluşturulmadı; ülke fiyatları, yerelleştirme, RevenueCat iOS bağlantısı ve sandbox testleri yapılmadı. App Store Connect tarayıcı oturumu yeniden giriş sayfasına döndü.

## Yayın öncesi engeller

1. OpenStax ile ilişkili CC BY-NC-SA içerik ve üçüncü taraf görsellerin ticari hakları kesinleştirilmeli veya sorunlu içerikler gerçekten bağımsız/uygun lisanslı karşılıklarla değiştirilmelidir.
2. Kadın anatomisi, Latince eşlemeler, kartlar ve beş dilin klinik/terminolojik doğruluğu uzman tarafından doğrulanmalıdır. "Eksiksiz" veya klinik karar desteği iddiası kullanılmamalıdır.
3. Apple IAP ve RevenueCat iOS kurulumu, Google işlem doğrulaması, gerçek sandbox satın alma/geri yükleme, Android/iPhone/tablet cihaz denetimleri tamamlanmalıdır.
4. Son ikili dosyanın veri akışına göre Apple App Privacy ve Google Play Data safety beyanları; yaş/sağlık içerik beyanları; mağaza metinleri ve ekran görüntüleri tamamlanmalıdır.

RevenueCat'in [Google Play kimlik bilgisi sorun giderme belgesi](https://www.revenuecat.com/docs/service-credentials/creating-play-service-credentials/troubleshooting), yeni uygulamada paket adının ilk yükleme ve mağaza hazırlığı tamamlanmadan API'de görünmeyebileceğini ve yetki değişikliklerinin yayılmasının zaman alabileceğini belirtiyor.
