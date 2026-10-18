var stereo_data = {
  audio: "",
  exist: false,
  bgColor_rgb: "rgb(53, 130, 180)",
  type: "text",
  playListData: [
    {
      audiourl: "../audios/page_32/demo.mp3",
    },
    {
      url: "",
    },
    {
      url: "",
    },
    {
      url: "",
    },
  ],
};
var snapshot_data = {
  snapshot: [
    {
      audio: [
        "../audios/page_32/pizza.mp3",
        "../audios/page_32/dough.mp3",
        "../audios/page_32/sauce.mp3",
        "../audios/page_32/sprinkle.mp3",
        "../audios/page_32/cheese.mp3",
        "../audios/page_32/add.mp3",
        "../audios/page_32/pepperoni.mp3",
        "../audios/page_32/slice.mp3",
      ],
      image: [
        "../images/pages/snapshots/ARC_2_1_SB_U1_P5_word1.png",
        "../images/pages/snapshots/ARC_2_1_SB_U1_P5_word2.png",
        "../images/pages/snapshots/ARC_2_1_SB_U1_P5_word3.png",
        "../images/pages/snapshots/ARC_2_1_SB_U1_P5_word4.png",
        "../images/pages/snapshots/ARC_2_1_SB_U1_P5_word5.png",
        "../images/pages/snapshots/ARC_2_1_SB_U1_P5_word6.png",
        "../images/pages/snapshots/ARC_2_1_SB_U1_P5_word7.png",
        "../images/pages/snapshots/ARC_2_1_SB_U1_P5_word8.png",
      ],
      word: [
        "<span>pizza</span>",
        "<span>dough</span>",
        "<span>sauce</span>",
        "<span>sprinkle</span>",
        "<span>cheese</span>",
        "<span>add</span>",
        "<span>pepperoni</span>",
        "<span>slice</span>",
      ],
      imagePlacePos: [
        [1, 1, 1],
        [1, 1, 1],
        [1, 0, 1],
      ],
    },
  ],
  popuptitle: "What I Want To Know:",
};

var snapshotPopup_data =
  "<ul><li>What are the people doing?</li><li>Who are the pizzas for?</li><li>What toppings go on a pizza?</li></ul>";

var Popups_data = {
  slides: [
    {
      listen: {
        backgroundImage: "../images/pages/page-1/1-word-background.png",
        mainTitle: "../images/pages/page-1/1-title.png",
        mainTitle_audio:
          "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_02.mp3",
        titleTexts: [
          "<span class='blue_text'>1</span> Listen and say.",
          "<span class='blue_text'>2</span> Listen and point.",
          "<span class='blue_text'>3</span> Read.",
        ],
        titleIcons: ["", "", "../images/pages/page-1/q-1-icon-3.png"],
        titlesAudio: [
          "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_03.mp3",
          "../audios/page_32/PLAYHOUSE_1_SB_UNIT_1_TRACK_02_02.mp3",
          "../audios/Read.mp3",
        ],
        image: [
          "../images/pages/snapshots/page-1/popup-3-elem-1.png",
          "../images/pages/snapshots/page-1/popup-3-elem-2.png",
          "../images/pages/snapshots/page-1/popup-3-elem-3.png",
          "../images/pages/snapshots/page-1/popup-3-elem-1.png",
          "../images/pages/snapshots/page-1/popup-3-elem-2.png",
          "../images/pages/snapshots/page-1/popup-3-elem-3.png",
          "../images/pages/snapshots/page-1/popup-3-elem-1.png",
          "../images/pages/snapshots/page-1/popup-3-elem-2.png",
          "../images/pages/snapshots/page-1/popup-3-elem-3.png",
          "../images/pages/snapshots/page-1/popup-3-elem-3.png",
        ],
        words: [
          "1 head",
          "2 eye",
          "3 ear",
          "4 face",
          "5 nose",
          "6 mouth",
          "7 hand",
          "8 arm",
          "9 finger",
          "10 leg",
        ],
        audio: [
          "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_04.mp3",
          "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_05.mp3",
          "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_06.mp3",
          "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_07.mp3",
          "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_08.mp3",
          "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_09.mp3",
          "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_10.mp3",
          "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_11.mp3",
          "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_12.mp3",
          "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_13.mp3",
        ],
      },
      listen2: {
        // "leftImage": "../images/pages/snapshots/page-2/popup-2-left-img.png",
        mainTitle: "../images/pages/page-1/1-title.png",
        mainTitle_audio:
          "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_02.mp3",
        titleTexts: ["<span class='blue_text'>4</span> You do it."],
        titleIcons: [""],
        titleTextRight: "<span class='blue_text'> Ask and answer.</span>",
        titlesAudio: ["../audios/page_32/Pg4_1.2_Adult_Lady.mp3"],
        image: [
          "../images/pages/page-1/2-img-1.png",
          "../images/pages/page-1/2-img-2.png",
        ],
        audio: [
          "../audios/page_32/Pg5_2.2_Adult Lady.mp3",
          "../audios/page_32/Pg5_2.3_Adult Lady.mp3",
        ],
      },
    },
  ],
  class_name: ["", "", "", "", "", "", "", "", "", "", "", ""], //flex-row (or) flex-reverse (or) flex-column-reverse for each image-container **optional**
  words: [
    "head",
    "eye",
    "ear",
    "face",
    "nose",
    "mouth",
    "hand",
    "arm",
    "finger",
    "leg",
  ],
  points: [
    "../images/pages/page-1/intro-1.png",
    "../images/pages/page-1/intro-2.png",
    "../images/pages/page-1/intro-3.png",
    "../images/pages/page-1/intro-4.png",
    "../images/pages/page-1/intro-5.png",
    "../images/pages/page-1/intro-6.png",
    "../images/pages/page-1/intro-7.png",
    "../images/pages/page-1/intro-8.png",
    "../images/pages/page-1/intro-9.png",
    "../images/pages/page-1/intro-10.png",
    // "../images/pages/page-1/intro-11.png",
    // "../images/pages/page-1/intro-12.png",
  ],
  postions: [
    "left: 52%; top: 14%;",
    "left: 27%; top: 23%;",
    "left: 22%; top: 26%;",
    "left: 62%; top: 19%;",
    "left: 27%; top: 32%;",
    "left: 34%; top: 33%;",
    "left: 58%; top: 41%;",
    "left: 33%; top: 47%;",
    "left: 19%; top: 57%;",
    "left: 46%;top: 76%;",
    // "left:508px; top:475px;",
    // "left:369px; top:569px;",
  ],
  imagesAudio: [
    "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_04.mp3",
    "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_05.mp3",
    "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_06.mp3",
    "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_07.mp3",
    "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_08.mp3",
    "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_09.mp3",
    "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_10.mp3",
    "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_11.mp3",
    "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_12.mp3",
    "../audios/page_32/PLAYHOUSE_1_SB_UNIT_4_TRACK_01_13.mp3",
  ],
};
