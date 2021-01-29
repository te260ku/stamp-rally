
var detectionCount = 0;
var questionList = [
  "パンはパンでも食べられないパンは？"
];


AFRAME.registerComponent('registerevents', {
    init: function () {
        var marker = this.el;

        // マーカーを検出したイベントの登録
        marker.addEventListener('markerFound', function () {
            var markerId = marker.id;
            console.log('markerFound', markerId);

            switch (markerId) {
              case "marker-hiro":
                showModal();
                break;
            
              default:
                showModal();
                break;
            }
            // document.querySelector('#box').emit('markerfound');
        });

        // マーカーを見失ったイベントの登録
        marker.addEventListener('markerLost', function () {
            var markerId = marker.id;
            // console.log('markerLost', markerId);
            // document.querySelector('#box').emit('markerlost');
            closeModal();
        });
    }
});

const showModal = function () {
  $('.modal').modal('show');
  var question = $('#question');
  // var text = ;
  question.text(questionList[0]);
};


const closeModal = function () {
  $('.modal').modal('hide');
};