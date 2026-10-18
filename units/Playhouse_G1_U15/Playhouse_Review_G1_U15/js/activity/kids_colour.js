// Same free-hand palette/brush interaction as Unit 7 ReadColour.
// Keep strokes in image coordinates so resizing never loses or shifts the drawing.
function setupKidsColouring(area) {
    var canvas = area.querySelector('.cs_colour_box canvas');
    if (!canvas) return;
    canvas.width = 1100; canvas.height = 932;
    var ctx = canvas.getContext('2d');
    // The supplied SVG is transparent outside the children. Its alpha channel
    // clips every stroke, including thick brush edges and strokes begun outside.
    var silhouette = area.querySelector('.cs_colour_box img');
    var maskReady = false;
    function prepareMask() {
        maskReady = silhouette.naturalWidth > 0;
        redraw();
    }
    silhouette.addEventListener('load', prepareMask);
    var controls = area.querySelector('.cs_colour_controls');
    var strokes = [], active = null, color = '#2f6fb3', width = 14;
    var colors = [['Blue','#2f6fb3'],['Red','#e2574c'],['Yellow','#f4c542'],['Brown','#8b5a2b'],['Pink','#e88ec4'],['Green','#57ad54'],['Orange','#ef922e']];
    function button(label, group, action) {
        var b = document.createElement('button'); b.type = 'button';
        b.title = label; b.setAttribute('aria-label', label);
        if (group) { b.dataset.group = group; b.setAttribute('aria-pressed','false'); }
        b.addEventListener('click', function () {
            if (group) {
                controls.querySelectorAll('[data-group="'+group+'"]').forEach(function(x){x.setAttribute('aria-pressed','false');});
                b.setAttribute('aria-pressed','true');
            }
            action();
        }); controls.appendChild(b); return b;
    }
    colors.forEach(function(c,i){var b=button(c[0],'color',function(){color=c[1];});b.style.background=c[1];if(!i)b.setAttribute('aria-pressed','true');});
    [['Thin',8],['Thick',28]].forEach(function(s,i){var b=button(s[0]+' brush','brush',function(){width=s[1];});b.textContent=s[0];b.className='cs_tool';if(!i){b.setAttribute('aria-pressed','true');width=s[1];}});
    var undo=button('Undo colour',null,function(){strokes.pop();redraw();});undo.textContent='Undo';undo.className='cs_tool';
    var clear=button('Clear colouring',null,function(){strokes=[];active=null;redraw();});clear.textContent='Clear';clear.className='cs_tool';
    function redraw(){
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0,0,canvas.width,canvas.height);
        if (!maskReady) return;
        strokes.concat(active?[active]:[]).forEach(function(s){
            ctx.strokeStyle=s.color;ctx.fillStyle=s.color;ctx.lineWidth=s.width;
            ctx.lineCap='round';ctx.lineJoin='round';ctx.globalAlpha=0.45;
            ctx.beginPath();ctx.moveTo(s.points[0].x,s.points[0].y);
            s.points.slice(1).forEach(function(p){ctx.lineTo(p.x,p.y);});
            if(s.points.length===1){ctx.arc(s.points[0].x,s.points[0].y,s.width/2,0,Math.PI*2);ctx.fill();}else ctx.stroke();
        });
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(silhouette, 0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';
    }
    function point(e){var r=canvas.getBoundingClientRect();return{x:(e.clientX-r.left)*canvas.width/r.width,y:(e.clientY-r.top)*canvas.height/r.height};}
    canvas.addEventListener('pointerdown',function(e){if(!maskReady||active||e.button>0)return;e.preventDefault();canvas.setPointerCapture(e.pointerId);active={color:color,width:width,points:[point(e)],pointer:e.pointerId};redraw();});
    canvas.addEventListener('pointermove',function(e){if(!active||active.pointer!==e.pointerId)return;active.points.push(point(e));redraw();});
    function finish(e){if(!active||active.pointer!==e.pointerId)return;strokes.push(active);active=null;redraw();}
    canvas.addEventListener('pointerup',finish);canvas.addEventListener('pointercancel',finish);
    if (silhouette.complete) prepareMask();
}
