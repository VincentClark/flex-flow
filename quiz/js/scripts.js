const questions = [
    {
        question: "Orange is a ...",
        type: "radio",
        answers: [
            {
                text: "Color",
                correct: 1,
            },
            {
                text: "Fruit",
                correct: 0
            },
            {
                text: "Drink",
                correct: 0
            },
            {
                text: "All of the Above",
                correct: 0
            },
            {
                text: "None of the Above",
                correct: 0
            }
        ]
    },
    {
        question: "Which came first, the chicken or the egg?",
        type: "radio",
        answers: [
            {
                text: "Chicken",
                correct: 1
            },
            {
                text: "Egg",
                correct: 0
            },
            {
                text: "Decline to Answer",
                correct: 0
            }
        ]
    },
    {
        question: "What cities are not in Los Angles?",
        type: "checkbox",
        answers: [
            {
                text: "New Port Beach",
                correct: 1
            },
            {
                text: "Santa Monica",
                correct: 0
            },
            {
                text: "Ann Arbor",
                correct: 2
            },
            {
                text: "None of the above",
                correct: 2
            }
        ]
    },
    {
        question: "How many days will be in Febuary in 2024?",
        type: "radio",
        answers: [
            {
                text: "30",
                correct: 1
            },
            {
                text: "29",
                correct: 2
            },
            {
                text: "28",
                correct: 2
            },
            {
                text: "31",
                correct: 0
            }
        ]
    },
    {
        question: "How much do you like this quiz so far?",
        type: "radio",
        answers: [
            {
                text: "Very Much",
                correct: 0
            },
            {
                text: "Sort of",
                correct: 2
            },
            {
                text: "Is it okay?",
                correct: 1
            },
            {
                text: "Could be Better",
                correct: 2
            }
        ]
    },
    {
        question: "2021 made me feel?",
        type: "checkbox",
        answers: [
            {
                text: "Happy",
                correct: 2
            },
            {
                text: "Sad",
                correct: 2
            },
            {
                text: "Created a dislike for squirls",
                correct: 2
            },
            {
                text: "A feel that I cannot quantify in 2021, but I do not want to be a squirl",
                correct: 2
            }
        ]
    }
];
const scareSorries = [
    "I am sorry, that was not cool. See, 2021, was full of surpises, would you like to finish the quiz?",
    "I am soory, that was not cool. See, 2021, was full of surpises, would you like to finish the quiz?",
    "I am srry, that was not cool. See, 2021, was full of surpises, would you like to finish the quiz?",
];
let startScares = scareSorries.length;
let deactivate = false;
function checkDeactivate() {
    if (deactivate == true) {
        deactivate = false;
    } else {
        deactivate = true;
    }
    console.log(deactivate);
}
const scareImage = document.createElement("img");
scareImage.src = "images/volder.jpg";
const scareAudio = document.createElement("audio");
scareAudio.src = "audio/Scary.mp3";
function myTimer() {
    let time = 2;
    let timer = setInterval(function () {
        time--;
        if (time <= 0) {
            if (deactivate != true) {
                const boo = mySurprise();
            }

            // surprise.appendChild(mySurprise());
            clearInterval(timer);

        }
        else {
            document.getElementById("timer").innerHTML = time;
        }
    }, 1000);
}

function scareTimer(t = 5) {
    let time = t;
    let timer = setInterval(function () {
        time--;
        if (time <= 0) {
            clearInterval(timer);
            secondScare()
        }
        else {
            document.getElementById("timer").innerHTML = time;
        }
    }, 1000);

}
function secondScare() {
    scareTimer(10);

    const scare = document.getElementById("scare");
    // scare.classList.add("second-scare");
    scare.setAttribute("style", "opacity: .4");
    const sorry = document.createElement("div");
    sorry.classList.add("sorry");
    sorry.setAttribute("id", "sorry");
    //sorry.classList.add("sorry");
    const sorryText = scareSorries[0];
    const sorryMessage = document.createTextNode(sorryText);
    sorryButton = document.createElement("button");
    sorryButton.classList.add("sorry-button");
    sorryParagraph = document.createElement("p");
    sorryButton1 = document.createElement("input");
    sorryButton1.setAttribute("type", "button");

    sorryButton2 = document.createElement("input");
    sorryButton2.setAttribute("type", "button");
    sorryButtonText1 = document.createTextNode(sorryButton1);
    sorryButtonText2 = document.createTextNode(sorryButton2);
    sorryButton1.value = "Yes";
    sorryButton2.value = "No";
    sorryButton1.addEventListener("click", function () {
        mySurprise();
    });
    sorryButton2.addEventListener("click", function () {
        mySurprise();
    });
    sorry.appendChild(sorryMessage);
    sorryParagraph.appendChild(sorryButton1);
    sorryParagraph.appendChild(sorryButton2);
    sorry.appendChild(sorryParagraph);
    document.getElementById('container').appendChild(sorry);


    return null;
}
function mySurprise() {
    console.log("my surprise")
    scareTimer(3);
    const scare = document.getElementById("scare");
    scare.setAttribute("style", "opacity: 1");
    scare.classList.add("container");
    scare.appendChild(scareImage);
    scare.appendChild(scareAudio);
    try {
        const sorry = document.getElementById("sorry");
        sorry.remove();
    }
    catch (err) {
        console.log("no sorry")
    }
    scareAudio.play();
    const surprise = document.createElement("div");
    const container = document.getElementById("questionContainer");
    container.setAttribute("style", "display: none");
    surprise.classList.add("surprise");
    console.log(scareImage);

    return surprise;
}


function createQuestion(q) {
    const question_container = document.createElement("div")
    question_container.classList.add("question-container")
    const question_header = document.createElement("h3");
    question_header.classList.add("question-header")
    const question = document.createTextNode(questions[q].question);
    question_header.appendChild(question);
    question_container.appendChild(question_header);

    const answer_container = document.createElement("div");
    for (let i = 0; i < questions[q].answers.length; i++) {
        const inputType = document.createElement("input");
        inputType.type = questions[q].type;
        inputType.classList.add("radio-class");
        inputType.name = questions[q].question;
        inputType.value = questions[q].answers[i].correct;
        const answers = document.createElement("div");
        const answersLabel = document.createElement("label");
        answersLabel.classList.add("answers-label");
        const answersText = document.createTextNode(questions[q].answers[i].text)
        answersLabel.appendChild(answersText)
        inputType.addEventListener("click", () => {
            console.log(inputType.value)
            if (inputType.value == 2) {
                myTimer();
            }
        })
        answers.appendChild(inputType);
        answers.appendChild(answersLabel);
        answer_container.appendChild(answers);
    }
    question_container.appendChild(answer_container);

    return question_container;
}

function createQuestionList(quest = questions) {
    const questionList = document.createElement("div");
    for (let i = 0; i < quest.length; i++) {
        questionList.appendChild(createQuestion(i))
    }
    return questionList;

}