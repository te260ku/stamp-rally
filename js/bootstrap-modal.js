let question = document.getElementById("question");
let detectionCount = 0;
const questionList = [
    "パンはパンでも食べられないパンは？"
  ];

$(document).ready(function(){
    showModal();
});

$('#exampleModal').on('show.bs.modal', function (event) {
    var clickBotton = $(event.relatedTarget).data('clickbotton');
    $('#showBsModal').text(clickBotton+"をクリックしてshowメソッドを呼び出した");
});

const hide = function(){
    $('.modal').modal('hide');
};


const showModal = function () {
    $('.modal').modal('show');
    var question = $('#question');
    var text = questionList[0];
    question.text(text);
  };