import {terminologyData} from './terminology-data.js';
import {femaleTerminologyData} from './female-terminology-data.js';
export function terminologyFor(r){const name=typeof r==='string'?r:r.name;const female=typeof r!=='string'&&!r.sharedReference&&(r.sex==='female'||String(r.file||'').startsWith('female')||String(r.id||'').startsWith('female:'));return(female?femaleTerminologyData[name]:null)||terminologyData[name]||null;}
export const terminologySource='https://ta2viewer.openanatomy.org/';
