# Store submission preparation

Prepared 14 October 2026. This package reduces known submission gaps; Apple and Google make the final decision and approval cannot be guaranteed.

## Prepared in this repository

- Localized Apple and Google listing copy in Turkish, English, German, Spanish, and Arabic: `store/metadata.json`. `node tests/store-metadata.mjs` checks current field-length limits and the image dimensions below.
- App Store review notes in English and Turkish are in the same JSON. They describe where to find the model selector, layer controls, search, structure cards, relations, and section planes without account credentials.
- Original app icon source: `store/app-icon.svg`; Google Play feature graphic source: `store/google-feature-tr.svg`. Rendered assets are in `store/` and are installed into iOS, Android, and web icon locations by `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/build-store-art.ps1`.
- The Play listing icon is 512×512 px, the feature graphic is 1024×500 px, and the iOS app icon is 1024×1024 px.
- Three genuine app captures from the Pixel 7 Android emulator (1080×1920): male atlas, female atlas, and section controls in `store/screenshots/android/`. These are emulator captures, not physical-device or iOS review evidence.
- Android compile/target SDK are 36. New Google Play submissions from 31 August 2026 must target API 36 or higher; this project meets that source configuration requirement. Verify the final signed artifact before uploading.
- On 19 October, the local Android build produced `android/app/build/outputs/apk/debug/app-debug.apk` and an upload-key-signed `android/app/build/outputs/bundle/release/app-release.aab`. The latter passed `jarsigner -verify`, and both packages passed the packaged-web-asset comparison. This confirms local packaging, not Google Play acceptance or the cloud build. `npm test` passes.
- Current source/dependency review finds no account, ad, analytics, or health-data SDK. Notes, preferences, and favorites stay on device; reference websites open only when the user taps a source link. Re-audit the final signed binary before making either store's privacy declaration.
- Google Play health-app declaration: select **Medical Reference and Education** for this anatomy education/reference app. Do not declare it a medical device or clinical decision-support tool while it remains an educational atlas without patient-specific inputs or recommendations. Reassess if the intended use or functionality changes.

## Required in the developer consoles

These items depend on the account holder or actual release device and cannot be truthfully manufactured in the repository:

1. Verify the legal publisher identity and business details. The user supplied Ahmet Tekin as the contact name and approved `atekin592@gmail.com` as a public support address; the email is now published on the policy and support pages. Verify the legal seller identity before entering it in the consoles.
2. **Completed 18 October 2026:** privacy and support pages were published on GitHub Pages and returned HTTP 200. URLs: `https://ali5921592-lang.github.io/atlas3b/privacy-policy.html` and `https://ali5921592-lang.github.io/atlas3b/support.html`.
3. In App Store Connect, the app record and five localized description/keyword sets have been saved. Complete the app privacy details against the final signed binary, age-rating questionnaire, content-rights declaration, localized app name/subtitle, and territories. The user's current plan is **free download with a later optional in-app purchase**; no purchase or entitlement flow has been implemented, so do not advertise one yet. Choose any regulated-medical-device declaration from the actual product/legal status; do not infer it from this educational build.
4. In Play Console, an earlier Turkish draft form selected **paid up front**, but the app record was not created. Change that selection to **free** before creating the record, consistent with the user's current plan; do not submit the older draft as paid. The required developer-policy and US export-law attestations remain unchecked. Resolve the truthful legal declarations first; then complete territories, content rating, Data safety answers, Health apps declaration, target audience, app access, and the store listing. Recheck the final signed binary and bundled dependencies before submitting declarations.
5. Answer age/content questions against the actual final imagery. The anatomy catalog contains reproductive structures and cutaway imagery; do not guess a rating or choose a children's audience without reviewing the shipped experience and applicable questionnaire.
6. Capture screenshots from the final running app on supported iPhone/iPad and Android devices. Do not use mockups or website captures as if they were device screenshots. Apple currently requires at least one supported iPhone screenshot and, when iPad is supported, one 13-inch iPad screenshot.
7. Test the signed builds on physical devices, including first launch, offline use, structure selection, search, section controls, screen rotation/safe areas, local notes, memory/performance, and recovery from a failed model load. Pixel 7 emulator testing showed the male atlas rendering and female reference loading, but the first 3D model load took about 40 seconds. No physical-device test or measured cold-start target has been completed; optimize and verify startup before release.
8. The account holder must review and accept any pending Apple Developer agreements. Android and iOS signing secret names are present in GitHub Actions. The [19 October cloud run](https://github.com/ali5921592-lang/atlas3b/actions/runs/39226770828) produced a signed Android AAB and App Store IPA; both artifacts were downloaded and structurally checked. No physical-device or store-upload validation has been completed. Keep all signing secrets out of Git.
9. Resolve OpenStax rights before a paid release: the app's source dialog links its *Anatomy and Physiology 2e*-supported study notes and labels them CC BY-NC-SA 4.0. Request commercial permission from OpenStax or remove/rewrite those notes independently. Then finish the rights review for every model, atlas-derived term, image, and bundled volume; preserve attribution, license links, modification notices, and ShareAlike availability where required. Replacing the earlier noncommercial kidney and inner-ear meshes did not clear the rest of the mixed-source package.
10. Upload the signed build, provide all final metadata, and submit through the developer consoles. Store acceptance, pricing, age rating, and publication timing remain decisions of the platforms and account holder.

## Release boundaries

The atlas is educational, not patient-specific. It must not be marketed as exhaustive, clinically validated, diagnostic, or treatment guidance. The female model has known coverage differences; some of the 3,370 catalog records have Latin-name matches pending, and many explanations are group-level rather than specific to the selected substructure. Translation and clinical-editor review are still outstanding. Keep these facts visible in the product description and app review notes.

## Account setup update — 18 October 2026

The live account and remaining release gates are tracked in `STORE-ACCOUNT-STATUS-2026-10-18.md`. The privacy/support 404 statement in the 16 October audit below is historical and was resolved on 18 October. No store review submission or publication has occurred. Store screenshots remain deferred for a later, user-approved capture and upload session.

### Platform references checked 14 October 2026

- [Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Apple screenshot specifications](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/)
- [Apple app privacy details](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy/)
- [Google Play health-app declaration](https://support.google.com/googleplay/android-developer/answer/14738291?hl=en)
- [Google Play target API requirements](https://support.google.com/googleplay/android-developer/answer/11926878?hl=en)
- [Google Play intellectual-property policy](https://support.google.com/googleplay/android-developer/answer/9888072?hl=en)
# Güncel durum — 16 Ekim 2026

Ücretli mağaza yayınına hazır değil. Güncel kaynak ayrımı, içerik/çeviri kapsamı, lisans ve imza denetimi: `outputs/YAYIN-HAZIRLIK-DENETIMI-2026-10-16.md`. Mağaza açıklamalarına beş dilde tıbbi cihaz olmadığı, kapsam sınırları ve eksik çeviriler için İngilizce kullanıldığı eklendi. Önceki ekran görüntüleri güncel kaynak seçiciyi göstermiyor; yeni son sürümden yeniden alınmalı.
