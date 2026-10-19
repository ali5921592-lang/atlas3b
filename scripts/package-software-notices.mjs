import {readFile,writeFile} from 'node:fs/promises';
const packages=['core','android','ios','app'];
const notices=[];
for(const name of packages)notices.push('@capacitor/'+name+'\n'+await readFile('node_modules/@capacitor/'+name+'/LICENSE','utf8'));
await writeFile('dist/vendor/CAPACITOR-LICENSES.txt',notices.join('\n\n----------------\n\n'));
const file='dist/offline-assets.json',manifest=JSON.parse(await readFile(file,'utf8'));
if(!manifest.core.includes('./vendor/CAPACITOR-LICENSES.txt'))manifest.core.push('./vendor/CAPACITOR-LICENSES.txt');
await writeFile(file,JSON.stringify(manifest)+'\n');
const path='dist/index.html',html=await readFile(path,'utf8');
const marker='<h3>Mobil ve çevrimdışı kullanım</h3>';
if(!html.includes('vendor/CAPACITOR-LICENSES.txt')){
 if(!html.includes(marker))throw Error('License section anchor changed');
 await writeFile(path,html.replace(marker,'<p><a href="vendor/CAPACITOR-LICENSES.txt" target="_blank" rel="noreferrer">Capacitor · MIT ↗</a> · <a href="vendor/LICENSE" target="_blank" rel="noreferrer">Three.js · MIT ↗</a></p>'+marker));
}
