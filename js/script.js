var detectionCount = 0;
var questionList = [
  "trex", 
  "road"
];

const showModal = function (imageNum) {
    $('.modal').modal('show');
    // var question = $('#question');
    // question.text(questionList[imageNum]);
    // buildQuiz();
  };
  
  
const closeModal = function () {
$('.modal').modal('hide');
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
                // showModal();
                break;
            }
            // document.querySelector('#box').emit('markerfound');
        });

        // マーカーを見失ったイベントの登録
        marker.addEventListener('markerLost', function () {
            var markerId = marker.id;
            // document.querySelector('#box').emit('markerlost');
            closeModal();
        });
    }
});
