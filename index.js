//This is the JS code to run the National Parks Quiz app. 
//Written by Leo Janas

//This creates an array of all the questions and answers. New questions can be added here to extend the quiz.
const quiz = [
    {
    "question": "How many National Parks are there in the United States?",
    "a": "25",
    "b": "62",
    "c": "87",
    "d": "120",
    "correct": "62"
    },{
    "question": "What was the first National Park to be created?",
    "a": "Everglades NP",
    "b": "Yosemite NP",
    "c": "Yellowstone NP",
    "d": "Grand Canyon NP",
    "correct": "Yellowstone NP"
    },{
        "question": "What state has the most National Parks with a total of 9?",
        "a": "California",
        "b": "Alaska",
        "c": "Utah",
        "d": "Colorado",
        "correct": "California"
    },{
        "question": "What is the largest National Park by area?",
        "a": "Yellowstone NP",
        "b": "Denali NP",
        "c": "Wrangell-St. Elias NP",
        "d": "Death Valley NP",
        "correct": "Wrangell-St. Elias NP"
    },{
        "question": "The highest and lowest elevation points in the US are both located in National Parks.  Which two parks hold these points?",
        "a": "Denali NP and Death Valley NP",
        "b": "Gates of the Arctic NP and Dry Tortugas NP",
        "c": "Yosemite NP and Glacier Bay NP",
        "d": "Grand Teton NP and Badlands NP",
        "correct": "Denali NP and Death Valley NP"
    },{
        "question": "What was the most visited National Park in 2019?",
        "a": "Zion NP",
        "b": "Grand Canyon NP",
        "c": "Great Smoky Mountains NP",
        "d": "Rocky Mountain NP",
        "correct": "Great Smoky Mountains NP"
    },{
        "question": "Which park was most recently given National Park status, in December of 2019?",
        "a": "White Sands NP",
        "b": "Indiana Dunes NP",
        "c": "Black Canyon of the Gunnison NP",
        "d": "Congaree NP",
        "correct": "White Sands NP"
    }
]
//This creates an array of all the images to be displayed on the feedback screens.
//If new questions are added above, corresponding images should be added here as well.
images = [  {'src':'zion.jpg', 'alt':'Zion National Park'},
            {'src':'yellowstone.jpg', 'alt':'Yellowstone National Park'}, 
            {'src':'death-valley.jpg', 'alt':'Death Valley National Park'}, 
            {'src':'wrangell-st-elias.jpg', 'alt':'Wrangell-St. Elias National Park'}, 
            {'src':'denali.jpg', 'alt':'Denali National Park'}, 
            {'src':'great-smoky-mountains.jpg', 'alt':'Great Smoky Mountains National Park'},
            {'src':'white-sands.jpg', 'alt':'White Sands National Park'} ]
//This section creates all the other variables that are used throughout the following functions.
const quizSubmission = [];//empty array that will be filled with the submitted answers
let score = 0;//score variable that holds the current score throughout the quiz
let questionNumber = 0;//tracks the current question number
let index=0;//tracks the array index associated with the current question number
let correct = false;//holds the correct/incorrect value of the latest submission
let questionHTML = ``;//empty string literal that will be used to hold the question HTML to be displayed
let feedbackHTML = ``;//empty string literal that will be used to hold the feedback HTML to be displayed
let screenTypeQuestion = true;//true if the screen to be displayed is a question, false if it is feedback
let message = 'Error, something went wrong';//used to choose between a correct and incorrect feedback message
let button = '';//used to hold the appropriate button text on the feedback screens
let submissionChecked = false;//used to check form validity and ensure a choice has been selected
let count =0;//used in the form validity check

//Below are all the functions used

//One path is handleQuizApp>handleNext>createQuestion>renderScreen

//The other path is handleQuizApp>handleSubmission>checkValidity>recordSubmission>checkSubmission>updateScore
//>createFeedback>renderScreen


function updateScore(){
    //update score variable if the last submission is correct, call createFeedback
    //this function is called by checkSubmission below
    if (correct){
        score += 1;}
        createFeedback();
    }

function checkSubmission(){
    //check if last submitted answer is correct, call updateScore
    //this function is called by recordSubmission below
    correct = Boolean(quiz[index].correct === quizSubmission[index]);
    updateScore();
    console.log('checkSubmission ran');
}

