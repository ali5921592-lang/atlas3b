import {Capacitor} from '@capacitor/core';
import {App} from '@capacitor/app';
import {installBilling} from './billing.js';
installBilling().catch(error=>console.warn('Billing setup:',error));
if(Capacitor.isNativePlatform()){
 App.addListener('backButton',()=>{
  const dialog=document.querySelector('dialog[open]');if(dialog){
   if(dialog.id==='billingDialog'&&document.body.classList.contains('billing-locked'))return;
   dialog.close();return;
  }
  const results=document.querySelector('#searchResults');if(results&&!results.hidden){results.hidden=true;return;}
  const sidebar=document.querySelector('#sidebar.open');if(sidebar){sidebar.classList.remove('open');return;}
  const details=document.querySelector('#details.open');if(details){details.classList.remove('open');document.body.classList.remove('detail-expanded');const expand=document.querySelector('#expandDetail');if(expand)expand.setAttribute('aria-expanded','false');return;}
  App.exitApp();
 }).catch(error=>console.error('Native back navigation:',error));
}
