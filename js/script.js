var detectionCount = 0;
var questionList = [
  "trex", 
  "road"
];


const questions = [
    {
      question: "Who is the strongest?",
      answers: {
        a: "Superman",
        b: "The Terminator",
        c: "Waluigi, obviously"
      },
      correctAnswer: "c"
    },
    {
      question: "What is the best site ever created?",
      answers: {
        a: "SitePoint",
        b: "Simple Steps Code",
        c: "Trick question; they're both the best"
      },
      correctAnswer: "c"
    },
    {
      question: "Where is Waldo really?",
      answers: {
        a: "Antarctica",
        b: "Exploring the Pacific Ocean",
        c: "Sitting in a tree",
        d: "Minding his own business, so stop asking"
      },
      correctAnswer: "d"
    }
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');


function buildQuiz(){

    const output = [];
    
  
    questions.forEach(
      (currentQuestion, questionNumber) => {
  
        const answers = [];
  
        for(letter in currentQuestion.answers){
  
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
  
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );
  
    quizContainer.innerHTML = output.join('');
  }


function showResults(){}

submitButton.addEventListener('click', showResults);

const showModal = function (imageNum) {
    $('.modal').modal('show');
    // var question = $('#question');
    // question.text(questionList[imageNum]);
    buildQuiz();
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
