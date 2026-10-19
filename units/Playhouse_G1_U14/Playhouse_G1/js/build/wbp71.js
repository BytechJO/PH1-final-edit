function buildFillInBody(data){
var palette=[['1 = purple','#a367c7'],['2 = blue','#2587df'],['3 = orange','#f59a36'],['4 = yellow','#ffe45c'],['5 = green','#4db45d']];
var buttons=palette.map(function(c,i){return '<button type="button" data-colour="'+c[1]+'" aria-pressed="'+(i===0)+'">'+c[0]+'</button>';}).join('');
$('.activity_area').append('<div class="sub_footer_icon sub_footer_icon_left subFooterNav backNav"><a href=""><img src="../images/icons/back_btn.png"></a></div><div class="sub_footer_icon sub_footer_icon_right subFooterNav nextNav"><a href=""><img src="../images/icons/next_btn.png"></a></div><section class="jobs options"><h2><span class="blue_text">2</span> Colour and write.</h2><div class="wbp6-tools">'+buttons+'<button type="button" id="colour-undo" disabled>Undo</button><button type="button" id="colour-clear" disabled>Clear colours</button></div><div class="jobs-layout"><canvas class="wbp6-canvas" width="1400" height="873" aria-label="Colour the numbered weather picture"></canvas><div class="weather-answer"><img src="../images/pages/activities/wbp71/img2.png" alt="What’s the weather like today?"><textarea aria-label="Write the weather" placeholder="" spellcheck="false"></textarea></div></div><p class="wbp6-status" role="status"></p></section>');
    var canvas=document.querySelector('.wbp6-canvas'),ctx=canvas.getContext('2d',{willReadFrequently:true});
    var selected=palette[0][1],source,paint,history=[],ready=false,barrier;
    var undo=document.getElementById('colour-undo'),clear=document.getElementById('colour-clear');
    function controls(){$(".checkBtn,.resetBtn").removeClass("disabled");document.querySelector(".wbp6-status").textContent="";undo.disabled=!history.length;clear.disabled=!paint || !paint.data.some(function(v,i){return v!==source.data[i];});}
    document.querySelectorAll('[data-colour]').forEach(function(button){button.addEventListener('click',function(){selected=button.dataset.colour;document.querySelectorAll('[data-colour]').forEach(function(b){b.setAttribute('aria-pressed',String(b===button));});});});
    var img=new Image();
    img.onload=function(){ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);source=ctx.getImageData(0,0,canvas.width,canvas.height);paint=ctx.getImageData(0,0,canvas.width,canvas.height);barrier=new Uint8Array(canvas.width*canvas.height);for(var n=0;n<barrier.length;n++){var j=n*4;if(Math.max(source.data[j],source.data[j+1],source.data[j+2])<170){var x=n%canvas.width,y=Math.floor(n/canvas.width);for(var dy=-4;dy<=4;dy++)for(var dx=-4;dx<=4;dx++){var xx=x+dx,yy=y+dy;if(xx>=0&&yy>=0&&xx<canvas.width&&yy<canvas.height)barrier[yy*canvas.width+xx]=1;}}}ready=true;};
    img.onerror=function(){document.querySelector('.wbp6-status').textContent='The picture could not load. Please refresh.';};
    img.src=data.picture;
    canvas.addEventListener('pointerdown',function(event){
        if(!ready)return;
        var box=canvas.getBoundingClientRect(),scale=Math.min(box.width/canvas.width,box.height/canvas.height);
        var x=Math.floor((event.clientX-box.left-(box.width-canvas.width*scale)/2)/scale),y=Math.floor((event.clientY-box.top-(box.height-canvas.height*scale)/2)/scale);
        var w=canvas.width,h=canvas.height;
        if(x<0||y<0||x>=w||y>=h)return;
        function white(i){var p=i*4;return !barrier[i];}
        var backgroundSeeds=[]; var start=y*w+x;if(!white(start))return;
        var visited=new Uint8Array(w*h),queue=[start],area=[],outside=false;visited[start]=1;
        for(var head=0;head<queue.length;head++){
            var i=queue[head],px=i%w,py=Math.floor(i/w);area.push(i);
            if(px===0||py===0||px===w-1||py===h-1||backgroundSeeds.indexOf(i)!==-1){outside=true;break;}
            [i-1,i+1,i-w,i+w].forEach(function(n){if(!visited[n]&&white(n)){visited[n]=1;queue.push(n);}});
        }
        if(outside)return;
        var rgb=[1,3,5].map(function(n){return parseInt(selected.slice(n,n+2),16);});
        var before=area.map(function(i){return [paint.data[i*4],paint.data[i*4+1],paint.data[i*4+2]];});
        if(before.every(function(c){return c.every(function(v,n){return v===rgb[n];});}))return;
        history.push({area:area,before:before});if(history.length>30)history.shift();
        area.forEach(function(i){if(Math.min(source.data[i*4],source.data[i*4+1],source.data[i*4+2])>245)paint.data.set([rgb[0],rgb[1],rgb[2],255],i*4);});ctx.putImageData(paint,0,0);controls();
    });
    undo.addEventListener('click',function(){var last=history.pop();if(!last)return;last.area.forEach(function(i,n){paint.data.set(last.before[n],i*4);});ctx.putImageData(paint,0,0);controls();});
    clear.addEventListener('click',function(){if(!source)return;paint.data.set(source.data);ctx.putImageData(paint,0,0);history=[];controls();});
