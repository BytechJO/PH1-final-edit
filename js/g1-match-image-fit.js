(() => {
 const bounds=[[100,101,514,353],[200,201,397,252],[140,66,429,400],[198,195,404,255],[264,15,346,435],[104,165,506,310],[138,151,454,314],[214,167,403,330],[177,84,434,382]];
 function fit(){document.querySelectorAll('.g1-design-match .content-images-div').forEach((box,i)=>{const img=box.querySelector('img'),b=bounds[i];if(!img||!b)return;const w=box.clientWidth,h=box.clientHeight,scale=Math.min((w-64)/(b[2]-b[0]),(h-12)/(b[3]-b[1]));img.style.setProperty('width',607*scale+'px','important');img.style.setProperty('height',446*scale+'px','important');img.style.left=(32+(w-64)/2-(b[0]+b[2])/2*scale)+'px';img.style.top=(h/2-(b[1]+b[3])/2*scale)+'px';});}
 addEventListener('load',()=>{fit();document.querySelectorAll('.content-images-div').forEach(e=>new ResizeObserver(fit).observe(e));});addEventListener('resize',fit);new MutationObserver(fit).observe(document.body,{childList:true,subtree:true});fit();
})();
