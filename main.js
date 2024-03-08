//랜덤번호 지정
//유저가 번호를 입력한 후 go 라는 버튼을 누름
//만약에 유저가 랜덤 번호를 맞추면, 맞췄습니다!
//랜덤 번호가 < 유저 번호 일 경우 DOWN!!! 표시
//랜덤 번호가 > 유저 번호 일 경우 UP!! 표시
// Reset버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다 쓰면 게임이 끝난다. (더 이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 범위 밖에 숫자라고 알려주며 기회를 깎지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 이미 입력한 숫자라고 알려주며 기회를 깎지 않는다.

// ---- Status ----

// 변수 선언

let introNum = 1;
let introControl = "intro1";

let randomNum = 0;
let chances = 5;

let gameOver = false;
let inputRecord = [] ;

let recordText = "";

let upDown = "";

// html elemenet 연결



let userInput = document.getElementById("user-input");

let startButton = document.getElementById("start-button");
let nextButton1 = document.getElementById("next1");
let nextButton2 = document.getElementById("next2");
let nextButton3 = document.getElementById("next3");
let gameButton = document.getElementById("game");
let playButton = document.getElementById("play-button");
let resetButton = document.getElementById("reset-button");


let startBox = document.getElementById("start-box");
let introBox = document.getElementById("intro-box");
let playBox = document.getElementById("play-box");

let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");
let recordArea = document.getElementById("record-area");

// EventListner

startButton.addEventListener("click",start);
nextButton1.addEventListener("click",next);
nextButton2.addEventListener("click",next);
nextButton3.addEventListener("click",next);
gameButton.addEventListener("click",game);
playButton.addEventListener("click",play);
resetButton.addEventListener("click",reset);


userInput.addEventListener("focus",function(){
    userInput.value="";
});

userInput.addEventListener('keyup', function(e){
    if(e.key == 'Enter'){
        play()
    }
})

// ---- functions ----

function start(){
    startBox.classList.add('hidden');
    introBox.classList.remove('hidden');
}

function next(){
    document.getElementById(introControl).classList.add("hidden");
    introNum++;
    introControl = "intro" + introNum;
    document.getElementById(introControl).classList.remove("hidden");   
}

function game(){
    introBox.classList.add('hidden');
    playBox.classList.remove('hidden');
}

function pickRandomNum(){
    randomNum = Math.floor(Math.random()*100) + 1;
    console.log("정답",randomNum);
};

function play() {
    let userValue = userInput.value;

    if (userValue < 1 || userValue > 100){
        resultArea.textContent = `1에서 100 사이라고 말한 것 못 들었어?`;
        return
    }

    if (inputRecord.includes(userValue)) {
        resultArea.textContent = `${userValue}은 이미 말했어. 다른 숫자를 말하라고`;
        return
    }

    chances --;
    chanceArea.textContent = `남은 기회: ${chances}`;

    if (userValue < randomNum) {
        if (randomNum - userValue > 20) {
            resultArea.textContent = `UP!!!! 통 크게 불러봐!`;    
        } else if (randomNum - userValue > 10) {
            resultArea.textContent = `UP! 좀 더 큰 수야.`;    
        } else {
            resultArea.textContent = `UP. 잘 생각해 보라고.`;
        }        
        userInput.value="";
        upDown = "↑";
    } else if (userValue > randomNum){
        if (userValue - randomNum > 20) {
            resultArea.textContent = `Down!!!! 한참 멀었어!`;
        } else if (userValue - randomNum > 10) {
            resultArea.textContent = `Down! 좀 더 작은 수야.`;
        } else {
            resultArea.textContent = `Down. 다음 번엔 맞출 수 있겠지?`;
        }
        userInput.value="";
        upDown = "↓";
    } else {
        resultArea.textContent = `정답!! 정말 맞출지는 몰랐는데!!`;
        playButton.disabled = true;
        upDown = "★";
        inputRecord.push(userValue + upDown);
        recordArea.textContent = `지난 입력값 :  ${inputRecord}`;
        return
    };

    inputRecord.push(userValue + upDown);
    recordArea.textContent = `지난 입력값 :  ${inputRecord}`;

    if ( chances == 0) {
        resultArea.textContent = `Game Over! 정답은 ${randomNum}였어.`;
        playButton.disabled = true;
    };

};

function reset() {

    pickRandomNum();
    chances = 5;
    gameOver = false;
    resultArea.textContent = `좋아. 다시 한번 도전해봐`;
    chanceArea.textContent = `남은 기회: ${chances}`;
    recordArea.textContent = "지난 입력값 :  ";
    playButton.disabled = false;
    inputRecord = [] ;
};

// ---- Run Code ----

pickRandomNum();
