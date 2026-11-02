
(function(){const p=location.pathname;if(p.endsWith('/Playhouse_G1_U1/views/slide_8.html'))document.body.classList.add('g1-dialogue-fit');if(p.endsWith('/Playhouse_G1_U1/views/slide_10.html'))document.body.classList.add('g1-song-fit');if(p.endsWith('/Playhouse_G1_U15/views/fillin_table.html'))document.body.classList.add('g1-weather-table');})();
/* Keep the established feedback clips and make repeat checks predictable. */
(function(){
 if(!document.body.classList.contains('ui-repair')||!window.jQuery)return;
 const $=window.jQuery;
 // Allow immediate dismissal even when a student closes feedback quickly.
 document.querySelector('#feedbackPopup')?.classList.remove('fade');
 function stopFeedback(){document.querySelectorAll('#feedbackPopup video').forEach(v=>{v.pause();try{v.currentTime=0;}catch(e){}v.style.display='none';});}
 if(typeof window.showFeedback==='function')window.showFeedback=function(visible,correct){
  const popup=document.querySelector('#feedbackPopup');if(!popup)return;
  if(typeof window.stopPlaying==='function')window.stopPlaying();
  stopFeedback();
  if(!visible){$(popup).modal('hide');return;}
  if(correct&&window.g1PaintChecks)correct=window.g1PaintChecks.every(check=>check());
  const message=correct?'Good job!':'Try again!';
  popup.setAttribute('aria-label',message);
  let status=popup.querySelector('.feedback-status');
  if(!status){status=document.createElement('p');status.className='feedback-status';status.setAttribute('role','status');popup.querySelector('.modal-body').appendChild(status);}
  status.textContent=message;
  const video=popup.querySelector(correct?'#video_1':'#video_2');
  if(video){video.style.display='block';const promise=video.play();if(promise)promise.catch(()=>{});}
  $(popup).modal('show');
 };
 $('#feedbackPopup').on('hidden.bs.modal.g1Responsive',stopFeedback);
})();

/* Measure the actual fixed controls rather than assuming a desktop height. */
(function(){
 if(!document.body.classList.contains('ui-repair'))return;
 function fit(){
  const content=document.querySelector('.content_wrap');
  if(!content)return;
  let bottom=window.innerHeight;
  document.querySelectorAll('footer,.sub_footer').forEach(el=>{
   const r=el.getBoundingClientRect();
   if(r.height>0 && r.top>0 && getComputedStyle(el).display!=='none') bottom=Math.min(bottom,r.top);
  });
  content.style.setProperty('--activity-viewport',Math.max(180,bottom-content.getBoundingClientRect().top-12)+'px');
 }
 window.addEventListener('resize',fit);
 window.addEventListener('load',fit);
 const observer=new ResizeObserver(fit);
 document.querySelectorAll('header,footer,.sub_footer').forEach(el=>observer.observe(el));
 fit();
})();

/* Fit legacy fixed-width text/artwork without changing its internal coordinates.
   Drawing and drag activities retain their native coordinate system and scrolling. */
(function(){
 if(!document.body.classList.contains('ui-repair'))return;
 let queued=false;
 function fitWide(){
  queued=false;
  const content=document.querySelector('.content_wrap'), area=document.querySelector('.activity_area')||document.querySelector('.content_wrap > .options');
  if(!content||!area)return;
  area.style.zoom='';area.style.width='';area.style.flexShrink='';
  if(innerWidth>1100||area.querySelector('canvas,.ui-draggable,.ui-droppable')||/linedraw|drag/i.test(area.dataset.type||area.dataset.activity||''))return;
  const box=content.getBoundingClientRect(),style=getComputedStyle(content);
  const available=content.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight);
  let left=area.getBoundingClientRect().left,right=left+available;
  area.querySelectorAll('*').forEach(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);if(r.width&&r.height&&s.position!=='fixed'&&s.display!=='none'){left=Math.min(left,r.left);right=Math.max(right,r.right);}});
  const needed=Math.ceil(right-left);
  if(needed>available+20){area.style.width=needed+'px';area.style.flexShrink='0';area.style.zoom=String(available/needed);}
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(()=>requestAnimationFrame(fitWide));}}
 window.addEventListener('resize',schedule);window.addEventListener('load',schedule);
 new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
 document.fonts.ready.then(schedule);schedule();
})();

