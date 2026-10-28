import {translationData} from './i18n-data.js';
import {languageLabels,commonNames,reviewedText} from './i18n-overrides.js';
import {clinicalLabelTranslations} from './clinical-label-translations.js';
import {contentFallbackEn} from './content-fallback-en.js';
const codes=['tr','en','de','es','ar'],norm=s=>String(s).replace(/\s+/g,' ').trim();
let language='tr';
try{
 const deviceLanguage=typeof navigator!=='undefined'?String(navigator.language||'').split('-')[0].toLowerCase():'';
 if(codes.includes(deviceLanguage))language=deviceLanguage;
 const saved=localStorage.getItem('anatomy-language');
 if(codes.includes(saved))language=saved;
}catch{}
export const currentLanguage=()=>language;
export function translateText(text,lang=language){
 const key=norm(text);if(!key||lang==='tr')return text;
 const reviewed=reviewedText[key];let value=reviewed?.[codes.indexOf(lang)-1]||clinicalLabelTranslations[key]?.[codes.indexOf(lang)]||translationData.text?.[lang]?.[key]||translationData.text?.en?.[key];
 if(!value&&/[·↗→←]/.test(key))value=key.split(/(\s*[·↗→←]\s*)/).map(piece=>/[·↗→←]/.test(piece)?piece:translateText(piece,lang)).join('');
 if(!value){const pieces=key.split(/(\d[\d.,% /–-]*)/);if(pieces.length>1)value=pieces.map(p=>{const k=norm(p);return /^\d/.test(k)?p:(reviewedText[k]?.[codes.indexOf(lang)-1]||translationData.text?.[lang]?.[k]||translationData.text?.en?.[k]||p);}).join(' ');}
 if(!value){const generic=key.match(/^Seçili kayıt:\s*(.+?)\.\s*Aşağıdaki açıklama (.+?) için genel bilgidir\.$/);if(generic){const name=localName(generic[1].trim(),generic[1].trim(),lang),kind=reviewedText[generic[2]]?.[codes.indexOf(lang)-1]||clinicalLabelTranslations[generic[2]]?.[codes.indexOf(lang)]||translationData.text?.[lang]?.[generic[2]]||translationData.text?.en?.[generic[2]]||generic[2];if(lang==='en')return 'Selected model structure: '+name+'. The following is general information about this structure type: '+kind+'.';if(lang==='de')return 'Ausgewählte Modellstruktur: '+name+'. Es folgen allgemeine Informationen zu dieser Strukturart: '+kind+'.';if(lang==='es')return 'Estructura seleccionada del modelo: '+name+'. A continuación se ofrece información general sobre este tipo de estructura: '+kind+'.';if(lang==='ar')return 'البنية المحددة في النموذج: '+name+'. فيما يلي معلومات عامة عن هذا النوع من البنى: '+kind+'.';}}
 return value||contentFallbackEn[key]||text;
}
export function localName(raw,turkish=raw,lang=language){const key=raw.toLowerCase(),row=commonNames[key];return row?.[codes.indexOf(lang)]||(lang==='en'?raw:translationData.names?.[lang]?.[raw])||(lang==='tr'?turkish:raw);}
export function allLocalNames(raw,turkish=raw){return codes.map(code=>localName(raw,turkish,code)).join(' ');}
export function allTranslatedText(text){return text?codes.map(code=>translateText(text,code)).join(' '):'';}
export function localSide(raw){const side=/\.l\.\d+$/.test(raw)?'Sol':/\.r\.\d+$/.test(raw)?'Sağ':'';return side?translateText(side):'';}
export function setLanguage(code){if(!codes.includes(code))throw Error('Unsupported language');language=code;try{localStorage.setItem('anatomy-language',code);}catch{}if(typeof document!=='undefined'){document.documentElement.lang=code;document.documentElement.dir=code==='ar'?'rtl':'ltr';document.dispatchEvent(new CustomEvent('atlas-language-change',{detail:code}));}}
export function installI18n(){
 const select=document.createElement('select');select.id='languageSelect';select.className='language-select';select.setAttribute('aria-label','Language');select.dataset.noI18n='true';select.innerHTML=codes.map(code=>'<option value="'+code+'">'+languageLabels[code]+'</option>').join('');document.querySelector('header>nav').prepend(select);select.value=language;
 const originals=new WeakMap(),attributes=new WeakMap();let queued=false;const skip=el=>!el||el.closest('script,style,textarea,[data-no-i18n],.english-name,.latin-name i,#backupExportText,#backupText');
 function apply(){observer.disconnect();document.title=({tr:'İnsan Atlası 3B',en:'Human Atlas 3D',de:'Atlas des Menschen 3D',es:'Atlas Humano 3D',ar:'أطلس الإنسان 3D'})[language];select.setAttribute('aria-label',translateText('Language'));const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);while(walker.nextNode()){const node=walker.currentNode;if(skip(node.parentElement)||!norm(node.textContent))continue;const stored=originals.get(node),original=!stored||node.textContent!==stored.last?node.textContent:stored.original,value=translateText(original);if(value!==node.textContent)node.textContent=value;originals.set(node,{original,last:node.textContent});}
 for(const el of document.querySelectorAll('[aria-label],[title],[placeholder]')){if(skip(el))continue;let memo=attributes.get(el)||{};for(const attr of ['aria-label','title','placeholder'])if(el.hasAttribute(attr)){const text=el.getAttribute(attr),old=memo[attr],original=!old||text!==old.last?text:old.original,value=translateText(original);el.setAttribute(attr,value);memo[attr]={original,last:value};}attributes.set(el,memo);}
 observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder']});queued=false;
 }
 const observer=new MutationObserver(()=>{if(!queued){queued=true;queueMicrotask(apply);}});select.onchange=()=>{setLanguage(select.value);apply();};document.addEventListener('atlas-language-change',apply);setLanguage(language);apply();return {apply};
}
