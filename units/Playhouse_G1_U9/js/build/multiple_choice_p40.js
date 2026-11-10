function buildMcqBody(aObj) {
  var htmlStmt = "";
  if (typeof aObj != undefined && aObj != null) {
    var numOfQuestions = aObj.questions.length;
    var numberofCols = parseInt(aObj.numberofcolumns);
    var numOfQinCol = Math.round(numOfQuestions / numberofCols);
    var currQueNum = 0;

    htmlStmt += '<div class="sub_footer_icon subFooterNav backNav mx-1">';
    htmlStmt += '<a href="">';
    htmlStmt += '<img src="../images/icons/back_btn.png" />';
    htmlStmt += "</a>";
    htmlStmt += "</div>";
    htmlStmt += '<div class="sub_footer_icon subFooterNav nextNav mx-1">';
    htmlStmt += '<a href="">';
    htmlStmt += '<img src="../images/icons/next_btn.png" />';
    htmlStmt += "</a>";
    htmlStmt += "</div>";
    // ===================================================================== heading =====================
    htmlStmt += '<div class="act_head_group justify-content-center">';
    htmlStmt +=
      '<div class="audioIcon off contant " data-slideNum="' +
      1 +
      '" data-audio="' +
      aObj.mainTitleAudio +
      '">';
    htmlStmt += '<div class="q-type-img-container">';
    htmlStmt += '<img class="mainTitle" src=' + aObj.mainTitle + ">";
    if (aObj.mainTitleIcon != undefined && aObj.mainTitleIcon != "") {
      htmlStmt +=
        '<img class="mainTitleIcon" src=' +
        aObj.mainTitleIcon +
        ' style="right:' +
        aObj.mainTitleIconPos.right +
        ';">>';
    }
    htmlStmt += "</div>";
    htmlStmt += "</div>";

    htmlStmt += '<div class="activityHeading">';
    htmlStmt +=
      '<div class="audioIcon off contant audioQuestionTitle" data-slideNum="' +
      1 +
      '" data-audio="' +
      aObj.subTitleAudio +
      '">';
    htmlStmt += "<div class='page_sub_title d-flex'>";
    htmlStmt += "<p> " + aObj.subTitleTextLeft + " </p>";
    for (var sicons = 0; sicons < aObj.subTitleIcons.length; sicons++) {
      htmlStmt += "<img src='" + aObj.subTitleIcons[sicons] + "'/>";
    }
    htmlStmt += "<p> " + aObj.subTitleTextRight + " </p>";
    htmlStmt += "</div>";
    htmlStmt += "</div>";
    htmlStmt += "</div>";
    htmlStmt += "</div>";
    // ===================================================================== all_cont =====================
    htmlStmt += '<div class="options cont_ht_sf mx-auto">';
    htmlStmt +=
      '<div class="all_cont justify-content-start justify-content-sm-center">';
    htmlStmt +=
      '<div class="group_elm d-flex flex-wrap justify-content-center align-items-center mb-70">';
    if (aObj.image != "no" && aObj.image != "") {
      if (aObj.imageposition == "front") {
        htmlStmt +=
          '<div class="img_space"><img src="' + aObj.image + '"></img></div>';
      }
    }

    for (x = 0; x < numberofCols; x++) {
      htmlStmt += '<div class="tick_group d-flex flex-wrap">';
      for (y = 0; y < numOfQinCol; y++) {
        currQueNum++;
        var tpOb = aObj.questions[currQueNum - 1];
        if (typeof tpOb != undefined && tpOb != null) {
          var defaultAnswers = aObj.defaultAnswer;
          var className = "";
          if (defaultAnswers.includes(y)) {
            className = "default";
          } else {
            className = "que";
          }
          htmlStmt +=
            '<div class="' +
            className +
            ' que_box background_audio d-flex flex-wrap" id="que_' +
            currQueNum +
            '" data-qno="' +
            currQueNum +
            '">';
          htmlStmt += '<div class="d-flex q_part">';
          // htmlStmt += '<div class="q_num_space">a. </div>';
          if (aObj.numbering != "none") {
            htmlStmt += '<div class="q_num_space">';
            if (aObj.numbering == "alphabet") {
              xx = currQueNum == 1 ? aObj.numberstartfrom : nextChar(xx);
            } else if (aObj.numbering == "number") {
              xx = x + parseInt(aObj.numberstartfrom);
              x++;
            }
            htmlStmt += xx + "</div>";
          }

          console.log(x, y, currQueNum, tpOb);
          htmlStmt += '<div class="question">' + tpOb.question + "</div>";
          htmlStmt += '<div><img src="' + tpOb.image + '"/></div>';
          htmlStmt += "</div>"; // - /q_part
          htmlStmt += '<div class="d-flex flex-wrap picks_grp">';

          if (tpOb.options.length > 0) {
            for (var opt = 0; opt < tpOb.options.length; opt++) {
              var defaultAnswers_pick = tpOb.defaultAnswer_pick;
              var className = "";
              // Answer keys and example picks both use one-based option numbers.
              if (!defaultAnswers_pick.includes(opt + 1)) {
                className = "default";
              } else {
                className = "selectedDefault";
              }
              htmlStmt +=
                '<div id="pick_' +
                currQueNum +
                "_" +
                (opt + 1) +
                '" class="pick d-flex ' +
                className +
                '">';
              if (tpOb.numbering != "none") {
                htmlStmt += '<div class="q_num_space">';
                if (tpOb.numbering == "alphabet") {
                  xx = opt == 0 ? tpOb.numberstartfrom : nextChar(xx);
                } else if (tpOb.numbering == "number") {
                  xx = opt + parseInt(tpOb.numberstartfrom);
                }
                htmlStmt += xx + ". </div>";
              }
              htmlStmt +=
                '<div class="txt">' + tpOb.options[opt].text + "</div> ";
              // htmlStmt += '<div><img src="'+((tpOb.options)[opt]).image+'"/></div>';
              htmlStmt += "</div>";
            }
          }
          htmlStmt += "</div>"; // - /picks_grp
          // htmlStmt += '<div class="img_space"><img src="'+tpOb.image+'"></img></div>';

          htmlStmt += '<div class="icon_wrap p-2">';
          htmlStmt +=
            '<div class="tick"><img src="../images/icons/check_btn.png"></div>';
          htmlStmt +=
            '<div class="cross"><img src="../images/icons/cross_btn.png"></div>';
          htmlStmt += "</div>";

          htmlStmt += "</div>";
        }
      }
      htmlStmt += "</div>"; // --/ tick_group
    }
    if (aObj.rightImage != undefined && aObj.rightImage != "") {
      htmlStmt += "<div>";
      htmlStmt +=
        '<img src="../images/pages/activities/froge_icon_2.png" id="shakingImage" onclick="showBox()"/>';
      htmlStmt +=
        '<div id="right_image_container" class="right-image-container">';
      htmlStmt +=
        '<img class="right-image" src="' + aObj.rightImage + '" alt="image"/>';
      htmlStmt += '<div class="textOnImage-container">';
      for (t = 0; t < aObj.rightText.length; t++) {
        htmlStmt +=
          ' <div class="audioIcon off textOnImage" data-audio="' +
          aObj.rightTextAudio[t] +
          '" style="display: block;">' +
          aObj.rightText[t] +
          "</div> ";
      }
      htmlStmt += "</div>";
      htmlStmt += "</div>";
      htmlStmt += "</div>";
    }

    htmlStmt += "</div>";

    // ============================================================== [ SentenceBuilding ]
    htmlStmt += '<div class="SentenceBuilding_container">';
    htmlStmt += '<div class="cont_items d-flex flex-wrap">';
    htmlStmt += '<div class="main_title_container">';
    htmlStmt += '<div class="main_title_text">';
    if (aObj.main_title_text.length > 1) {
      htmlStmt +=
        '<div class="audioIcon textEnd off d-flex contant" data-audio="' +
        aObj.main_title_audio +
        '">';
      for (let x = 0; x < aObj.main_title_text.length; x++) {
        htmlStmt +=
          "<div class='letter letter-" +
          x +
          " pulse'>" +
          aObj.main_title_text[x] +
          "</div>";
      }
      htmlStmt += "</div>";
    } else {
      htmlStmt += "<div class=''>" + aObj.main_title_text + "</div>";
    }
    htmlStmt += "</div>";
    htmlStmt += "</div>";

    for (let i = 0; i < aObj.items.length; i++) {
      htmlStmt +=
        '<div class="item item-' + i + '">' + aObj.items[i] + "</div>";
    }
    htmlStmt += "</div>";
    htmlStmt += "</div>";
    // ============================================================== [ / SentenceBuilding ]
    htmlStmt += "</div></div>"; // --/ d-flex flex-wrap / all_cont / options
  }
  console.log("htmlStmt >> fillin Built");
  shakeImage();
  $(".activity_area").append(htmlStmt);
  showSentenceImg();
  setLoadedStatus(getCurrFileOrDirectory("file"));
}

function nextChar(c) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}

function showBox() {
  $("#right_image_container").toggle(2500);
}

function shakeImage() {
  $("#shakingImage").css("transform", "rotate(4deg)");
  setTimeout(function () {
    $("#shakingImage").css("transform", "rotate(-4deg)");
    setTimeout(function () {
      $("#shakingImage").css("transform", "rotate(0deg)");
      // Call shakeImage again after 3 seconds (adjust as needed)
      setTimeout(shakeImage, 900);
    }, 100);
  }, 100);
}

function showSentenceImg() {
  $(document).ready(function () {
    $(".imgToggle").click(function () {
      var imgName = $(this).data("img");
      $("." + imgName).fadeToggle(1000);
    });
  });
}
