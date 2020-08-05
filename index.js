//This is the JS code to run a quiz app

//create an array of all the questions and answers
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
//create an array to hold the submitted answers and a variable to track the score
const quizSubmission = []
let score = 0;
let questionNumber = 0;
let index=0;
let correct = false;
let questionHTML = ``;
let feedbackHTML = ``;
let screenTypeQuestion = true;
let message = 'Error, something went wrong';
let button = '';

//update score variable
function updateScore(){
    if (correct){
        score += 1;}
        createFeedback();
        console.log('updateScore ran');
    }

//check if answer is correct
function checkSubmission(){
    correct = Boolean(quiz[index].correct === quizSubmission[index]);
    updateScore();
    console.log('checkSubmission ran');
}

//use submission to add to the quizSubmission array
function recordSubmission(){
    console.log('recordSubmission ran');
    quizSubmission.push($('input[name=answer]:checked').val());
    screenTypeQuestion = false;
    checkSubmission();
    //retrieve the submission
    //push it to the submission array
}

//create feedback screen from previous submission
function createFeedback(){
    console.log('createFeedback started')
    if (correct){
         message = "That is correct!"
         $('h3').addClass("correct");
         $('h3').removeClass("incorrect");
    }else{
         message = "That is incorrect."
         $('h3').addClass("incorrect");
         $('h3').removeClass("correct");
    }
    if (questionNumber<quiz.length){
        button = 'Next Question';
    }else{
        button = 'Finish Quiz';
    }
    let answer = quiz[index].correct;
    feedbackHTML = 
    `<h3>${message}</h3>
    <br>
    <p>The answer is ${answer}.</p>
    <form><button id="next">${button}</button>
    </form>`
    renderScreen();
//check if current answer is correct    
//if incorrect, retrieve the correct answer
//get proper html for the appropriate display
}

//create next question screen
function createQuestion(questionNumber){
    screenTypeQuestion = true;
    index = questionNumber - 1;
    if (questionNumber <= quiz.length){
    const question = quiz[index].question;
    const a = quiz[index].a;
    const b = quiz[index].b;
    const c = quiz[index].c;
    const d = quiz[index].d;
    console.log('createQuestion ran');
    questionHTML = 
    `<h3>Question ${questionNumber} </h3>
    <p class="question">${question}</p>
    <form>
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
    renderScreen();
    }else{
        questionHTML = `<p>Quiz Complete</p>
        <p>Your score is ${score}/${quiz.length}</p>
        <form>
        <button>Restart Quiz</button>
        </form>`
        renderScreen();
    }
}

//render the screen
function renderScreen(){
    if (screenTypeQuestion) {
        $('.js-section').html(questionHTML);
        if(index < quiz.length){
        $('#questionNumber').html(`Question ${questionNumber}/${quiz.length}`);
        }
    }
    else {
        $('.js-section').html(feedbackHTML);
        $('#currentScore').html(`Current Score: ${score}/${questionNumber}`);
    }

}

//track answer submissions from the user
function handleSubmission(){
    console.log('handleSubmission ran');
    $('.js-section').on('click', '#submit', event =>{
        event.preventDefault();
        console.log('Submission entered');
        recordSubmission();
    })
}

//track next question submissions from the user
function handleNext(){
    console.log('handleNext ran');
    $('.js-section').on('click', '#next, #begin', event => {
        event.preventDefault();
        questionNumber += 1;
        createQuestion(questionNumber);
    })
}

//call all functions in a page ready callback function
function handleQuizApp(){
    handleNext();
    handleSubmission();
console.log('handleQuizApp ran');
}
$(handleQuizApp);