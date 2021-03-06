var userName = "default";
var initialized = false;
var loaded = true;

var userInfo = {
    init : false, 
    name : userName, 
    complete: false, 
    completeGiftForm: false, 
};


function showTitle() {
    $('#title-modal-button').click();
    $('#title-logo').hide();
    $('#init-container').hide();
}


function recordLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    console.log('set: ' + JSON.parse(localStorage.getItem(key)));
    }
function readLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}



const quizContainer = document.getElementById('quiz');
const quizSentenceContainer = document.getElementById('quiz-sentence');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('quiz-submit-button');
var unitResult = $('.unit-result');
var questionTitle = $('#question-title');
var completeRate = $('.complete-rate');
var correctRateInfo = $('.correct-rate');
var finishInfo = $('.finish-info');
finishInfo.hide();
var giftFormInfo = $('.gift-form-info');
var giftForm = $('.gift-form');
var giftFormTemplate = document.getElementById('gift-form-template');
var giftForm_clone = giftFormTemplate.content.cloneNode(true);
giftForm.append(
    giftForm_clone
);

giftForm.hide();

const giftFormURL = {
    high : "https://docs.google.com/forms/d/e/1FAIpQLScBVMt357SMiS37tOAl9bGR7J2formC1e6U4pFZ6zvIoAuorQ/viewform?embedded=true", 
    middle : "https://docs.google.com/forms/d/e/1FAIpQLSeE2xjZeF7hrQoScYuLToVRpJBIZ4eGO93ZqyZRSyMR9-qXbA/viewform?embedded=true", 
    low : "https://docs.google.com/forms/d/e/1FAIpQLSdk0UCJGH_kUL28GPWbC4mnB_V-ZgbIABASq7zn10WiwMAsig/viewform?embedded=true"
};


const detectImageAudio = new Audio('./assets/audio/sample.mp3');
const correctAnswerAudio = new Audio('./assets/audio/correct-answer.mp3');
const wrongAnswerAudio = new Audio('./assets/audio/wrong-answer.mp3');

var currentQuestion;
var questionNumber;
var completeNum = 0;
var modalON = false;
var correctCount = 0;



const hide = function(){
    $('.modal').modal('hide');
};
const showModal = function (num, isImage) {
    $('.modal').modal('show');
    if (isImage) {
        create(num);
    } else {
        
    }
    modalON = true;
};

const create = function (imageNum) {
    $('.modal').modal('show');
    buildQuiz(imageNum);
    
  };

$('#exampleModal').on('show.bs.modal', function (event) {
    // デバッグ用のボタンを押したときにそのidを取得する
    if ($(event.relatedTarget).attr('id') != null) {
        var id = $(event.relatedTarget).attr('id').substr(-1, 1);
        if (!modalON) {
            buildQuiz(id);
        }
    }
    
});

$('#exampleModal').on('hide.bs.modal', function () {
    modalON = false;
});




// ナビゲーションバー
var navTemplate = document.getElementById('nav-template');
var nav_clone = navTemplate.content.cloneNode(true);
$('.nav-area').append(nav_clone);
// ------


function resetQuizArea() {
    unitResult.css("visibility", "hidden");
    quizContainer.innerHTML = "";
}


function buildQuiz(imageNum){

    resetQuizArea();

    currentQuestion = questions[imageNum];
    questionNumber = imageNum;

    // 問題と解答の選択肢を格納する配列
    const output = [];
    
    if (!currentQuestion.done) {
        // 選択肢を格納する配列
        var answers = [];

        if (currentQuestion.type == "choice") {
            for(letter in currentQuestion.answers){
                answers.push(
                    `<label class="btn btn-outline-primary mx-2 option my-1 optionButton" style="text-align: center;
                    width: 55%;">
                    <input type="radio" name="question${questionNumber}" value="${letter}" autocomplete="off">
                    <span>${currentQuestion.answers[letter]}</span>
                    </label>`
                ); 
            };
            
        } else if (currentQuestion.type == "text") {
            answers.push(
                `<input class="form-control" id="textAnswerArea" placeholder="答えを入力">`
            );
            
        } else if (currentQuestion.type == "form") {
            var formTemplate = document.getElementById('form-template');
            var clone = formTemplate.content.cloneNode(true);
             
            var dummy = jQuery('<div>');
            dummy.append(clone);
            var html = dummy.html();
            answers.push(html);

        }
        
        var questionIndex = parseInt(imageNum)+1;
        // questionTitle.text('Q'+ questionIndex + '.');

        output.push(
            `<div class="question mb-4">Q${questionIndex}. ${currentQuestion.question} </div>
            <div class="answers btn-group-toggle" data-toggle="buttons"> ${answers.join('')} </div>`
        );
    
        // ページに反映する
        var result = output.join('');
        quizContainer.innerHTML = result;
        
        
        

        submitButton.disabled = false;
    
    }
    // 回答済みの場合の処理
    else {
        unitResult.css("visibility", "hidden");
        quizContainer.innerHTML = "回答済み";
        submitButton.disabled = true;
    }

    
    
}

  
function setUnitResult(sentence) {
    unitResult.text(sentence);
}

