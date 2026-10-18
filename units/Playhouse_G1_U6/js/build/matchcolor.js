function buildMatchColorBody(aObj) {
    var htmlStmt = '';
    if (aObj != undefined && aObj != null) {

        htmlStmt += '<div class="sub_footer_icon subFooterNav backNav mx-1">';
        htmlStmt += '<a href=""><img src="../images/icons/back_btn.png" /></a></div>';
        htmlStmt += '<div class="sub_footer_icon subFooterNav nextNav mx-1">';
        htmlStmt += '<a href=""><img src="../images/icons/next_btn.png" /></a></div>';

        // ===== heading =====
        htmlStmt += '<div class="act_head_group justify-content-center">';
        htmlStmt += '<div class="audioIcon off contant" data-slideNum="1" data-audio="' + aObj.mainTitleAudio + '">';
        htmlStmt += '<div class="q-type-img-container">';
        htmlStmt += '<img class="mainTitle" src=' + aObj.mainTitle + '>';
        if (aObj.mainTitleIcon != undefined && aObj.mainTitleIcon != '') {
            htmlStmt += '<img class="mainTitleIcon" src=' + aObj.mainTitleIcon + ' style="right:' + aObj.mainTitleIconPos.right + ';">';
        }
        htmlStmt += '</div></div>';

        htmlStmt += '<div class="activityHeading">';
        htmlStmt += '<div class="audioIcon off contant audioQuestionTitle" data-slideNum="1" data-audio="' + aObj.subTitleAudio + '">';
        htmlStmt += "<div class='page_sub_title d-flex'>";
        htmlStmt += "<p> " + aObj.subTitleTextLeft + " </p>";
        for (var sicons = 0; sicons < aObj.subTitleIcons.length; sicons++) {
            htmlStmt += "<img src='" + aObj.subTitleIcons[sicons] + "'/>";
        }
        htmlStmt += "<p class='subTitleTextRight'>" + aObj.subTitleTextRight + " </p>";
        htmlStmt += "</div></div></div></div>";

        // ===== main content =====
        htmlStmt += '<div class="options cont_ht_sf mx-auto">';
        htmlStmt += '<div class="all_cont matchcolor_cont justify-content-start justify-content-sm-center">';

        htmlStmt += '<div class="matchcolor_stage">';

        // svg overlay for connecting lines
        htmlStmt += '<svg class="match_lines_svg"></svg>';

        // words row
        htmlStmt += '<div class="match_words_row d-flex justify-content-center">';
        jQuery.each(aObj.words, function (i, w) {
            htmlStmt += '<div class="match_word_item" data-id="' + w.id + '">';
            htmlStmt += '<div class="audioIcon off contant" data-audio="' + w.audio + '">';
            htmlStmt += '<span class="match_word_text" data-svg="'+w.svg+'" aria-label="'+w.text+'">' + w.text + '</span>';
            htmlStmt += '</div>';
            htmlStmt += '<div class="match_dot word_dot" data-id="' + w.id + '"></div>';
            htmlStmt += '</div>';
        });
        htmlStmt += '</div>';

        // images row
        htmlStmt += '<div class="match_images_row d-flex justify-content-center">';
        jQuery.each(aObj.images, function (i, img) {
            htmlStmt += '<div class="match_image_item" data-id="' + img.id + '" data-matches="' + img.matchesWordId + '">';
            htmlStmt += '<div class="match_dot image_dot" data-id="' + img.id + '"></div>';
            htmlStmt += '<canvas class="colourable_img" width="900" height="900" data-src="'+img.image+'" aria-label="Colour picture '+(i+1)+'"></canvas>';
            htmlStmt += '<div class="icon_wrap">';
            htmlStmt += '<div class="tick"><img src="../images/icons/check_btn.png"></div>';
            htmlStmt += '<div class="cross"><img src="../images/icons/cross_btn.png"></div>';
            htmlStmt += '</div>';
            htmlStmt += '</div>';
        });
        htmlStmt += '</div>';

        htmlStmt += '</div>'; // matchcolor_stage

        htmlStmt += '</div></div>'; // all_cont / options
    }

    console.log('htmlStmt >> matchcolor Built');
    $(".activity_area").append(htmlStmt);

    setupMatchColourAssets();
    setLoadedStatus(getCurrFileOrDirectory('file'));
}

