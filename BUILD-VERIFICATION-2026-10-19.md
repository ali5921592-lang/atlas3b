# Mobil derleme doğrulaması — 19 Ekim 2026

[GitHub Actions çalışması 39226770828](https://github.com/ali5921592-lang/atlas3b/actions/runs/39226770828) dört işi başarıyla bitirdi: Android debug, iOS simülatör, yükleme anahtarıyla imzalı Android AAB ve App Store için imzalı IPA. İş akışı `codex/anatomy-release-prep` dalında çalıştı. Depoda anahtar veya parola tutulmaz; GitHub Actions secret'ları kullanıldı.

İndirilen AAB: `outputs/mobile/ci-aab/app-release.aab` (90.623.171 bayt). `jarsigner -verify` çıktısında `jar verified.` görüldü. SHA-256: `C5B1D71CEC1DF649269FC6C1ACBDCEED88BA31CD19092F45D92A176225FFAAF8`.

İndirilen IPA: `outputs/mobile/ipa/App.ipa` (88.852.434 bayt). ZIP içinde `Payload/App.app/Info.plist`, `_CodeSignature/CodeResources` ve `embedded.mobileprovision` bulundu. SHA-256: `38A35D335550AF04D46B068AD2277D700C1694D2E73EC6AB4211D4CE75CD6A53`.

Bu iki yerel dosya `outputs/` altında tutulur ve Git'e eklenmez. GitHub artifact'ları ayrıca çalışma sayfasından indirilebilir. Başarılı derleme ve imza kontrolü; Apple/Google mağaza kabulü, iPhone/Android fiziksel cihaz davranışı, klinik doğruluk veya ticari içerik hakları anlamına gelmez. Mağaza yüklemesi yapılmadı.
