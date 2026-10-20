import {Capacitor} from '@capacitor/core';
import {Purchases} from '@revenuecat/purchases-capacitor';
import {BILLING_ENTITLEMENT, BILLING_KEYS} from './billing-config.js';
import {trialStatus} from './billing-trial.js';
const LANGS={
 tr:{trial:'Ücretsiz kullanım',days:n=>`${n} gün kaldı`,hours:n=>`${n} saat kaldı`,manage:'Erişimi yönet',title:'Atlası keşfetmeye devam et',intro:'7 günlük ücretsiz kullanımın sona erdi. Devam etmek için bir plan seç. Satın alma işlemi yalnızca seçtiğinde başlar.',monthly:'Aylık',yearly:'Yıllık',lifetime:'Ömür boyu',oneTime:'Tek ödeme',renew:'Abonelik mağaza hesabından otomatik yenilenir; istediğin zaman mağaza ayarlarından iptal edebilirsin.',buy:'Satın al',restore:'Satın alımları geri yükle',privacy:'Gizlilik',terms:'Kullanım koşulları',unavailable:'Mağaza ürünleri henüz hazır değil. Lütfen daha sonra tekrar dene.',loading:'Mağaza fiyatları yükleniyor…',error:'Satın alma tamamlanamadı. Bağlantını kontrol edip tekrar dene.',restored:'Etkin bir satın alma bulunamadı.',active:'Tam erişim etkin',preview:'7 gün ödeme bilgisi olmadan tam erişim. Süre sonunda otomatik ücret alınmaz.',notNative:'Satın alma iOS ve Android uygulamasında kullanılabilir.'},
 en:{trial:'Free access',days:n=>`${n} days left`,hours:n=>`${n} hours left`,manage:'Manage access',title:'Keep exploring the atlas',intro:'Your 7-day free access has ended. Choose a plan to continue. A purchase starts only when you select it.',monthly:'Monthly',yearly:'Yearly',lifetime:'Lifetime',oneTime:'One-time payment',renew:'Subscriptions renew through your store account. Cancel anytime in store settings.',buy:'Purchase',restore:'Restore purchases',privacy:'Privacy',terms:'Terms of use',unavailable:'Store products are not ready yet. Please try again later.',loading:'Loading store prices…',error:'Purchase could not be completed. Check your connection and try again.',restored:'No active purchase was found.',active:'Full access active',preview:'7 days of full access without payment details. No automatic charge at the end.',notNative:'Purchases are available in the iOS and Android apps.'},
 de:{trial:'Kostenlose Nutzung',days:n=>`${n} Tage übrig`,hours:n=>`${n} Stunden übrig`,manage:'Zugang verwalten',title:'Atlas weiter erkunden',intro:'Deine 7-tägige kostenlose Nutzung ist beendet. Wähle einen Tarif, um fortzufahren. Erst mit deiner Auswahl beginnt ein Kauf.',monthly:'Monatlich',yearly:'Jährlich',lifetime:'Lebenslang',oneTime:'Einmalzahlung',renew:'Abonnements verlängern sich über dein Store-Konto. Du kannst jederzeit in den Store-Einstellungen kündigen.',buy:'Kaufen',restore:'Käufe wiederherstellen',privacy:'Datenschutz',terms:'Nutzungsbedingungen',unavailable:'Store-Produkte sind noch nicht verfügbar. Bitte versuche es später erneut.',loading:'Store-Preise werden geladen…',error:'Der Kauf konnte nicht abgeschlossen werden. Prüfe deine Verbindung.',restored:'Kein aktiver Kauf gefunden.',active:'Voller Zugang aktiv',preview:'7 Tage voller Zugang ohne Zahlungsdaten. Danach erfolgt keine automatische Abbuchung.',notNative:'Käufe sind in den iOS- und Android-Apps verfügbar.'},
 es:{trial:'Acceso gratuito',days:n=>`${n} días restantes`,hours:n=>`${n} horas restantes`,manage:'Gestionar acceso',title:'Sigue explorando el atlas',intro:'Han terminado tus 7 días de acceso gratuito. Elige un plan para continuar. La compra comienza solo cuando la eliges.',monthly:'Mensual',yearly:'Anual',lifetime:'De por vida',oneTime:'Pago único',renew:'Las suscripciones se renuevan mediante tu cuenta de la tienda. Puedes cancelarlas en los ajustes de la tienda.',buy:'Comprar',restore:'Restaurar compras',privacy:'Privacidad',terms:'Condiciones de uso',unavailable:'Los productos de la tienda aún no están disponibles. Inténtalo más tarde.',loading:'Cargando precios de la tienda…',error:'No se pudo completar la compra. Comprueba la conexión.',restored:'No se encontró ninguna compra activa.',active:'Acceso completo activo',preview:'7 días de acceso completo sin datos de pago. No se cobrará automáticamente al finalizar.',notNative:'Las compras están disponibles en las apps de iOS y Android.'},
 ar:{trial:'استخدام مجاني',days:n=>`${n} أيام متبقية`,hours:n=>`${n} ساعات متبقية`,manage:'إدارة الوصول',title:'واصل استكشاف الأطلس',intro:'انتهت فترة الاستخدام المجاني لمدة 7 أيام. اختر خطة للمتابعة. لا تبدأ عملية الشراء إلا عندما تختارها.',monthly:'شهريًا',yearly:'سنويًا',lifetime:'مدى الحياة',oneTime:'دفعة واحدة',renew:'تتجدد الاشتراكات عبر حساب المتجر. يمكنك إلغاؤها من إعدادات المتجر في أي وقت.',buy:'شراء',restore:'استعادة المشتريات',privacy:'الخصوصية',terms:'شروط الاستخدام',unavailable:'منتجات المتجر غير متاحة بعد. يُرجى المحاولة لاحقًا.',loading:'جارٍ تحميل أسعار المتجر…',error:'تعذر إتمام الشراء. تحقق من اتصالك وحاول مجددًا.',restored:'لم يتم العثور على عملية شراء نشطة.',active:'الوصول الكامل مفعل',preview:'7 أيام من الوصول الكامل دون بيانات دفع. لن يتم الخصم تلقائيًا عند انتهائها.',notNative:'تتوفر المشتريات في تطبيقي iOS وAndroid.'}
};

