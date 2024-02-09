//랜덤번호 지정
//유저가 번호를 입력한 후 go 라는 버튼을 누름
//만약에 유저가 랜덤 번호를 맞추면, 맞췄습니다!
//랜덤 번호가 < 유저 번호 일 경우 DOWN!!! 표시
//랜덤 번호가 > 유저 번호 일 경우 UP!! 표시
// Reset버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다 쓰면 게임이 끝난다. (더 이상 추측 불가, 버튼이 disable)
// 유저가 1~100 범위 밖에 숫자를 입력하면 범위 밖에 숫자라고 알려주며 기회를 깎지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 이미 입력한 숫자라고 알려주며 기회를 깎지 않는다.

let computerNum= 0
let playButton = document.getElementById("play-button")
let userInput = document.getElementById("user-input")
let resultArea = document.getElementById("result-area")

playButton.addEventListener("click", play)

function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답", computerNum)
}

function play(){
    let userValue = userInput.value;
    if(userValue < computerNum){
        resultArea.textContent = "UP!!!!"
    }else if(userValue > computerNum){
        resultArea.textContent = "DOWN!!!!"
    }else {
        resultArea.textContent = "맞췄습니다!!!!"
    }    
    }

pickRandomNum();

