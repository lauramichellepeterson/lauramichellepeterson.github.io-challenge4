var mainTextEl = document.querySelector("#main-text");
var gradingTextEl = document.querySelector("#grading-text");
var scoreTextEl = document.querySelector("#score-text");
var startButton = document.querySelector("#start-button");
var trueButton = document.querySelector("#true-button");
var falseButton = document.querySelector("#false-button");
var score = 0;
var answer = "";
var i=0;

mainTextEl.textContent = "Start the quiz"

//Ask a series of questions
var questions = [
    { q: "Webpages can respond to user's actions", a: 't' },
    { q: "Every valid web page can be represented as a tree. This tree is referred to as the DOM", a: 't' },
    { q: 'Web pages made with HTML and CSS display static content.', a: 'f' },
    { q: "JavaScript uses HTML5 interface to access the DOM structure", a: 'f' },
    { q: "Variables do not allow you to save data. ", a: 'f' }
];

//Start game with score of 0
var startQuiz = function() {
    score = 0;
    answer = "";
    i=0;

    mainTextEl.textContent = "Start the quiz";
};

var updateQuestionText = function() {
    mainTextEl.textContent = (i+1) + ". " + questions[i].q;
    console.log(mainTextEl.textContent);
};


var quizLoop = function() {
    //Loop over every question
    // while (i<=questions.length) {
        //Display current question to user and ask ok/cancel
        // var answer = confirm(questions[i].q);

        updateQuestionText();

        //Compare answers
        if( (answer === true && questions[i].a === "t") ||
            (answer === false && questions[i].a === 'f')) {
            //increase score
            score++;
            //Alert the user
            gradingTextEl.textContent = "Correct!";
            i++;
        } else if (answer === "") {
            gradingTextEl.textContent = "Click True or False button";
        } else {
            gradingTextEl.textContent = "Wrong!";
            i++;
        }
        
        console.log(gradingTextEl.textContent);
        updateQuestionText();

        console.log("Score: " + score);
        console.log("Counter: " + i);
    // }
};

var questionButtonHandler = function(event) {
    //get target element from event
    var targetEl = event.target;

    //true button was clicked
    if (targetEl.matches("#true-button")) {
        answer = true;
        console.log("true button clicked");
        // var taskId = targetEl.getAttribute("data-task-id");
        // editTask(taskId);
    }
    //false button was clicked
    else if (targetEl.matches("#false-button")) {
        answer = false;
        console.log("false button clicked");
        // var taskId = targetEl.getAttribute("data-task-id");
        // deleteTask(taskId);
    }
    else if (targetEl.matches("#start-button")) {
        console.log("Start button clicked");
        answer = "";
    }

    if (i<questions.length-1) {
        quizLoop();
    }
};

// if 
//     startQuiz();

//Show total at end
// alert("You got " + score + "/" + (questions.length-1));
// scoreTextEl.textContent = ("You got " + score + "/" + (questions.length));
// console.log(scoreTextEl.textContent); 


startButton.addEventListener("click", questionButtonHandler);
trueButton.addEventListener("click", questionButtonHandler);
falseButton.addEventListener("click", questionButtonHandler);