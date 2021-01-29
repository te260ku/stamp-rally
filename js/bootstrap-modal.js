let question = document.getElementById("question");

$(document).ready(function(){
    show();
});

var hide = function(){
    $('.modal').modal('hide');
};
var show = function(){
    $('.modal').modal('show');
};