import {Capacitor} from '@capacitor/core';
import {Purchases} from '@revenuecat/purchases-capacitor';
import {BILLING_ENTITLEMENT, BILLING_KEYS} from './billing-config.js';
import {trialStatus} from './billing-trial.js';
const LANGS={
 tr:{trial:'Ücretsiz kullanım',days:n=>`${n} gün kaldı`,hours:n=>`${n} saat kaldı`,manage:'Erişimi yönet',title:'Atlası keşfetmeye devam et',monthly:'Aylık',yearly:'Yıllık',lifetime:'Ömür boyu',oneTime:'Tek ödeme',renew:'Abonelik mağaza hesabından otomatik yenilenir; istediğin zaman mağaza ayarlarından iptal edebilirsin.',buy:'Satın al',restore:'Satın alımları geri yükle',privacy:'Gizlilik',terms:'Kullanım koşulları',unavailable:'Mağaza ürünleri henüz hazır değil. Lütfen daha sonra tekrar dene.',loading:'Mağaza fiyatları yükleniyor…',error:'Satın alma tamamlanamadı. Bağlantını kontrol edip tekrar dene.',restored:'Etkin bir satın alma bulunamadı.',active:'Tam erişim etkin',preview:'7 gün ödeme bilgisi olmadan tam erişim. Süre sonunda otomatik ücret alınmaz.',notNative:'Satın alma iOS ve Android uygulamasında kullanılabilir.'},
 en:{trial:'Free access',days:n=>`${n} days left`,hours:n=>`${n} hours left`,manage:'Manage access',title:'Keep exploring the atlas',monthly:'Monthly',yearly:'Yearly',lifetime:'Lifetime',oneTime:'One-time payment',renew:'Subscriptions renew through your store account. Cancel anytime in store settings.',buy:'Purchase',restore:'Restore purchases',privacy:'Privacy',terms:'Terms of use',unavailable:'Store products are not ready yet. Please try again later.',loading:'Loading store prices…',error:'Purchase could not be completed. Check your connection and try again.',restored:'No active purchase was found.',active:'Full access active',preview:'7 days of full access without payment details. No automatic charge at the end.',notNative:'Purchases are available in the iOS and Android apps.'},
 de:{trial:'Kostenlose Nutzung',days:n=>`${n} Tage übrig`,hours:n=>`${n} Stunden übrig`,manage:'Zugang verwalten',title:'Atlas weiter erkunden',monthly:'Monatlich',yearly:'Jährlich',lifetime:'Lebenslang',oneTime:'Einmalzahlung',renew:'Abonnements verlängern sich über dein Store-Konto. Du kannst jederzeit in den Store-Einstellungen kündigen.',buy:'Kaufen',restore:'Käufe wiederherstellen',privacy:'Datenschutz',terms:'Nutzungsbedingungen',unavailable:'Store-Produkte sind noch nicht verfügbar. Bitte versuche es später erneut.',loading:'Store-Preise werden geladen…',error:'Der Kauf konnte nicht abgeschlossen werden. Prüfe deine Verbindung.',restored:'Kein aktiver Kauf gefunden.',active:'Voller Zugang aktiv',preview:'7 Tage voller Zugang ohne Zahlungsdaten. Danach erfolgt keine automatische Abbuchung.',notNative:'Käufe sind in den iOS- und Android-Apps verfügbar.'},
 es:{trial:'Acceso gratuito',days:n=>`${n} días restantes`,hours:n=>`${n} horas restantes`,manage:'Gestionar acceso',title:'Sigue explorando el atlas',monthly:'Mensual',yearly:'Anual',lifetime:'De por vida',oneTime:'Pago único',renew:'Las suscripciones se renuevan mediante tu cuenta de la tienda. Puedes cancelarlas en los ajustes de la tienda.',buy:'Comprar',restore:'Restaurar compras',privacy:'Privacidad',terms:'Condiciones de uso',unavailable:'Los productos de la tienda aún no están disponibles. Inténtalo más tarde.',loading:'Cargando precios de la tienda…',error:'No se pudo completar la compra. Comprueba la conexión.',restored:'No se encontró ninguna compra activa.',active:'Acceso completo activo',preview:'7 días de acceso completo sin datos de pago. No se cobrará automáticamente al finalizar.',notNative:'Las compras están disponibles en las apps de iOS y Android.'},
 ar:{trial:'استخدام مجاني',days:n=>`${n} أيام متبقية`,hours:n=>`${n} ساعات متبقية`,manage:'إدارة الوصول',title:'واصل استكشاف الأطلس',monthly:'شهريًا',yearly:'سنويًا',lifetime:'مدى الحياة',oneTime:'دفعة واحدة',renew:'تتجدد الاشتراكات عبر حساب المتجر. يمكنك إلغاؤها من إعدادات المتجر في أي وقت.',buy:'شراء',restore:'استعادة المشتريات',privacy:'الخصوصية',terms:'شروط الاستخدام',unavailable:'منتجات المتجر غير متاحة بعد. يُرجى المحاولة لاحقًا.',loading:'جارٍ تحميل أسعار المتجر…',error:'تعذر إتمام الشراء. تحقق من اتصالك وحاول مجددًا.',restored:'لم يتم العثور على عملية شراء نشطة.',active:'الوصول الكامل مفعل',preview:'7 أيام من الوصول الكامل دون بيانات دفع. لن يتم الخصم تلقائيًا عند انتهائها.',notNative:'تتوفر المشتريات في تطبيقي iOS وAndroid.'}
};

