var stereo_data = {
    "audio":"",
    "exist":false,
    "bgColor_rgb":"rgb(53, 130, 180)",
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
var mcq_tick_data = {    
    "layout"                : 1,
    "numinrow"              : [[1]],
    "mainTitle"             : "../images/pages/sb-icons/conv_main_title.png",
    "mainTitleIcon"         : "../images/pages/sb-icons/conv_main_title_icon.png",
    "mainTitleIconPos"      : {"right": "90px"},
    "mainTitleAudio"        : "../audios/page_61/CONVERSATION.mp3",
    "subTitleTextLeft"      : "<span class='blue_text'>3</span> Listen and choose. Which toy is in the garage?",
    "subTitleTextRight"     : "",
    "subTitleIcons"         : [""],
    "subTitleAudio"         : "../audios/missing/Listen and choose. Which toy is in the garage.mp3",
    "select"                : "single", // single (or) multiple
    "shape"                 : "tickbox", // circle (or) roundrect (or) rectangle (or) svg (or) cross (or) tickbox
    "bgcolor"               : "none",
    "showicon"              : "true",
    "ontextaudioplay"       : '',
    "onimgaudioplay"        : '',
    "numbering"             : "alphabet", // "alphabet" (or) "number"
    "numberstartfrom"       : "a",
    "questions"             : [
        {
            "question"              : "",
            "answer"                : [1],
            "audio"                 : "no",
            "audioenable"           : "default", // correct (or) default
			"numbering"				: "none", // alphabet (or) number (or) none
			"numberstartfrom"		: "a",
            "options"               : [
                {
                    "text"           : "",
                    "image"         : "../images/pages/activities/2-img-1.png",
                    "audio"         : "../audios/missing/Roller skate.mp3",
                    "audioenable"   : "default", // correct (or) default
                },
                {
                    "text"          : "",
                    "image"         : "../images/pages/activities/2-img-2.png",
                    "audio"         : "../audios/missing/Bicycle.mp3",
                    "audioenable"   : "default", // correct (or) default
                },
                {
                    "text"          : "",
                    "image"         : "../images/pages/activities/2-img-3.png",
                    "audio"         : "../audios/missing/Teddy bear.mp3",
                    "audioenable"   : "default", // correct (or) default
                },
                                          
            ]
        },
      
    ]
}