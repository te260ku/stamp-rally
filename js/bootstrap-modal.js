let question = document.getElementById("question");
let detectionCount = 0;

$(document).ready(function(){
    // show();
});

$('#exampleModal').on('show.bs.modal', function (event) {
    var clickBotton = $(event.relatedTarget).data('clickbotton');
    $('#showBsModal').text(clickBotton+"をクリックしてshowメソッドを呼び出した");
});

const hide = function(){
    $('.modal').modal('hide');
};
const show = function(){
    $('.modal').modal('show');
};