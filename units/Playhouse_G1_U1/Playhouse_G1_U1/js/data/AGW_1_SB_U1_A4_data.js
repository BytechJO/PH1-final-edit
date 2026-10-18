var stereo_data = {
    "audio":"",
    "exist":false,
    "bgColor_rgb":"rgb(37 187 240)",
    "type":"text",
    "playListData" : [
        {
          'audiourl': '../audios/demo.mp3',
        },
        {
          'url': '',
        },
        {
          'url': '',
        },
        {
          'url': '',
        }
    ],
  }
var mcq_data = {   
    "layout"                : 1,
    "numinrow"              : [[1,1]],
    "mainTitle": "../images/pages/sb-icons/grammer_main_title.png",
    "mainTitleIcon": "../images/pages/sb-icons/word_main_title_icon.png",
    "mainTitleIconPos": {"right": "-18px"},
    "mainTitleAudio": "../audios/under.mp3",
    "subTitleTextLeft": "<span class='blue_text'>2</span> Look, read and choose.",
    "subTitleTextRight": "",
    "subTitleIcons": [],
    "subTitleAudio": "../audios/under.mp3",
    "activitysubheading"    : "",
    "activityicon"          : "../images/icons/hand_icon.png",    
    "select"                : "single", // single (or) multiple
    "shape"                 : "roundrect", // circle (or) roundrect (or) rectangle (or) svg (or) cross (or) checkbox
    "bgcolor"               : "none",
    "numbering"             : "number",
    "numberstartfrom"       : 1, 
    "numberofcolumns"       :  1,
    "image"                 : "no",
    "imageposition"         :"back",
    "questions"             : [
        {
            "question"              : "Is it a pen? [_]",
            "options"               : [["Yes, it is.","No, it isn’t."]],          
            "answer"                : [1],
			"inputbox"				:"yes",
			"image"					: '../images/pages/activities/U1-Q1-2.png',
            "audio"                 : "",
            "audioenable"           : "correct", // correct (or) default 
            
        },
        {
            "question"              : "Is it a board? [_]",
            "options"               : [["Yes, it is.","No, it isn’t."]],          
            "answer"                : [1],
			"inputbox"				: "yes",
			"image"					: '../images/pages/activities/U1-Q1-1.png',
            "audio"                 : "",
            "audioenable"           : "correct", // correct (or) default
            
        },
        {
            "question"              : "Is it a desk? [_]",
            "options"               : [["Yes, it is.","No, it isn’t."]],          
            "answer"                : [2],
			"inputbox"				:"yes",
			"image"					: '../images/pages/activities/U1-Q1-6.png',
            "audio"                 : "",
            "audioenable"           : "correct", // correct (or) default 
            
        },
        {
            "question"              : "Is it a crayon? [_]",
            "options"               : [["Yes, it is.","No, it isn’t."]],          
            "answer"                : [2],
			"inputbox"				: "yes",
			"image"					: '../images/pages/activities/U1-Q1-5.png',
            "audio"                 : "",
            "audioenable"           : "correct", // correct (or) default
            
        }
        	
    ]
}