/* Shrink each lesson as the available laptop viewport shrinks. */
(function(){
 if(!document.body.classList.contains('ui-repair'))return;
 let pending=false;
 function scaleLesson(){
  pending=false;
  const c=document.querySelector('.content_wrap'),a=document.querySelector('.options');
  if(!c||!a)return;
  if(a.querySelector('canvas,.ui-draggable,.ui-droppable')){a.style.zoom='';return;}
  a.style.zoom='';
  if(innerWidth>1920)return;
  const r=a.getBoundingClientRect();
  let bottom=innerHeight-85;
  document.querySelectorAll('footer,.sub_footer').forEach(e=>{const b=e.getBoundingClientRect();if(b.height&&b.top>0)bottom=Math.min(bottom,b.top-12)});
  const scale=Math.min(1,innerWidth/1920,innerHeight/1000);
  // Zoom keeps all labels and artwork in one coordinate system.
  a.style.zoom=String(Math.max(.5,scale));
 }
 function queue(){if(!pending){pending=true;requestAnimationFrame(()=>requestAnimationFrame(scaleLesson))}}
 addEventListener('resize',queue);addEventListener('load',queue);
 new MutationObserver(queue).observe(document.body,{childList:true,subtree:true});
 document.fonts.ready.then(queue);queue();
})();
(function(){
 if(!document.body.classList.contains('ui-repair'))return;
 let queued=false;
 function fitVideo(){
  queued=false;
  document.querySelectorAll('#monitor').forEach(frame=>{
   const video=frame.querySelector('video');if(!video)return;
   const ratio=video.videoWidth&&video.videoHeight?video.videoWidth/video.videoHeight:16/9;
   let bottom=innerHeight-20;
   document.querySelectorAll('footer,.sub_footer').forEach(e=>{const r=e.getBoundingClientRect();if(r.height&&r.top>0)bottom=Math.min(bottom,r.top-20)});
   const top=frame.getBoundingClientRect().top+(frame.closest(".content_wrap")?.scrollTop||0);
   const height=Math.max(180,bottom-top-20);
   const width=Math.min(1100,innerWidth*.85,height*ratio);
   frame.style.setProperty('--video-frame-width',width+'px');
   frame.style.setProperty('--video-ratio',String(ratio));
  });
 }
 function queue(){if(!queued){queued=true;requestAnimationFrame(()=>requestAnimationFrame(fitVideo))}}
 addEventListener('resize',queue);addEventListener('load',queue);
 document.addEventListener('loadedmetadata',queue,true);
 document.addEventListener('fullscreenchange',queue);
 new MutationObserver(queue).observe(document.body,{childList:true,subtree:true});queue();
})();


(function(){
 if(!document.body.classList.contains('ui-intro'))return;
 const main=document.querySelector('.mainContent');if(!main)return;
 const style=getComputedStyle(document.body);
 main.style.backgroundImage=style.backgroundImage;
 main.style.backgroundSize=style.backgroundSize;
 main.style.backgroundPosition=style.backgroundPosition;
 main.style.backgroundRepeat='no-repeat';
 document.body.style.backgroundImage='none';
 function fit(){
  const header=document.querySelector('header')?.getBoundingClientRect();
  const footer=document.querySelector('footer')?.getBoundingClientRect();
  const top=header?.bottom||100,bottom=footer?.top||innerHeight-70;
  const scale=Math.min(1,Math.max(180,bottom-top-8)/innerHeight);
  main.style.height=innerHeight+'px';main.style.marginTop=top+'px';
  main.style.setProperty('--intro-scale',scale);
 }
 addEventListener('load',fit);addEventListener('resize',fit);
 new ResizeObserver(fit).observe(document.querySelector('footer'));
 fit();
})();

$(document).on('click.g1ResetReady','.checkBtn',function(){setTimeout(function(){$('.resetBtn').removeClass('disabled');},0);});

// A transformed intro creates a stacking context. Keep Bootstrap modals at body level.
if(document.body.classList.contains('ui-intro')){document.querySelectorAll('.mainContent .modal').forEach(m=>document.body.appendChild(m));}
// Unit 14's season artwork lives at body level; keep its popup controls in the same layer.
if(/Playhouse_G1_U14\/views\/playhouse_intro\.html$/.test(location.pathname)){
 document.querySelectorAll('.mainContent .read_highlights_wrap').forEach(e=>document.body.appendChild(e));
}
if(document.body.classList.contains('ui-intro')){
 document.addEventListener('keydown',function(e){if(e.key==='Escape')$('.modal.show').modal('hide');});
}
