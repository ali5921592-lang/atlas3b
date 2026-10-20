import assert from 'node:assert/strict';
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
