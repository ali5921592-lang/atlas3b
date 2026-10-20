const TRIAL_KEY='anatomi-first-open-trial-v1';
export const TRIAL_DURATION_MS=7*24*60*60*1000;

// This is a device-local trial. A reinstall or cleared app data may start it again;
// enforcing one trial per person requires a signed-in identity and backend.
export function trialStatus(storage,now=Date.now()){
 let raw;try{raw=storage.getItem(TRIAL_KEY);}catch{return{state:'unavailable',remainingMs:0};}
 let data;try{data=raw?JSON.parse(raw):null;}catch{data=null;}
 if(!data||!Number.isFinite(data.startedAt)||data.startedAt<0){data={startedAt:now,lastSeenAt:now};}
 const effectiveNow=Math.max(now,data.startedAt,Number(data.lastSeenAt)||now);
 data.lastSeenAt=effectiveNow;
 try{storage.setItem(TRIAL_KEY,JSON.stringify(data));}catch{return{state:'unavailable',remainingMs:0};}
 const remainingMs=Math.max(0,data.startedAt+TRIAL_DURATION_MS-effectiveNow);
 return{state:remainingMs>0?'trial':'expired',remainingMs,startedAt:data.startedAt};
}
