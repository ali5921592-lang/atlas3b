export function installPhoneMenu() {
  const phone = globalThis.matchMedia?.('(max-width:850px), (pointer:coarse) and (max-height:500px)');
  if (!phone) return;
  const get = selector => document.querySelector(selector);
  const trigger = document.createElement('button');
  trigger.id = 'atlasMenuButton';
  trigger.type = 'button';
  trigger.setAttribute('aria-label','Atlas menüsü');
  trigger.setAttribute('aria-controls','atlasMenu');
  trigger.setAttribute('aria-haspopup','dialog');
  trigger.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
  const menu = document.createElement('dialog');
  menu.id = 'atlasMenu';
  menu.setAttribute('aria-labelledby','atlasMenuTitle');
  menu.innerHTML = '<div class="menu-title"><h2 id="atlasMenuTitle">İnsan Atlası 3B</h2><button type="button" aria-label="Kapat" autofocus>×</button></div><div class="menu-search"></div><div class="menu-reference"></div><nav class="menu-sections"></nav><details class="menu-view"><summary>Görünüm</summary></details><div class="menu-settings"></div>';
  document.body.append(trigger,menu);
  const moves = [];
  function move(selector,destination) {
    const node = get(selector);
    if (!node) return;
    const anchor = document.createComment('atlas-menu');
    node.before(anchor);
    moves.push([node,anchor]);
    menu.querySelector(destination).append(node);
  }
  for (const tab of document.querySelectorAll('.workspace-tabs button')) {
    const item = document.createElement('button');
    item.type = 'button';
    item.innerHTML = tab.innerHTML;
    item.onclick = () => {
      menu.close();
      document.dispatchEvent(new CustomEvent('atlas-open-tools',{detail:tab.dataset.workspace}));
      get('#closeSidebar').focus();
    };
    menu.querySelector('nav').append(item);
  }
  function restore() {
    for (const [node,anchor] of moves.splice(0)) anchor.replaceWith(node);
    trigger.setAttribute('aria-expanded','false');
  }
  function openMenu() {
    if (menu.open) return;
    restore();
    get('#sidebar').classList.remove('open');
    move('.search-box','.menu-search');
    move('#searchResults','.menu-search');
    move('.model-choice','.menu-reference');
    for (const selector of ['.region-picker','.view-controls','.navigation-mode','.explode-control','.atlas-start']) move(selector,'.menu-view');
    move('#languageSelect','.menu-settings');
    move('#sourcesNav','.menu-settings');
    menu.showModal();
    trigger.setAttribute('aria-expanded','true');
  }
  trigger.setAttribute('aria-expanded','false');
  trigger.onclick = openMenu;
  menu.querySelector('.menu-title button').onclick = () => menu.close();
  menu.addEventListener('close',()=>{if(!menu.open)restore();});
  menu.addEventListener('click',event=>{
    const bounds = menu.getBoundingClientRect();
    const outside = event.target===menu && (event.clientX<bounds.left || event.clientX>bounds.right || event.clientY<bounds.top || event.clientY>bounds.bottom);
    if (outside || event.target.closest('#sourcesNav,.atlas-start-menu button,.view-controls button,.navigation-mode button')) menu.close();
  });
  menu.addEventListener('change',event=>{if(event.target.id==='region')menu.close();});
  document.addEventListener('atlas-reveal-inspector',()=>{if(menu.open)menu.close();});
  document.addEventListener('keydown',event=>{
    if (phone.matches && event.key==='/' && !document.querySelector('dialog[open]') && !event.target.matches('input,textarea,select')) {
      event.preventDefault(); event.stopImmediatePropagation(); openMenu(); get('#search').focus();
    }
  },true);
  phone.addEventListener('change',()=>{if(!phone.matches && menu.open)menu.close();});
}

