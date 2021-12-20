const questions = [
    {
        question: "What is the capital of India?",
        type: "radio",
        answers: [
            {
                text: "New Delhi",
                correct: 1,
            },
            {
                text: "Mumbai",
                correct: 0
            },
            {
                text: "Chennai",
                correct: 0
            },
            {
                text: "Kolkata",
                correct: 0
            }
        ]
    },
    {
        question: "What is the capital of Spain?",
        answers: [
            {
                text: "Madrid",
                correct: 1
            },
            {
                text: "Barcelona",
                correct: 0
            },
            {
                text: "Valencia",
                correct: 0
            },
            {
                text: "Seville",
                correct: 0
            }
        ]
    },
    {
        question: "What is the capital of Briton?",
        answers: [
            {
                text: "Amsterdam",
                correct: 1
            },
            {
                text: "London",
                correct: 0
            },
            {
                text: "Paris",
                correct: 2
            },
            {
                text: "Dublin",
                correct: 0
            }
        ]
    }
];

function createQuestion(q) {
    const question_container = document.createElement("div")
    question_container.classList.add("question-container")
    const question_header = document.createElement("h3");
    question_header.classList.add("question-header")
    const question = document.createTextNode(questions[q].question);
    question_header.appendChild(question);
    question_container.appendChild(question_header);

    const answer_container = document.createElement("div");
    for (let i = 0; i < questions[0].answers.length; i++) {
        const radioButton = document.createElement("input");
        radioButton.type = "radio";
        radioButton.classList.add("radio-class");
        radioButton.name = questions[q].question;
        radioButton.value = questions[q].answers[i].correct;
        const answers = document.createElement("div");
        const answersLabel = document.createElement("label");
        answersLabel.classList.add("answers-label");
        const answersText = document.createTextNode(questions[q].answers[i].text)
        answersLabel.appendChild(answersText)
        radioButton.addEventListener("click", function () {
            console.log(radioButton.value)
        })
        answers.appendChild(radioButton)
        answers.appendChild(answersLabel)
        answer_container.appendChild(answers)
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