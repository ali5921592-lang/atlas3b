import {installPhoneMenu} from './phone-menu.js';
const $=s=>document.querySelector(s);
const paths={layers:'M12 3 2 8l10 5 10-5-10-5ZM2 12l10 5 10-5M2 16l10 5 10-5',cut:'M4 4h16v16H4zM2 18 18 2M8 22 22 8',learn:'M3 4h6a4 4 0 0 1 3 2 4 4 0 0 1 3-2h6v15h-6a4 4 0 0 0-3 2 4 4 0 0 0-3-2H3zM12 6v15',saved:'M6 3h12v18l-6-4-6 4z',search:'M20 20l-5-5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0',close:'M6 6l12 12M6 18 18 6',info:'M12 11v6M12 7h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',plus:'M12 5v14M5 12h14',minus:'M5 12h14',reset:'M3 11a9 9 0 1 1 2 7M3 3v8h8'};
export const icon=name=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+(paths[name]||paths.layers)+'"/></svg>';
function fold(title,nodes){const d=document.createElement('details');d.className='tool-disclosure';d.innerHTML='<summary>'+title+'</summary>';nodes.filter(Boolean).forEach(n=>d.append(n));return d;}
export function setupInterface(){
 const sidebar=$('#sidebar');if(sidebar.querySelector('.workspace-tabs'))return;const expand=document.createElement('button');expand.id='expandDetail';expand.type='button';expand.textContent='Tam oku';expand.setAttribute('aria-expanded','false');expand.onclick=()=>{const on=document.body.classList.toggle('detail-expanded');expand.setAttribute('aria-expanded',String(on));expand.textContent=on?'Modeli göster':'Tam oku';};$('#closeDetail').before(expand);
 const viewport=globalThis.visualViewport;if(viewport){const syncViewport=()=>{if(globalThis.innerWidth<=850&&Math.abs(viewport.scale-1)<.01)document.documentElement.style.setProperty('--app-height',Math.round(viewport.height)+'px');else document.documentElement.style.removeProperty('--app-height');};viewport.addEventListener('resize',syncViewport);globalThis.addEventListener('resize',syncViewport);syncViewport();}document.body.classList.add('atlas-v12');$('.brand').innerHTML='<img class="brand-logo" src="icon-192.png" alt="" width="42" height="42"><span>İnsan Atlası 3B</span>';$('#sourcesNav').innerHTML=icon('info');
 const supportLinks=document.createElement('div');
 supportLinks.className='source-policy-links';
 for(const link of document.querySelectorAll('header .policy-link'))supportLinks.append(link.cloneNode(true));
 $('#sourceDialog h2').after(supportLinks);
 $('.side-heading').innerHTML='<h1>Atlas araçları</h1>';
 const header=document.createElement('div');header.className='header-tools';document.querySelector('header').insertBefore(header,document.querySelector('header>nav'));
 const search=$('.search-box'),results=$('#searchResults'),model=$('.model-choice');header.append(search,results,model);search.querySelector('span').innerHTML=icon('search');$('#search').placeholder='Türkçe / Latince yapı ara';$('#search').setAttribute('aria-controls','searchResults');
 const sexSelect=$('#sexModel'),toggle=document.createElement('div');toggle.className='sex-toggle';toggle.setAttribute('role','group');toggle.setAttribute('aria-label','Anatomi referansı');toggle.innerHTML='<button data-sex="female" type="button">Kadın</button><button data-sex="male" type="button">Erkek</button>';model.append(toggle);sexSelect.hidden=true;
 const syncSex=()=>toggle.querySelectorAll('button').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.sex===sexSelect.value));b.disabled=sexSelect.disabled;});toggle.onclick=e=>{const b=e.target.closest('[data-sex]');if(!b||sexSelect.disabled||b.dataset.sex===sexSelect.value)return;sexSelect.value=b.dataset.sex;sexSelect.dispatchEvent(new Event('change',{bubbles:true}));syncSex();};sexSelect.addEventListener('change',syncSex);if(globalThis.MutationObserver)new MutationObserver(syncSex).observe(sexSelect,{attributes:true});document.addEventListener('atlas-state',syncSex);syncSex();
 const regionBox=document.createElement('section');regionBox.className='region-picker';regionBox.append($('#region').previousElementSibling,$('#region'));
 const appearance=fold('Görünüm ve saydamlık',[$('.opacity-section'),$('.appearance-section')]),scope=fold('Model kapsamı',[$('#modelScope'),$('.supplement-note'),$('#femaleMuscleOpen')]);
 const fascia=document.createElement('label');fascia.className='check';fascia.innerHTML='<input id="showFascia" type="checkbox"> Fasya örtülerini göster';appearance.append(fascia);const opacityToggle=document.createElement('label');opacityToggle.className='check';opacityToggle.innerHTML='<input id="individualOpacity" type="checkbox"> Katman saydamlıklarını ayrı ayarla';appearance.append(opacityToggle);opacityToggle.querySelector('input').onchange=e=>sidebar.classList.toggle('show-layer-opacity',e.target.checked);
 const physiology=$('.physiology-controls'),motion=$('#motionOpen').parentElement,connectionLabel=$('#showConnections').parentElement,connectionNote=connectionLabel.nextElementSibling;
 const options=fold('Seçim seçenekleri',[connectionLabel,connectionNote,$('#showLabels').parentElement]);$('.layers-section').append($('#peelLayer').parentElement);
 const offline=document.createElement('section');offline.className='offline-tools';offline.innerHTML='<h2>Çevrimdışı erişim</h2>';for(const id of ['offlineDownload','offlineStatus','installApp'])offline.append($('#'+id));
 $('.study-controls>h2').textContent='Model üzerinde kesit';const cutActions=document.createElement('div');cutActions.className='cut-actions';cutActions.innerHTML='<button id="cutPick" type="button" aria-pressed="false">'+icon('cut')+'Modelde nokta seç</button><button id="cutOff" type="button">Kesiti kapat</button>';$('.study-controls>h2').after(cutActions);
 const cutOptions=fold('Kesit seçenekleri',[$('#cutPreset').previousElementSibling,$('#cutPreset'),$('#obliqueControls'),$('#cutReverse').parentElement,$('#cutSlab').parentElement,$('#cutThickness').previousElementSibling,$('#cutThickness'),$('#cutGuide').parentElement]);
 $('#cutPosition').after(cutOptions);
 $('#cutAxis').addEventListener('change',e=>{if(e.target.value==='oblique')cutOptions.open=true;});
 const learningChoice=$('.learning-choice');
 $('.detail-top').after(learningChoice);
 const levelLabels={basic:'Başlangıç',intermediate:'Orta',advanced:'Gelişmiş'};
 for(const option of $('#learningLevel').options)option.textContent=levelLabels[option.value];
 const quick=$('.quick-section');
 quick.querySelector('.eyebrow').textContent='Sık aranan yapılar';
 const groups=[['explore','Katmanlar','layers',[$('.layers-section'),appearance,options,scope,quick]],['inspect','Kesit','cut',[$('.study-controls'),$('.volume-entry')]],['learn','Öğren','learn',[$('.course-entry'),physiology,motion]],['saved','Kayıtlar','saved',[$('.personal-tools'),offline]]];
 const start=document.createElement('details');
 start.className='atlas-start';
 start.innerHTML=`<summary>${icon('learn')}<span>Hazır incelemeler</span></summary><div class="atlas-start-menu">
   <button id="startStructure" data-search="deltoid muscle" type="button">${icon('search')}<span><b>Deltoid kası</b><small>Kas, sinir, damar ve tutunma noktaları</small></span><span aria-hidden="true">↗</span></button>
   <button id="startSection" type="button">${icon('cut')}<span><b>3B kesit</b><small>Yapıları farklı düzlemlerde incele</small></span><span aria-hidden="true">↗</span></button>
   <button id="startCourse" type="button">${icon('learn')}<span><b>Kalp ve göğüs atölyesi</b><small>Adım adım rehberli ders</small></span><span aria-hidden="true">↗</span></button></div>`;
 const detailContent=$('#detailContent');
 scope.prepend(detailContent.querySelector('.coverage-note'));
 detailContent.replaceChildren();
 const tabs=document.createElement('nav');tabs.className='workspace-tabs';tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','Atlas araçları');$('.side-heading').after(tabs);
 for(const [key,label,symbol,nodes]of groups){const b=document.createElement('button');b.id='tab-'+key;b.dataset.workspace=key;b.setAttribute('role','tab');b.setAttribute('aria-controls','workspace-'+key);b.innerHTML=icon(symbol)+'<span>'+label+'</span>';tabs.append(b);const p=document.createElement('div');p.id='workspace-'+key;p.className='workspace-panel';p.setAttribute('role','tabpanel');p.setAttribute('aria-labelledby',b.id);for(const n of nodes)if(n)p.append(n);sidebar.append(p);}
 const dock=document.createElement('nav');dock.className='mobile-dock workspace-rail';dock.setAttribute('aria-label','Atlas bölümleri');dock.innerHTML=groups.map(([key,label,symbol])=>'<button data-open-workspace="'+key+'" type="button">'+icon(symbol)+'<span>'+label+'</span></button>').join('');document.body.append(dock);
 const syncDock=()=>dock.querySelectorAll('button').forEach(b=>{const on=$('#tab-'+b.dataset.openWorkspace).getAttribute('aria-selected')==='true';b.setAttribute('aria-current',String(on));b.setAttribute('aria-expanded',String(on&&sidebar.classList.contains('open')));b.setAttribute('aria-controls','workspace-'+b.dataset.openWorkspace);});
 new sidebar.ownerDocument.defaultView.MutationObserver(syncDock).observe(sidebar,{attributes:true,attributeFilter:['class']});
 const select=key=>{for(const b of tabs.children){const on=b.dataset.workspace===key;b.setAttribute('aria-selected',String(on));b.tabIndex=on?0:-1;$('#'+b.getAttribute('aria-controls')).hidden=!on;}syncDock();sidebar.scrollTop=0;};
 const open=key=>{setFocus(false);select(key);sidebar.classList.add('open');if(globalThis.matchMedia?.('(max-width: 850px)').matches){$('#details').classList.remove('open');document.body.classList.remove('detail-expanded');expand.setAttribute('aria-expanded','false');expand.textContent='Tam oku';}};
 for(const b of tabs.children)b.onclick=()=>select(b.dataset.workspace);dock.onclick=e=>{const b=e.target.closest('[data-open-workspace]');if(!b)return;if(sidebar.classList.contains('open')&&b.getAttribute('aria-current')==='true')sidebar.classList.remove('open');else open(b.dataset.openWorkspace);};document.addEventListener('atlas-open-tools',e=>open(e.detail||'explore'));
 tabs.onkeydown=e=>{const bs=[...tabs.children],i=bs.indexOf(document.activeElement);if(i<0)return;const d={ArrowRight:(i+1)%bs.length,ArrowLeft:(i+bs.length-1)%bs.length,Home:0,End:bs.length-1}[e.key];if(d===undefined)return;e.preventDefault();select(bs[d].dataset.workspace);bs[d].focus();};
 const close=document.createElement('button');close.id='closeSidebar';close.type='button';close.innerHTML=icon('close');close.setAttribute('aria-label','Araç panelini kapat');$('.side-heading').append(close);close.onclick=()=>{sidebar.classList.remove('open');dock.querySelector('[aria-current="true"]')?.focus();};
 const heading=$('.viewer-heading');
 heading.innerHTML='<span class="model-badge"><span id="sexBadge">Erkek referansı</span></span>';
 heading.prepend(regionBox);
 const toolbar=document.createElement('div');toolbar.className='viewer-toolbar';toolbar.innerHTML=`<button id="cutStatus" hidden type="button" aria-label="Kesit araçları">${icon('cut')}<span>Kesit</span></button><button id="focusMode" type="button" aria-pressed="false"><span>Odak modu</span></button>`;
 heading.after(toolbar);
 $('#cutStatus').onclick=()=>open('inspect');
 toolbar.append(start);
 const focus=$('#focusMode');
 const setFocus=on=>{
  document.body.classList.toggle('atlas-focus',on);
  focus.setAttribute('aria-pressed',String(on));
  focus.querySelector('span').textContent=on?'Odaktan çık':'Odak modu';
  start.open=false;
 };
 focus.onclick=()=>setFocus(!document.body.classList.contains('atlas-focus'));
 document.addEventListener('atlas-reveal-inspector',()=>setFocus(false));
 document.addEventListener('pointerdown',e=>{if(start.open&&!start.contains(e.target))start.open=false;});
 start.addEventListener('click',e=>{if(e.target.closest('button'))start.open=false;});
 $('#startSection').onclick=()=>{open('inspect');$('#cutAxis').focus();};
 $('#startCourse').onclick=()=>$('#thoraxOpen').click();
 for(const [id,symbol]of [['zoomIn','plus'],['zoomOut','minus'],['reset','reset'],['closeDetail','close']])$('#'+id).innerHTML=icon(symbol);
 $('#mobileDetails').innerHTML=icon('info')+'<span>Seçili yapı</span>';$('#mobileDetails').onclick=()=>{const p=$('#details');p.classList.toggle('open');if(!p.classList.contains('open')){document.body.classList.remove('detail-expanded');expand.setAttribute('aria-expanded','false');expand.textContent='Tam oku';}sidebar.classList.remove('open');};
 document.addEventListener('keydown',e=>{if(e.key!=='Escape'||document.querySelector('dialog[open]')||!$('#thoraxPanel').hidden)return;if(start.open){start.open=false;start.querySelector('summary').focus();return;}if(document.body.classList.contains('atlas-focus')){setFocus(false);return;}sidebar.classList.remove('open');$('#details').classList.remove('open');document.body.classList.remove('detail-expanded');expand.setAttribute('aria-expanded','false');expand.textContent='Tam oku';$('#searchResults').hidden=true;});select('explore');installPhoneMenu();
}
export function decorateDetails(activeView='general'){
 const content=$('#detailContent');if(content.querySelector('.detail-jumps'))return;
 const nav=document.createElement('nav');nav.className='detail-jumps';nav.setAttribute('role','tablist');nav.setAttribute('aria-label','Yapı bilgisi');
 for(const n of [...content.children]){if(n.matches('.detail-block,.takeaway,.related-structures,.detail-sources,.parent-note,.content-scope,.english-name,.latin-name'))n.dataset.detailView='general';if(n.matches('[data-explanation="03"],.anatomy-facts,.advanced-card,#connectionInfo'))n.dataset.detailView='relations';if(n.matches('[data-explanation="04"],.clinical-study'))n.dataset.detailView='clinical';if(n.matches('.personal-card'))n.dataset.detailView='notes';}
 const selectView=key=>{content.dataset.detailView=key;for(const button of nav.children){const on=button.dataset.detailTab===key;button.setAttribute('aria-selected',String(on));button.tabIndex=on?0:-1;}};
 for(const [key,label]of [['general','Genel'],['relations','İlişkiler'],['clinical','Klinik'],['notes','Notlar']]){const b=document.createElement('button');b.type='button';b.setAttribute('role','tab');b.dataset.detailTab=key;b.textContent=label;b.onclick=()=>{selectView(key);if(key==='relations')document.dispatchEvent(new CustomEvent('atlas-inspection-mode',{detail:'connections'}));};nav.append(b);}
 nav.onkeydown=e=>{const bs=[...nav.children],i=bs.indexOf(document.activeElement);if(i<0||!['ArrowRight','ArrowLeft'].includes(e.key))return;e.preventDefault();const forward=(e.key==='ArrowRight')!==(document.documentElement.dir==='rtl');const b=bs[(i+(forward?1:bs.length-1))%bs.length];b.click();b.focus();};content.querySelector('.detail-actions')?.after(nav);selectView(activeView);
}
