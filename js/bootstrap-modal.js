const hide = function(){
    $('.modal').modal('hide');
};
const showModal = function () {
    $('.modal').modal('show');
};

$('#exampleModal').on('show.bs.modal', function (event) {
    // デバッグ用のボタンを押したときにそのidを取得する
    var id = $(event.relatedTarget).attr('id').substr(-1, 1);

    detectImageAudio.play();
    
    if (!modalON) {
        buildQuiz(id);
    }
});

$('#exampleModal').on('hide.bs.modal', function () {
});



var userName = "default";
var initialized = false;
var loaded = true;


function showTitle() {
    $('#title-modal-button').click();
    $('#title-logo').hide();
}



// ローカルストレージ
function recordLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    console.log('set: ' + JSON.parse(localStorage.getItem(key)));
    }
function readLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}




var userInfo = {
    init : false, 
    name : userName, 
};




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


// ナビゲーションバー
var navTemplate = document.getElementById('nav-template');
var clone = navTemplate.content.cloneNode(true);
$('.nav-area').append(clone);
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
        
        output.push(
            `<div class="question mb-4"> ${currentQuestion.question} </div>
            <div class="answers btn-group-toggle" data-toggle="buttons"> ${answers.join('')} </div>`
        );
    
        // ページに反映する
        var result = output.join('');
        quizContainer.innerHTML = result;
        
        
        var questionIndex = parseInt(imageNum)+1;
        questionTitle.text('問題: '+ questionIndex);

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
    giftFormInfo.text("すべてのスタンプを集めました！景品に応募するには以下のフォームを入力してください");

    var correctRate = correctCount / questions.length;
    var url;
    // todo: urlを切り替えるのではなくスコアをhiddenで送信するようにする
    if (correctRate < 0.4) {
        url = giftFormURL.low;
        console.log("low");
    } else if (correctRate < 0.7) {
        url = giftFormURL.middle;
        console.log("middle");
    } else {
        url = giftFormURL.high;
        console.log("high");
    }
    giftForm.append(
        `<iframe id="gift-form-high" src=${url} 
        width="100%" height="500px" frameborder="0" marginheight="0" marginwidth="0">読み込んでいます…</iframe>
    `)
    giftForm.show();
}



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

    // 正答時の処理
    if (answer === currentQuestion.correctAnswer){
        correctAnswerAudio.play();
        setUnitResult("正解");
        currentQuestion.result = true;
        correctCount ++;
    }
    
    // 誤答時の処理
    else {
        wrongAnswerAudio.play();
        setUnitResult("不正解");
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
        setUnitResult("回答を送信しました");
    }

    currentQuestion.done = true;
    completeNum ++;

    // 全ての問題に回答した後の処理
    if (completeNum >= questions.length) {
        finish();
    } 

    submitButton.disabled = true;

    recordLocalStorage("questions", questions);
}


submitButton.addEventListener('click', showResults);

function calcRateInfo() {
        var correctCount = 0;
        var completeCount = 0;
        var completeCountWitoutFrom = 0;
        var completeCountForm = 0;
        questions.forEach(question => {
            if (question.done) {
                if (question.type != "form") {
                    completeCount ++;
                    if (question.result) {
                        correctCount ++;
                    }
                } else {
                    completeCountForm ++;
                }
                
            }
        });

    var correctRate = Math.floor((correctCount / completeCount) * 100);
    if (isNaN(correctRate)) {
        correctRate = 0;
    }
    completeRate.text('達成率: ' + parseInt(completeCount+completeCountForm) + '/' + questions.length);
    correctRateInfo.text('現在の正答率: ' + correctCount + '/' + completeCount + ' = ' + correctRate + '%');
}

$(".stamp-list-button").animatedModal({
    animatedIn:'fadeIn',
    animatedOut:'fadeOut',
    color:'white',
    animationDuration:'.5s',
    beforeOpen: function() {
        $('.close-gift-form-modal').click();

        var children = $(".thumb");
        var images = document.querySelectorAll('.card-img-top');
        
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
        
        calcRateInfo();

        addClassNextChild();


    },
    afterClose: function() {
        $(".thumb").hide();
    }
});



// 0202


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
          case 1:
            setAnimation(titleLoading, 'zoomOut');
              
              break;
          case 2:
            
            setAnimation(titleLogo, 'zoomOutUp');
            
              break;
          case 3:
            startAudio.play();
            titleLogo.css('display', 'none');
            loadedMessage.show();
              setAnimation(loadedMessage, 'fadeIn');
              break;
          case 4:
              setAnimation(loadedMessage, 'fadeOut')
              
              break;
          case 5:
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
    count(5).then(count(6)).then(count(7)).then(count(9)).then(count(12));    
}


// titleAnimation();



//   $('#title-modal').addClass('zoomIn').one('animationend', function () {
//     $('#title-modal').removeClass('zoomIn');
//   });;



var imageTestButtons = $('.image-test-button');
var switchImageTestButtons = document.getElementById('switch-image-test-button');
var isImageTestButtonsOn = true;

switchImageTestButtons.addEventListener('click', function () {
    if (isImageTestButtonsOn) {
        imageTestButtons.css('visibility', 'hidden');
    } else {
        imageTestButtons.css('visibility', 'visible');
    }
    isImageTestButtonsOn = !isImageTestButtonsOn;
    
})


// template
var stampListTemplate = document.getElementById('stamp-list-template');
for (var i=0; i<questions.length; i++) {
    
    var clone = stampListTemplate.content.cloneNode(true);
    var tmp = i+1;
    clone.querySelector('.stamp-list-title').textContent = '問題: ' + tmp;
    clone.querySelector('.stamp-list-text').textContent = questions[i].question;
    document.getElementById('stamp-list').appendChild(clone)   
};



// gift form
$(".gift-form-button").animatedModal({
    animatedIn:'fadeIn',
    animatedOut:'fadeOut',
    color:'white',
    animationDuration:'.5s',
    beforeOpen: function () {
        $('.close-stamp-list-modal').click();
        calcRateInfo();
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
    $('#title-logo').show();

    if (loaded) {
        setTimeout(() => {
            titleAnimation();
        }, 2000);
    } 

    initialized = true;
});


// 画像の読み込み完了イベント
window.addEventListener('arjs-nft-loaded', function(){
    if (initialized) {
        titleAnimation();
    }
    loaded = true;
  });



$('#reset-storage-button').on('click', function () {
    localStorage.clear();
    console.log("reset");
});



if (!localStorage.getItem("userInfo")) {
    // 初回
    localStorage.clear();
    recordLocalStorage("userInfo", userInfo);
    recordLocalStorage("questions", questions);
    showTitle();
    
} else {
    userInfo = readLocalStorage("userInfo");
    userName = userInfo.name;
    questions = readLocalStorage("questions");
};

$('#nav-user-name').text(userName);

// window.onload = function() {
//     showTitle();
//   };