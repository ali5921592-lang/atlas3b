export function installNavigation({THREE,camera,controls,mount,requestRender,cancelMotion}){
 controls.enablePan=true;controls.screenSpacePanning=true;
 const nav=document.createElement('div');nav.className='navigation-mode';nav.setAttribute('role','group');nav.setAttribute('aria-label','Model hareketi');nav.innerHTML='<button id="rotateMode" aria-pressed="true">Döndür</button><button id="panMode" aria-pressed="false">Kaydır</button>';
 document.querySelector('.viewer-toolbar').append(nav);
 const mode=pan=>{cancelMotion();controls.mouseButtons.LEFT=pan?THREE.MOUSE.PAN:THREE.MOUSE.ROTATE;controls.touches.ONE=pan?THREE.TOUCH.PAN:THREE.TOUCH.ROTATE;mount.dataset.navigation=pan?'pan':'rotate';nav.querySelector('#panMode').setAttribute('aria-pressed',String(pan));nav.querySelector('#rotateMode').setAttribute('aria-pressed',String(!pan));};
 nav.querySelector('#panMode').onclick=()=>mode(true);nav.querySelector('#rotateMode').onclick=()=>mode(false);
 const shift=direction=>{cancelMotion();const height=2*camera.position.distanceTo(controls.target)*Math.tan(camera.fov*Math.PI/360);const delta=new THREE.Vector3(0,direction*height*.22,0);camera.position.add(delta);controls.target.add(delta);controls.update();requestRender();};
 const buttons=document.createElement('div');buttons.className='vertical-pan';buttons.innerHTML='<button id="panUp" aria-label="Görünümü başa doğru kaydır">↑</button><button id="panDown" aria-label="Görünümü ayağa doğru kaydır">↓</button>';document.querySelector('.view-controls').append(buttons);
 buttons.querySelector('#panUp').onclick=()=>shift(1);buttons.querySelector('#panDown').onclick=()=>shift(-1);
 const hint=document.createElement('p');hint.className='navigation-hint';hint.textContent='Kaydır modunda sürükleyerek başa veya ayaklara git. İki parmakla yakınlaştır ve kaydır.';document.querySelector('.gesture')?.replaceWith(hint);
 return {setMode:mode,shift};
}
