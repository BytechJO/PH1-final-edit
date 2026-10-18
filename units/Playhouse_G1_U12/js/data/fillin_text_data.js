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
  "mainTitle"             : "../images/pages/sb-icons/gramprac_main_title.png",
  "mainTitleIcon"         : "../images/pages/sb-icons/gram_main_title_icon.png",
  "mainTitleIconPos"      : {"right": "80px"},
  "mainTitleAudio"        : "../audios/page_91/GRAMMAR_PRACTICE.mp3",
  "subTitleTextLeft"      : "<span class='blue_text'>2</span> Answer.",
  "subTitleTextRight"     : "",
  "subTitleIcons"         : ["../images/pages/sb-icons/gram_2_icon.png"],
  "subTitleAudio"         : "../audios/missing/Answer.mp3",
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
      "text": "<b>1</b> &nbsp; Where does Ms. Lori work? [_]",
      "textaudios": ["../audios/missing/Where does Ms. Lori work.mp3"],
      "image": "",
      "option":"",
      "audio": "../audios/in.mp3",
      "audioenable": "default", // correct (or) default
      "answer": ["Ms. Lori works in a school"],
      "alternateanswer": [[]],
      "strictcase": "no", // yes (or) no  
      "strictorder": "yes", // yes (or) no              
      "maxlength": 300,
      "type": "text", // text (or) number
    },
    {
      "singleword": false,
      "text": "<b>2</b> &nbsp; Does Officer Sam work in an office? [_]",
      "textaudios": ["../audios/missing/Does Officer Sam work in an office.mp3"],
      "image": "",
      "option":"",
      "audio": "../audios/in.mp3",
      "audioenable": "default", // correct (or) default
      "answer": ["No he works in a car"],
      "alternateanswer": [[]],
      "strictcase": "no", // yes (or) no     
      "strictorder": "yes", // yes (or) no             
      "maxlength": 300,
      "type": "text", // text (or) number
    },
   
  ]
}