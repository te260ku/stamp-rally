const hide = function(){
    $('.modal').modal('hide');
};
const showModal = function () {
    $('.modal').modal('show');
};

$('#exampleModal').on('show.bs.modal', function (event) {
    var id = $(event.relatedTarget).attr('id').substr(-1, 1);

    detectImageAudio.play();
    
    if (!modalON) {
        buildQuiz(id);
        modalON = true;
    }
});

$('#exampleModal').on('hide.bs.modal', function () {
    modalON = false;
});

const questions = [
    {
      question: "パンはパンでも食べられないパンは？",
      answers: {
        a: "あんぱん",
        b: "クリームパン",
        c: "フライパン"
      },
      correctAnswer: "c",
      done: false, 
      result: false
    },
    {
      question: "カメとラクダとサイが買い物をしています。何を買うのでしょうか？",
      answers: {
        a: "キャベツ",
        b: "カメラ",
        c: "ペン"
      },
      correctAnswer: "b", 
      done: false, 
      result: false
    },
    {
      question: "Where is Waldo really?",
      answers: {
        a: "Antarctica",
        b: "Exploring the Pacific Ocean",
        c: "Sitting in a tree",
        d: "Minding his own business, so stop asking"
      },
      correctAnswer: "d", 
      done: false, 
      result: false
    }
  ];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
var unitResult = $('#unit-result');
var questionTitle = $('#question-title');
var completeRate = $('#complete-rate');
var correctRate = $('#correct-rate');
var finishInfo = $('#finish-info');
finishInfo.hide();

var detectImageAudio = new Audio('./assets/audio/sample.mp3');
var correctAnswerAudio = new Audio('./assets/audio/correct-answer.mp3');
var wrongAnswerAudio = new Audio('./assets/audio/wrong-answer.mp3');

var currentQuestion;
var questionNumber;
var completeNum = 0;
var modalON = false;



function buildQuiz(imageNum){

    unitResult.css("visibility", "hidden");

    // 問題と解答の選択肢を格納する配列
    const output = [];

    currentQuestion = questions[imageNum];
    questionNumber = imageNum;

    if (!currentQuestion.done) {
        // 選択肢を格納する配列
        const answers = [];

        for(letter in currentQuestion.answers){
            // ラジオボタンを作成する
            answers.push(
                `<label class="btn btn-outline-primary mx-2 option my-1 optionButton" style="text-align: center;
                width: 55%;">
                <input type="radio" name="question${questionNumber}" value="${letter}" autocomplete="off">
                <span>${currentQuestion.answers[letter]}</span>
                </label>`
            );
        };

        // 問題と回答を追加する
        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers btn-group-toggle" data-toggle="buttons"> ${answers.join('')} </div>`
        );
    
        // ページに反映する
        quizContainer.innerHTML = output.join('');
        var questionIndex = parseInt(imageNum)+1;
        questionTitle.text('問題: '+ questionIndex);

        submitButton.disabled = false;
    
    }
    // 回答済みの場合の処理
    else {
        unitResult.css("visibility", "visible");
        quizContainer.innerHTML = "回答済み";
    }
}

  


function setUnitResult(sentence) {
    unitResult.text(sentence);
}



function showResults(){

    unitResult.css("visibility", "visible");

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
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    console.log(userAnswer);

    // 正答時の処理
    if (userAnswer === currentQuestion.correctAnswer){
        correctAnswerAudio.play();
        setUnitResult("正解");
        currentQuestion.result = true;
    }
    
    // 誤答時の処理
    else {
        wrongAnswerAudio.play();
        setUnitResult("不正解");
        currentQuestion.result = false;
    }

    currentQuestion.done = true;
    completeNum ++;

    // 全ての問題に回答した後の処理
    if (completeNum >= questions.length) {
        finishInfo.show();    
    }

    submitButton.disabled = true;
}


submitButton.addEventListener('click', showResults);

$("#stamp-list-button").animatedModal({
    animatedIn:'bounceInUp',
    animatedOut:'bounceOutDown',
    color:'white',
    animationDuration:'.7s',
    beforeOpen: function() {

        var children = $(".thumb");
        var images = document.querySelectorAll('.card-img-top');
        
        var index = 0;

        function addClassNextChild() {
            if (index == children.length) return;
            children.eq(index++).show().velocity("transition.slideUpIn", { opacity:1, stagger: 450,  defaultDuration: 100 });
            window.setTimeout(addClassNextChild, 100);
        }

        images.forEach((element, index) => {
            if (questions[index].done) {
                element.style.opacity = 1;
            } else {
                element.style.opacity = 0.3;
            }
        });

        var correctCount = 0;
        var completeCount = 0;
        questions.forEach(question => {
            if (question.done) {
                completeCount ++;
                if (question.result) {
                    correctCount ++;
                }
            }
        });

        completeRate.text('達成率: ' + completeCount + '/' + questions.length);
        correctRate.text('正答率: ' + correctCount + '/' + completeCount);

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

  $('#title-modal-button').click();
  
  count(1).then(count(2)).then(count(3)).then(count(5)).then(count(6));


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