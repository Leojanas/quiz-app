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
    }
]
//create an array to hold the submitted answers and a variable to track the score
const quizSubmission = []
let score = 0;
let questionNumber = 0;
let correct = false;
let questionHTML = ``;
let feedbackHTML = ``;
let screenTypeQuestion = true;



//use submission to add to the quizSubmission array
function recordSubmission(){
    //retrieve the submission
    //push it to the submission array

}
//check if answer is correct
function checkSubmission(){
    //check whether the current submission is correct
    //update the correct variable
    
}
//update score variable
function updateScore(){
    //if current answer is correct, add 1 to score

}



//create feedback screen from previous submission
function createFeedback(){
//check if current answer is correct    
//if incorrect, retrieve the correct answer
//get proper html for the appropriate display
}

//create next question screen
function createQuestion(questionNumber){
    const index = questionNumber - 1;
    const question = quiz[index].question;
    const a = quiz[index].a;
    const b = quiz[index].b;
    const c = quiz[index].c;
    const d = quiz[index].d;
    questionHTML = `
    <h2>Question ${questionNumber} </h2>
    <p>$(question)</p>
    <form>
        <input type="radio" id="a" name="answer" required>
        <label for="a"> ${a} </label><br>
        <input type="radio" id="b"  name="answer">
        <label for="b"> ${b} </label><br>
        <input type="radio" id="c"  name="answer">
        <label for="c"> ${c} </label><br>
        <input type="radio" id="d"  name="answer">
        <label for="d"> ${d} </label><br>
        <button type="submit">Submit</button>
    </form>
`
}
//add one to the current question number
//access the appropriate question object in the quiz array
//retrieve the appropriate screen html

//render the screen
function renderScreen(){
    if (screenTypeQuestion) {
        $('.js-section').html(questionHTML);
    }
    else {
        $('.js-section').html(feedbackHTML);
    }
//retrieve the current question number
//retrieve the current score
//determine if it needs a question screen or a feedback screen
//retrieve the appropriate screen html
}
//track answer submissions from the user
function handleSubmission(){
    $('.js-form').on('click', 'submit', event =>{
        
    })
}
//track next question submissions from the user
function handleNext(){
    console.log('handelNext ran');
    $('.js-form').on('click', '#begin', function(event){
    event.preventDefault;
    questionNumber = 1;
    console.log('begin clicked');
    createQuestion(questionNumber);
    renderScreen();
    })
    $('.js-form').on('click', '#next', event => {
        event.preventDefault;
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
$(handleQuizApp)