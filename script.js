// HTML DOM variables//
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var highscoreArea = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreName = document.getElementById("initials");
var DisplayName = document.getElementById("highscore-initials");
var endSectionButtons = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreNum = document.getElementById("highscore-score");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");



// Questions//
var quizQuestions = [{
    question: ' what is full-stack made of________',
    choiceA: 'frontend and backend',
    choiceB: 'jQuery',
    choiceC: 'html and javascript',
    choiceD: 'css',
    correctAnswer: "a"},
  {
    question: "What does DOM stand for__________?",
    choiceA: "Document Object Model",
    choiceB: "Display Object Management",
    choiceC: "Digital Ordinance Model",
    choiceD: "Desktop Oriented Mode",
    correctAnswer: "a"},
   {
    question: "What is used primarily to add styling to a web page______?",
    choiceA: "HTML",
    choiceB: "CSS",
    choiceC: "Python",
    choiceD: "React.js",
    correctAnswer: "b"},
    {
    question: "What is jQuery related to_______?",
    choiceA: "CSS",
    choiceB: "BOOTSTRAP",
    choiceC: "JAVASCRIPT",
    choiceD: "HTML",
    correctAnswer: "c"},  
    {
    question: "What symbol is used to identify a class in CSS_______?",
    choiceA: "*",
    choiceB: "$",
    choiceC: "^",
    choiceD: ".",
    correctAnswer: "d"},
    {
    question: "What symbol is used to identify a id in CSS_______?",
    choiceA: ".",
    choiceB: "#",
    choiceC: "!",
    choiceD: "&",
    correctAnswer: "b"},
        
    
    ];
    
var finalQuestion = quizQuestions.length;
var timer;
var score = 0;
var correct;
var QuestionIndex = 0;
var timeLeft = 30;



startButton.addEventListener("click",startQuiz);

// starts the Timer and quiz//
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    QuizQuestion();

    //Timer
    timer = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Seconds Remaining: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timer);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}

submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreName.value === "") {
        alert("Please input Your initials");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var user = highscoreName.value.trim();
        var currentHighscore = {
            name : user,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreArea.style.display = "flex";
        highscoreDiv.style.display = "block";
        endSectionButtons.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        showcasePlayerscores();

    }
    
});

//displays your score after either completeing the quiz or expiration of time//
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timer);
    highscoreName.value = "";
    finalScoreEl.innerHTML = "You scored " + score + " out of " + quizQuestions.length ;
};

// clears the list and generates a new high score //
function showcasePlayerscores(){
    DisplayName.innerHTML = "";
    highscoreNum.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newName = document.createElement("li");
        var newScore = document.createElement("li");
        newName.textContent = highscores[i].name;
        newScore.textContent = highscores[i].score;
        DisplayName.appendChild(newName);
        highscoreNum.appendChild(newScore);
    };
};

//displays the high scores page while hiding others// 
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreArea.style.display = "flex";
    highscoreDiv.style.display = "block";
    endSectionButtons.style.display = "flex";

    showcasePlayerscores();
};

//clears local Storage//
function clearScore(){
    window.localStorage.clear();
    DisplayName.textContent = "";
    highscoreNum.textContent = "";
};

//checks the response to each answer //
function checkAnswer(answer){
    correct = quizQuestions[QuestionIndex].correctAnswer;

    if (answer === correct && QuestionIndex !== finalQuestion){
        score++;
        
        QuestionIndex++;
        QuizQuestion();
        
    }else if (answer !== correct && QuestionIndex !== finalQuestion){

        timeLeft-=5;
        QuestionIndex++;
        QuizQuestion();
        
    }else{
        showScore();
    }
};

// iterates through the object array to generate the questions and answers.//
function QuizQuestion(){
    gameoverDiv.style.display = "none";
    if (QuestionIndex === finalQuestion){
        return showScore();
    } 
    var Question = quizQuestions[QuestionIndex];
    questionsEl.innerHTML = "<h1>" + Question.question + "</h1>";
    buttonA.innerHTML = Question.choiceA;
    buttonB.innerHTML = Question.choiceB;
    buttonC.innerHTML = Question.choiceC;
    buttonD.innerHTML = Question.choiceD;
};

// restarts quiz//
function replayQuiz(){
    highscoreArea.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 30;
    score = 0;
    QuestionIndex = 0;
};

