function sendHealthSurveyFormData() {
    var hs1 = $('#hs-1').val();
    var hs2 = $('#hs-2').val();


    $.ajax({
    url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfYgmcPg8DdvOYCPQjWeCJtRy1b0VELJiDy7RwmHvjoQ7ihGA/formResponse",
    data: {"entry.514032089": hs1, "entry.1012095306": hs2},
    type: "POST",
    dataType: "xml",
    statusCode: {
        0: function() {
            console.log("success");
        },
        200: function() {
            console.log("error");
        }
    }
});
};

$('#submit-button').on('click', function () {
    $('#survey-form').hide();
    $('#end-container').show();
    sendHealthSurveyFormData();
    
});

// $('#end-container').hide();


$('#retry-button').on('click', function () {
    // 入力内容をクリア
    $('#form-body')
            .find("input, select, textarea")
            .not(":button, :submit, :reset, :hidden")
            .val("")
            .prop("checked", false)
            .prop("selected", false)
        ;
    $('#form-body').find(":radio").filter("[data-default]").prop("checked", true);
    
    $('#survey-form').show();
    $('#end-container').hide();
});


$('#finish-button').on('click', function () {
    $('#survey-form').hide();
    $('#end-container').hide();

    window.location.href = './main.html';
});