export function hasAtlasAccess(customerInfo){return customerInfo?.entitlements?.active?.[BILLING_ENTITLEMENT]?.isActive===true;}
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
  const t=dictionary();dialog.dir=language()==='ar'?'rtl':'ltr';
  const names={monthly:t.monthly,yearly:t.yearly,lifetime:t.lifetime};
  const options=packages.map((pkg,index)=>{const kind=packageKind(pkg);if(!kind)return'';const price=pkg.product?.priceString||'';return `<button type="button" class="billing-plan" data-billing-package="${index}" ${busy?'disabled':''}><span><b>${names[kind]}</b>${kind==='lifetime'?`<small>${t.oneTime}</small>`:''}</span><strong>${price}</strong></button>`;}).join('');
  const suffix=language()==='tr'?'':`-${language()}`;
  dialog.innerHTML=`<div class="billing-card"><button type="button" class="billing-close" aria-label="Close" ${!entitled&&trial.state!=='trial'?'hidden':''}>×</button><div class="billing-icon">✦</div><p class="billing-kicker">ANATOMİ ATLASI</p><h2 id="billingTitle">${t.title}</h2><p>${t.intro}</p><p class="billing-trial-note">${t.preview}</p><div class="billing-options">${options||`<p class="billing-muted">${configured&&!offeringsLoaded?t.loading:t.unavailable}</p>`}</div><p class="billing-renewal">${t.renew}</p><p id="billingMessage" role="status">${message}</p><button type="button" id="billingRestore" ${configured&& !busy?'':'disabled'}>${t.restore}</button><div class="billing-links"><a href="./privacy-policy${suffix}.html" target="_blank" rel="noopener">${t.privacy}</a><a href="./terms${suffix}.html" target="_blank" rel="noopener">${t.terms}</a></div></div>`;
  dialog.querySelector('.billing-close').onclick=()=>dialog.close();
  dialog.querySelectorAll('[data-billing-package]').forEach(el=>el.addEventListener('click',()=>purchase(packages[Number(el.dataset.billingPackage)])));
  dialog.querySelector('#billingRestore').onclick=restore;
 }
 function accept(info){if(hasAtlasAccess(info)){entitled=true;statusMessage='';update();render();return true;}entitled=false;update();return false;}
 async function loadOfferings(){if(!configured)return;try{const result=await Purchases.getOfferings();packages=result.current?.availablePackages||[];}catch{packages=[];}offeringsLoaded=true;render();}
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
