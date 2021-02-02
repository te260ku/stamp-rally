var detectImageAudio = new Audio('./assets/audio/sample.mp3');
var modalON = false;

const showModal = function (imageNum) {
  detectImageAudio.play();
  $('.modal').modal('show');
  window.quizLib.buildQuiz(imageNum);
  modalON = true;
};


const closeModal = function () {
  $('.modal').modal('hide');
  modalON = false;
};


$('.modal').on('show.bs.modal', function (event) {
  modalON = true;
});

$('.modal').on('hide.bs.modal', function () {
  modalON = false;
});


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


// 0202

window.addEventListener('arjs-nft-loaded', function(){
  $('.close-title-modal').click();
})



