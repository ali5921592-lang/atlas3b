import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
const file=new URL('../store/metadata.json',import.meta.url);
const data=JSON.parse(await readFile(file,'utf8'));
const locales=['tr-TR','en-US','de-DE','es-ES','ar'];
assert.deepEqual(Object.keys(data.locales).sort(),[...locales].sort(),'five complete store locales');
const length=s=>Array.from(s).length;
for(const locale of locales){
  const entry=data.locales[locale];
  for(const [name,value,max] of [
    ['Apple app name',entry.apple.name,30],['Apple subtitle',entry.apple.subtitle,30],
    ['Apple promotional text',entry.apple.promotionalText,170],['Apple description',entry.apple.description,4000],
    ['Apple keywords',entry.apple.keywords,100],['Google app name',entry.google.appName,30],
    ['Google short description',entry.google.shortDescription,80],['Google full description',entry.google.fullDescription,4000]
  ]){
    assert.equal(typeof value,'string',`${locale} ${name} exists`);
    assert.ok(length(value)>0&&length(value)<=max,`${locale} ${name} length ${length(value)} <= ${max}`);
  }
  assert.ok(entry.apple.description.trim()&&entry.google.fullDescription.trim(),`${locale} descriptions present`);
}
assert.ok(data.reviewNotes['en-US']&&data.reviewNotes['tr-TR'],'review notes in primary and Turkish');
assert.equal(data.consoleDeclarations.googleHealthApps,'Medical Reference and Education');
assert.equal(data.consoleDeclarations.paidUpFront,false,'planned download is free');
assert.equal(data.storeRecords.googlePlay.mustChangeToFreeBeforeCreate,true,'old paid draft is flagged for correction');
async function pngSize(path){const b=await readFile(new URL(path,import.meta.url));assert.equal(b.toString('hex',0,8),'89504e470d0a1a0a',`${path} is PNG`);return[b.readUInt32BE(16),b.readUInt32BE(20)];}
assert.deepEqual(await pngSize('../store/google-play-icon.png'),[512,512],'Google Play app icon size');
assert.deepEqual(await pngSize('../store/google-feature-tr.png'),[1024,500],'Google Play feature graphic size');
assert.deepEqual(await pngSize('../ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png'),[1024,1024],'iOS app icon size');
for(const screenshot of ['01-male-atlas.png','02-female-atlas.png','03-section-controls.png'])
  assert.deepEqual(await pngSize(`../store/screenshots/android/${screenshot}`),[1080,1920],`${screenshot} Android emulator screenshot size`);
console.log('PASS store metadata and assets: five locales, platform field limits, reviewer notes, health category, icons, feature graphic, and three 9:16 Android emulator screenshots.');
