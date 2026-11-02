var stereo_data = {
  "audio":"",
  "exist":true,
  "bgColor_rgb":"rgb(53, 130, 180)",
  "type":"text",
  "playListData" : [
      {
        'audiourl': '../audios/page_113/PLAYHOUSE_1_SB_UNIT_15_TRACK_05_01.mp3',
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
  "mainTitle"             : "../images/pages/sb-icons/gramprac_main_title.png",
  "mainTitleIcon"         : "../images/pages/sb-icons/gram_main_title_icon.png",
  "mainTitleIconPos"      : {"right": "80px"},
  "mainTitleAudio"        : "../audios/page_113/GRAMMAR_PRACTICE.mp3",
  "subTitleTextLeft"      : "<span class='blue_text'>1</span> Listen and number.",
  "subTitleTextRight"     : "",
  "subTitleIcons"         : [""],
  "subTitleAudio"         : "../audios/page_113/1_Listen_and_number.mp3",
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
        "text": "[_]",
        "textFront":"",
        "textaudios": ["../audios/page_113/under.mp3"],
        "textEndAudio":"",
        "audio": "",
        "audioenable": "default", // correct (or) default
        "image": "../images/pages/activities/2-img-1.png",
        "answer": [""],
        "alternateanswer": [[]],
        "strictcase": "no", // yes (or) no  
        "strictorder": "yes", // yes (or) no              
       "maxlength": 1,
        "type": "", // text (or) number
      },
      {
        "singleword": false,
        "text": "[_]",
        "textFront":"",
        "textaudios": ["../audios/page_113/under.mp3"],
        "textEndAudio":"",
        "audio": "",
        "audioenable": "default", // correct (or) default
        "image": "../images/pages/activities/2-img-2.png",
        "answer": [""],
        "alternateanswer": [[]],
        "strictcase": "no", // yes (or) no     
        "strictorder": "yes", // yes (or) no             
       "maxlength": 1,
        "type": "", // text (or) number
      },
      {
        "singleword": false,
        "text": "[_]",
        "textFront":"",
        "textaudios": [""],
        "textEndAudio":"",
        "audio": "",
        "audioenable": "default", // correct (or) default
        "image": "../images/pages/activities/2-img-3.png",
        "answer": [""],
        "alternateanswer": [[]],
        "strictcase": "no", // yes (or) no    
        "strictorder": "yes", // yes (or) no              
       "maxlength": 1,
        "type": "", // text (or) number
      },
      {
        "singleword": false,
        "text": "[_]",
        "textFront":"",
        "textaudios": [""],
        "textEndAudio":"",
        "audio": "",
        "audioenable": "default", // correct (or) default
        "image": "../images/pages/activities/2-img-4.png",
        "answer": [""],
        "alternateanswer": [[]],
        "strictcase": "no", // yes (or) no    
        "strictorder": "yes", // yes (or) no              
        "maxlength": 1,
        "type": "", // text (or) number
      },
      {
        "singleword": false,
        "text": "[_]",
        "textFront":"",
        "textaudios": [""],
        "textEndAudio":"",
        "audio": "",
        "audioenable": "default", // correct (or) default
        "image": "../images/pages/activities/2-img-5.png",
        "answer": [""],
        "alternateanswer": [[]],
        "strictcase": "no", // yes (or) no    
        "strictorder": "yes", // yes (or) no              
        "maxlength": 1,
        "type": "", // text (or) number
      },
    ]
  }
stereo_data.playListData[0].audiourl="../audios/review_oct27/listen-and-number-full.mp3";
[["2"],["5"],["4"],["1"],["3"]].forEach((a,i)=>fillin_data.questions[i].answer=a);
