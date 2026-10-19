var drawResetters=[];
function buildFillInBody(data){
var palette=[['Black','#222222'],['Blue','#2587df'],['Red','#ef4444'],['Green','#4db45d'],['Yellow','#ffe45c'],['Brown','#965d35'],['Pink','#f6b2cc']];
var nav='<div class="sub_footer_icon sub_footer_icon_left subFooterNav backNav"><a href=""><img src="../images/icons/back_btn.png"></a></div><div class="sub_footer_icon sub_footer_icon_right subFooterNav nextNav"><a href=""><img src="../images/icons/next_btn.png"></a></div>';
var tools='<button type="button" data-mode="pen" aria-pressed="true">Draw</button>'+(data.colour?'<button type="button" data-mode="fill" aria-pressed="false">Colour</button>':'')+'<label>Pen size <select id="pen-size"><option value="3">Thin</option><option value="7" selected>Medium</option><option value="14">Thick</option></select></label>'+palette.map(function(c,i){return '<button type="button" data-colour="'+c[1]+'" aria-pressed="'+(i===0)+'">'+c[0]+'</button>';}).join('');
$('.activity_area').append(nav+'<section class="draw-page options"><h2><span class="blue_text">'+data.number+'</span> '+data.title+'</h2>'+(data.audio?'<audio controls src="'+data.audio+'" aria-label="Listen to the weather"></audio>':'')+'<div class="draw-tools">'+tools+'</div><div class="draw-layout '+(data.pictures.length>1?'two-pictures':'')+'"><div class="drawing-pictures"></div>'+(data.poem?'<div class="draw-poem">'+data.poem+'</div>':'')+'</div><p class="draw-status" role="status"></p></section>');
var selected=palette[0][1],mode='pen';
document.querySelectorAll('[data-colour]').forEach(function(b){b.onclick=function(){selected=b.dataset.colour;document.querySelectorAll('[data-colour]').forEach(function(v){v.setAttribute('aria-pressed',v===b);});};});
document.querySelectorAll('[data-mode]').forEach(function(b){b.onclick=function(){mode=b.dataset.mode;document.querySelectorAll('[data-mode]').forEach(function(v){v.setAttribute('aria-pressed',v===b);});};});
data.pictures.forEach(function(pic){
var card=document.createElement('div');card.className='drawing-card';card.innerHTML=(pic.label?'<h3>'+pic.label+'</h3>':'')+'<canvas width="1000" height="1000" aria-label="'+pic.alt+'"></canvas><div><button class="draw-undo" disabled>Undo</button><button class="draw-clear" disabled>Clear drawing</button></div>';
document.querySelector('.drawing-pictures').appendChild(card);
var canvas=card.querySelector('canvas'),ctx=canvas.getContext('2d',{willReadFrequently:true}),source,history=[],drawing=false,last,undo=card.querySelector('.draw-undo'),clear=card.querySelector('.draw-clear');
function controls(){undo.disabled=!history.length;clear.disabled=!history.length;$('.resetBtn').removeClass('disabled');}
function save(){history.push(ctx.getImageData(0,0,canvas.width,canvas.height));if(history.length>20)history.shift();}
function point(e){var b=canvas.getBoundingClientRect(),s=Math.min(b.width/canvas.width,b.height/canvas.height);return {x:(e.clientX-b.left-(b.width-canvas.width*s)/2)/s,y:(e.clientY-b.top-(b.height-canvas.height*s)/2)/s};}
var img=new Image();img.onload=function(){canvas.height=Math.round(canvas.width*img.naturalHeight/img.naturalWidth);ctx.fillStyle='white';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);source=ctx.getImageData(0,0,canvas.width,canvas.height);};img.onerror=function(){document.querySelector('.draw-status').textContent='The picture could not load. Please refresh.';};img.src=pic.src;
canvas.addEventListener('pointerdown',function(e){if(!source)return;var p=point(e),w=canvas.width,h=canvas.height;if(p.x<0||p.y<0||p.x>=w||p.y>=h)return;e.preventDefault();
if(mode==='pen'){save();drawing=true;last=p;canvas.setPointerCapture(e.pointerId);ctx.strokeStyle=selected;ctx.lineWidth=Number(document.getElementById('pen-size').value);ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x+.1,p.y+.1);ctx.stroke();controls();return;}
var paint=ctx.getImageData(0,0,w,h),start=Math.floor(p.y)*w+Math.floor(p.x),rgb=[1,3,5].map(function(n){return parseInt(selected.slice(n,n+2),16);});
function light(i){var n=i*4;return paint.data[n]>240&&paint.data[n+1]>240&&paint.data[n+2]>240;}
if(!light(start))return;var seen=new Uint8Array(w*h),queue=[start],outside=false;seen[start]=1;
for(var head=0;head<queue.length;head++){var i=queue[head],x=i%w,y=Math.floor(i/w);if(x===0||y===0||x===w-1||y===h-1){outside=true;break;}[i-1,i+1,i-w,i+w].forEach(function(n){if(!seen[n]&&light(n)){seen[n]=1;queue.push(n);}});}
if(outside)return;save();queue.forEach(function(i){paint.data.set([rgb[0],rgb[1],rgb[2],255],i*4);});ctx.putImageData(paint,0,0);controls();
});
canvas.addEventListener('pointermove',function(e){if(!drawing)return;var p=point(e);ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();last=p;});
function finish(){drawing=false;}canvas.addEventListener('pointerup',finish);canvas.addEventListener('pointercancel',finish);canvas.addEventListener('lostpointercapture',finish);
undo.onclick=function(){if(history.length)ctx.putImageData(history.pop(),0,0);controls();};
function reset(){if(source)ctx.putImageData(source,0,0);history=[];undo.disabled=clear.disabled=true;}
clear.onclick=reset;drawResetters.push(reset);
});
setLoadedStatus(getCurrFileOrDirectory('file'));
}
window.FillIn=function(){this.initialSettings=function(){initialSettingsDone(1);};this.reset=function(){drawResetters.forEach(function(f){f();});};};
