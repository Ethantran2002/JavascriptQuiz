var timer = 60
var penalty = 5
var interval
var currentQuestion


var homeMenu = document.getElementById("main-menu")
var btnHighScore = document.getElementById("view-high-scores")
var resultsMenu = document.getElementById("results-menu")
//var msgSection = document.getElementById("msg-section")
var highScoresMenu = document.getElementById("high-scores-menu")
var intervalTimer = document.getElementById("timer")
var questionsCard = document.getElementById("questions-card")
var navBar = document.getElementById("nav-bar")
var lstHighScores = document.getElementById("high-scores-list")
var btnInit = document.getElementById("initialize")
var btnClearLocal = document.getElementById("clear-local")

//Array of Questions

var jsQuestions = [
    {
        question: "How many equal signs does a strict equal operator have?",
        choices: [
            "1",
            "2",
            "3",
            "4"
        ],
        correctAnswer: 2
    },

    {
        question: "What is difference between a variable and an array?",
        choices: [
            "A variable can store one value whereas an array can store multiple values",
            "They are the same, arrays just use brackets []",
            "A variable can store multple values whereas an array can store one value",
            "None of the above"
        ],
        correctAnswer: 0
    },

    {
        question: "How do you link a JavaScript file with an HTML file?",
        choices: [
            "If they share the same parent folder, they're automatically linked",
            "Using a <code>script</code> tag inside the <code>body</code> element",
            "Using a <code>script</code>  tag inside the <code>head</code> element",
            "By using a href and linking the javascript website"
        ],
        correctAnswer: 1 
    },

    {
        question: "How do you create a function in Javascript?",
        choices: [
            "function.create Function()",
            "function myFunction()",
            "function = myFunction()",
            "function:myFunction()"
        ],
        correctAnswer: 1
    },

    {
        question: "How do you declare a variable?",
        choices: [
            "Use the <code>var</code> keyword followed by the variable name",
            "Specify the variable name and assign it a value",
            "You must use the <code>var</code> keyword followed by the variable name and assign it a value",
            "All of the above"
        ],
       correctAnswer: 3 
    },

    {
        question: "The value of the <code>this</code> keyword varies depending on its: ",
        choices: [
            "Declaration",
            "Scope",
            "Location in the .js file",
            "Assignment"
        ],
        correctAnswer: 1
    },

    {
        question: "Where is the correct place to insert a Javascript?",
        choices: [
            "The <body> section",
            "The <head> section",
            "Either the <body> or <head> sections",
            "None of the above"
        ],
        correctAnswer: 0
    },

    {
        question: "What is the first index in Javascript?",
        choices: [
            "0",
            "1",
            "2",
            "3"
        ],
        correctAnswer: 1
    },

]



//Loads Scoreboard Function

function loadHS() {
    removeAllChildren(lstHighScores);

    var highScores = JSON.parse(localStorage.getItem("Quiz-High-Scores")) || []

    // Create li elements for each entry in array - assumes array is presorted
    if (highScores !== null) {
        for (var i = 0; i < highScores.length; i++) {
            var playerScores = document.createElement("li")

            playerScores.textContent = highScores[i].username + " - " + highScores[i].score
            
            lstHighScores.appendChild(liEl)
        }
    }
}

function populateQuestion() {

    if (currentQuestion === 0) {
        message.textContent = ""
    } else if (currentQuestion >= questions.length) {
        clearInterval(interval)
            
        setPageVisibility("results")

        intervalTimer.textContent = timer
        finalScore.textContent = timer

        return;
    }

    questionHeader.innerHTML = questions[currentQuestion].question

    removeAllChildren(lstChoices);
    
    questions[currentQuestion].choices.forEach(function(choice, index) {
        var tmpChoice = document.createElement("li")

        tmpChoice.innerHTML = choice
        tmpChoice.setAttribute("data-choice-idx", index)

        lstChoices.appendChild(tmpChoice)
    })
}

btnHighScore.addEventListener("click", function() {
    setPageVisibility("high-scores");
    loadHS();
})

//Clears Local Storage 

btnClearLocal.addEventListener("click", function() {
    localStorage.clear()
    removeAllChildren(lstHighScores)
})

btnInit.addEventListener("click", function() {
    initialize()
})

function initialize() {
    setPageVisibility("home")

    timer = 0
    intervalTimer.textContent = timer
    clearInterval(interval)
}



initialize()

function setPageVisibility(pageToShow) {
    if (pageToShow === "home") {
        navBar.style.display = "";
        homePage.style.display = "";

        questionsCard.style.display = "none";
        resultsMenu.style.display = "none";
        highScoresMenu.style.display = "none";

    } else if (pageToShow === "questions") {
        navBar.style.display = "";
        questionsCard.style.display = "";
        msgSection.style.display = ""

        homeMenu.style.display = "none";
        resultsMenu.style.display = "none";
        highScoresMenu.style.display = "none";

    } else if (pageToShow === "results") {
        navBar.style.display = "";
        resultsMenu.style.display = "";
      

        homeMenu.style.display = "none";
        questionsCard.style.display = "none";
        highScoresMenu.style.display = "none";

    } else if (pageToShow === "high-scores") {
        highScoresPage.style.display = "";
        
        navBar.style.display = "none";
        homeMenu.style.display = "none";
        questionsCard.style.display = "none";
        resultsMenu.style.display = "none";
        
    }
}

function removeAllChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    };
}