function buildFillInBody(data){
var palette=[['Blue','#2587df'],['Red','#ef4444'],['Green','#4db45d'],['Yellow','#ffe45c'],['Brown','#965d35'],['Orange','#f59a36']];
var buttons=palette.map(function(c,i){return '<button type="button" data-colour="'+c[1]+'" aria-pressed="'+(i===0)+'">'+c[0]+'</button>';}).join('');
$('.activity_area').append('<div class="sub_footer_icon sub_footer_icon_left subFooterNav backNav"><a href=""><img src="../images/icons/back_btn.png"></a></div><div class="sub_footer_icon sub_footer_icon_right subFooterNav nextNav"><a href=""><img src="../images/icons/next_btn.png"></a></div><section class="jobs options"><img class="word74" src="../images/pages/activities/wbp74/word_main_title.png" alt="Word Power"><h2><span class="blue_text">2</span> Read and colour.</h2><div class="wbp6-tools">'+buttons+'<button type="button" id="colour-undo" disabled>Undo</button><button type="button" id="colour-clear" disabled>Clear colours</button></div><div class="jobs-layout"><canvas class="wbp6-canvas" width="1400" height="851" aria-label="Colour the family clothes"></canvas><div class="poem"><p>Colour Mum’s trousers blue.</p><p>Colour Dad’s trousers brown.</p><p>Colour Milly’s trousers green.</p><p>Colour Dad’s shirt orange.</p><p>Colour Milly’s shirt yellow.</p><p>Colour Mum’s shirt red.</p><p>Colour Milly’s shoes blue.</p><p>Colour Mum’s shoes red.</p><p>Colour Dad’s shoes blue.</p></div></div><p class="wbp6-status" role="status"></p></section>');
    var canvas=document.querySelector('.wbp6-canvas'),ctx=canvas.getContext('2d',{willReadFrequently:true});
    var selected=palette[0][1],source,paint,history=[],ready=false;
    var undo=document.getElementById('colour-undo'),clear=document.getElementById('colour-clear');
    function controls(){$(".resetBtn").removeClass("disabled");undo.disabled=!history.length;clear.disabled=!paint || !paint.data.some(function(v,i){return v!==source.data[i];});}
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
window.familyReset=function(){clear.click();};setLoadedStatus(getCurrFileOrDirectory("file"));
}

window.FillIn=function(){this.initialSettings=function(){initialSettingsDone(1);$(".resetBtn").removeClass("disabled");};this.reset=function(){familyReset();};};
