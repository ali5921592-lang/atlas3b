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
- `android/app/build/outputs/bundle/release/app-release.aab`: yayın anahtarı sağlanmadığında imzasız AAB. Bu dosya Google Play'e doğrudan yüklenemez. Kendi dağıtım anahtarınızla imzalanmalıdır; anahtarlar depoya konmamalıdır.
- `ios/App/App.xcodeproj`: iOS 17+ hedefleyen gerçek iOS projesi. Mac üzerinde Xcode 26+ ile açın, Signing & Capabilities'de kendi Apple Developer takımınızı seçin. Product → Archive → Distribute App ile uygun imzalı IPA oluşturun. Bu Windows ortamında IPA derlenmedi veya imzalanmadı.

GitHub Actions Android derlemesi ve macOS 26 üzerinde iOS simülatör derlemesi içerir. Simülatör `.app` dosyası bir iPhone'a yüklenebilir IPA değildir. İş akışı dosyası oluşturulması, uzaktaki derlemenin başarılı olduğunu kanıtlamaz.

Tüm yerel modeller, kesit hacmi ve çeviriler native paketle birlikte gelir. İlk yerel kullanımda ağ indirmesi gerekmez. İnternet üzerindeki kaynak makaleleri ve ayrıntılı kalp referansı bağlantıları ağ gerektirir. Fiziksel Android/iPhone, Safari/WebView performansı ve dağıtım imzası ayrıca kontrol edilmelidir.

Kaynaklar: https://capacitorjs.com/docs/updating/8-0 ve https://capacitorjs.com/docs/ios
