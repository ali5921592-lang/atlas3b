import {spawnSync} from 'node:child_process';
const win=process.platform==='win32';
const tasks=['assembleDebug','bundleRelease','--console=plain'];
const result=spawnSync(win?'gradlew.bat':'sh',win?tasks:['gradlew',...tasks],{cwd:'android',stdio:'inherit',shell:win});
process.exit(result.status??1);
