(() => {
 let ready=false;
 function centre(){
  if(ready)return;
  const box=document.querySelector('.image_with_text'), options=document.querySelector('.options');
  if(!box||!options)return;
  const items=[...box.querySelectorAll('.image_audio')];
  if(!items.length||items.some(e=>!e.querySelector('img').naturalWidth))return;
  ready=true;
  const rects=items.map(e=>e.querySelector('img').getBoundingClientRect());
  const x=Math.min(...rects.map(r=>r.left)),y=Math.min(...rects.map(r=>r.top));
  const w=Math.max(...rects.map(r=>r.right))-x,h=Math.max(...rects.map(r=>r.bottom))-y;
  options.style.setProperty('zoom','1','important'); options.style.setProperty('height','auto','important');
  options.style.setProperty('width','calc(100% - 160px)','important');
  options.style.setProperty('margin','24px auto','important');
  box.parentElement.querySelector('.read_grammer')?.remove();
  box.querySelector('.main_image').style.display='none';
  Object.assign(box.style,{position:'relative',width:w+'px',height:h+'px',flex:'none',margin:'0 auto'});
  items.forEach((e,i)=>{const r=rects[i];e.style.setProperty('transform','none','important');Object.assign(e.style,{left:(r.left-x)+'px',top:(r.top-y)+'px',width:r.width+'px',height:r.height+'px'});const im=e.querySelector('img');im.style.width='100%';im.style.height='auto';});
  function resize(){box.style.zoom=Math.min(1.35,options.clientWidth/w,Math.max(220,innerHeight-330)/h);}
  resize();addEventListener('resize',resize);
 }
 const timer=setInterval(()=>{centre();if(ready)clearInterval(timer)},100);
})();
