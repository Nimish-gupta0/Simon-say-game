let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","green","purple"]

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

//First step press key game starts
document.addEventListener("keypress", function() {
    if(started == false){
        console.log("Game started");
        started = true;
    }

    levelUp();
});

//Flash btn for game and user click
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

//Second step Levelup and random btn flash
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    //Random btn selected
    let randInx = Math.floor(Math.random() * 4);
    let randColor = btns[randInx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

//To check ans is correct and level up 
function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else {

        if (level > highScore) {
            highScore = level;
            document.querySelector("#score").innerText = `High Score: ${highScore}`;
        }

        h2.innerHTML = `GAME OVER! Your score was <b>${level}.</b> <br>Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

//btn pressed by user 
function btnPress(){
   
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");
for(btn of allBtn){
    btn.addEventListener("click", btnPress);
}

//To reset the game
function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

