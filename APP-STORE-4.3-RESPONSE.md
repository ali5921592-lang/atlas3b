# App Review response — Guidelines 4.3 and 4.2.6

Dear App Review Team,

Thank you for the opportunity to clarify the product. Human Atlas 3D is an independently developed, standalone anatomy study application. It is not a white-label app, it was not produced from a commercial app-generation template, and it is not submitted on behalf of a client. Below are complete answers to your questions.

## 1. What the app does and the problem it solves

Human Atlas 3D helps anatomy learners move from identifying a structure to understanding its context. Users can explore 3D structures, isolate a selected structure, separate anatomical layers, inspect adjustable axial/coronal/sagittal/oblique and slab sections, and reveal curated relationships such as a muscle's motor nerve, supplying vessel, and attachment bones or an organ's inflow/outflow structures.

The study workflow is source-aware rather than a model-only viewer. A selected record opens Basic, Intermediate, and Advanced explanations with a Latin name where verified, scope and evidence grade, anatomical relationships, possible effects of damage, and links to the underlying terminology or ontology source. The app also offers an optional 160-slice Visible Human thorax cryosection volume for comparing real color sectional anatomy with the surface atlas. Favorites, personal notes, saved camera/cut views, quizzes, and incorrect-answer review are stored locally. No account is required and the bundled atlas works offline.

## 2. Intended users

The primary audience is adult anatomy learners: medical, nursing, physiotherapy, emergency-care, and allied-health students who need a portable spatial study aid. A secondary audience is educators and healthcare professionals who want a quick general anatomy reference. The app is educational and does not provide patient-specific diagnosis, treatment, surgical planning, or clinical decision support.

## 3. Market need or gap addressed

The product is not intended to be another generic 3D body viewer. It targets the gap between visual identification and accountable study:

- three learning levels for the same selected structure;
- source links, evidence grade, and explicit parent/tissue-level scope instead of presenting every generated note as structure-specific fact;
- side-aware nerve, vessel, attachment-bone, and organ-flow relationships;
- adjustable 3D section planes plus a separate real cryosection volume;
- source-separated female references that clearly distinguish the HRA donor assembly, the lower-limb supplement, and the general atlas rather than blending them into a misleading single donor;
- on-device notes, saved views, favorites, quizzes, and mistake review without an account.

This combination is the original study workflow and user experience of Human Atlas 3D.

## 4. Beta and pre-release testing

We conducted closed, iterative pre-release acceptance testing with the product owner using installed signed Android builds, browser-based phone and tablet layouts, and automated regression coverage. The iOS build was also packaged and processed by TestFlight, but we do not represent build processing as external beta testing. Concrete feedback that changed the production build included:

- Zoom originally centered on the torso and made the head and feet difficult to inspect. We added vertical panning and bounded zoom so users can move through the full body after zooming.
- Coronal and sagittal views were clipped in portrait layouts. We revised responsive section controls and tablet/phone layout behavior.
- The female presentation mixed sources and some structures appeared disconnected. We separated the HRA donor, general atlas, and lower-limb supplement into explicit source frames and added coverage labels and source-specific search.
- A selected structure remained turquoise when isolated. We changed the single-structure view to restore its anatomical tissue color while preserving the turquoise glow only in whole-body context.
- Relationship mode did not consistently show connected anatomy. We added side-aware muscle nerve/artery/attachment mappings and curated organ inflow/outflow relationships with regression tests.
- The interface was too dense on phones. We separated Explore, Learn, Saved, and Study workspaces and improved mobile detail-panel controls and keyboard/touch targets.

The current automated suite passes model visibility, multilingual/Latin search, female source isolation, section planes, relationship highlighting, offline assets, local notes/favorites/saved views, quiz retry, billing trial boundaries, and failure recovery. We do not claim that automated checks replace clinical validation; the app discloses its educational scope.

## 5. Standalone product or suite

It is a standalone product and is not part of a suite of near-identical apps. There are no separate editions by school, specialty, language, region, or anatomy system.

## 6. Consolidation into another app

No other app under this developer account contains this anatomy functionality, so there is no existing app into which it could be consolidated as an in-app purchase or content pack.

## 7. Sharing with other apps under this developer account

The binary does not share a product codebase or proprietary assets with another app under this developer account. It uses standard third-party frameworks for rendering, native packaging, and purchase entitlement: Three.js, Capacitor, and RevenueCat. The application-specific interaction, source separation, sectioning, relationship logic, study tools, content pipeline, and interface were developed for this product.

## 8. Sharing with third-party apps

The app does not share a proprietary codebase, private SDK, or commercial template with a third-party app. It does use openly licensed or public-domain anatomy sources that may also be used by other educational projects: Z-Anatomy/BodyParts3D under their attribution/share-alike licenses, HuBMAP Human Reference Atlas and the female lower-limb source under CC BY, the NLM Visible Human source identified in the app, and UBERON under CC BY. Attributions, source links, modification notes, and license notices are included in the product.

Original product functionality added beyond those source datasets includes the mobile interaction and responsive interface, source-frame isolation, multilingual and Latin search, evidence-scoped three-level cards, relationship resolution, adjustable cutting/slab tools, real-volume reslicing, learning flows, local study state, offline packaging, and purchase entitlement integration.

## 9. Client, partner, or third-party submission

No. The app was not created for a client, partner, school, hospital, or other third party. Ahmet Tekin is the product owner and the submitting developer. The concept, branding, product decisions, application code, interaction design, and original educational summaries are submitted under the same developer account that owns and maintains the product. Third-party anatomy sources are used under their stated licenses and are attributed; they did not commission the app and the app is not being submitted on their behalf.

We respectfully request reconsideration under Guidelines 4.3 and 4.2.6. If the review team would like a specific workflow demonstrated, we can provide exact navigation steps or a short review video.
