function buildFillInBody(aObj) {	
	var htmlStmt = '';
	if(typeof aObj !=undefined && aObj !=null){		
       
		var layOut = parseInt(aObj.layout);
        var numOfQuestions = (aObj.questions).length;
        var numInRowArray = aObj.numinrow;
        var numOfRows = numInRowArray.length;
    	var currentQue = 1;			
		
		htmlStmt +=  '<div class="sub_footer_icon subFooterNav backNav mx-1">'
        htmlStmt +=  '<a href="">'
        htmlStmt +=  '<img src="../images/icons/back_btn.png" />'
        htmlStmt +=  '</a>'
        htmlStmt +=  '</div>'
        htmlStmt +=  '<div class="sub_footer_icon subFooterNav nextNav mx-1">'
        htmlStmt +=  '<a href="">'
        htmlStmt +=  '<img src="../images/icons/next_btn.png" />'
        htmlStmt +=  '</a>'
        htmlStmt +=  '</div>'
		//====================================================================== header ======================
		htmlStmt += '<div class="act_head_group justify-content-center">';
            htmlStmt += '<div class="audioIcon off contant " data-slideNum="' + 1 + '" data-audio="' + aObj.mainTitleAudio + '">';
                htmlStmt += '<div class="q-type-img-container">';
                htmlStmt += '<img class="mainTitle" src=' + aObj.mainTitle + '>';
                if (aObj.mainTitleIcon != undefined && aObj.mainTitleIcon != '') {
                    htmlStmt += '<img class="mainTitleIcon" src=' + aObj.mainTitleIcon + ' style="right:'+aObj.mainTitleIconPos.right+';">';
                }
                htmlStmt += '</div>';
            htmlStmt += '</div>';

            htmlStmt += '<div class="activityHeading">'
                htmlStmt += '<div class="audioIcon off contant audioQuestionTitle" data-slideNum="' + 1 + '" data-audio="' + aObj.subTitleAudio + '">';
                htmlStmt += "<div class='page_sub_title d-flex'>";
                    htmlStmt += "<p> " + aObj.subTitleTextLeft + " </p>";
                    for (var sicons = 0 ; sicons < aObj.subTitleIcons.length ; sicons++) {
                        htmlStmt += "<img src='" + aObj.subTitleIcons[sicons] + "'/>";
                    }
                    htmlStmt += "<p> " + aObj.subTitleTextRight + " </p>";
                htmlStmt += "</div>";
                htmlStmt += '</div>';
            htmlStmt += '</div>';
        htmlStmt += '</div>';
		//========================================================================== all_cont =====================
		htmlStmt += '<div class="options cont_ht_sf mx-auto">';
		htmlStmt += '<div class="all_cont justify-content-start justify-content-sm-center">';
		htmlStmt += '<div class="screen_elements d-flex flex-wrap">';
		htmlStmt += '<div class="group_elm d-flex flex-wrap justify-content-center align-items-center mb-70">';

			htmlStmt += '<div class="image_space"><img src="' + aObj.image + '"></div>';

            htmlStmt += '<div class="txt">';
                htmlStmt += '<div class="audioIcon d-flex flex-column txt-audioIcon off d-flex contant min_w_fit_contant" data-audio="' + (aObj.titleAudio || aObj.audio) + '">';
                htmlStmt += '<span class="title-song">'+aObj.title+'</span>';
                htmlStmt += '</div>';

                htmlStmt += '<div class="audioIcon d-flex flex-column txt-audioIcon off d-flex contant min_w_fit_contant" data-audio="' + aObj.audio + '">';
				htmlStmt += aObj.text;
			    htmlStmt += '</div>';
            htmlStmt += '</div>';
			
            htmlStmt += '<div class="image_space img2"><img src="' + aObj.image2 + '"></div>';

		htmlStmt += '</div>';
		htmlStmt += '</div></div></div>'; // end - all_cont / options 
		
	}

	console.log('htmlStmt >> fillin Built');
	$( ".activity_area" ).append( htmlStmt );	
	
	setLoadedStatus(getCurrFileOrDirectory('file'));
}
function nextChar(c) {
	return String.fromCharCode(c.charCodeAt(0) + 1);
}  