function finish() {
    finishInfo.show();
    giftFormInfo.text("すべてのクイズに回答しました！景品に応募するには以下のフォームを入力してください");

    $('.stamp-reset-button').addClass('disabled');
    $('#confirm-answer-button').addClass('disabled');
    
    giftForm.show();
}

function sendGiftFormData() {

    var correctCount = getCorrectCount();
    var name = $('#gift-name').val();
    var email = $('#gift-email').val();
    var q1 = $('#gift-q1').val();
    var q2 = $('#gift-q2').val();
    var q3 = $('#gift-q3').val();
    var q4 = $('#gift-q4').val();

    $.ajax({
    url: "https://docs.google.com/forms/u/3/d/e/1FAIpQLSd1uIKLOtF1YlCEPnXbjrli2iVEhXaiy1gVwJ3gmXQ5mxVqCQ/formResponse", 
    data: {
        "entry.1557222957": name, 
        "entry.1305270304": email, 
        "entry.204288091": q1, 
        "entry.1793261130": q2, 
        "entry.488462029": q3, 
        "entry.65030031": q4, 
        "entry.935333881": correctCount, 
    },
    type: "POST",
    dataType: "xml",
    statusCode: {
        0: function() {
            userInfo.completeGiftForm = true;
            recordLocalStorage("userInfo", userInfo);
            window.location.href = './thanks.html';
        },
        200: function() {
            alert("回答を送信できませんでした");
        }
    }
});
};
$('#gift-form-submit-button').on('click', function () {
    sendGiftFormData();
});



function sendFormData() {
    var answer = $('#quiz-form-answer').val();

    $.ajax({
    url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfYgmcPg8DdvOYCPQjWeCJtRy1b0VELJiDy7RwmHvjoQ7ihGA/formResponse",
    data: {"entry.1012095306": answer, "entry.514032089": userName},
    type: "POST",
    dataType: "xml",
    statusCode: {
        0: function() {
            alert("success");
        },
        200: function() {
            alert("errorMsg");
        }
    }
});
};


function sendSurveyFormData() {
    var hs1 = $('#hs-1').val();
    var hs2 = $('#hs-2').val();


    $.ajax({
    url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfYgmcPg8DdvOYCPQjWeCJtRy1b0VELJiDy7RwmHvjoQ7ihGA/formResponse",
    data: {"entry.1012095306": hs1, "entry.514032089": hs2},
    type: "POST",
    dataType: "xml",
    statusCode: {
        0: function() {
            alert("success");
        },
        200: function() {
            alert("errorMsg");
        }
    }
});
};


function judgeAnswer(answer) {
    console.log(answer);
    currentQuestion.answer = answer;

    // 正答時の処理
    if (answer === currentQuestion.correctAnswer){
        setUnitResult("回答を記録しました");
        currentQuestion.result = true;
        correctCount ++;
    }
    
    // 誤答時の処理
    else {
        setUnitResult("回答を記録しました");
        currentQuestion.result = false;
    }
}

function showResults(){

    unitResult.css("visibility", "visible");
    
    

    var userAnswer;

    if (currentQuestion.type == "choice") {
        var optionButtons = document.querySelectorAll('.optionButton');
        var optionButtonStates = [];
        optionButtons.forEach(optionButton => {
            optionButtonStates.push(optionButton.classList.contains('active'));
        });

        if (!optionButtonStates.includes(true)) {
            setUnitResult("回答を選択してください");
            return;
        }

        const answerContainer = quizContainer.querySelector('.answers');

        // 選択中のボタンを取得するセレクターを定義
        const selector = 'input[name=question'+questionNumber+']:checked';
        userAnswer = (answerContainer.querySelector(selector) || {}).value;
        judgeAnswer(userAnswer);
    
    } 
    else if (currentQuestion.type == "text") {
        userAnswer = document.getElementById('textAnswerArea').value;
        if (userAnswer == "") {
            setUnitResult("回答を入力してください");
            return;
        }
        judgeAnswer(userAnswer);
    }
    else if (currentQuestion.type == "form") {
        // sendFormData();
        setUnitResult("回答を記録しました");
    }

    currentQuestion.done = true;
    completeNum ++;

    // // 全ての問題に回答した後の処理
    // if (completeNum >= questions.length) {
    //     finish();
    // } 

    submitButton.disabled = true;

    recordLocalStorage("questions", questions);
}

