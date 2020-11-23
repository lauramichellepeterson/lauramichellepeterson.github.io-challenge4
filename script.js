var mainTextEl = document.querySelector("#main-text");
var timerEl = document.querySelector("#timer-text")
var jsButtons = document.querySelector("#js-buttons");
var gradingTextEl = document.querySelector("#grading-text");
var initialsDivEl = document.querySelector("#initials-div");
var scoreButtonsEl = document.querySelector("#high-score-buttons");
var scoreListEl = document.querySelector("#high-scores");
var instructionTextEl = document.querySelector("#instruction-text");

var startButtonId = "js-start-button";
var trueButtonId = "js-true-button";
var falseButtonId = "js-false-button";
var scores = [];

var secondsRemaining = 60;
var countSeconds = 0;
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

var updateQuestionText = function() {
    mainTextEl.textContent = (i+1) + ". " + questions[i].q;
};

var createInitialsTextEl = function() {
    var textEl = document.createElement("h3");
    textEl.textContent = "Enter your initials.";
    textEl.className = "initials-text";
    textEl.id = "initials-text";

    // add button to DOM as a child of initialsDivEl
    initialsDivEl.appendChild(textEl);
};

var createInitialsInputEl = function() {
    var tempEl = document.createElement("input");
    tempEl.className = "initials-input";
    tempEl.id= "initials-input";

    // add button to DOM as a child of initialsDivEl
    initialsDivEl.appendChild(tempEl);
};

var createSubmitButton = function() {
    var tempEl = document.createElement("button");
    tempEl.textContent = "Submit";
    tempEl.className = "btn-js-btn";
    tempEl.id = "initials-submit-button";

    // add button to DOM as a child of initialsDivEl
    initialsDivEl.appendChild(tempEl);
};

var getInitials = function () {
    var userInitials = document.querySelector("input[id='initials-input']").value;
    return userInitials;
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

var createScoresListItems = function(listElement) {
    // create the list items
    for (item=0; item<scores.length; item++) {
        var listItemEl = document.createElement("li");
        listItemEl.textContent = scores[item].initials + " : " + scores[item].quizScore;
        listItemEl.class = "list-item";
        listItemEl.id = "list-item-"+(item+1);
        listElement.appendChild(listItemEl);
    }
};

var createScoresList = function() {
    // create the list
    var listEl = document.createElement("ol");
    listEl.className = "score-list";
    listEl.id = "score-list";
    scoreListEl.appendChild(listEl);

    createScoresListItems(listEl);
};

var createScoresButton = function(text,id) {
    //create button
    var buttonEl = document.createElement("button");
    buttonEl.textContent = text;
    buttonEl.className = "btn-js-btn";
    buttonEl.id = id;

    // add button to DOM as a child of the scoreButtonsEl
    scoreButtonsEl.appendChild(buttonEl);
};

var deleteButton = function(buttonId) {
    var buttonSelected = document.querySelector(".btn-js-btn[id='" + buttonId + "']");
    buttonSelected.remove();    
};

var deleteElement = function(selector) {
    var elementSelected = document.querySelector(selector);
    elementSelected.remove();    
};

var clearInitialsDiv = function() {
    deleteElement(".initials-text");
    deleteElement(".initials-input");
    deleteElement(".btn-js-btn[id='initials-submit-button']");
};

var clearScoresDiv = function() {
    deleteElement(".score-list");
    deleteElement(".btn-js-btn[id='back-button']");
    deleteElement(".btn-js-btn[id='delete-button']");
};

var clearStartDiv = function() {
    instructionTextEl.textContent = "";
    deleteButton(startButtonId);
    updateQuestionText();
};

var startQuiz = function() {
    // Reset variables for start of game
    score = 0;
    answer = "";
    i=0;
    secondsRemaining = 60;
    countSeconds = 0;
    updateTimer();
    mainTextEl.textContent = "Coding Quiz Challenge";
    instructionTextEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
    createQuizButton("START",startButtonId);
};

var endQuiz = function() {
    deleteButton(trueButtonId);
    deleteButton(falseButtonId);
    
    stopTimer(secondsRemaining);
    mainTextEl.textContent = ("All Done!");
    score=score*10
    gradingTextEl.textContent = ("Your final score is: " + score);

    //Create text, input, and submit button for entering initials
    createInitialsTextEl();
    createInitialsInputEl();
    createSubmitButton();
};

var showHighScores = function() { 
    mainTextEl.textContent = "High Scores";
    gradingTextEl.textContent = "";

    createScoresList();
    createScoresButton("Go Back", "back-button");
    createScoresButton("Delete Scores", "delete-button");
};

var updateTimer = function() {
    timerEl.textContent = "Time Left: "+secondsRemaining;
};

var startTimer = function() {
    countSeconds = setInterval(function(){ 
        // alert("Hello");
        secondsRemaining=secondsRemaining-1;
        updateTimer();
        if (secondsRemaining <= 0){
            stopTimer();
            endQuiz();
        } 
    }, 1000);
};

var stopTimer = function(freezeSeconds=0) {
    secondsRemaining = freezeSeconds;
    clearInterval(countSeconds);
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
        gradingTextEl.textContent = "Wrong! (-10 seconds)";
        secondsRemaining=secondsRemaining-10;
        updateTimer();
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

var scoresButtonHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.matches(".btn-js-btn[id='delete-button']") ) {
        scores = [];
        // delete list and buttons
        clearScoresDiv();
        // create list and buttons
        showHighScores();
    } else if (targetEl.matches(".btn-js-btn[id='back-button']") ) {
        // delete list and buttons
        clearScoresDiv();
        // restart quiz
        startQuiz();
    }
};

var initialsButtonHandler = function (event) {
    var targetEl = event.target;

    if (targetEl.matches(".btn-js-btn[id='initials-submit-button']") ) {
        var inputValue = getInitials();

        if (inputValue === "") {
            alert ("Input cannot be blank.");
        } else {
            // save initials and score in array
            scores.push( {initials: inputValue, quizScore: score} );

            // clear input
            document.querySelector("input[id='initials-input']").value = "";

            // display high scores
            clearInitialsDiv();
            showHighScores();
        }
    } 
}

var questionButtonHandler = function(event) {
    //get target element from event
    var targetEl = event.target;

    //start button was clicked
    if (targetEl.matches(".btn-js-btn[id='" + startButtonId + "']") && (i===0) ) {     
        clearStartDiv(); 

        createQuizButton("True",trueButtonId);
        createQuizButton("False",falseButtonId);
        answer = "";
        startTimer();
    } 
    //true button was clicked
    else if (targetEl.matches(".btn-js-btn[id='" + trueButtonId + "']")) {
        answer = true;
    }
    //false button was clicked
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
initialsDivEl.addEventListener("click", initialsButtonHandler);
scoreButtonsEl.addEventListener("click", scoresButtonHandler);