function sendHealthSurveyFormData() {
    var os1 = $('#os-1').val();


    $.ajax({
    url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdk0UCJGH_kUL28GPWbC4mnB_V-ZgbIABASq7zn10WiwMAsig/formResponse",
    data: {"entry.839337160": os1},
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


$('#finish-button').on('click', function () {
    $('#survey-form').hide();
    $('#end-container').hide();

    window.location.href = '/bootstrap-modal.html';
});