function isCompleted() {
    
}


submitButton.addEventListener('click', showResults);

function getCorrectCount() {
    var count = 0;
    questions.forEach(question => {
        if (question.done) {
            if (question.type != "form") {
                if (question.result) {
                    count ++;
                }
            } 
            
        }
    });
    return count;
}

function calcRateInfo() {
        var correctCount = getCorrectCount();
        var completeCount = getCompleteCount();


    var correctRate = Math.floor((correctCount / completeCount) * 100);
    if (isNaN(correctRate)) {
        correctRate = 0;
    }
    completeRate.text('達成率: ' + parseInt(completeCount) + '/' + questions.length);
    // 現在の正答率を表示
    // correctRateInfo.text('現在の正答率: ' + correctCount + '/' + completeCount + ' = ' + correctRate + '%');
}


// ------------------------------------------------
// タイトル画面


function setAnimation(element, anim) {
    if (element.hasClass('animated')) {
        element.addClass(anim);
    } else {
        element.addClass('animated ' + anim);
    }
}

$("#title-modal-button").animatedModal( {
    animatedIn: "none",
});

var titleLoading = $('.title-loading');
titleLoading.hide();
var titleAnimationStep = 0;
var loadedMessage = $('#loaded-message')
var titleLogo = $('#title-logo');
loadedMessage.hide();
var hideLogoAudio = new Audio('./assets/audio/hide-logo.mp3');
var startAudio = new Audio('./assets/audio/start.mp3');

function count(num){
    num = parseInt(num);
    var dfd = new $.Deferred();
    var delay = (num*1000);
    setTimeout(function(){
        
        titleAnimationStep ++;
        console.log('step: ' + titleAnimationStep)
        
        var tmp = titleAnimationStep;
      switch (tmp) {
        //   case 1:
        //     setAnimation(titleLoading, 'zoomOut');
        //       break;
        //   case 2:
        //     setAnimation(titleLogo, 'zoomOutUp');
        //       break;
          case 1:
            // startAudio.play();
            // titleLogo.css('display', 'none');
            loadedMessage.show();
              setAnimation(loadedMessage, 'fadeIn');
              break;
          case 2:
              setAnimation(loadedMessage, 'fadeOut')
              
              break;
          case 3:
            $('.close-title-modal').click();
                break;

          default:
              break;
      }
      dfd.resolve();
    }, delay);
    
    return dfd.promise();
  }



function titleAnimation() {
    count(0).then(count(2)).then(count(3));    
}


//   $('#title-modal').addClass('zoomIn').one('animationend', function () {
//     $('#title-modal').removeClass('zoomIn');
//   });;



var imageTestButtons = $('.image-test-button');
var switchTestButton = $('#switch-image-test-button');
var isImageTestButtonsOn = true;

switchTestButton.on('click', function () {
    switchImageTestButtonVisible();
});

switchImageTestButtonVisible();

function switchImageTestButtonVisible() {
    if (isImageTestButtonsOn) {
        imageTestButtons.hide();
    } else {
        imageTestButtons.show();
    }
    isImageTestButtonsOn = !isImageTestButtonsOn;
}


// template
var stampListTemplate = document.getElementById('stamp-list-template');

for (var i=0; i<questions.length; i++) {
    
    var clone = stampListTemplate.content.cloneNode(true);
    var tmp = i+1;
    clone.querySelector('.stamp-list-title').textContent = 'Q' + tmp + '.';
    clone.querySelector('.stamp-list-text').textContent = questions[i].question;
    $(clone).find('.stamp-reset-button').addClass('stamp-reset-button-'+i);
    document.getElementById('stamp-list').appendChild(clone)
};
var stampComponents = $('.stamp-component');
var stampStateBudge = $('.stamp-status-budge')
var stampAnswerBudge = $('.stamp-answer-budge')



// gift form
$(".gift-form-button").animatedModal({
    animatedIn:'fadeIn',
    animatedOut:'fadeOut',
    color:'white',
    animationDuration:'0s',
    beforeOpen: function () {
        $('.close-stamp-list-modal').click();
        calcRateInfo();
    }
});


