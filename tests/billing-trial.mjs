import assert from 'node:assert/strict';
import {registerHooks} from 'node:module';
import {JSDOM} from 'jsdom';
import {trialStatus,TRIAL_DURATION_MS} from '../dist/billing-trial.js';

const data=new Map();
const store={getItem:key=>data.get(key)||null,setItem:(key,value)=>data.set(key,value)};
const start=1_800_000_000_000;
assert.equal(trialStatus(store,start).state,'trial');
assert.equal(trialStatus(store,start).remainingMs,TRIAL_DURATION_MS);
assert.equal(trialStatus(store,start+TRIAL_DURATION_MS-1).state,'trial');
assert.equal(trialStatus(store,start+TRIAL_DURATION_MS).state,'expired');
assert.equal(trialStatus(store,start+1000).state,'expired','moving the clock back must not reopen access');
assert.equal(trialStatus({getItem(){throw Error('disabled');}},start).state,'unavailable');
console.log('PASS billing: 7 days from first open, boundary, clock rollback, unavailable storage.');

const hooks=registerHooks({resolve(specifier,context,nextResolve){
 const exportName={
  '@capacitor/core':'Capacitor',
  '@revenuecat/purchases-capacitor':'Purchases'
 }[specifier];
 if(exportName)return {url:`data:text/javascript,export const ${exportName}=globalThis.billingFixture.${exportName}`,shortCircuit:true};
 if(specifier==='./billing-config.js'&&context.parentURL?.endsWith('/dist/billing.js')){
  return {url:'data:text/javascript,export const BILLING_ENTITLEMENT="atlas_pro", BILLING_KEYS={ios:"test"}',shortCircuit:true};
 }
 return nextResolve(specifier,context);
}});
let configureAttempts=0, entitled=false;
const info=()=>({entitlements:{active:entitled?{atlas_pro:{isActive:true}}:{}}});
globalThis.billingFixture={
 Capacitor:{isNativePlatform:()=>true,getPlatform:()=> 'ios'},
 Purchases:{
  async configure(){if(++configureAttempts===2)throw new Error('test: initial store connection');},
  async addCustomerInfoUpdateListener(){},
  async getCustomerInfo(){return {customerInfo:info()};},
  async getOfferings(){return {current:{availablePackages:[{identifier:'$rc_monthly',product:{priceString:'$4.99'}}]}};},
  async restorePurchases(){entitled=true;return {customerInfo:info()};}
 }
};
const {installBilling}=await import('../dist/billing.js');
hooks.deregister();

const originalInterval=globalThis.setInterval;
async function launchPaywall(expired){
 const {window}=new JSDOM('<!doctype html><html lang="en"><body></body></html>',{url:'https://localhost'});
 window.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};
 window.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');};
 Object.defineProperty(window.document,'hidden',{value:false});
 globalThis.document=window.document;
 globalThis.localStorage=window.localStorage;
 if(expired)trialStatus(window.localStorage,Date.now()-TRIAL_DURATION_MS-1000);
 let tick;
 globalThis.setInterval=callback=>{tick=callback;};
 try{await installBilling();}finally{globalThis.setInterval=originalInterval;}
 return {document:window.document,dialog:window.document.querySelector('#billingDialog'),tick};
}

const settle=()=>new Promise(resolve=>setImmediate(resolve));
const trialPaywall=await launchPaywall(false);
trialPaywall.document.querySelector('#billingStatusButton').click();
const plan=trialPaywall.dialog.querySelector('.billing-plan');
assert.ok(plan);
trialPaywall.tick();
trialPaywall.document.dispatchEvent(new trialPaywall.document.defaultView.Event('visibilitychange'));
await settle();
assert.ok(trialPaywall.dialog.open,'a manually opened paywall stays open across time and app focus updates');
assert.equal(trialPaywall.dialog.querySelector('.billing-plan'),plan,'background updates do not replace the selected plan button');

const expiredPaywall=await launchPaywall(true);
assert.ok(expiredPaywall.dialog.open);
expiredPaywall.dialog.querySelector('#billingRetry').click();
await settle();
assert.equal(configureAttempts,3,'retry reconfigures the store after initialization fails');
assert.equal(expiredPaywall.dialog.querySelector('.billing-plan strong').textContent,'$4.99');
expiredPaywall.dialog.querySelector('#billingRestore').click();
await settle();
assert.equal(expiredPaywall.dialog.open,false,'restoring access closes the blocking paywall');
assert.ok(!expiredPaywall.document.body.classList.contains('billing-locked'));
console.log('PASS paywall stays open during refresh and recovers from initial store failure');