function recordSubmission(){
    //use submission to add to the quizSubmission array, call checkSubmission
    //this function is called by checkValidity below
    quizSubmission.push($('input[name=answer]:checked').val());
    screenTypeQuestion = false;
    checkSubmission();
}

function createFeedback(){
    //create feedback screen based on previous submission, call renderScreen
    //this function is called by updateScore above
    
    //determine message based on if submission was correct
    if (correct){
         message = "That is correct!"
         $('h3').addClass("correct");
         $('h3').removeClass("incorrect");
    }else{
         message = "That is incorrect."
         $('h3').addClass("incorrect");
         $('h3').removeClass("correct");
    }
    //determine button text (only different after the last question has been asked)
    if (questionNumber<quiz.length){
        button = 'Next Question';
    }else{
        button = 'Finish Quiz';
    }
    let answer = quiz[index].correct;
    //fill feedbackHTML with the appropriate HTML
    feedbackHTML = 
    `<div class="item">
    <h3>${message}</h3>
    <p>The answer is ${answer}.</p>
    <form><div class="center"><button id="next">${button}</button></div>
    </form>
    </div>
    <div class="item">
    <img class="cover" src=${images[index].src} alt="${images[index].alt}">
    <p class="center">${images[index].alt}</p>
    </div>`
    renderScreen();
}

function createQuestion(questionNumber){
    //create next question screen, call renderScreen
    //this function is called by handleNext below

    screenTypeQuestion = true;
    index = questionNumber - 1;
    //determine if display should be another question or the quiz complete screen
    if (questionNumber <= quiz.length){
    //pull the appropriate question info from the quiz array
    const question = quiz[index].question;
    const a = quiz[index].a;
    const b = quiz[index].b;
    const c = quiz[index].c;
    const d = quiz[index].d;
    
    questionHTML = 
    `<div class="item">
    <h3>Question ${questionNumber} </h3>
    <p class="question">${question}</p>
    </div>
    <form class="item js-form">
        <input type="radio" id="a" name="answer" value= "${a}" required>
        <label for="a"> ${a} </label><br>
        <input type="radio" id="b"  name="answer" value="${b}">
        <label for="b"> ${b} </label><br>
        <input type="radio" id="c"  name="answer" value="${c}">
        <label for="c"> ${c} </label><br>
        <input type="radio" id="d"  name="answer" value="${d}">
        <label for="d"> ${d} </label><br>
        <button type="submit" id="submit">Submit</button>
    </form>`
    }else{
        questionHTML = `<p>Quiz Complete</p>
        <br>
        <p>Your score is ${score}/${quiz.length}</p>
        <br>
        <form>
        <button>Restart Quiz</button>
        </form>`  
    }
    renderScreen();
}

function renderScreen(){
    //render the screen
    //this function is called by either createQuestion or createFeedback
    if (screenTypeQuestion) {
        $('.js-section').html(questionHTML);
        //if a new question is displayed, update question number
        if(index < quiz.length){
        $('#questionNumber').html(`Question ${questionNumber}/${quiz.length}`);
        }
    }
    else {
        $('.js-section').html(feedbackHTML);
        //update current score with the new feedback
        $('#currentScore').html(`Current Score: ${score}/${questionNumber}`);
    }
}

function checkValidity(){
    //check validity of submission, call recordSubmission
    //this function is called by handleSubmission
    submissionChecked = false;
    if($('input[type=radio]').is(':checked')){
        submissionChecked = true;
        recordSubmission();
        count =0;
    }else if(count===0){
        count += 1; 
        $('.js-section').append('<div class="center"><p>Please select one option.</p></div>');
    }
}

function handleSubmission(){
    //track answer submissions from the user, call checkValidity
    //this function is started by handleQuizApp on page ready
    $('.js-section').on('click', '#submit', event =>{
        event.preventDefault();
        checkValidity();
    })
}

function handleNext(){
    //track next question submissions from the user, call createQuestion
    //this function is started by handleQuizApp on page ready
    $('.js-section').on('click', '#next, #begin', event => {
        event.preventDefault();
        questionNumber += 1;
        createQuestion(questionNumber);
    })
}

function handleQuizApp(){
    //call handleNext and handleSubmission on page ready
    handleNext();
    handleSubmission();
}

$(handleQuizApp);