document.querySelector("textarea").addEventListener("input",controls);
window.weatherReset=function(){clear.click();document.querySelector('textarea').value='';document.querySelector('.wbp6-status').textContent='';};
window.weatherCheck=function(){var keys=[[.10,.12,2],[.22,.09,2],[.18,.27,1],[.49,.14,1],[.59,.14,2],[.72,.23,2],[.85,.12,5],[.94,.24,1],[.054,.43,5],[.14,.45,2],[.045,.60,2],[.18,.60,5],[.105,.77,1],[.12,.93,2],[.27,.69,5],[.32,.81,5],[.52,.85,2],[.45,.25,3],[.46,.47,4],[.72,.40,5],[.82,.53,2],[.92,.46,5],[.67,.68,5],[.82,.76,2],[.94,.73,5],[.81,.92,5],[.94,.92,2]],correct=0;keys.forEach(function(k){var sx=Math.floor(k[0]*canvas.width),sy=Math.floor(k[1]*canvas.height),best=-1,dist=1e9;for(var dy=-30;dy<=30;dy++)for(var dx=-30;dx<=30;dx++){var n=(sy+dy)*canvas.width+sx+dx,jj=n*4;if(!barrier[n]&&Math.min(source.data[jj],source.data[jj+1],source.data[jj+2])>245&&dx*dx+dy*dy<dist){best=n;dist=dx*dx+dy*dy;}}var j=best*4,rgb=[1,3,5].map(function(n){return parseInt(palette[k[2]-1][1].slice(n,n+2),16);});if(rgb.every(function(v,n){return paint.data[j+n]===v;}))correct++;});var answer=document.querySelector('textarea').value.toLowerCase().replace(/[’']/g,'').replace(/[^a-z ]/g,'').trim().replace(/\s+/g,' '),ok=['it is sunny','its sunny','sunny'].indexOf(answer)!==-1;document.querySelector('.wbp6-status').textContent=correct===keys.length&&ok?'Well done!':'Colours: '+correct+' of '+keys.length+'. '+(ok?'Your sentence is correct.':'Write the weather shown in the picture.');};
setLoadedStatus(getCurrFileOrDirectory("file"));
}

window.FillIn=function(){this.initialSettings=function(){initialSettingsDone(1);$(".checkBtn,.resetBtn").removeClass("disabled");};this.reset=function(){weatherReset();};this.validate=function(){weatherCheck();};};
