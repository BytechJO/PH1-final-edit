function buildFillInBody(data){
var palette=[['Blue','#2587df'],['Red','#ef4444'],['Green','#4db45d'],['Yellow','#ffe45c'],['Brown','#965d35'],['Pink','#f6b2cc']];
var buttons=palette.map(function(c,i){return '<button type="button" data-colour="'+c[1]+'" aria-pressed="'+(i===0)+'">'+c[0]+'</button>';}).join('');
$('.activity_area').append('<div class="sub_footer_icon sub_footer_icon_left subFooterNav backNav"><a href=""><img src="../images/icons/back_btn.png"></a></div><div class="sub_footer_icon sub_footer_icon_right subFooterNav nextNav"><a href=""><img src="../images/icons/next_btn.png"></a></div><section class="jobs options"><img class="reading37" src="../images/pages/sb-icons/readwrite_main_title.png" alt="Reading and Writing Skills"><h2><span class="blue_text">1</span> Read and colour the picture.</h2><div class="wbp6-tools">'+buttons+'<button type="button" id="colour-undo" disabled>Undo</button><button type="button" id="colour-clear" disabled>Clear colours</button></div><div class="jobs-layout"><canvas class="wbp6-canvas" width="1400" height="1005" aria-label="Colour the birthday cake candles"></canvas><div class="poem"><p>Today is the 7<sup>th</sup> of March. It is my birthday. My party is on Saturday. My grandma makes birthday cakes. My name is Laura Ann Smith. There are 7 candles on my cake.</p><p>The 1<sup>st</sup>, 3<sup>rd</sup> and 5<sup>th</sup> candles are yellow. The 2<sup>nd</sup> candle is blue, and the 4<sup>th</sup> and 6<sup>th</sup> candles are green. The 7<sup>th</sup> candle is red. I love cake!</p></div></div><p class="wbp6-status" role="status"></p></section>');
    var canvas=document.querySelector('.wbp6-canvas'),ctx=canvas.getContext('2d',{willReadFrequently:true});
    var selected=palette[0][1],source,paint,history=[],ready=false;
    var undo=document.getElementById('colour-undo'),clear=document.getElementById('colour-clear');
    function controls(){$(".resetBtn,.checkBtn").removeClass("disabled");$(".wbp6-status").text("");undo.disabled=!history.length;clear.disabled=!paint || !paint.data.some(function(v,i){return v!==source.data[i];});}
    document.querySelectorAll('[data-colour]').forEach(function(button){button.addEventListener('click',function(){selected=button.dataset.colour;document.querySelectorAll('[data-colour]').forEach(function(b){b.setAttribute('aria-pressed',String(b===button));});});});
    var img=new Image();
    img.onload=function(){ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);source=ctx.getImageData(0,0,canvas.width,canvas.height);paint=ctx.getImageData(0,0,canvas.width,canvas.height);ready=true;};
    img.onerror=function(){document.querySelector('.wbp6-status').textContent='The picture could not load. Please refresh.';};
    img.src=data.picture;
    canvas.addEventListener('pointerdown',function(event){
        if(!ready)return;
        var box=canvas.getBoundingClientRect(),scale=Math.min(box.width/canvas.width,box.height/canvas.height);
        var x=Math.floor((event.clientX-box.left-(box.width-canvas.width*scale)/2)/scale),y=Math.floor((event.clientY-box.top-(box.height-canvas.height*scale)/2)/scale);
        var w=canvas.width,h=canvas.height;
        if(x<0||y<0||x>=w||y>=h)return;
        function white(i){var p=i*4;return source.data[p]>245&&source.data[p+1]>245&&source.data[p+2]>245;}
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
        area.forEach(function(i){paint.data.set([rgb[0],rgb[1],rgb[2],255],i*4);});ctx.putImageData(paint,0,0);controls();
    });
    undo.addEventListener('click',function(){var last=history.pop();if(!last)return;last.area.forEach(function(i,n){paint.data.set(last.before[n],i*4);});ctx.putImageData(paint,0,0);controls();});
    clear.addEventListener('click',function(){if(!source)return;paint.data.set(source.data);ctx.putImageData(paint,0,0);history=[];controls();});
window.cakeReset=function(){clear.click();};window.cakeCheck=function(){var seeds=[[.16,.33,'#ffe45c'],[.28,.33,'#2587df'],[.40,.33,'#ffe45c'],[.52,.33,'#4db45d'],[.65,.33,'#ffe45c'],[.76,.33,'#4db45d'],[.58,.49,'#ef4444']],score=0;seeds.forEach(function(k){var n=(Math.floor(k[1]*canvas.height)*canvas.width+Math.floor(k[0]*canvas.width))*4,rgb=[1,3,5].map(function(j){return parseInt(k[2].slice(j,j+2),16);});if(rgb.every(function(v,j){return paint.data[n+j]===v;}))score++;});$('.wbp6-status').text(score===7?'Well done! All seven candles are correct.':score+' of 7 candles correct. Check the colours.');};setLoadedStatus(getCurrFileOrDirectory("file"));
}

window.FillIn=function(){this.initialSettings=function(){initialSettingsDone(1);$(".resetBtn,.checkBtn").removeClass("disabled");};this.reset=function(){cakeReset();};this.validate=function(){cakeCheck();};};