function updateStampBudge() {
    for (i=0; i<stampComponents.length; i++) {
        

        var s = stampStateBudge[i];
        var res_s = "";
        var a = stampAnswerBudge[i];
        var res_a = questions[i].answer;

        if (questions[i].done) {
            res_s = "回答済み";
            s.className = "badge bg-primary stamp-status";
            res_a = '回答: ' + questions[i].answer;
        } else {
            res_s = "未回答";
            s.className = "badge bg-danger stamp-status";
            res_a = "回答: ";
        }
        s.innerHTML = res_s;
        a.innerHTML = res_a;

    }
}

$(".stamp-list-button").animatedModal({
    animatedIn:'fadeIn',
    animatedOut:'fadeOut',
    color:'white',
    animationDuration:'0s',
    beforeOpen: function() {
        // 他のモーダルを閉じる
        $('.close-gift-form-modal').click();

        var children = $(".thumb");
        var images = document.querySelectorAll('.card-img-top');


        updateStampBudge();
        
        
        var index = 0;

        function addClassNextChild() {
            if (index == children.length) return;
            children.eq(index++).show().velocity("transition.slideUpIn", { opacity:1, stagger: 450,  defaultDuration: 100 });
            window.setTimeout(addClassNextChild, 100);
        }

        if (images.length <= questions.length) {
            images.forEach((element, index) => {
                if (questions[index].done) {
                    element.style.opacity = 1;
                } else {
                    element.style.opacity = 0.3;
                }
            });
        }
        
        

        addClassNextChild();
        calcRateInfo();
    },
    afterClose: function() {
        $(".thumb").hide();
    }
});







// ニックネーム
$('#name-submit-button').on('click', function () {
    userName = $('#name-form').val();
    userInfo.name = userName;
    recordLocalStorage("userInfo", userInfo);
    console.log(userName);
    $('#nav-user-name').text(userName);

    $('#init-container').hide();
    // $('#title-logo').show();

    if (loaded) {
        setTimeout(() => {
            titleAnimation();
        }, 2000);
    } 

    initialized = true;
});


// 画像の読み込み完了イベント
// window.addEventListener('arjs-nft-loaded', function(){
//     if (initialized) {
//         // titleAnimation();
//     }
//     loaded = true;
//   });



$('#reset-storage-button').on('click', function () {
    var pw = prompt("パスワードを入力してください", "");
    if (pw == 'admin_reset'){
        localStorage.clear();
        console.log("reset");
        alert('リセットされました．ページをリロードしてください．');
    } else if (pw == 'admin_button'){
        switchImageTestButtonVisible();
    } else if (pw != "" && pw != null){
        alert('パスワードが一致しません');
	} 
});




if (!localStorage.getItem("userInfo")) {
    // 初回のみ実行    
    localStorage.clear();
    recordLocalStorage("userInfo", userInfo);
    recordLocalStorage("questions", questions);
    showTitle();
    titleAnimation();
    
} else {
    // 2回目以降実行
    userInfo = readLocalStorage("userInfo");
    userName = userInfo.name;
    questions = readLocalStorage("questions");

    completeCount = getCompleteCount();
    if (readLocalStorage("userInfo").complete) {
        finish();
    }
    if (readLocalStorage("userInfo").completeGiftForm) {
        $('#gift-form-submit-button').addClass('disabled');
    }
    
};



$('#nav-user-name').text(userName);

function getCompleteCount() {
    var count = 0;
    questions.forEach(question => {
        if (question.done) {
            if (question.type != "form") {
                count ++;
            } 
            
        }
    });
    return count;
}

function resetAnswer(num) {
    var q = questions[num];
    q.answer = "";
    q.done = false;
    q.result = false;
    recordLocalStorage("questions", questions);
    
}


$('.nav-title').on('click', function () {
    console.log("hey");
    $('.close-gift-form-modal').click();
    $('.close-stamp-list-modal').click();
});

$('#confirm-answer-button').on('click', function () {
    
    if (getCompleteCount() >= questions.length) {
        finish();
        userInfo.complete = true;
        recordLocalStorage("userInfo", userInfo);
        
    } else {
        alert('すべてのクイズに回答してください');
    }
});

$('.stamp-reset-button').on('click', function () {
    var classes = $(this).attr("class").split(' ');
    var num = classes[3].split('-')[3];
    
    resetAnswer(num);
    
    updateStampBudge();
        
    
});







