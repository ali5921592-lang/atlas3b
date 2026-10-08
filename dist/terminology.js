import {terminologyData} from './terminology-data.js';
export function terminologyFor(r){return terminologyData[typeof r==='string'?r:r.name]||null;}
export const terminologySource='https://ta2viewer.openanatomy.org/';
