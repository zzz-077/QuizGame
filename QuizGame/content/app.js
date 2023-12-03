const page = document.body.id;
const startUp_btn = document.querySelector(".bottom_content button");
const startUp_content = document.querySelector(".startUp_content");
const game_content = document.querySelector(".game_content");
const progresBarH1 = document.querySelector(".game_static div:nth-child(1) h1");
const progressBar = document.querySelector(".progress_bar .bar");
const time_boxH1 = document.querySelector(".time_box h1 ");
let InagamePage;

function changeloc() {
    const InagamePage = "game.html";
    window.location.href = InagamePage;
}
function gamePageLoad() {
    game_content.classList.add("active");
}
let width = 15 * 100;
let score = 0;
function progresBarFunc() {
    let IntervalX = setInterval(() => {
        if (width == 0) {
            console.log("stopped");
            clearInterval(IntervalX);
        } else {
            width -= 10;
            progresBarH1.innerHTML = Math.floor(width / 100) + "s";
            progressBar.style.width = (width / 100) * 6.6666666667 + "%";
            if (width == 500) {
                progresBarH1.style.color = "rgb(244, 42, 42)";
                progressBar.style.backgroundColor = "rgb(244, 42, 42)";
            }
        }
    }, 100);
}

switch (page) {
    case "main_board":
        startUp_btn.addEventListener("click", startClick);
        function startClick() {
            startUp_content.classList.add("active");
            setTimeout(() => {
                changeloc();
            }, 300);
        }
        break;
    case "game_board":
        const text = document.querySelector(".quiz_display_board div p");
        const ansBtn1 = document.querySelector("#ansBtn1");
        const ansBtn2 = document.querySelector("#ansBtn2");
        const ansBtn3 = document.querySelector("#ansBtn3");
        const ansBtn4 = document.querySelector("#ansBtn4");
        const ans_btns = document.querySelectorAll(".ans_btns");

        let AnswerIndex;

        setTimeout(() => {
            gamePageLoad();
        }, 300);
        progresBarFunc();
        fetch("../Data/data.json")
            .then((res) => {
                return res.json();
            })
            .then((obj) => {
                let randNum;
                let findItem;
                let corrNum;
                const usedNumbersArr = [];
                function returnAgain() {
                    function RandomFunc() {
                        do {
                            randNum = Math.floor(Math.random() * 20 + 1);
                        } while (usedNumbersArr.includes(randNum));
                        usedNumbersArr.push(randNum);
                        if (usedNumbersArr === 20) {
                            usedNumbersArr.length = 0;
                            usedNumbersArr.push(randNum);
                        }
                        return randNum;
                    }
                    console.log(RandomFunc());

                    function findItemFunc() {
                        findItem = obj.find((item) => {
                            return item.id === randNum;
                        });
                        return {
                            text: findItem.text,
                            ansA: findItem.answerA,
                            ansB: findItem.answerB,
                            ansC: findItem.answerC,
                            ansD: findItem.answerD,
                            corrAns: findItem.correctAnswer,
                        };
                    }

                    function addingClassList() {
                        let result = findItemFunc();
                        corrNum = result.corrAns;
                        ansBtn1,
                            ansBtn2,
                            ansBtn3,
                            ansBtn4.classList.add("ans_btns");
                        text.classList.add("quiz_text_content");

                        text.innerHTML = result.text;
                        ansBtn1.innerHTML = result.ansA;
                        ansBtn2.innerHTML = result.ansB;
                        ansBtn3.innerHTML = result.ansC;
                        ansBtn4.innerHTML = result.ansD;
                    }
                    addingClassList();
                }
                returnAgain();
                ans_btns.forEach((btn, index) => {
                    btn.addEventListener("click", () => {
                        AnswerIndex = index + 1;
                        compare();
                    });
                });

                function compare() {
                    let correctReturnedAns = corrNum;
                    if (AnswerIndex == correctReturnedAns) {
                        console.log("=====correct======");
                        console.log("AnswerIndex:" + AnswerIndex);
                        console.log("correctReturnedAns:" + correctReturnedAns);
                        return returnAgain();
                    } else {
                        console.log("=====incorrect======");
                        console.log("AnswerIndex:" + AnswerIndex);
                        console.log("correctReturnedAns:" + correctReturnedAns);
                        return alert("Game ended try Again!");
                    }
                }
            });

        break;
}
