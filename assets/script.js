/*TODO
Style Everything
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
var leaderboardBtnEl = document.getElementById("leaderboard-btn")
var startBtn= document.getElementById("start-btn")
var saveBtnEl = document.getElementById("save-btn")
var backBtnEl = document.getElementById("back-btn")
var clearBtnEl = document.getElementById("clear-btn")
var userInitialsEl = document.getElementById("user-initials")

//Set array to store user scores
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
        answer: "var dogs = ['doberman', 'shiba inu', 'golden retriever']"
    },
    {
        title: "Where is the correct place to insert JavaScript?",
        choices: ["The <body> section","The <head> section","The <title> section","It doesn't need to go in a section"],
        answer: "The <body> section"
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
    //next question happens after button click
    if (currentEl.matches("button")) {
        //Check if answer matches user click, display correct
        if (currentEl.textContent === questionsArray[questionIndex].answer) {
            messageEl.textContent = "Correct!";
        }
        //Check if user is wrong, display wrong and deduct 10s from timer
        else{
            messageEl.textContent = "Wrong!";
            timeLeft= timeLeft-10;
        }
        questionIndex++;
    }
    //Set delay to display validation for users (correct, wrong)
    if (currentEl.matches("button")){
        if (questionIndex<questionsArray.length) {
            setTimeout(displayQuestions, 500);
        }
        //if no more questions in array, show save score screen
        else{
            questionEl.classList.add("hide");
            saveScoreEl.removeAttribute("class");
            clearInterval(setIntervalId);
            //store time left as score
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
    if (initials === ""){
        alert("Please enter your initials");
    }
    else{
    var userObject = {
        user: initials,
        score: timerEl.textContent
    }
    //Append new object (user input) to userScores
    userScores.push(userObject);
    //Add highscore to local storage
    localStorage.setItem("highScore", JSON.stringify(userScores));
    ranking = document.createElement('li');
    ranking.innerHTML = initials +" - "+ timerEl.textContent;
    leaderboardEl.appendChild(ranking);
    //Reset Timer so quiz can be taken again 
     timeLeft = questionsArray.length * 15;
     timerEl.textContent = 0
    //Hide save screen
    saveScoreEl.classList.add("hide");
    //Display high scores
    highscoresEl.removeAttribute("class");}
    
}

//Function to go back to main screen
function backToMain() {
    //Hide high scores
    highscoresEl.classList.add("hide");
    //Display start screen
    startScreenEl.removeAttribute("class");
    //Reset Question index so quiz can be taken again
    questionIndex = 0;
}

//Clears local storage and high scores list
function clearScores() {
    localStorage.clear();
    leaderboardEl.removeChild();
}

//Displays Leaderboard
function viewLeaderboard() {
    if (highscoresEl.classList.contains("hide")){
        highscoresEl.removeAttribute("class")
    }
    if (!(startScreenEl.classList.contains("hide"))){
        startScreenEl.classList.add("hide");
    }
    if (!(questionEl.classList.contains("hide"))){
        questionEl.classList.add("hide");
    }
    if (!(saveScoreEl.classList.contains("hide"))){
        saveScoreEl.classList.add("hide");
    }
}
startBtn.addEventListener("click", startQuiz)
questionEl.addEventListener("click", nextQuestion)
saveBtnEl.addEventListener("click", saveScore)
backBtnEl.addEventListener("click", backToMain)
clearBtnEl.addEventListener("click", clearScores)
leaderboardBtnEl.addEventListener("click", viewLeaderboard)