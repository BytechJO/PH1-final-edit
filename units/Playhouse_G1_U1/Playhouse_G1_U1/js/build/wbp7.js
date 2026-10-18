function buildMcqBody(data) {
var palette=[['green','#4db45d'],['orange','#f59128'],['blue','#2587df'],['red','#ef4444'],['yellow','#ffe45c']];
var html='<div class="sub_footer_icon sub_footer_icon_left subFooterNav backNav"><a href=""><img src="../images/icons/back_btn.png"></a></div><div class="sub_footer_icon sub_footer_icon_right subFooterNav nextNav"><a href=""><img src="../images/icons/next_btn.png"></a></div><section class="wbp7 options"><img class="wbp7-title" src="../images/pages/activities/wbp7/readwrite_main_title.png" alt="Reading and Writing Skills"><h2>Tick the correct answer. Then colour.</h2><div class="wbp7-palette">';
html+=palette.map(function(c,i){return '<button type="button" data-colour="'+c[1]+'" aria-pressed="'+(i===0)+'"><span style="background:'+c[1]+'"></span>'+c[0]+'</button>';}).join('');
html+='</div><div class="wbp7-cards">';
data.questions.forEach(function(q,i){var n=i+1;html+='<article class="wbp7-card"><div class="que" id="que_'+n+'" data-qno="'+n+'"><strong>'+n+'</strong><div class="pick_set" id="pick_set_'+n+'_1">';
q.options[0].forEach(function(o,j){html+='<button type="button" class="pick" id="pick_'+n+'_1_'+(j+1)+'" data-opttext="'+o+'">'+o+'</button>';});
html+='</div><div class="icon_wrap"><div class="tick"><img src="../images/icons/check_btn.png" alt="Correct"></div><div class="cross"><img src="../images/icons/cross_btn.png" alt="Try again"></div></div></div><canvas width="640" height="640" aria-label="Colour '+['the rubber','the pen','the crayon'][i]+'"></canvas><div class="wbp7-tools"><button type="button" class="colour-undo" disabled>Undo</button><button type="button" class="colour-clear" disabled>Clear colours</button></div><p class="wbp7-status" role="status"></p></article>';});
html+='</div></section>';$('.activity_area').append(html);
document.querySelectorAll('.wbp7-card').forEach(function(card,i){initWbp7Paint(card,'../images/pages/activities/wbp7/0'+(i+1)+'.png',palette);});
setLoadedStatus(getCurrFileOrDirectory('file'));
}
function initWbp7Paint(card,picture,palette){
    var canvas=card.querySelector('canvas'),ctx=canvas.getContext('2d',{willReadFrequently:true});
    var selected=palette[0][1],source,paint,history=[],ready=false;
    var undo=card.querySelector('.colour-undo'),clear=card.querySelector('.colour-clear');
    function controls(){undo.disabled=!history.length;clear.disabled=!paint || !paint.data.some(function(v,i){return v!==source.data[i];});}
    document.querySelectorAll('[data-colour]').forEach(function(button){button.addEventListener('click',function(){selected=button.dataset.colour;document.querySelectorAll('[data-colour]').forEach(function(b){b.setAttribute('aria-pressed',String(b===button));});});});
    var img=new Image();
    img.onload=function(){ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);source=ctx.getImageData(0,0,canvas.width,canvas.height);paint=ctx.getImageData(0,0,canvas.width,canvas.height);ready=true;};
    img.onerror=function(){card.querySelector('.wbp7-status').textContent='The picture could not load. Please refresh.';};
    img.src=picture;
    canvas.addEventListener('pointerdown',function(event){
        if(!ready)return;
        var box=canvas.getBoundingClientRect(),scale=Math.min(box.width/canvas.width,box.height/canvas.height);
        var x=Math.floor((event.clientX-box.left-(box.width-canvas.width*scale)/2)/scale),y=Math.floor((event.clientY-box.top-(box.height-canvas.height*scale)/2)/scale);
        var w=canvas.width,h=canvas.height;
        if(x<0||y<0||x>=w||y>=h)return;
        function white(i){var p=i*4;return source.data[p]>230&&source.data[p+1]>230&&source.data[p+2]>230;}
        var start=y*w+x;if(!white(start))return;
        var visited=new Uint8Array(w*h),queue=[start],area=[],outside=false;visited[start]=1;
        for(var head=0;head<queue.length;head++){
            var i=queue[head],px=i%w,py=Math.floor(i/w);area.push(i);
            if(px===0||py===0||px===w-1||py===h-1){outside=true;break;}
            [i-1,i+1,i-w,i+w].forEach(function(n){if(!visited[n]&&white(n)){visited[n]=1;queue.push(n);}});
        }
        if(outside)return;
        var rgb=[1,3,5].map(function(n){return parseInt(selected.slice(n,n+2),16);});
        var before=area.map(function(i){return [paint.data[i*4],paint.data[i*4+1],paint.data[i*4+2]];});
        if(before.every(function(c){return c.every(function(v,n){return v===rgb[n];});}))return;
        history.push({area:area,before:before});if(history.length>30)history.shift();
        area.forEach(function(i){paint.data.set([rgb[0],rgb[1],rgb[2],255],i*4);});ctx.putImageData(paint,0,0);controls();
    });
    undo.addEventListener('click',function(){var last=history.pop();if(!last)return;last.area.forEach(function(i,n){paint.data.set(last.before[n],i*4);});ctx.putImageData(paint,0,0);controls();});
    clear.addEventListener('click',function(){if(!source)return;paint.data.set(source.data);ctx.putImageData(paint,0,0);history=[];controls();});
}