export function hasAtlasAccess(customerInfo){return customerInfo?.entitlements?.active?.[BILLING_ENTITLEMENT]?.isActive===true;}
const APPLE_EULA='https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';
const LEGAL_PAGES='https://ali5921592-lang.github.io/atlas3b/';
const PLAN_COPY={
 tr:{benefits:'Atlas Pro; 3B anatomi modellerini, kesitleri, yapı kartlarını ve çalışma araçlarını açar.',expired:'Ücretsiz erişim süren doldu. Atlası kullanmaya devam etmek için bir plan seç.',retry:'Fiyatları yeniden yükle',close:'Kapat',brand:'İnsan Atlası 3B'},
 en:{benefits:'Atlas Pro unlocks 3D anatomy models, cross sections, structure cards, and study tools.',expired:'Your free access has ended. Choose a plan to keep using the atlas.',retry:'Reload prices',close:'Close',brand:'Human Atlas 3D'},
 de:{benefits:'Atlas Pro schaltet 3D-Anatomiemodelle, Schnittansichten, Strukturkarten und Lernwerkzeuge frei.',expired:'Dein kostenloser Zugang ist abgelaufen. Wähle einen Tarif, um den Atlas weiter zu nutzen.',retry:'Preise neu laden',close:'Schließen',brand:'Atlas des Menschen 3D'},
 es:{benefits:'Atlas Pro da acceso a modelos anatómicos 3D, vistas de corte, fichas y herramientas de estudio.',expired:'Tu acceso gratuito ha terminado. Elige un plan para seguir usando el atlas.',retry:'Volver a cargar precios',close:'Cerrar',brand:'Atlas Humano 3D'},
 ar:{benefits:'يتيح أطلس برو استخدام نماذج التشريح ثلاثية الأبعاد والمقاطع وبطاقات البنى وأدوات الدراسة.',expired:'انتهى وصولك المجاني. اختر خطة لمتابعة استخدام الأطلس.',retry:'إعادة تحميل الأسعار',close:'إغلاق',brand:'أطلس الإنسان 3D'}
};
const htmlEscapes={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};
function escapeHtml(text){return String(text).replace(/[&<>"']/g,character=>htmlEscapes[character]);}
function language(){const value=document.documentElement.lang?.toLowerCase().split('-')[0];return LANGS[value]?value:'en';}
function dictionary(){return LANGS[language()];}
function packageKind(pkg){const id=String(pkg.identifier||'').toLowerCase(),type=String(pkg.packageType||'').toLowerCase();if(type.includes('monthly')||id.includes('monthly'))return'monthly';if(type.includes('annual')||type.includes('yearly')||id.includes('annual')||id.includes('yearly'))return'yearly';if(type.includes('lifetime')||id.includes('lifetime'))return'lifetime';return null;}

export async function installBilling(){
 if(!Capacitor.isNativePlatform())return{mode:'web'};
 const platform=Capacitor.getPlatform(),apiKey=BILLING_KEYS[platform]||'';
 let trial=trialStatus(localStorage),entitled=false,configured=false,offeringsLoaded=false,packages=[],busy=false,statusMessage='';
 const button=document.createElement('button');button.id='billingStatusButton';button.type='button';
 const dialog=document.createElement('dialog');dialog.id='billingDialog';dialog.setAttribute('aria-labelledby','billingTitle');dialog.setAttribute('aria-modal','true');
 document.body.append(button,dialog);
 function update(){
  const t=dictionary();button.textContent=entitled?t.active:trial.state==='trial'?`${t.trial} · ${trial.remainingMs>=86400000?t.days(Math.ceil(trial.remainingMs/86400000)):t.hours(Math.max(1,Math.ceil(trial.remainingMs/3600000)))}`:t.manage;
  button.hidden=trial.state==='unavailable'&&!entitled;
  const locked=!entitled&&trial.state!=='trial';document.body.classList.toggle('billing-locked',locked);
  if(locked&&!dialog.open)dialog.showModal();
  if(!locked&&dialog.open)dialog.close();
 }
 function render(message=statusMessage){
  statusMessage=message;
  const locale=language(),t=LANGS[locale],copy=PLAN_COPY[locale];
  dialog.dir=locale==='ar'?'rtl':'ltr';
  const names={monthly:t.monthly,yearly:t.yearly,lifetime:t.lifetime};
  const options=packages.map((pkg,index)=>{
   const kind=packageKind(pkg),price=pkg.product?.priceString?.trim();
   if(!kind||!price)return '';
   return `<button type="button" class="billing-plan" data-billing-package="${index}" ${busy?'disabled':''}>
    <span><b>Atlas Pro · ${names[kind]}</b>${kind==='lifetime'?`<small>${t.oneTime}</small>`:''}</span>
    <strong><bdi>${escapeHtml(price)}</bdi></strong>
   </button>`;
  }).join('');
  const suffix=locale==='tr'?'':`-${locale}`;
  const termsUrl=platform==='ios'?APPLE_EULA:`${LEGAL_PAGES}terms${suffix}.html`;
  const accessNote=entitled?t.active:trial.state==='trial'?t.preview:copy.expired;
  const loading=configured&&!offeringsLoaded;
  const unavailable=`<p class="billing-muted" role="status">${loading?t.loading:t.unavailable}</p>
   ${configured&&!loading?`<button type="button" class="billing-text-action" id="billingRetry">${copy.retry}</button>`:''}`;
  dialog.innerHTML=`<div class="billing-card">
   <button type="button" class="billing-close" aria-label="${copy.close}" ${!entitled&&trial.state!=='trial'?'hidden':''}>×</button>
   <p class="billing-kicker">${copy.brand}</p><h2 id="billingTitle">${t.title}</h2>
   <p>${copy.benefits}</p><p class="billing-trial-note">${accessNote}</p>
   <div class="billing-options">${options||unavailable}</div>
   ${options?`<p class="billing-renewal">${t.renew}</p>`:''}
   <p id="billingMessage" role="status">${escapeHtml(message)}</p>
   <button type="button" class="billing-text-action" id="billingRestore" ${configured&&!busy?'':'disabled'}>${t.restore}</button>
   <div class="billing-links"><a href="${LEGAL_PAGES}privacy-policy${suffix}.html" target="_blank" rel="noopener">${t.privacy}</a>
   <a href="${termsUrl}" target="_blank" rel="noopener">${t.terms}</a></div>
  </div>`;
  dialog.querySelector('.billing-close').onclick=()=>dialog.close();
  dialog.querySelectorAll('[data-billing-package]').forEach(el=>el.addEventListener('click',()=>purchase(packages[Number(el.dataset.billingPackage)])));
  dialog.querySelector('#billingRestore').onclick=restore;
  dialog.querySelector('#billingRetry')?.addEventListener('click',loadOfferings);
 }
 function accept(info){if(hasAtlasAccess(info)){entitled=true;statusMessage='';update();render();return true;}entitled=false;update();return false;}
 async function loadOfferings(){
  if(!configured)return;
  offeringsLoaded=false;
  render('');
  try{const result=await Purchases.getOfferings();packages=result.current?.availablePackages||[];}
  catch{packages=[];}
  finally{offeringsLoaded=true;render();}
 }
 async function purchase(pkg){if(!configured||!pkg||busy)return;busy=true;render();try{const result=await Purchases.purchasePackage({aPackage:pkg});if(!accept(result.customerInfo))render(dictionary().error);}catch(error){if(!error?.userCancelled)render(dictionary().error);}finally{busy=false;render();}}
 async function restore(){if(!configured||busy)return;busy=true;render();try{const result=await Purchases.restorePurchases();if(!accept(result.customerInfo))render(dictionary().restored);}catch{render(dictionary().error);}finally{busy=false;render();}}
 button.onclick=()=>{render();if(!dialog.open)dialog.showModal();};
 dialog.addEventListener('cancel',event=>{if(!entitled&&trial.state!=='trial')event.preventDefault();});
 document.addEventListener('atlas-language-change',()=>{update();render();});
 document.addEventListener('visibilitychange',async()=>{if(document.hidden)return;trial=trialStatus(localStorage);if(configured){try{accept((await Purchases.getCustomerInfo()).customerInfo);}catch{}}update();render();});
 setInterval(()=>{trial=trialStatus(localStorage);update();render();},60000);
 update();render();
 if(!apiKey)return{mode:'unconfigured',platform};
 try{
  await Purchases.configure({apiKey});configured=true;
  await Purchases.addCustomerInfoUpdateListener(info=>accept(info));
  const [info]=await Promise.allSettled([Purchases.getCustomerInfo(),loadOfferings()]);
  if(info.status==='fulfilled')accept(info.value.customerInfo);
  update();render();return{mode:'ready',platform};
 }catch(error){console.warn('Billing initialization failed:',error);render(dictionary().unavailable);return{mode:'error',platform};}
}
