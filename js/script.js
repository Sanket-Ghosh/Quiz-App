// Getting all reuired elements

// For Starting Button

const start_btn = document.querySelector(".Start-btn button");
const info_box = document.querySelector(".info-box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz-box");
const time_count = quiz_box.querySelector(".timer .timer-sec");
const time_line = quiz_box.querySelector("header .time-line");
const time_off = quiz_box.querySelector("header .time-text");

const option_list = document.querySelector(".option-list");

/*------- Info Box ----------*/ 

// In Case of Start button Clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //Shows Info Box
}
// If Exit Button of Info Box Clicked
exit_btn.onclick = () =>{
    info_box.classList.remove("activeInfo"); //Hides Info Box
}
// If Continue Button of Info Box Clicked
continue_btn.onclick = () =>{
    info_box.classList.remove("activeInfo"); //Hides Info Box
    quiz_box.classList.add("activeQuiz"); //Shows Quiz Box
    showQuestions(0); //Gets the questions and shows in quiz box
    queCounter(1); //counter for questions below the box
    startTimer(15); //counter for timer of the quiz
    startTimerLine(0); //Counter of the time line
}

/* Questions Part*/ 

let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector('.next-btn');

// Result Box
const result_box = document.querySelector(".result-box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = () => {
    // quiz_box.classList.add("activeQuiz");
    // result_box.classList.remove("activeResult");
    
    // let que_count = 0;
    // let que_numb = 1;
    // let timeValue = 15;
    // let widthValue = 0;
    // let userScore = 0;
    
    // showQuestions(que_count);
    // queCounter(que_numb);
    // clearInterval(counter);
    // startTimer(timeValue);
    // clearInterval(counterLine);
    // startTimerLine(widthValue);
    
    // next_btn.style.display = "none";
    // time_off.textContent = "Time Left"

    window.location.reload();
}


quit_quiz.onclick = () => {
    window.location.reload();
}

// If next button clicked
next_btn.onclick = () =>{
    if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        time_off.textContent = "Time Left";

    }
    else{
        console.log('Question Complete');
        showResultBox();
    }
}

// Getting questions and options from array
function showQuestions(index){
    const que_text = document.querySelector(".ques-text");

    let que_tag = '<span>'+ questions[index].numb + '. ' + questions[index].question+'</span>';
    let option_tag = 
        '<div class="option">'+ questions[index].options[0]+'<span></span></div>'
    + '<div class="option">'+ questions[index].options[1]+'<span></span></div>'
    + '<div class="option">'+ questions[index].options[2]+'<span></span></div>'
    + '<div class="option">'+ questions[index].options[3]+'<span></span></div>'
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick","optionSelected(this)");        
    }
}

// Showing Icons cross/tick

let tickIcon = '<div class="icon tick"><i class="fa fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fa fa-times"></i></div>';

// Checking selected Answers Correct or Not
function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);

    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    if(userAns == correctAns)
    {
        userScore += 1;
        console.log(userScore)
        answer.classList.add("correct");
        console.log("Correct");
        answer.insertAdjacentHTML('beforeend',tickIcon);
    }
    else
    {
        answer.classList.add("incorrect");
        console.log("Wrong!");
        answer.insertAdjacentHTML('beforeend',crossIcon);

        // If the answer is wrong automatically showing the correct
        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class","option correct");
                option_list.children[i].insertAdjacentHTML('beforeend',tickIcon);
            }        
        }

    }

    // Disabling Multiple selection options
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";

}
/*----- Showing Result Box -----*/ 

function showResultBox(){
    info_box.classList.remove("activeInfo"); //removes info box
    quiz_box.classList.remove("activeQuiz"); //removes Quiz Box
    result_box.classList.add("activeResult"); //Shows Result Box
    
    const scoreText = result_box.querySelector(".score-text");
    
    if(12 > userScore > 10 )
    {
        let scoreTag = '<span>and Good you got <p>'+ userScore +'</p>out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 12)
    {
        let scoreTag = '<span>and Congrats! you got <p>'+ userScore +'</p>out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore < 10)
    {
        let scoreTag = '<span>and sorry you got only<p>'+ userScore +'</p>out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }

}

// For the Timer of the Quiz box

function startTimer(time){
    counter = setInterval(timer,1000);
    function timer(){
        time_count.textContent = time;
        time--;
        if(time <9){
            let addZero = time_count.textContent;
            time_count.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            time_count.textContent = "00";
            time_off.textContent = "Time Off";

            let correctAns = questions[que_count].answer;
            let allOptions = option_list.children.length;


            for (let i = 0; i < allOptions; i++) {
                if(option_list.children[i].textContent == correctAns){
                    option_list.children[i].setAttribute("class","option correct");
                    option_list.children[i].insertAdjacentHTML('beforeend',tickIcon);
                }        
            }

            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.style.display = "block";
        }
    }
}

// For the Timer Bar moving in the box

function startTimerLine(time){
    counterLine = setInterval(timer, 16.5);
    function timer(){
        time += 1;
        time_line.style.width = time +"px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}


// Bottom COunter
function queCounter(index){
    const bottom_ques_counter = quiz_box.querySelector(".total_question");

    let total_ques_count_tag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>question</span>';
    bottom_ques_counter.innerHTML = total_ques_count_tag;
}

