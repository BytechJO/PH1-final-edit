(function(){
var original=buildFillInBody;
buildFillInBody=function(data){
 original(data);
 var validate=FillIn.prototype.validate;
 FillIn.prototype.validate=function(){validate.call(this);$(".resetBtn").removeClass("disabled");};
 var panel=document.createElement('section');panel.className='sb92-colouring';
 var palette=[['Blue','#2587df'],['Red','#ef4444'],['Green','#4db45d'],['Yellow','#ffe45c'],['Brown','#965d35'],['Pink','#f6b2cc']];
 panel.innerHTML='<div class="colour-palette">'+palette.map(function(c,i){return '<button type="button" data-colour="'+c[1]+'" aria-pressed="'+(i===0)+'">'+c[0]+'</button>';}).join('')+'</div><div class="colour-pictures"></div><p class="colour-status" role="status"></p>';
 document.querySelector('.image_space').replaceWith(panel);
 ['elephant','photograph','telephone','alphabet'].forEach(function(label,i){
 var card=document.createElement('div');card.className='colour-card';card.innerHTML='<canvas width="900" height="900" aria-label="Colour the '+label+'"></canvas><div><button type="button" class="colour-undo" disabled>Undo</button><button type="button" class="colour-clear" disabled>Clear colours</button></div>';
 panel.querySelector('.colour-pictures').appendChild(card);
 var picture='../images/pages/activities/sbp92/img0'+(i+1)+'.svg';
    var canvas=card.querySelector('canvas'),ctx=canvas.getContext('2d',{willReadFrequently:true});
    var selected=palette[0][1],source,paint,history=[],ready=false;
    var undo=card.querySelector('.colour-undo'),clear=card.querySelector('.colour-clear');
    function controls(){$(".resetBtn").removeClass("disabled");undo.disabled=!history.length;clear.disabled=!paint || !paint.data.some(function(v,i){return v!==source.data[i];});}
    panel.querySelectorAll('[data-colour]').forEach(function(button){button.addEventListener('click',function(){selected=button.dataset.colour;panel.querySelectorAll('[data-colour]').forEach(function(b){b.setAttribute('aria-pressed',String(b===button));});});});
    var img=new Image();
    img.onload=function(){canvas.height=Math.round(canvas.width*img.naturalHeight/img.naturalWidth);ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);source=ctx.getImageData(0,0,canvas.width,canvas.height);paint=ctx.getImageData(0,0,canvas.width,canvas.height);ready=true;};
    img.onerror=function(){panel.querySelector('.colour-status').textContent='The picture could not load. Please refresh.';};
    img.src=picture;
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

 $(document).on('click','.resetBtn',function(){clear.click();});
 });
};
})();
