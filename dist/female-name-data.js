// Female-reference name labels: English, Turkish, German, Spanish, Arabic.
const rows={
 'areolar tubercle':['Areolar tubercle','Areola tüberkülü','Areolartuberkel','Tubérculo areolar','حديبة الهالة'],
 'female areola':['Areola','Areola','Warzenhof','Areola','هالة الثدي'],
 'mammary lobe':['Mammary lobe','Meme lobu','Brustdrüsenlappen','Lóbulo mamario','فصيص الثدي'],
 'main lactiferous duct':['Main lactiferous duct','Ana süt kanalı','Hauptmilchgang','Conducto galactóforo principal','القناة اللبنية الرئيسية'],
 'lactiferous sinus':['Lactiferous sinus','Süt kanalı sinüsü','Milchgangsinus','Seno lactífero','الجيب اللبني'],
 'interlobar adipose tissue of mammary gland':['Interlobar adipose tissue of mammary gland','Meme bezinin loblar arası yağ dokusu','Interlobuläres Fettgewebe der Brustdrüse','Tejido adiposo interlobular de la glándula mamaria','النسيج الدهني بين فصيصات الغدة الثديية'],
 'suspensory ligament of breast':['Suspensory ligament of breast','Memenin askı bağı','Aufhängeband der Brust','Ligamento suspensorio de la mama','رباط الثدي المعلّق'],
 'fimbria of uterine tube':['Fimbria of uterine tube','Uterin tüp fimbriaları','Fimbrie des Eileiters','Fimbria de la tuba uterina','أهداب البوق الرحمي'],
 'cervicovaginal junction':['Cervicovaginal junction','Servikovajinal bileşke','Zervikovaginaler Übergang','Unión cervicovaginal','الوصل العنقي المهبلي'],
 'uterovesical pouch':['Uterovesical pouch','Vezikouterin çukur','Vesikouterine Tasche','Fondo de saco vesicouterino','الجيب المثاني الرحمي'],
 'suspensory ligament of ovary':['Suspensory ligament of ovary','Ovaryum asıcı bağı','Aufhängeband des Ovars','Ligamento suspensorio del ovario','الرباط المعلّق للمبيض'],
 'mesosalpinx':['Mesosalpinx','Mezosalpinks','Mesosalpinx','Mesosalpinx','المسراق البوقي'],
 'mesovarium':['Mesovarium','Mezovaryum','Mesovarium','Mesovario','المسراق المبيضي'],
 'ovarian ligament':['Ovarian ligament','Ovaryumun kendi bağı','Eierstockband','Ligamento ovárico','الرباط المبيضي'],
 'lower uterine segment':['Lower uterine segment','Uterusun alt segmenti','Unteres Uterinsegment','Segmento uterino inferior','الجزء السفلي من الرحم'],
 'posterior wall of uterus':['Posterior wall of uterus','Uterusun arka duvarı','Hinterwand des Uterus','Pared posterior del útero','الجدار الخلفي للرحم'],
 'anterior wall of uterus':['Anterior wall of uterus','Uterusun ön duvarı','Vorderwand des Uterus','Pared anterior del útero','الجدار الأمامي للرحم'],
 'uterine cervix':['Cervix of uterus','Uterus serviksi','Gebärmutterhals','Cuello uterino','عنق الرحم'],
 'uterine vein':['Uterine vein','Uterus toplardamarı','Gebärmuttervene','Vena uterina','الوريد الرحمي'],
 'uterine artery':['Uterine artery','Uterus atardamarı','Gebärmutterarterie','Arteria uterina','الشريان الرحمي']
 ,'ampulla of uterine tube':['Ampulla of uterine tube','Uterin tüp ampullası','Ampulle des Eileiters','Ampolla de la tuba uterina','أمبولة البوق الرحمي']
 ,'isthmus of uterine tube':['Isthmus of uterine tube','Uterin tüp istmusu','Isthmus des Eileiters','Istmo de la tuba uterina','برزخ البوق الرحمي']
 ,'infundibulum of uterine tube':['Infundibulum of uterine tube','Uterin tüp infundibulumu','Infundibulum des Eileiters','Infundíbulo de la tuba uterina','قمع البوق الرحمي']
 ,'body of uterus':['Body of uterus','Uterus gövdesi','Gebärmutterkörper','Cuerpo uterino','جسم الرحم']
 ,'fundus of uterus':['Fundus of uterus','Uterus fundusu','Gebärmutterfundus','Fondo uterino','قاع الرحم']
 ,'round ligament of uterus':['Round ligament of uterus','Uterusun yuvarlak bağı','Rundes Mutterband','Ligamento redondo del útero','الرباط المستدير للرحم']
 ,'uterosacral ligament':['Uterosacral ligament','Uterosakral bağ','Uterosakralband','Ligamento uterosacro','الرباط الرحمي العجزي']
 ,'broad ligament of uterus':['Broad ligament of uterus','Uterusun geniş bağı','Breites Mutterband','Ligamento ancho del útero','الرباط العريض للرحم']
 ,'abdominal ostium of uterine tube':['Abdominal ostium of uterine tube','Uterin tüpün karın ağzı','Abdominale Öffnung des Eileiters','Orificio abdominal de la tuba uterina','الفوهة البطنية للبوق الرحمي']
};
const normalize=s=>String(s).toLowerCase().replace(/\.[lr]\.\d+$|\.\d+$/,'').replace(/\b(left|right)\b/g,'').replace(/\s+/g,' ').trim();
const names=new Map(Object.entries(rows).map(([key,value])=>[key,value]));
export function femaleNameTranslation(raw,language='en'){const row=names.get(normalize(raw));return row?.[{tr:1,en:0,de:2,es:3,ar:4}[language]]||null;}
