// Fill previously uncovered card texts; preserve Latin anatomical identifiers.
import {readFile,writeFile} from 'node:fs/promises';
import {explanationFor} from '../dist/explanations.js';
import {clinicalProfile} from '../dist/clinical-study.js';
import {translationData} from '../dist/i18n-data.js';
import {reviewedText} from '../dist/i18n-overrides.js';
import {clinicalLabelTranslations} from '../dist/clinical-label-translations.js';
const texts=new Set();
for(const file of ['catalog','catalog-female','catalog-female-muscles'])for(const r of JSON.parse(await readFile('dist/'+file+'.json','utf8'))){
 const e=explanationFor(r),p=clinicalProfile(r);
 for(const key of ['intro','function','relations','clinical'])if(e[key])texts.add(e[key]);
 for(const key of ['normal','injury','loss','tissue','check','relations'])if(p[key])texts.add(p[key]);
 for(const value of Object.values(p.facts||{}))if(value)texts.add(value);
}
const norm=s=>s.replace(/\s+/g,' ').trim();
const keys=[...texts].filter(s=>/[ğışçöü]/i.test(s)&&!translationData.text.en[norm(s)]&&!reviewedText[norm(s)]?.[0]&&!clinicalLabelTranslations[norm(s)]?.[1]&&!s.startsWith('Seçili kayıt:')&&!s.startsWith('Kanal sistemi çok dallıdır;'));
const english=`Connects the calf muscles to the heel bone.
Transfers muscle force to bone and contributes to plantar flexion of the foot.
Transmits force from gastrocnemius and soleus to the calcaneus.
A tendon transmits force; it is not a contracting muscle. Loss of tendon continuity can impair rising onto the toes.
The long bone on the medial side of the leg.
Contributes to weight transfer from the knee to the ankle.
Articulates proximally with the femur and distally with the talus; the fibula lies laterally.
The lower left chamber of the heart.
Pumps oxygenated blood through the aorta into the systemic circulation.
Connects to the left atrium through the mitral valve and to the aorta through the aortic valve. Its wall is thicker than that of the right ventricle.
The serous membrane covering the lungs and lining the thoracic cavity.
Pleural fluid reduces friction between the surfaces during breathing.
The visceral layer covers the lung and the parietal layer lines the chest wall; the potential pleural space lies between them.
Lubrication of the pleural surfaces reduces friction during breathing. Pleura and lung tissue are distinct structures.
Small elevations on the areola.
Related to the surface openings of the areolar glands; their number and appearance vary between individuals.
Located on the areola around the nipple.
Individual variation in appearance alone does not indicate disease.
The pigmented area of skin surrounding the nipple.
Areolar skin and glands form part of the nipple–areola complex.
The nipple lies centrally; the lactiferous ducts open on the nipple.
Variations in pigmentation, diameter and shape may be normal anatomical differences.
A lobular, milk-producing subdivision of the mammary gland.
Lobules and alveolar units within the lobe produce milk during lactation and deliver it to the duct network.
Lobules drain into small and larger lactiferous ducts leading towards the nipple.
Glandular tissue changes during pregnancy and lactation; the model does not represent an individual or a specific stage of lactation.
One of the larger ducts carrying secretion from mammary lobes towards the nipple.
Carries secretion from lobular units to the nipple.
Collects smaller lactiferous ducts and leads towards openings on the nipple.
An anatomical name for a lactiferous duct segment near the nipple.
Describes the transition region of the lactiferous duct network near the nipple.
Located between the lactiferous ducts and the nipple.
This macroscopic model label does not depict histological detail or an individual's duct calibre.
Fibrous support bands extending through mammary stroma towards the skin and deep fascia.
Contribute to the connective tissue support of the breast.
Extend between connective tissue around the mammary gland, the skin and the deep fascia.
Tissue properties change with time and vary between individuals; appearance alone does not establish a diagnosis.
The wide, curved middle segment of the uterine tube.
The oocyte and sperm usually meet here; fertilisation does not always occur at this site.
Continues medially into the isthmus and laterally into the infundibulum.
Its role as a usual site of fertilisation and tubal patency are relevant to clinical assessment.
The narrow medial segment of the uterine tube near the uterus.
Contributes to passage of the oocyte and fluid through the tubal lumen.
Lies between the uterine corner and the ampulla.
The tubal opening into the uterus and luminal patency are relevant to fertility assessment.
Finger-like projections at the infundibular end of the uterine tube.
Help guide the oocyte towards the tubal opening after ovulation; they do not form a closed direct connection with the ovary.
Adjacent to the infundibulum and the peritoneal space around the ovary.
Oocyte transport depends on coordinated fimbrial movement, tubal smooth muscle and ciliated epithelium.
The funnel-shaped distal end of the uterine tube near the ovary.
Helps receive the oocyte released from the ovary into the tube.
Fimbriae extend from the infundibulum; the tube is not directly fused to the ovary.
Oocyte capture is considered in relation to the peritoneal cavity, fimbrial movement and ciliated epithelium.
The peritoneal recess between the urinary bladder and uterus.
Defines an anterior part of the pelvic peritoneal cavity; it is not itself an organ or ligament.
Related to the bladder anteriorly and the uterine body posteriorly.
Its position matters in assessment of pelvic fluid and surgical anatomy; its appearance varies with posture and organ filling.
A fibrous ligament extending from the upper lateral uterus towards the inguinal canal.
Contributes to maintaining uterine anteversion.
Begins near the uterine corner, traverses the inguinal canal and ends near the labium majus.
Stretching during pregnancy may be associated with groin discomfort; this alone is not a diagnosis.
A supporting tissue complex connecting the region of the cervix and upper vagina to the sacrum.
Contributes to pelvic organ support and posterior support of the uterus.
Extends between the cervix/parametrium and the sacrum, adjacent to the rectum.
Pelvic support depends on the combined function of several ligaments and fascial structures.
A peritoneal fold connecting the ovary to the lateral pelvic wall.
Carries ovarian vessels, lymphatics and nerves.
Extends from the ovary to the lateral pelvic wall, adjacent to the uterine tube and broad ligament.
Important for understanding ovarian vessel course; distinct from the proper ovarian ligament (ligamentum ovarii proprium).
A fibrous ligament between the ovary and uterus.
Contributes to anatomical support by connecting the ovary to the side of the uterus.
Extends between the medial pole of the ovary and the lateral uterus.
Distinct from the suspensory ligament, which carries vessels towards the lateral pelvic wall.
A double layer of peritoneum extending from the sides of the uterus towards the pelvic walls.
Defines relationships around the uterus, uterine tubes and ovaries; it is not the principal load-bearing support of the uterus on its own.
Described in terms of the mesometrium, mesosalpinx and mesovarium.
Important in pelvic surgical anatomy because of the vessels and ligamentous structures passing through it.
The part of the broad ligament supporting the uterine tube.
Defines the double peritoneal layer around the uterine tube and its adjacent structures.
Related to the upper free margin of the broad ligament and the uterine tube.
The broad ligament is a peritoneal fold with subdivisions, rather than a single ligament band.
The short peritoneal part of the broad ligament attached to the ovary.
Connects the ovary to the broad ligament.
Adjacent to the ovarian hilum and broad ligament; the ovarian vessels mainly travel in the suspensory ligament.
Must be distinguished from the suspensory ligament and the proper ligament of the ovary.
The main part of the uterus between the fundus and isthmus.
The endometrium changes cyclically; during pregnancy, the uterine body expands to support embryonic and fetal development.
The fundus and tubal openings lie superiorly; the isthmus and cervix lie inferiorly.
The wall layers are the endometrium, myometrium and perimetrium.
The dome-shaped upper part of the uterus above the uterine tube openings.
Forms the upper extent of the uterine body and may serve as a reference during pregnancy assessment.
Lies above the sites where the right and left uterine tubes join the uterus.
Its position and height vary with pregnancy and uterine distension; this reference model is not a pregnancy measurement.
The lower uterine region near the transition from the body to the cervix.
Defines the lower uterine region between the uterine cavity and cervical canal.
Continuous with the uterine body, isthmus and cervix.
Its stretch and shape may change in pregnancy; this reference model does not depict pregnancy anatomy.
The posterior wall region of the uterine body.
Continues the endometrial, myometrial and perimetrial layers of the uterine wall.
Related to the uterine cavity anteriorly and to the rectouterine pouch and rectum posteriorly.
Position and adjacent relationships depend on uterine orientation and distension.
The anterior wall region of the uterine body.
The urinary bladder and vesicouterine pouch lie anteriorly; the uterine cavity lies posteriorly.
Uterine wall thickness varies with the cycle and physiological state; the model provides no individual measurements.
The narrow inferior part of the uterus projecting into the vagina.
The cervical canal connects the uterine cavity to the vagina; cervical secretions contribute to reproductive physiology.
The uterine isthmus lies superiorly, the vagina inferiorly, and the vaginal fornices surround the vaginal part.
The cervix and vagina are distinct structures; the supravaginal and vaginal parts of the cervix are distinguished.
A branch of the internal iliac artery supplying the uterus.
Contributes arterial blood flow to the uterus and related regions.
Its crossing relationship with the ureter is important in surgical anatomy; it forms connections with ovarian and vaginal branches.
Vessel course and branching vary between individuals; the model does not depict all variations.
A vessel associated with the uterus and its surrounding venous network.
Contributes to pelvic venous return.
Adjacent to the uterine artery and parametrial venous plexus.
Pelvic venous anatomy varies in branching and between individuals; the schematic model does not show every variation.
The upper left chamber of the heart.
Receives blood from the lungs through the pulmonary veins and passes it to the left ventricle.
The pulmonary veins open into this chamber. The mitral valve separates it from the left ventricle.`.split('\n');
if(keys.length!==119||keys.length!==english.length)throw Error('Card key set changed; review key/translation alignment before generation: '+keys.length+'/'+english.length);
await writeFile('dist/content-fallback-en.js','// English fallbacks for uncovered card fields; clinical/language editor review pending.\nexport const contentFallbackEn='+JSON.stringify(Object.fromEntries(keys.map((key,i)=>[norm(key),english[i]])),null,2)+';\n');
console.log('Added '+keys.length+' English card field fallbacks.');
