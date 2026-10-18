var stereo_data = {
  audio: "",
  exist: false,
  bgColor_rgb: "rgb(53, 130, 180)",
  type: "text",
  playListData: [{ audiourl: "" }, { url: "" }, { url: "" }, { url: "" }],
};

var matchcolor_data = {
  mainTitle: "../images/pages/sb-icons/conv_main_title.png",
  mainTitleIcon: "../images/pages/sb-icons/conv_main_title_icon.png",
  mainTitleIconPos: { right: "-18px" },
  mainTitleAudio: "../audios/page_45/CONVERSATION.mp3",
  subTitleTextLeft: '<span class="blue_text">2</span> Match and colour.',
  subTitleTextRight: "",
  subTitleIcons: [],
  subTitleAudio: "../audios/new/p45match.mp3",

  words: [
    { id: "w1", text: "ride", svg: "../images/pages/activities/sbp45/ride.svg", audio: "../audios/under.mp3" },
    { id: "w2", text: "swim", svg: "../images/pages/activities/sbp45/swim.svg", audio: "../audios/under.mp3" },
    { id: "w3", text: "read", svg: "../images/pages/activities/sbp45/read.svg", audio: "../audios/under.mp3" },
    { id: "w4", text: "skateboard", svg: "../images/pages/activities/sbp45/skateboard.svg", audio: "../audios/under.mp3" },
  ],

  images: [
    {
      id: "i1",
      image: "../images/pages/activities/sbp45/img01.png",
      matchesWordId: "w3",
    },
    {
      id: "i2",
      image: "../images/pages/activities/sbp45/img02.png",
      matchesWordId: "w2",
    },
    {
      id: "i3",
      image: "../images/pages/activities/sbp45/img03.png",
      matchesWordId: "w1",
    },
    {
      id: "i4",
      image: "../images/pages/activities/sbp45/img04.png",
      matchesWordId: "w4",
    },
  ],
};
