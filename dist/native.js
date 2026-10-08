import {Capacitor} from '@capacitor/core';
import {App} from '@capacitor/app';
if(Capacitor.isNativePlatform()){
 App.addListener('backButton',()=>{
  const dialog=document.querySelector('dialog[open]');if(dialog){dialog.close();return;}
  const results=document.querySelector('#searchResults');if(results&&!results.hidden){results.hidden=true;return;}
  const sidebar=document.querySelector('#sidebar.open');if(sidebar){sidebar.classList.remove('open');return;}
  const details=document.querySelector('#details.open');if(details){details.classList.remove('open');document.body.classList.remove('detail-expanded');const expand=document.querySelector('#expandDetail');if(expand)expand.setAttribute('aria-expanded','false');return;}
  App.exitApp();
 }).catch(error=>console.error('Native back navigation:',error));
}
