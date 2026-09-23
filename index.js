const startBtn = document.getElementById("startquiz");
const starterForm = document.getElementById("starterForm");

startBtn.addEventListener("click", function () {

    console.log("START CLICKED");
    starterForm.style.display = "none";

    const array = [
        {
            question: "What geographical line halves the earth in equal way?",
            options: ["Longitude", "Latitude", "Equator", "Tropical line"],
            correctAnswer: "Equator"
        },
        {
            question: "The longest bone in human body?",
            options: ["Hip bone", "Femur", "Neck Bone", "Scapula"],
            correctAnswer: "Femur"
        },
        {
            question: "The largest planet in the solar system?",
            options: ["Saturn", "Neptune", "Venus", "Jupiter"],
            correctAnswer: "Jupiter"
        },
        {
            question: "How many olympic rings are there?",
            options: ["Five", "Three", "Six", "Two"],
            correctAnswer: "Five"
        },
        {
            question: "'codex' is which company building agent",
            options: ["Anthropic", "XAi", "FireFliesAi", "OpenAI"],
            correctAnswer: "OpenAI"
        }
    ];

    let questionForm = document.createElement("form");
    const questionCards = [];
    let score = 0;

    //  PROGRESS BAR 

    const progressContainer = document.createElement("div");
    const progressBar = document.createElement("div");

    progressContainer.classList.add("progress-container");
    progressBar.classList.add("progress-bar");

    progressContainer.appendChild(progressBar);
    questionForm.appendChild(progressContainer);


    // RESULT CARD 

    const resultCard = document.createElement("div");
    const feedBack = document.createElement("div");
    const restartBtn = document.createElement("button");

    resultCard.style.display = "none";
    resultCard.classList.add("result-card");

    feedBack.classList.add("feedback");


    restartBtn.id = "restartBtn";

    restartBtn.textContent = "Restart Quiz";
    restartBtn.type = "button";

    resultCard.appendChild(feedBack);
    resultCard.appendChild(restartBtn);
    const quizResult = document.createElement("h2");
    quizResult.classList.add("quiz-time");
    quizResult.textContent = "Quiz Results";
    resultCard.insertBefore(quizResult, feedBack);


    //  QUESTIONS 

    for (let i = 0; i < array.length; i++) {

        const questionCard = document.createElement("div");

        if (i !== 0) {
            questionCard.style.display = "none";
        }

        questionCards.push(questionCard);


        // Question information

        const questionInfo = document.createElement("div");
        questionInfo.classList.add("question-info");

        const questionCount = document.createElement("p");
        questionCount.textContent =
            `Question ${i + 1} of ${array.length}`;

        const scoreSection = document.createElement("p");
        scoreSection.classList.add("score");
        scoreSection.textContent = `Score: ${score}`;

        questionInfo.appendChild(questionCount);
        questionInfo.appendChild(scoreSection);


        // Question

        const questionRender = document.createElement("p");
        questionRender.textContent = array[i].question;


        // Feedback for THIS question

        const correctness = document.createElement("p");


        // Options

        const optionCard = document.createElement("div");
        optionCard.classList.add("option-buttons");

        const A = document.createElement("button");
        const B = document.createElement("button");
        const C = document.createElement("button");
        const D = document.createElement("button");

        A.type = "button";
        B.type = "button";
        C.type = "button";
        D.type = "button";

        A.value = array[i].options[0];
        B.value = array[i].options[1];
        C.value = array[i].options[2];
        D.value = array[i].options[3];

        A.textContent = array[i].options[0];
        B.textContent = array[i].options[1];
        C.textContent = array[i].options[2];
        D.textContent = array[i].options[3];


        //  ANSWER HANDLER 

        optionCard.addEventListener("click", function (event) {

            if (event.target.tagName !== "BUTTON") {
                return;
            }

            if (event.target.value === array[i].correctAnswer) {

                event.target.style.backgroundColor =
                    "hsl(120, 73%, 75%)";

                correctness.textContent = "Correct!";
                correctness.style.color = "green";

                score++;

            } else {

                correctness.textContent = "Not quite!";
                correctness.style.color = "red";

                event.target.style.backgroundColor =
                    "hsl(0, 99%, 52%)";
            }


            // Update score everywhere

            document.querySelectorAll(".score").forEach(scoreElement => {
                scoreElement.textContent = `Score: ${score}`;
            });


            // Update progress

            const progress =
                ((i + 1) / array.length) * 100;

            progressBar.style.width = `${progress}%`;


            // Move to next question / result

            setTimeout(() => {

                questionCards[i].style.display = "none";

                if (i + 1 < array.length) {

                    questionCards[i + 1].style.display = "block";

                } else {

                    // Quiz finished

                    resultCard.style.display = "block";
                    
  

                    if (score <= 2) {

                        feedBack.innerHTML =
                            `
                             You have scored ${score} out of ${array.length}<br>
                             Practice makes perfect! Practice slowly again 😊`;

                    } else if (score <= 4) {

                        feedBack.innerHTML =
                            `
                             You have scored ${score} out of ${array.length}<br>
                             Very Good! You are smashing it 👌!`;

                    } else {

                        feedBack.innerHTML =
                            `
                             You have scored ${score} out of ${array.length}<br>
                             Genius! Keep Flying 🙌`;
                    }
                }

            }, 1000);

        });


        //  BUILD QUESTION CARD 

        questionCard.appendChild(questionInfo);
        questionCard.appendChild(questionRender);

        optionCard.appendChild(A);
        optionCard.appendChild(B);
        optionCard.appendChild(C);
        optionCard.appendChild(D);

        questionCard.appendChild(optionCard);
        questionCard.appendChild(correctness);

        questionForm.appendChild(questionCard);
    }



    questionForm.appendChild(resultCard);


  

    restartBtn.addEventListener("click", function () {
        window.location.reload();
    });


    document.body.appendChild(questionForm);
});