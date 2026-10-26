
function buildFillInBody(data) {
    var palette = [['red','#ef4444'],['blue','#2587df'],['black','#242424'],['yellow','#ffe45c'],['green','#4db45d']];
    var buttons = palette.map(function(c,i){return '<button type="button" data-colour="'+c[1]+'" aria-pressed="'+(i===0)+'"><span class="colour-swatch" style="background:'+c[1]+'"></span>'+(i+1)+' = '+c[0]+'</button>';}).join('');
    $('.activity_area').append('<div class="sub_footer_icon sub_footer_icon_left subFooterNav backNav"><a href=""><img src="../images/icons/back_btn.png"></a></div><div class="sub_footer_icon sub_footer_icon_right subFooterNav nextNav"><a href=""><img src="../images/icons/next_btn.png"></a></div><section class="wbp6 options"><img class="wbp6-title" src="../images/pages/activities/wbp6/grammer__title.png" alt="Grammar Practice"><h2><span class="blue_text">1</span> Colour and write. <small>('+data.pictureNumber+'/2)</small></h2><div class="wbp6-tools" aria-label="Colouring tools">'+buttons+'<button type="button" id="colour-undo" disabled>Undo</button><button type="button" id="colour-clear" disabled>Clear colours</button></div><canvas class="wbp6-canvas" width="1017" height="434" aria-label="Colour the numbered areas"></canvas><p class="wbp6-status" role="status">Choose a colour, then click inside a numbered area.</p><div class="que" data-qno="1"><span>What is it?</span><label>It’s a <input type="text" maxlength="20" aria-label="What is it?" autocomplete="off" spellcheck="false">.</label><div class="icon_wrap"><div class="tick"><img src="../images/icons/check_btn.png" alt="Correct"></div><div class="cross"><img src="../images/icons/cross_btn.png" alt="Try again"></div></div></div></section>');
    var canvas=document.querySelector('.wbp6-canvas'),ctx=canvas.getContext('2d',{willReadFrequently:true});
    var selected=palette[0][1],source,paint,history=[],ready=false;
    var undo=document.getElementById('colour-undo'),clear=document.getElementById('colour-clear');
    function controls(){$(".checkBtn,.resetBtn").removeClass("disabled");undo.disabled=!history.length;clear.disabled=!paint || !paint.data.some(function(v,i){return v!==source.data[i];});}
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
        function white(i){var p=i*4;return source.data[p]>230&&source.data[p+1]>230&&source.data[p+2]>230;}
        var start=y*w+x;if(!white(start))return;
        var visited=new Uint8Array(w*h),queue=[start],area=[],outside=false;visited[start]=1;
        for(var head=0;head<queue.length;head++){
            var i=queue[head],px=i%w,py=Math.floor(i/w);area.push(i);

            [px>0?i-1:-1,px<w-1?i+1:-1,py>0?i-w:-1,py<h-1?i+w:-1].forEach(function(n){if(n>=0&&!visited[n]&&white(n)){visited[n]=1;queue.push(n);}});
        }
        // Numbered regions at the artwork edge are valid colouring areas.
        var rgb=[1,3,5].map(function(n){return parseInt(selected.slice(n,n+2),16);});
        var before=area.map(function(i){return [paint.data[i*4],paint.data[i*4+1],paint.data[i*4+2]];});
        if(before.every(function(c){return c.every(function(v,n){return v===rgb[n];});}))return;
        history.push({area:area,before:before});if(history.length>30)history.shift();
        area.forEach(function(i){paint.data.set([rgb[0],rgb[1],rgb[2],255],i*4);});ctx.putImageData(paint,0,0);controls();
    });
    undo.addEventListener('click',function(){var last=history.pop();if(!last)return;last.area.forEach(function(i,n){paint.data.set(last.before[n],i*4);});ctx.putImageData(paint,0,0);controls();});
    clear.addEventListener('click',function(){if(!source)return;paint.data.set(source.data);ctx.putImageData(paint,0,0);history=[];controls();});
    window.g1PaintChecks=window.g1PaintChecks||[];
    var seeds=[[[0.055, 0.24, 2], [0.18, 0.085, 5], [0.3, 0.09, 4], [0.46, 0.11, 3], [0.52, 0.11, 3], [0.58, 0.11, 2], [0.68, 0.15, 4], [0.8, 0.1, 4], [0.94, 0.18, 2], [0.22, 0.36, 2], [0.32, 0.48, 4], [0.43, 0.15, 4], [0.69, 0.43, 4], [0.86, 0.4, 4], [0.96, 0.57, 5], [0.91, 0.83, 5], [0.79, 0.88, 2], [0.65, 0.83, 4], [0.08, 0.73, 2], [0.25, 0.81, 4], [0.16, 0.92, 4], [0.54, 0.4, 1], [0.42, 0.67, 1], [0.5, 0.83, 1], [0.55, 0.7, 1], [0.61, 0.62, 3]], [[0.11, 0.1, 4], [0.05, 0.32, 5], [0.2, 0.32, 5], [0.33, 0.4, 4], [0.44, 0.13, 4], [0.57, 0.12, 4], [0.68, 0.2, 4], [0.84, 0.15, 5], [0.92, 0.39, 3], [0.49, 0.31, 2], [0.53, 0.4, 2], [0.56, 0.46, 2], [0.35, 0.55, 1], [0.4, 0.63, 1], [0.44, 0.74, 1], [0.66, 0.57, 4], [0.83, 0.76, 5], [0.94, 0.84, 5], [0.53, 0.89, 4], [0.21, 0.77, 4], [0.04, 0.81, 5], [0.11, 0.94, 3]]][data.pictureNumber-1];
    window.g1PaintChecks.push(function(){return ready&&seeds.every(function(k){var x=Math.floor(k[0]*canvas.width),y=Math.floor(k[1]*canvas.height),rgb=[1,3,5].map(function(n){return parseInt(palette[k[2]-1][1].slice(n,n+2),16);});for(var dy=-15;dy<=15;dy++)for(var dx=-15;dx<=15;dx++){var j=((y+dy)*canvas.width+x+dx)*4;if(source.data[j]>230&&source.data[j+1]>230&&source.data[j+2]>230&&rgb.every(function(v,n){return paint.data[j+n]===v;}))return true;}return false;});});
    $(document).on('click.g1PaintReset','.resetBtn',function(){clear.click();});
    setLoadedStatus(getCurrFileOrDirectory('file'));
}
