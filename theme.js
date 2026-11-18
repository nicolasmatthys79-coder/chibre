if(/Android/i.test(navigator.userAgent))document.documentElement.classList.add('native-android');
(()=>{const KEY="chibre_dark_mode",root=document.documentElement;function apply(dark){root.dataset.theme=dark?"dark":"light";const b=document.getElementById("darkModeToggle");if(b)b.setAttribute("aria-checked",String(dark));const status=document.getElementById("darkModeStatus");if(status)status.textContent=dark?"ON":"OFF";}function read(){try{return localStorage.getItem(KEY)==="true";}catch(e){return false;}}apply(read());document.addEventListener("DOMContentLoaded",()=>{apply(read());const b=document.getElementById("darkModeToggle");if(b)b.addEventListener("click",()=>{const dark=root.dataset.theme!=="dark";try{localStorage.setItem(KEY,String(dark));}catch(e){}apply(dark);});});window.addEventListener("storage",e=>{if(e.key===KEY)apply(read());});window.addEventListener("pageshow",()=>apply(read()));})();

/* Réglage partagé de la taille du texte, y compris les panneaux dynamiques. */
(()=>{
 const KEY='chibre_font_scale',labels={fr:['Taille de police','Plus petit','Plus grand'],de:['Schriftgrösse','Kleiner','Grösser'],it:['Dimensione del testo','Più piccolo','Più grande'],rm:['Grondezza da scrittira','Pli pitschen','Pli grond'],en:['Font size','Smaller','Larger']};
 let scale=1,frame=0,lastScale=null,lastNodes=[];const originals=new WeakMap();
 try{const value=Number(localStorage.getItem(KEY));if(value>=.8&&value<=1.25)scale=value;}catch(e){}
 function schedule(){if(!frame)frame=requestAnimationFrame(apply);}
 function apply(){
  frame=0;
  const nodes=[...document.body.querySelectorAll('*')].filter(el=>!el.closest('#fontSizeDialog,#menuToggle,#languageFlag,.apple-page-symbol,#markDialog .choice-symbol')&&!['SCRIPT','STYLE','OPTION'].includes(el.tagName)&&(el.matches('input,textarea,select')||[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())));
  if(lastScale===scale&&nodes.length===lastNodes.length&&nodes.every((el,i)=>el===lastNodes[i]))return;
  lastScale=scale;lastNodes=nodes;
  for(const el of nodes){if(!originals.has(el))originals.set(el,[el.style.getPropertyValue('font-size'),el.style.getPropertyPriority('font-size')]);const [value,priority]=originals.get(el);if(value)el.style.setProperty('font-size',value,priority);else el.style.removeProperty('font-size');}
  const sizes=nodes.map(el=>parseFloat(getComputedStyle(el).fontSize));
  if(scale!==1)nodes.forEach((el,i)=>{if(Number.isFinite(sizes[i]))el.style.setProperty('font-size',(sizes[i]*scale)+'px','important');});
 }
 document.addEventListener('DOMContentLoaded',()=>{
  const options=document.getElementById('appOptions');
  if(options){
   const button=document.createElement('button');button.type='button';button.className='font-size-choice';button.innerHTML='<span><span data-i18n="font_size">Taille de police</span> <span class="font-size-percent"></span></span><span aria-hidden="true" class="font-size-icon">A<small>a</small></span>';options.appendChild(button);
   const dialog=document.createElement('dialog');dialog.id='fontSizeDialog';dialog.className='language-dialog';dialog.innerHTML='<h2 data-i18n="font_size">Taille de police</h2><div class="font-size-range"><small>a</small><input type="range" min="80" max="125" step="5"><strong>A</strong></div><output></output><button type="button">OK</button>';document.body.appendChild(dialog);
   const input=dialog.querySelector('input'),output=dialog.querySelector('output');input.value=Math.round(scale*100);output.textContent=input.value+' %';
   function translate(){const lang=document.documentElement.lang.split('-')[0],text=labels[lang]||labels.fr;button.querySelector('[data-i18n=font_size]').textContent=text[0];button.querySelector('.font-size-percent').textContent=Math.round(scale*100)+' %';dialog.querySelector('h2').textContent=text[0];input.setAttribute('aria-label',text[0]);}
   button.onclick=()=>{translate();if(typeof closeLanguageMenu==='function')closeLanguageMenu();dialog.showModal();};
   input.oninput=()=>{scale=Number(input.value)/100;output.textContent=input.value+' %';button.querySelector('.font-size-percent').textContent=input.value+' %';try{localStorage.setItem(KEY,String(scale));}catch(e){}schedule();};
   dialog.querySelector('button').onclick=()=>dialog.close();translate();
   new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});schedule();
 });
 window.addEventListener('resize',()=>{lastScale=null;schedule();});window.addEventListener('storage',event=>{if(event.key===KEY){const value=Number(event.newValue);scale=value>=.8&&value<=1.25?value:1;schedule();}});
})();
