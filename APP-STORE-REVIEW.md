# App Store submission readiness

**19 October 2026 status: NOT READY for store release.** The public privacy/support URLs now return HTTP 200. Local and GitHub-built Android AAB files passed signature checks, and the GitHub macOS job exported an App Store IPA artifact with an app payload, code signature and embedded profile. Female source frames are isolated instead of mixing unregistered donor geometry, but 608 of 3,370 unique source mesh records still lack a verified Latin mapping and most cards remain general/parent-level. Clinical/language review, commercial content rights, physical-device testing and store submission remain open. The 16 October audit in `outputs/YAYIN-HAZIRLIK-DENETIMI-2026-10-16.md` is historical; its 404/unsigned-AAB findings no longer describe the 19 October state. Earlier checklist entries are preparation notes, not proof of submission readiness.

This checklist describes the current source package; it is not an App Store approval claim.

## Prepared in the app

- iPhone orientation is portrait-only; iPad retains all orientations.
- Privacy and support pages are included in `dist/`, linked from the app header, and added to the offline cache manifest.
- The privacy page describes local-only study notes/favorites and third-party source links. Recheck it whenever analytics, account, cloud sync, or SDK behavior changes.
- Medical cards include source links, separate anatomy from clinical inference, distinguish parent-organ notes from the selected substructure, and state that they are educational rather than patient-specific advice.
- The app discloses gaps in the female model, incomplete mappings, and that clinical/translation editorial review is pending. Do not remove these disclosures unless the underlying review and content work is completed.
- The new store submission package is in `STORE-SUBMISSION-PACK.md`; localized listing fields and reviewer notes (tr/en/de/es/ar) are in `store/metadata.json`. The Play icon, feature image, and shared iOS/Android icon source are in `store/`.
- Android compileSdk/targetSdk are configured as 36. Confirm the current Play Console requirements for the final submission; this setting alone does not establish store compliance.
- Google Play health declaration should use **Medical Reference and Education** for the current educational atlas. The app is not a medical device or clinical decision-support tool while it has no patient-specific inputs or recommendations; reassess if that intended use changes.

## Required before submitting in App Store Connect

1. Enable GitHub Pages (or another public static host) for this repository and confirm these pages load without authentication. Live HTTP checks on 14 October 2026 returned 404, so the URLs are not yet ready for App Store Connect:
   - Privacy Policy: `https://ali5921592-lang.github.io/atlas3b/privacy-policy.html`
   - Support: `https://ali5921592-lang.github.io/atlas3b/support.html`
2. Add the developer's real support email and any legal contact details required in the distribution regions to the support page and App Store Connect. The repository issue link is present, but a real direct contact address is missing.
3. Complete the App Privacy questionnaire from a fresh audit of the final iOS binary and every included SDK. The current source/dependency review found no account, analytics, or advertising integration; study notes and preferences are local, and external sources open only after a user tap. Recheck the signed binary and all integrations before answering.
4. Add localized product metadata (name, subtitle, description, keywords, support URL, privacy URL, copyright), age-rating answers, current screenshots captured from the iPhone/iPad app, and an accurate review note. Screenshots must show shipped functionality and the model's stated coverage limits.
5. In Review Notes, state that this is a source-linked anatomy education/reference app, explain how to choose a model/layer and open the detail cards, and disclose that the female reference has coverage gaps. Include no claims of diagnosis, treatment, complete anatomical coverage, or clinician validation.
6. Confirm rights/attributions for every bundled model and third-party reference. `dist/models/*LICENSE*` and `dist/reference/SOURCE.txt` contain the current source notes. The kidney, inner-ear, ossicle, and uncertain white-matter geometries were replaced in the current GLBs; verify package hashes and retain attribution/ShareAlike notices for all remaining mixed-source assets. The requests in `LICENSING-REQUESTS.md` concern removed source meshes and are superseded for those meshes.
7. On macOS, open the Xcode project, set the final marketing version/build number and signing team, archive a Release build, validate it, and test install/launch/offline mode on physical iPhone and iPad devices. Windows builds do not establish iOS archive or App Review readiness.
8. To create a signed IPA/AAB in GitHub Actions, add signing material as repository Actions secrets, then manually run **Mobile builds** and select the signed build input. Android requires `ANDROID_KEYSTORE_BASE64`, `ANDROID_UPLOAD_STORE_PASSWORD`, `ANDROID_UPLOAD_KEY_ALIAS`, and `ANDROID_UPLOAD_KEY_PASSWORD`. iOS requires `IOS_DISTRIBUTION_CERTIFICATE_P12_BASE64`, `IOS_DISTRIBUTION_CERTIFICATE_PASSWORD`, `IOS_APP_STORE_PROFILE_BASE64`, and `IOS_TEAM_ID`. Never commit certificates, provisioning profiles, keystores, or passwords. The workflow builds artifacts; it does not submit them to either store.

## Draft App Store description (verify every claim before use)

Explore human anatomy with interactive 3D models. Search structures by name, reveal anatomical layers, inspect selected structures and source-linked learning cards, and use guided lessons and cross-sections. Includes male and female reference datasets with different coverage; the female model is not a complete full-body atlas. Educational reference only; not for diagnosis or treatment. Content and translations are still being reviewed by clinical and language editors.

## Review risks still open

- **Remaining licensing review:** the previously identified kidney and inner-ear noncommercial geometries were replaced with original procedural meshes. The app still describes its OpenStax *Anatomy and Physiology 2e*-linked study notes as CC BY-NC-SA 4.0. Because this is a planned paid app, obtain written commercial permission from OpenStax or remove and independently rewrite those notes before release. Other adapted atlas assets still require complete attribution/ShareAlike and lineage review. Replacements are educational prototypes and are not anatomist-reviewed.
- Three draft Google Play screenshots were captured from the Pixel 7 emulator and saved under `store/screenshots/android/`; they are not physical-device evidence. No iOS screenshots, Xcode archive/IPA, Play-signed AAB, App Store Connect metadata entry, privacy declaration, age rating, or physical-device review has been completed in this workspace. Prepared text and images are not console submission.
- The support page still needs the developer's real contact details before submission.
- A public privacy-policy URL exists only after GitHub Pages or another host is enabled and the page is verified live.
- The Account Holder must check and accept any pending Apple Developer agreements before submission.
- The bundled female anatomy is explicitly incomplete, and some model records use general rather than structure-specific descriptions. Do not market the atlas as exhaustive or clinically validated.
