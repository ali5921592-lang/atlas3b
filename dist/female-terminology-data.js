// Female-reference structures absent from the original TA2 crosswalk.
// Latin terms and TA2 identifiers are matched to FIPAT TA2 2.07.
const source='TA2 2.07';
const url='https://ta2viewer.openanatomy.org/';
const row=(latin,ta2)=>({latin,ta2,source,url,canonical:true});
export const femaleTerminologyData={
 'Areolar tubercle.l.001':row('Tubercula areolae',7108),
 'Areolar tubercle.r.001':row('Tubercula areolae',7108),
 'Female areola.l.001':row('Areola mammae',7106),
 'Female areola.r.001':row('Areola mammae',7106),
 'Mammary lobe.l.001':row('Lobi glandulae mammariae',7101),
 'Mammary lobe.r.001':row('Lobi glandulae mammariae',7101),
 'Main lactiferous duct.l.001':row('Ductus lactiferi',7103),
 'Main lactiferous duct.r.001':row('Ductus lactiferi',7103),
 'Lactiferous sinus.l.001':row('Sinus lactiferi',7104),
 'Lactiferous sinus.r.001':row('Sinus lactiferi',7104),
 'Suspensory ligament of left breast.l.001':row('Ligamenta suspensoria mammaria',7109),
 'Suspensory ligament of right breast.r.001':row('Ligamenta suspensoria mammaria',7109),
 'Fimbria of right uterine tube.r.001':row('Fimbriae tubae uterinae',3489),
 'Fimbria of left uterine tube.l.001':row('Fimbriae tubae uterinae',3489),
 'Suspensory ligament of right ovary.r.001':row('Ligamentum suspensorium ovarii',3805),
 'Suspensory ligament of left ovary.l.001':row('Ligamentum suspensorium ovarii',3805),
 'Uterine cervix.001':row('Cervix uteri',3508),
 'Uterine vein.l.001':row('Venae uterinae',5046),
 'Uterine vein.r.001':row('Venae uterinae',5046),
 'Marginal artery.l.001':{...row('Ramus marginalis sinister arteriae circumflexae cordis',4152),source:'TA2 2.07',url:'https://cdn.dal.ca/content/dam/dalhousie/pdf/library/FIPAT/TA2/FIPAT-TA2-Part-4.pdf'},
 'Patellar surface of right femur.r.001':row('Facies patellaris ossis femoris',1386),
 'Patellar surface of left femur.l.001':row('Facies patellaris ossis femoris',1386),
 'Medial condyle of right femur.r.001':row('Condylus medialis ossis femoris',1380),
 'Medial condyle of left femur.l.001':row('Condylus medialis ossis femoris',1380),
 'Lateral condyle of right femur.r.001':row('Condylus lateralis femoris',1383),
 'Lateral condyle of left femur.l.001':row('Condylus lateralis femoris',1383)
};
