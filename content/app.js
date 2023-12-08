//===========================
//==========DOM==============
//===========================
const page = document.body.id;
const startUp_btn = document.querySelector(".bottom_content button");
const startUp_content = document.querySelector(".startUp_content");
const game_content = document.querySelector(".game_content");
const progresBarH1 = document.querySelector(".game_static div:nth-child(1) h1");
const progressBar = document.querySelector(".progress_bar .bar");
const time_boxH1 = document.querySelector(".time_box h1 ");
const text = document.querySelector(".quiz_display_board div p");
const ansBtn1 = document.querySelector("#ansBtn1");
const ansBtn2 = document.querySelector("#ansBtn2");
const ansBtn3 = document.querySelector("#ansBtn3");
const ansBtn4 = document.querySelector("#ansBtn4");
const ans_btns = document.querySelectorAll(".ans_btns");
const lose_box = document.querySelector(".lose_box");
const lose_content = document.querySelector(".lose_content");
const lose_retry_button = document.querySelector(".lose_retry_button button");
const LiveScore_box = document.querySelector(".score_box h1");
const AlertScore_box = document.querySelector(".lose_score div strong");
const MenuMax_score = document.querySelector(".max_score h3");
//=================================
//==========VARIABLES==============
//=================================
let InagamePage;
let width = 16 * 100;
let IntervalX;
let score = 0;
let Maxscore = 0;
let AnswerIndex;
timeCheck = false;
let mouseX;
let mouseY;
let lobbySound;
let ingameSound;
let WrongAns;
let CorrectAns;
//=====================================
//==========CURSOR EFFect==============
//=====================================
const colors = ["#963fc1", "#a8e7fe", "#90d1f5", "#cbf1ba"];
function randColor() {
    let pickedColorIndex = Math.floor(Math.random() * colors.length + 1);
    let pickedColor = colors[pickedColorIndex];
    return pickedColor;
}
window.onmousemove = (e) => {
    // const dot = document.createElement("div");
    const dot = document.createElement("i");
    dot.classList.add("dot", "fas", "fa-star");
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.transform = `translate(${mouseX}px,${mouseY}px)`;

    dot.style.color = randColor();

    document.body.appendChild(dot);

    setInterval(() => {
        if (document.body.contains(dot)) {
            document.body.removeChild(dot);
        }
    }, 200);
};

//=====================================
//==========SOUND EFFECTS==============
//=====================================
function playMainMusic() {
    lobbySound = new Audio("../Sounds/mainsound.mp3");
    lobbySound.volume = 0.2;

    lobbySound.addEventListener(
        "ended",
        function () {
            this.currentTime = 0;
            this.play();
        },
        false
    );
    lobbySound.play();
}
function playInGameMusic() {
    ingameSound = new Audio("../Sounds/Ingamesound.mp3");
    ingameSound.volume = 0.2;

    ingameSound.addEventListener(
        "ended",
        function () {
            this.currentTime = 0;
            this.play();
        },
        false
    );
    ingameSound.play();
}
function playInGameMusicStop() {
    if (ingameSound) {
        ingameSound.pause();
        ingameSound.currentTime = 0;
    }
}
function WrongAnswer() {
    WrongAns = new Audio("../Sounds/WrongAnswersound.mp3");
    WrongAns.play();
}
function CorrectAnswer() {
    CorrectAns = new Audio("../Sounds/CorrectAnswersound.mp3");
    CorrectAns.play();
}
window.addEventListener("DOMContentLoaded", (event) => {
    const audio = document.querySelector("audio");
    audio.volume = 0.2;
    audio.play();
});

document.addEventListener("DOMContentLoaded", () => {});
//===================================
//==========PROGRESSBAR==============
//===================================
function progresBarFunc() {
    IntervalX = setInterval(() => {
        if (width == 0) {
            timeCheck = true;
            timeLimitFunc();
            clearInterval(IntervalX);
        } else {
            width -= 10;
            progresBarH1.innerHTML = Math.floor(width / 100) + "s";
            progressBar.style.width = (width / 100) * 6.25 + "%";
            if (width == 500) {
                progresBarH1.style.color = "rgb(244, 42, 42)";
                progressBar.style.backgroundColor = "rgb(244, 42, 42)";
            }
        }
    }, 100);
}

function timeLimitFunc() {
    if (timeCheck == true) {
        AlertScore_box.innerHTML = score;
        setTimeout(() => {
            gamePageLoadRemove();
        }, 100);
        playInGameMusicStop();
        WrongAnswer();
        lose_box.classList.add("active");
        lose_content.classList.add("active");
    }
}
//===================================
//==========LOCALSTORAGE=============
//===================================
document.addEventListener("DOMContentLoaded", () => {
    Maxscore = parseInt(localStorage.getItem("Maxscore")) || 0;
    if (MenuMax_score) {
        MenuMax_score.innerHTML = Maxscore;
    }
});
//======================================
//==========CHANGELOCATION==============
//======================================

function changelocToGame() {
    const InagamePage = "game.html";
    window.location.href = InagamePage;
}

function changelocToHome() {
    score = 0;
    const InagamePage = "index.html";
    window.location.href = InagamePage;
}
function gamePageLoad() {
    game_content.classList.add("active");
    startGame();
}
function gamePageLoadRemove() {
    game_content.classList.remove("active");
}

switch (page) {
    case "main_board":
        startUp_btn.addEventListener("click", startClick);
        function startClick() {
            startUp_content.classList.add("active");
            setTimeout(() => {
                changelocToGame();
            }, 300);
        }
        playMainMusic();
        break;
    case "game_board":
        playInGameMusic();

        lose_retry_button.addEventListener("click", retrygameClick);

        function retrygameClick() {
            if (score > Maxscore) {
                Maxscore = score;
                localStorage.setItem("Maxscore", Maxscore);
            }
            setTimeout(() => {
                changelocToHome();
            }, 300);
        }

        setTimeout(() => {
            gamePageLoad();
        }, 300);

        function startGame() {
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
                        progresBarFunc();
                        function RandomFunc() {
                            do {
                                randNum = Math.floor(
                                    Math.random() * obj.length + 1
                                );
                            } while (usedNumbersArr.includes(randNum));
                            usedNumbersArr.push(randNum);
                            if (usedNumbersArr === obj.length) {
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
                            score += 1;
                            LiveScore_box.innerHTML = score;
                            width = 16 * 100;
                            progresBarH1.innerHTML = 16 + "s";
                            progressBar.style.width = 100 + "%";
                            progresBarH1.style.color = "white";
                            progressBar.style.backgroundColor =
                                "rgba(217, 186, 8, 1)";
                            clearInterval(IntervalX);
                            CorrectAnswer();
                            return returnAgain();
                        } else {
                            AlertScore_box.innerHTML = score;
                            playInGameMusicStop();
                            WrongAnswer();
                            setTimeout(() => {
                                gamePageLoadRemove();
                            }, 100);

                            lose_box.classList.add("active");
                            lose_content.classList.add("active");
                        }
                    }
                });
        }

        break;
}
