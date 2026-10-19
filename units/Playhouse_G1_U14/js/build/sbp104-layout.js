(function () {
  var original = buildSnapShotContent;
  buildSnapShotContent = function () {
    original.apply(this, arguments);
    var stage = document.createElement('div');
    stage.className = 'seasons-stage snapShotLoader';
    stage.innerHTML = '<img class="seasons-art" src="../images/pages/page-1/sbp104-seasons.png" alt="Summer: It is sunny. It is hot. Winter: It is snowy. It is cold. Spring: It is warm. It is cloudy. Autumn: It is windy. It is rainy.">';
    var labels = [['Summer',1.4,1],['Winter',51,1],['Spring',1.4,52],['Autumn',51,52]];
    labels.forEach(function (a) {
      var label = document.createElement('span');
      label.className = 'season-name'; label.textContent = a[0];
      label.style.left = a[1] + '%'; label.style.top = a[2] + '%';
      stage.appendChild(label);
    });
    var points = [[39.1,11.4],[12.7,2.4],[22.8,6.5],[62.3,4],[59.9,35.5],[87.2,34.2],[11.6,54.7],[37.7,65.9],[12.3,68.9],[63.6,54.8],[59.6,79.4],[90,75.3]];
    document.querySelectorAll('.snapshot_container .image-container').forEach(function (el, i) {
      if (i >= points.length) { el.remove(); return; }
      el.style.left = points[i][0] + '%'; el.style.top = points[i][1] + '%';
      el.querySelector('.point').alt = 'Word ' + (i + 1);
      el.querySelector('.point').addEventListener('click', function () {
        playThisAudio($(el.querySelector('.audioTile')), 'new');
      });
      stage.appendChild(el);
    });
    document.body.appendChild(stage);
    stage.appendChild(theAudio);
    $(stage).on('click', '.audioTile', function () { playThisAudio($(this), 'new'); });
  };
})();
