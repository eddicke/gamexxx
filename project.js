var quiz = [{
  "question": "CFCs is a compound in its____ state which affects the regional area",
  "choices": ["solid", "volatile liquid", "gaseous"],
  "correct": "gaseous"
}, {
  "question": "CFCs destroys mainly____in the atmosphere",
  "choices": ["oxygen(iii)", "hydroxide", "trioxygen"],
  "correct": "trioxygen"
}, {
  "question": "CFCs are able to reach the stratosphere because",
  "choices": ["they are very toxic", "are numerous in mass", "the constant movement of the earth mixes the compounds together"],
  "correct": "the constant movement of the earth mixes the compounds together"
}, {
  "question": "CFCs are damaging to the __ ozone layer.",
  "choices": ["climatic", "plutonic", "stratospheric"],
  "correct": "stratospheric"
}, {
  "question": "when was CFCs aerosol banned in Canada?",
  "choices": ["1920", "2001", "2017", "1978"],
  "correct": "1978"
}];


// define elements
var content = $("content"),
  questionContainer = $("question"),
  choicesContainer = $("choices"),
  scoreContainer = $("score"),
   submitBtn = $("submit"),
correctAns = $("p");
// init vars
var currentQuestion = 0,
  score = 0,
  askingQuestion = true;
function $(id) { // shortcut for document.getElementById
  return document.getElementById(id);
}
function askQuestion() {
  var choices = quiz[currentQuestion].choices,
    choicesHtml = "";
  // loop through choices, and create radio buttons
  for (var i = 0; i < choices.length; i++) {
    choicesHtml += "<input type='radio' name='quiz" + currentQuestion +
      "' id='choice" + (i + 1) +
      "' value='" + choices[i] + "'>" +
      " <label for='choice" + (i + 1) + "'>" + choices[i] + "</label><br>";
  }
  // load the question
  questionContainer.textContent = "Q" + (currentQuestion + 1) + ". " +
    quiz[currentQuestion].question;
  // load the choices
  choicesContainer.innerHTML = choicesHtml;
  // setup for the first time
  if (currentQuestion === 0) {
    scoreContainer.textContent = "Score:- " + score;
    submitBtn.textContent = "Submit Answer";
  }
}
function checkAnswer() {
  // are we asking a question, or proceeding to next question?
  if (askingQuestion) {
    submitBtn.textContent = "Next Question";
    askingQuestion = false;
    // determine which radio button they clicked
    var userpick,
      correctIndex,
      radios = document.getElementsByName("quiz" + currentQuestion);
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) { // if this radio button is checked
        userpick = radios[i].value;
      }
      // get index of correct answer
      if (radios[i].value == quiz[currentQuestion].correct) {
        correctIndex = i;
      }
    }
    // setup if they got it right, or wrong
    var labelStyle = document.getElementsByTagName("label")[correctIndex].style;
    labelStyle.fontWeight = "bold";
    if (userpick == quiz[currentQuestion].correct) {
      score += 0;
      if(score++){
      
       correctAns.textContent = "Doing good!! :)"
      
      }
      labelStyle.color = "blue";
    } else {
      labelStyle.color = "red";
     
correctAns.textContent = "wrong! the correct ans: "+quiz[currentQuestion].correct
    }

    scoreContainer.textContent = "Score:- " + score;
  } else { // move to next question
    // setting up so user can ask a question
    askingQuestion = true;
    // change button text back to "Submit Answer"
    submitBtn.textContent = "Submit Answer";
    // if we're not on last question, increase question number
    if (currentQuestion < quiz.length - 1) {
      currentQuestion++;
      askQuestion();
    } else {
      showFinalResults();
    }
  }
}

function showFinalResults() {
  content.innerHTML = "<h2>You've complited the quiz!</h2>" +
    "<h2>Below are your results:</h2>" +
    "<h2>" + score + " out of " + quiz.length + " questions, " +
    Math.round(score / quiz.length * 100) + "%<h2>";
content.style.color = "red"
content.style.WebkitAnimation = "mynewmove 4s 2"
content.style.animation = "mymove 4s 2"

}

window.addEventListener("load", askQuestion, false);
submitBtn.addEventListener("click", checkAnswer, false);
