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
var fillin_data = {
  "layout"                : 1,
  "numinrow"              : [[1]],
  "mainTitle"             : "../images/pages/sb-icons/phonics_main_title.png",
  "mainTitleIcon"         : "../images/pages/sb-icons/phonics_main_title_icon.png",
  "mainTitleIconPos"      : {"right": "-30px"},
  "mainTitleAudio"        : "../audios/page_92/PHONICS.mp3",
  "subTitleTextLeft"      : "<span class='blue_text'>3</span> Write the sentences correctly.",
  "subTitleTextRight"     : "",
  "subTitleIcons"         : [],
  "subTitleAudio"         : "../audios/new/p92write2.mp3",
  "ontextaudioplay"       : '',
  "onimgaudioplay"        : '',
  "numbering"             : "number", // "alphabet" (or) "number"
  "numberstartfrom"       : "a",
  "image"                 : "",
  "options"               : [],
  "optionsAudios"         : [],
  "questions": 
  [
    {
      "singleword": false,
      "text": "<b>1</b> &nbsp; cooks &nbsp; A chef &nbsp; food [_]",
      "textaudios": [],
      "image": "",
      "option":"",
      "audio": "../audios/in.mp3",
      "audioenable": "default", // correct (or) default
      "answer": ["A chef cooks food."],
      "alternateanswer": [["A chef cooks food"]],
      "strictcase": "no", // yes (or) no  
      "strictorder": "yes", // yes (or) no              
      "maxlength": 300,
      "type": "text", // text (or) number
    },
    {
      "singleword": false,
      "text": "<b>2</b> &nbsp; like &nbsp; I &nbsp; ice cream [_]",
      "textaudios": [],
      "image": "",
      "option":"",
      "audio": "../audios/in.mp3",
      "audioenable": "default", // correct (or) default
      "answer": ["I like ice cream."],
      "alternateanswer": [["I like ice cream"]],
      "strictcase": "no", // yes (or) no     
      "strictorder": "yes", // yes (or) no             
      "maxlength": 300,
      "type": "text", // text (or) number
    },
    {
      "singleword": false,
      "text": "<b>2</b> &nbsp; Yoshi &nbsp; whistle &nbsp; can [_]",
      "textaudios": [],
      "image": "",
      "option":"",
      "audio": "../audios/in.mp3",
      "audioenable": "default", // correct (or) default
      "answer": ["Yoshi can whistle."],
      "alternateanswer": [["Yoshi can whistle"]],
      "strictcase": "no", // yes (or) no     
      "strictorder": "yes", // yes (or) no             
      "maxlength": 300,
      "type": "text", // text (or) number
    },
  ]
}