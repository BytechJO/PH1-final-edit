var stereo_data = {
  "audio":"",
  "exist":true,
  "bgColor_rgb":"rgb(53, 130, 180)",
  "type":"text",
  "playListData" : [
      {
        'audiourl': '../audios/page_84/PLAYHOUSE_1_SB_UNIT_11_TRACK_04_01.mp3',
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
var fillin_data = {
  "layout"                : 1,
  "numinrow"              : [[1,1,1,1,1]],
  "mainTitle"             : "../images/pages/sb-icons/gram_main_title.png",
  "mainTitleIcon"         : "../images/pages/sb-icons/gram_main_title_icon.png",
  "mainTitleIconPos"      : {"right": "-18px"},
  "mainTitleAudio"        : "../audios/page_84/GRAMMAR.mp3",
  "subTitleTextLeft"      : "<span class='blue_text'>3</span> Listen and number. Then write how they get around.",
  "subTitleTextRight"     : "",
  "subTitleIcons"         : [""],
  "subTitleAudio"         : "../audios/page_84/Listen_and_number._Then_write_how_they_get_around.mp3",
  "image"                 : "",
  "imageposition"         : "back",// "front" (or) "back"
  "numbering"             : "alphabet", // "alphabet" (or) "number"
  "numberstartfrom"       : "a",
  // "defaultAnswer": [],
  "options": [],
  "optionsAudios":[],
  "questions":
    [
      {
        "singleword": false,
        "text": "[_][_]",
        "textFront":"",
        "textaudios": ["../audios/page_84/under.mp3"],
        "textEndAudio":"",
        "audio": "",
        "audioenable": "default", // correct (or) default
        "image": "../images/pages/activities/2-img-1.png",
        "answer": ["3", "bus"],
        "alternateanswer": [[]],
        "strictcase": "no", // yes (or) no  
        "strictorder": "yes", // yes (or) no              
       "maxlength": 500,
        "type": "", // text (or) number
      },
      {
        "singleword": false,
        "text": "[_][_]",
        "textFront":"",
        "textaudios": ["../audios/page_84/under.mp3"],
        "textEndAudio":"",
        "audio": "",
        "audioenable": "default", // correct (or) default
        "image": "../images/pages/activities/2-img-2.png",
        "answer": ["4", "car"],
        "alternateanswer": [[]],
        "strictcase": "no", // yes (or) no     
        "strictorder": "yes", // yes (or) no             
       "maxlength": 500,
        "type": "", // text (or) number
      },
      {
        "singleword": false,
        "text": "[_][_]",
        "textFront":"",
        "textaudios": [""],
        "textEndAudio":"",
        "audio": "",
        "audioenable": "default", // correct (or) default
        "image": "../images/pages/activities/2-img-3.png",
        "answer": ["2", "train"],
        "alternateanswer": [[]],
        "strictcase": "no", // yes (or) no    
        "strictorder": "yes", // yes (or) no              
       "maxlength": 500,
        "type": "", // text (or) number
      },
      {
        "singleword": false,
        "text": "[_][_]",
        "textFront":"",
        "textaudios": [""],
        "textEndAudio":"",
        "audio": "",
        "audioenable": "default", // correct (or) default
        "image": "../images/pages/activities/2-img-4.png",
        "answer": ["1", "walk"],
        "alternateanswer": [[]],
        "strictcase": "no", // yes (or) no    
        "strictorder": "yes", // yes (or) no              
        "maxlength": 500,
        "type": "", // text (or) number
      },
 
    ]
  }
stereo_data.playListData[0].audiourl="../audios/review_oct27/listen-and-number-full.mp3";
[["1","bus"],["2","taxi"],["3","train"],["4","walk"]].forEach((a,i)=>fillin_data.questions[i].answer=a);
