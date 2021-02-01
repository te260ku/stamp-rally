var detectImageAudio = new Audio('./assets/audio/sample.mp3');
var modalON = false;

const showModal = function (imageNum) {
  if (!modalON) {
    detectImageAudio.play();
    $('.modal').modal('show');
    buildQuiz(imageNum);
    modalON = true;
  }
  window.quizLib.buildQuiz(imageNum);
};


const closeModal = function () {
  $('.modal').modal('hide');
  modalON = false;
};


AFRAME.registerComponent('registerevents', {
    init: function () {
        var marker = this.el;

        // マーカーを検出したイベントの登録
        marker.addEventListener('markerFound', function () {
          var markerId = marker.id;
          console.log(markerId);

          switch (markerId) {
            case "trex":
              showModal(0);
              break;
            case "road":
              showModal(1);
              break;
            default:
              break;
          }
        });

        // マーカーを見失ったイベントの登録
        marker.addEventListener('markerLost', function () {
            var markerId = marker.id;
            console.log(markerId);
        });
    }
});




