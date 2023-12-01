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
        setTimeout(() => {
            gamePageLoad();
        }, 300);
        progresBarFunc();

        break;
}
