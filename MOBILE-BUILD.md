# Android ve iOS paketleri

Node 22+, JDK 21 ve Android SDK 36 ile:

```sh
npm ci
npm test
npm run native:sync
npm run android:build
python3 scripts/check-android-assets.py
```

Windows'ta JAVA_HOME JDK 21'i göstermelidir; Android SDK yolu android/local.properties içinde tanımlanabilir. Yerel dosya Git'e gönderilmez.

Son kontrol APK/AAB içindeki tüm web dosyalarını kaynaklarıyla bayt bazında karşılaştırır; kesit hacmini açıp SHA-256 değerini doğrular. Windows'ta `python3` yerine kurulu Python yürütücüsü kullanılabilir. Sıkıştırılmış kesit verisi `.bin` uzantısı taşır; bu, Android paketleyicisinin `.gz` dosyalarını otomatik açıp adını değiştirmesini önler.

- `android/app/build/outputs/apk/debug/app-debug.apk`: test için debug anahtarıyla imzalı APK.
- `android/app/build/outputs/bundle/release/app-release.aab`: `ANDROID_UPLOAD_KEYSTORE_PATH`, `ANDROID_UPLOAD_STORE_PASSWORD`, `ANDROID_UPLOAD_KEY_ALIAS` ve `ANDROID_UPLOAD_KEY_PASSWORD` sağlandığında yükleme anahtarıyla imzalı AAB; bunlar yoksa imzasız AAB. Google Play'e göndermeden önce son dosyayı `jarsigner -verify` ile kontrol edin ve çıktıda **`jar verified.`** yazdığını doğrulayın; yalnızca çıkış kodu imzasız dosyayı ayırt etmeyebilir. Anahtarlar depoya konmamalıdır.
- `ios/App/App.xcodeproj`: iOS 17+ hedefleyen gerçek iOS projesi. Mac üzerinde Xcode 26+ ile açın, Signing & Capabilities'de kendi Apple Developer takımınızı seçin. Product → Archive → Distribute App ile uygun imzalı IPA oluşturun. Bu Windows ortamında IPA derlenmedi veya imzalanmadı.

21 Ekim'de abonelik kodunu içeren yeni imzalı AAB ve IPA GitHub Actions üzerinde üretildi; AAB Google Play kapalı test sürümünün taslağına yüklendi. Dosyalar, doğrulama özetleri ve açık ödeme/lisans engelleri [BILLING-RELEASE-STATUS-2026-10-21.md](BILLING-RELEASE-STATUS-2026-10-21.md) içindedir. iOS ücretli sürüm için RevenueCat yapılandırması ve gerçek cihaz testi ayrıca gereklidir.

GitHub Actions varsayılan Android ve macOS 26 iOS simülatör derlemelerini içerir. Play Console'a yalnız **`PLAY-CONSOLE-UPLOAD-SIGNED-AAB`** artifact'ındaki `insan-atlasi-3b-v3-play-signed.aab` dosyasını yükleyin. `android-debug-apk-NOT-FOR-PLAY` yalnız test içindir; varsayılan derlemede oluşan imzasız AAB artifact olarak sunulmaz. `codex/anatomy-release-prep` veya `main` dalına gönderimde imzalı AAB işi otomatik çalışır; Actions ekranında `build_signed_android` seçeneğiyle de başlatılabilir. `build_signed_ipa` seçeneği App Store IPA işini başlatır. [19 Ekim 2026 çalışmasında](https://github.com/ali5921592-lang/atlas3b/actions/runs/39226770828) dört iş de başarılı oldu. Artifact'tan indirilen AAB'de `jar verified.` görüldü; IPA arşivinde `Payload/App.app`, kod imzası ve gömülü dağıtım profili bulundu. Simülatör `.app` dosyası iPhone'a yüklenebilir IPA değildir. Mağaza yüklemesi, kabulü ve fiziksel cihaz testi ayrıca gereklidir.

Tüm yerel modeller, kesit hacmi ve çeviriler native paketle birlikte gelir. İlk yerel kullanımda ağ indirmesi gerekmez. İnternet üzerindeki kaynak makaleleri ve ayrıntılı kalp referansı bağlantıları ağ gerektirir. Fiziksel Android/iPhone, Safari/WebView performansı ve dağıtım imzası ayrıca kontrol edilmelidir.

Kaynaklar: https://capacitorjs.com/docs/updating/8-0 ve https://capacitorjs.com/docs/ios