// ===================== كائن النشاط =====================
function MatchColor(aContainer, aData) {
    var self = this;
    self.container = aContainer;
    self.data = aData;
    self.connections = {}; // wordId -> imageId
    self.selectedWordId = null;
    self.colourPalette = ['#ff6b6b', '#4ecdc4', '#ffd93d', '#6bcB77', '#a29bfe', '#ff9f43'];
    self.colourIndex = 0;

    self.initialSettings = function () {

        // اختيار نقطة الكلمة
        self.container.off('click.wordDot').on('click.wordDot', '.word_dot', function () {
            var wId = $(this).data('id');
            $('.word_dot').removeClass('selected');
            $(this).addClass('selected');
            self.selectedWordId = wId;
        });

        // اختيار نقطة الصورة -> رسم الخط
        self.container.off('click.imageDot').on('click.imageDot', '.image_dot', function () {
            if (self.selectedWordId == null) return;
            var imgId = $(this).data('id');

            // امسح أي خط سابق مرتبط بنفس الكلمة (سمح بإعادة التوصيل)
            self.removeConnectionByWord(self.selectedWordId);
            // امسح أي خط سابق مرتبط بنفس الصورة (صورة وحدة توصل بكلمة وحدة)
            self.removeConnectionByImage(imgId);

            self.connections[self.selectedWordId] = imgId;
            $('.checkBtn, .resetBtn').removeClass('disabled');
            self.drawAllLines();

            $('.word_dot').removeClass('selected');
            self.selectedWordId = null;
        });

        // ------------------------------------------------------------------ //
        // الدوس على الكلمة نفسها (مش عالنقطة) -> يطلع باليت ألوان صغير
        // تحتها، الطالب بيختار لون منه وبتتلون الكلمة (النص) مباشرة.
        // هاد الشي منفصل تماماً عن التوصيل/الفاليديشن - قرار الطالب باللون
        // مش موضوع فحص إطلاقاً.
        // ------------------------------------------------------------------ //
        self.container.off('click.wordText').on('click.wordText', '.match_word_text', function (e) {
            e.stopPropagation();
            self.showWordPalette($(this));
        });

        // اقفال أي باليت مفتوحة لو ضغط الطالب أي مكان تاني بالصفحة
        $(document).off('click.closeWordPalette').on('click.closeWordPalette', function (e) {
            if (!$(e.target).closest('.word_colour_palette, .match_word_text').length) {
                $('.word_colour_palette').remove();
            }
        });

        $(window).off('resize.matchcolor').on('resize.matchcolor', function () {
            self.drawAllLines();
        });

        $('.checkBtn').removeClass('disabled');
        $('.resetBtn').removeClass('disabled');

        initialSettingsDone(1);
    };

    // ------------------------------------------------------------------ //
    // بيبني وبيفتح باليت الألوان تحت الكلمة المختارة، ووقت ما الطالب
    // يدوس عَ لون منه بيلوّن نص الكلمة (.match_word_text) مباشرة.
    // ------------------------------------------------------------------ //
    self.showWordPalette = function ($word) {
        $('.word_colour_palette').remove(); // اقفل أي باليت مفتوحة قبل

        var paletteHtml = '<div class="word_colour_palette">';
        jQuery.each(self.colourPalette, function (i, c) {
            paletteHtml += '<span class="colour_swatch" data-colour="' + c + '" style="background-color:' + c + ';"></span>';
        });
        paletteHtml += '</div>';

        var $palette = $(paletteHtml);
        $word.closest('.match_word_item').append($palette);

        $palette.off('click').on('click', '.colour_swatch', function (e) {
            e.stopPropagation();
            var chosenColour = $(this).data('colour');
            $word.css({
                'color': chosenColour,
                '-webkit-text-stroke': '0px'
            });
            $word.find('path').css('fill',chosenColour);
            $('.resetBtn').removeClass('disabled');
            $palette.remove();
        });
    };

    self.removeConnectionByWord = function (wordId) {
        delete self.connections[wordId];
    };

    self.removeConnectionByImage = function (imageId) {
        for (var w in self.connections) {
            if (self.connections[w] == imageId) {
                delete self.connections[w];
            }
        }
    };

    self.drawAllLines = function () {
        var $svg = $('.match_lines_svg');
        $svg.empty();
        var stageOffset = $('.matchcolor_stage').offset();

        for (var wordId in self.connections) {
            var imageId = self.connections[wordId];
            var $wDot = $('.word_dot[data-id="' + wordId + '"]');
            var $iDot = $('.image_dot[data-id="' + imageId + '"]');
            if ($wDot.length == 0 || $iDot.length == 0) continue;

            var wOff = $wDot.offset();
            var iOff = $iDot.offset();

            var x1 = wOff.left - stageOffset.left + ($wDot.outerWidth() / 2);
            var y1 = wOff.top - stageOffset.top + ($wDot.outerHeight() / 2);
            var x2 = iOff.left - stageOffset.left + ($iDot.outerWidth() / 2);
            var y2 = iOff.top - stageOffset.top + ($iDot.outerHeight() / 2);

            var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('class', 'match_line');
            $svg[0].appendChild(line);
        }
    };

    self.colourToFilter = function (hex) {
        // طريقة مبسطة لإعطاء إحساس تلوين عن طريق drop-shadow / تشبع، بما إنه الصور outline (أبيض وأسود)
        return 'drop-shadow(0 0 0 ' + hex + ') saturate(3) brightness(0.95)';
    };

    self.validate = function () {
        var allCorrect = true;
        $('.match_word_item, .match_image_item').removeClass('correct_match wrong_match');

        jQuery.each(self.data.images, function (i, img) {
            var connectedWordId = null;
            for (var w in self.connections) {
                if (self.connections[w] == img.id) {
                    connectedWordId = w;
                }
            }
            var $imgItem = $('.match_image_item[data-id="' + img.id + '"]');
            var $wordItem = connectedWordId ? $('.match_word_item[data-id="' + connectedWordId + '"]') : null;

            if (connectedWordId == img.matchesWordId) {
                $imgItem.addClass('correct_match');
                $imgItem.find('.icon_wrap').css('display', 'block');
                $imgItem.find('.tick').css('display', 'block');
                $imgItem.find('.cross').css('display', 'none');
                if ($wordItem) $wordItem.addClass('correct_match');
            } else {
                $imgItem.addClass('wrong_match');
                $imgItem.find('.icon_wrap').css('display', 'block');
                $imgItem.find('.cross').css('display', 'block');
                $imgItem.find('.tick').css('display', 'none');
                if ($wordItem) $wordItem.addClass('wrong_match');
                allCorrect = false;
            }
        });

        showFeedback(true, allCorrect);
        $('.resetBtn').removeClass('disabled');
    };

    self.reset = function () {
        self.connections = {};
        self.selectedWordId = null;
        self.colourIndex = 0;
        $('.match_lines_svg').empty();
        $('.word_dot').removeClass('selected');
        $('.match_word_item, .match_image_item').removeClass('correct_match wrong_match');
        $('.icon_wrap').css('display', 'none');
        $('.tick, .cross').css('display', 'none');
        $('.colourable_img').removeClass('coloured').css('filter', 'none');
        // شيل أي تلوين يدوي عالكلمات وأي باليت مفتوحة
        $('.match_word_text').css({ 'color': '', '-webkit-text-stroke': '' });
        $('.match_word_text path').css('fill','none');
        document.querySelectorAll('.colourable_img').forEach(function(c){if(c.resetPaint)c.resetPaint();});
        $('.word_colour_palette').remove();
        $('.checkBtn').removeClass('disabled');
        $('.resetBtn').addClass('disabled');
    };
}
function setupMatchColourAssets(){
 document.querySelectorAll('.match_word_text').forEach(function(el){fetch(el.dataset.svg).then(function(r){return r.text();}).then(function(text){var doc=new DOMParser().parseFromString(text,'image/svg+xml'),svg=document.createElementNS('http://www.w3.org/2000/svg','svg');doc.querySelectorAll('path').forEach(function(p){var path=document.createElementNS(svg.namespaceURI,'path');path.setAttribute('d',p.getAttribute('d'));path.setAttribute('fill','none');path.setAttribute('stroke','#231f20');path.setAttribute('stroke-width','2');svg.appendChild(path);});el.textContent='';el.appendChild(svg);var b=svg.getBBox();svg.setAttribute('viewBox',[b.x-3,b.y-3,b.width+6,b.height+6].join(' '));}).catch(function(){});});
 var colours=['#2587df','#ef4444','#ffe45c','#4db45d','#ff9f43'],selected=colours[0];
 var bar=document.createElement('div');bar.className='picture-palette';bar.setAttribute('aria-label','Picture colours');colours.forEach(function(c,i){var b=document.createElement('button');b.type='button';b.style.background=c;b.setAttribute('aria-label',['Blue','Red','Yellow','Green','Orange'][i]);b.setAttribute('aria-pressed',String(i===0));b.onclick=function(){selected=c;bar.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',String(x===b));});};bar.appendChild(b);});document.querySelector('.matchcolor_stage').before(bar);
 document.querySelectorAll('canvas.colourable_img').forEach(function(canvas){var ctx=canvas.getContext('2d',{willReadFrequently:true}),source,paint,history=[];var img=new Image();img.onload=function(){canvas.width=900;canvas.height=Math.round(900*img.naturalHeight/img.naturalWidth);ctx.fillStyle='white';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);source=ctx.getImageData(0,0,canvas.width,canvas.height);paint=ctx.getImageData(0,0,canvas.width,canvas.height);};img.src=canvas.dataset.src;
 var undo=document.createElement('button');undo.type='button';undo.className='paint-undo';undo.textContent='Undo';undo.disabled=true;canvas.after(undo);undo.onclick=function(){if(history.length){paint.data.set(history.pop());ctx.putImageData(paint,0,0);}undo.disabled=!history.length;};canvas.resetPaint=function(){if(source){paint.data.set(source.data);ctx.putImageData(paint,0,0);history=[];undo.disabled=true;}};
 canvas.addEventListener('pointerdown',function(e){if(!source)return;var w=canvas.width,h=canvas.height,b=canvas.getBoundingClientRect(),scale=Math.min(b.width/w,b.height/h),x=Math.floor((e.clientX-b.left-(b.width-w*scale)/2)/scale),y=Math.floor((e.clientY-b.top-(b.height-h*scale)/2)/scale);if(x<0||y<0||x>=w||y>=h)return;function white(i){var p=i*4;return source.data[p]>235&&source.data[p+1]>235&&source.data[p+2]>235;}var start=y*w+x;if(!white(start))return;var seen=new Uint8Array(w*h),queue=[start],area=[];seen[start]=1;for(var head=0;head<queue.length;head++){var i=queue[head],px=i%w,py=Math.floor(i/w);if(px===0||py===0||px===w-1||py===h-1)return;area.push(i);[i-1,i+1,i-w,i+w].forEach(function(n){if(!seen[n]&&white(n)){seen[n]=1;queue.push(n);}});}history.push(new Uint8ClampedArray(paint.data));if(history.length>10)history.shift();var rgb=[1,3,5].map(function(n){return parseInt(selected.slice(n,n+2),16);});area.forEach(function(i){paint.data.set([rgb[0],rgb[1],rgb[2],255],i*4);});ctx.putImageData(paint,0,0);undo.disabled=false;$('.resetBtn').removeClass('disabled');});
 });
}
