const container=document.querySelector(".container")
const QuestionBox=document.querySelector(".Question")
const choicesBox=document.querySelector(".choices")
const nextbtn=document.querySelector(".nextbtn")
const scoreCard=document.querySelector(".scoreCard")
const alert=document.querySelector('.alert')
const startbtn=document.querySelector('.startbtn')
const timer=document.querySelector('.timer')
// Make an array of objects that stores questions, choices of question and answers
const quiz=[
    {
        question:"Q: Which of the following is not a CSS box model property?",
        choices:["margin","padding","border-radius","border-collapse"],
        answer:"border-collapse"
    },
    {
        question:"Q: Which of the following is not a valid way to declare a function in JS? ",
        choices:["function myFunction(){}", "let myfunction=function(){}","myFunction:function(){}","const myFunction=()=>{};"],
        answer:"myFunction:function(){}"
    },
    {
        question:"Q: which of the following is not a JavaScript datatype?",
        choices:["string","boolean","object","Float"],
        answer:"Float"
    },
    {
        question:"Q: What is the purpose of the this keyword in JavaScript?",
        choices:["It refers to the current function","It refers to the current object","It refers to the parent object","It is used for comments"],
        answer:"It refers to the current object"
    },
]
// Making Variables


let currentquestionIndex=0
let score=0
let quizOver=false
let timeLeft=15
let timerId=null


// Arrow functions to show questions
const showquestions=()=>                    
{
    const questionDetails=quiz[currentquestionIndex]
    QuestionBox.textContent=questionDetails.question
    choicesBox.textContent=""
    for(let i=0;i<questionDetails.choices.length;i++)
    {
        const curentchoice=questionDetails.choices[i]
        const choiceDiv=document.createElement('div')
        choiceDiv.textContent=curentchoice;
        choiceDiv.classList.add("choice")
        choicesBox.appendChild(choiceDiv)

        choiceDiv.addEventListener('click',()=>
        {
            if(choiceDiv.classList.contains('selected'))
            {
                choiceDiv.classList.remove('selected')
            }
            else
            {
                choiceDiv.classList.add('selected')
            }
        })
    }
    if(currentquestionIndex<quiz.length)
    {
        startTimer()
    }
}

const tocheckAnswers=()=>
{
    const selectedchoice=document.querySelector('.choice.selected')
    if(selectedchoice.textContent===quiz[currentquestionIndex].answer)
    {
        // alert("Correct Answer!")
        displaylert("Correct Answer!")
        score++
    }
    else
    {
        // alert("Wrong Answer!")
        displaylert(`Wrong Answer! ${quiz[currentquestionIndex].answer} is the Correct Answer`)
    }
    timeLeft=15;
     if(currentquestionIndex<quiz.length-1)
    {
        currentquestionIndex++
        showquestions()
    }
    else
    {
        showscore()
        stopTimer()
    }
}

// Function to show score 
const showscore=()=>
{
    QuestionBox.textContent="";
    choicesBox.textContent=""
    scoreCard.textContent=`You Scored ${score} out of ${quiz.length}`;
    displaylert("You have completed this Quiz!")
    nextbtn.textContent="Play Again"
    quizOver=true
}
// Function to show alert
const displaylert=(msg)=>
{
     alert.style.display="block"
    alert.textContent=msg;
    setTimeout(()=>
    {
       alert.style.display='none'
    },2000)
    
}

//Function to start timer
const startTimer=()=>
{
    clearInterval(timerId)
    timer.textContent=timeLeft
    const countdown=()=>
    {
        timeLeft--
        timer.textContent=timeLeft
    }
    if(timeLeft===0)
    {
        const confirmuser=confirm("Time Up!! Do You want to play the quiz again")
        if(confirmuser)
        {
            timeLeft=15
            startquiz()
        }
        else{
            startbtn.style.display="block"
            container.style.display="none"
            return
        }
    }
    timerId=setInterval(countdown,1000)
    
}
//Function to stop timer
const  stopTimer=()=>
{
    clearInterval(timerId)
}


//Function to shuffle Questions
const shuffleQuestions=()=>
{
    for(let i=quiz.length-1;i>0;i--)
    {
        const j=Math.floor(Math.random()*(i+1))
        [quiz[i],quiz[j]]=[quiz[j],quiz[i]]
    }
    currentquestionIndex=0
    showquestions()
}
// function to start quiz
const startquiz=()=>
{
    timeLeft=15
    timer.style.display="flex"
    showquestions()
}
// Adding event listener to start Button
startbtn.addEventListener('click',()=>
{
    startbtn.style.display='none'
    container.style.display='block'
    startquiz()
})


nextbtn.addEventListener("click",()=>
{
    const selectedchoice=document.querySelector('.choice.selected')
    if(!selectedchoice && nextbtn.textContent==="Next")
    {
            displaylert("Select Your Answer!")

        return
    }
    if(quizOver)
    {
        nextbtn.textContent="Next"
        scoreCard.textContent=""
        currentquestionIndex=0
        quizOver=false
        score=0
        startquiz()

    }
    else
    {
        tocheckAnswers()
        
    }
    
})

