/*TODO
Deduct Points for invalid answers
    check if choice matches value of answer
    display "wrong" or "correct" footer depending on user's answer
End Quiz
    check if timer is at 0
    OR
    if all questions are answered
Save Score
    set local storage for user input (initials)
    set local storage for user score (time left)
    display high score screen
        append user initials and score to ordered list on high scores screen
Add button for high score screen at top left of page
*/

var startScreenEl= document.getElementById("start-screen")
var saveScoreEl= document.getElementById("save-score")
var questionEl = document.getElementById("question")
var highscoresEl = document.getElementById("highscores")
var timerEl= document.getElementById("timer")
var titleEl = document.getElementById("title")
var choicesEl = document.querySelectorAll(".choices")
var scoreEl = document.getElementById("score")
var leaderboardEl = document.getElementById("leaderboard")
var messageEl = document.getElementById("message")
var startBtn= document.getElementById("start-btn")
var saveBtnEl = document.getElementById("save-btn")
var backBtnEl = document.getElementById("back-btn")
var clearBtnEl = document.getElementById("clear-btn")
var userInitialsEl = document.getElementById("user-initials")

var userScores = []
var questionIndex = 0
//List questions as objects in questionsArray
var questionsArray=[
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<scripting>","<javascript>","<script>","<js>"],
        answer: "<script>"
    },
    {
        title: "How do you call a function named 'myFunction'?",
        choices: ["call myFunction()","myFunction()","call function myFunction","hey, myFunction()"],
        answer: "myFunction()"
    },
    {
        title: "How can you add a comment in JavaScript?",
        choices: ["'This is a comment","<!--Like this-->","//This way","*Use me*"],
        answer: "//This way"
    },
    {
        title: "What is the correct way to write a JavaScript array?",
        choices: ["var dogs = ['doberman', 'shiba inu', 'golden retriever']","var dogs = 1= ('doberman'), 2= ('shiba inu'), 3= ('golden retriever')","var dogs = (1:'doberman', 2:'shiba inu', 3:'golden retriever')","var dogs = 'doberman', 'shiba inu', 'golden retriever'"],
        answer: "C2"
    },
    {
        title: "Put question5 here",
        choices: ["C1","C2","C3","C4"],
        answer: "C3"
    }
]

//Use array length to have dynamic coding. Timer adjusts to more or less questions
var timeLeft = questionsArray.length * 15;

var setIntervalId=0;

function startQuiz(){
    //Hide main menu
    startScreenEl.classList.add("hide");
    //Display Question 1
    questionEl.removeAttribute("class");
    //Calls "countDown" function once every second
    setIntervalId=setInterval(countDown,1000)
    displayQuestions()
}

//Function to display question
function displayQuestions(){
    //Populates elements of HTML with questions and choices from the array
    titleEl.textContent=questionsArray[questionIndex].title;
    choicesEl[0].textContent=questionsArray[questionIndex].choices[0];
    choicesEl[1].textContent=questionsArray[questionIndex].choices[1];
    choicesEl[2].textContent=questionsArray[questionIndex].choices[2];
    choicesEl[3].textContent=questionsArray[questionIndex].choices[3];

    messageEl.textContent = "";
}

//Function to change screen to display next question and display high score screen
function nextQuestion(event) {
    var currentEl= event.target;
    if (currentEl.matches("button")) {
        if (currentEl.textContent === questionsArray[questionIndex].answer) {
            messageEl.textContent = "Correct!";
        }
        else{
            messageEl.textContent = "Wrong!";
            timeLeft= timeLeft-10;
        }
        questionIndex++;
    }
    if (currentEl.matches("button")){
        if (questionIndex<questionsArray.length) {
            setTimeout(displayQuestions, 500);
        }
        else{
            questionEl.classList.add("hide");
            saveScoreEl.removeAttribute("class");
            clearInterval(setIntervalId);
            scoreEl.textContent = timerEl.textContent;
        }

    }
}

//Function to decrease seconds left by one, once every second
function countDown() {
    timerEl.textContent=timeLeft--;
    if(timeLeft<0){
        clearInterval(setIntervalId);
    }
}

//Function to save user scores to local storage
function saveScore(){
    var initials = userInitialsEl.value;
    var userObject = {
        user: initials,
        score: timerEl.textContent
    }
    userScores.push(userObject);
    localStorage.setItem("highScore", JSON.stringify(userScores));
    saveScoreEl.classList.add("hide");
    highscoresEl.removeAttribute("class");
    
}

function backToMain() {
    
}

function clearScores() {
    localStorage.clear();
}
startBtn.addEventListener("click", startQuiz)
questionEl.addEventListener("click", nextQuestion)
saveBtnEl.addEventListener("click", saveScore)
backBtnEl.addEventListener("click", backToMain)
clearBtnEl.addEventListener("click", clearScores)