var mainTextEl = document.querySelector("#main-text");
var gradingTextEl = document.querySelector("#grading-text");
var initialsEl = document.querySelector("#submit-intials");
var jsButtons = document.querySelector("#js-buttons");

var startButtonId = "js-start-button";
var trueButtonId = "js-true-button";
var falseButtonId = "js-false-button";

var score = 0;
var answer = "";
var i=0;
var questions = [
    { q: "Webpages can respond to user's actions", a: 't' },
    { q: "Every valid web page can be represented as a tree. This tree is referred to as the DOM", a: 't' },
    { q: 'Web pages made with HTML and CSS display static content.', a: 'f' },
    { q: "JavaScript uses HTML5 interface to access the DOM structure", a: 'f' },
    { q: "Variables do not allow you to save data. ", a: 'f' }
];

// Reset variables for start of game
var startQuiz = function() {
    score = 0;
    answer = "";
    i=0;

    mainTextEl.textContent = "Start the quiz";
    createQuizButton("START",startButtonId);
};

var endQuiz = function() {
    mainTextEl.textContent = ("All Done!");
    deleteButton(trueButtonId);
    deleteButton(falseButtonId);
    gradingTextEl.textContent = ("");
    gradingTextEl.textContent = ("Your final score is: " + score + "/" + (questions.length));
    // scoreTextEl.textContent = ("Your final score is: " + score + "/" + (questions.length));
    //Create text, input, and submit button for entering initials
};

var updateQuestionText = function() {
    mainTextEl.textContent = (i+1) + ". " + questions[i].q;
};

var createQuizButton = function(text,id) {
    // create button
    var buttonEl = document.createElement("button");
    buttonEl.textContent = text;
    buttonEl.className = "btn-js-btn";
    buttonEl.id = id;

    // add button to DOM as a child of the jsButtons div
    jsButtons.appendChild(buttonEl);
};

var deleteButton = function(buttonId) {
    var buttonSelected = document.querySelector(".btn-js-btn[id='" + buttonId + "']");
    buttonSelected.remove();    
};

var quizLoop = function() {
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
        // remove time from timer here
        i++;
    }

    if (i<questions.length) {
        // Continue the quiz
        updateQuestionText();
    } else {
        // End the quiz
        endQuiz();
    }
};

var questionButtonHandler = function(event) {
    //get target element from event
    var targetEl = event.target;

    // if (targetEl.matches(".btn-js-btn[id='js-start-button']") && (i===0) ) {
    if (targetEl.matches(".btn-js-btn[id='" + startButtonId + "']") && (i===0) ) {    
            // deleteButton("js-start-button");
            deleteButton(startButtonId);
            // createTrueButton();
            // createFalseButton();
            createQuizButton("True",trueButtonId);
            createQuizButton("False",falseButtonId);
            updateQuestionText();
            answer = "";
    } 
    //true button was clicked
    // else if (targetEl.matches(".btn-js-btn[id='js-true-button']")) {
    else if (targetEl.matches(".btn-js-btn[id='" + trueButtonId + "']")) {
        answer = true;
    }
    //false button was clicked
    // else if (targetEl.matches(".btn-js-btn[id='js-false-button']")) {
    else if (targetEl.matches(".btn-js-btn[id='" + falseButtonId + "']")) {
        answer = false;
    }

    if (i<questions.length) {
        quizLoop();
    }
};


if (i===0) {
    startQuiz();
} 

jsButtons.addEventListener("click", questionButtonHandler);
