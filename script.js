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
// createStartButton();

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
    // console.log(mainTextEl.textContent);
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
        i++;
    }
    
    // console.log("Score: " + score);
    // console.log("Counter: " + i);

    if (i>=questions.length) {
        //End the game
        scoreTextEl.textContent = ("You got " + score + "/" + (questions.length));
        // console.log("End of Quiz");
    } else {
        updateQuestionText();
    }
};

// var createStartButton = function() {
//     // create list item
//     var listItemEl = document.createElement("li");
//     listItemEl.className = "start-button";

//     // add task id as a custom attribute
//     listItemEl.setAttribute("start-button-id", taskIdCounter);

//     buttonList.appendChild(listItemEl);
// };

var questionButtonHandler = function(event) {
    //get target element from event
    var targetEl = event.target;

    //true button was clicked
    if (targetEl.matches("#true-button")) {
        answer = true;
    }
    //false button was clicked
    else if (targetEl.matches("#false-button")) {
        answer = false;
    }
    // start button was clicked
    else if (targetEl.matches("#start-button")) {
        if (i===0) {
            // delete start button then updateQuestionText
            
            updateQuestionText();
        } else if (i>0 && i<questions.length) {
            
        } else if (i>=questions.length) {
            
        }
        answer = "";
    }

    if (i<questions.length) {
        quizLoop();
    }
};



//Show total at end
// alert("You got " + score + "/" + (questions.length-1));
// scoreTextEl.textContent = ("You got " + score + "/" + (questions.length));
// console.log(scoreTextEl.textContent); 


startButton.addEventListener("click", questionButtonHandler);
trueButton.addEventListener("click", questionButtonHandler);
falseButton.addEventListener("click", questionButtonHandler);