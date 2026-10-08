import {build} from 'esbuild-wasm';
import path from 'node:path';
await build({entryPoints:['dist/app.js'],outfile:'dist/app.bundle.js',bundle:true,format:'esm',platform:'browser',target:['es2020'],charset:'utf8',minify:false,alias:{'three/addons':path.resolve('dist/vendor/examples/jsm'),'three':path.resolve('dist/vendor/build/three.module.js')},logLevel:'info'});
