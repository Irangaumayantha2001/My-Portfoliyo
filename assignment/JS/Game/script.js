const cross = document.querySelector('.cursor');
const target = document.querySelector('.target');
const scoreText = document.querySelector('.score');
const timerText = document.querySelector('.timer');
const highscoreText = document.querySelector('.highscore');
const gunshot = document.querySelector('.gunshot');
const gameover = document.querySelector('.gameover');
const menupage = document.querySelector('.main-page');
const playGame = document.querySelector('.play_game');
const themeSong = document.querySelector('.theme');

var score = 0;
var timerLeft = 15;
var highscore = 0;
var level = 2;


window.onload = ()=>{
    if(localStorage.getItem('highscore')){
        highscore = localStorage.getItem('highscore');
        highscoreText.innerHTML = `Highscore ${highscore}`;
    }
    themeSong.currentTime = 0;
    themeSong.play();

    scoreText.innerHTML = score;
    timerText.innerHTML = timerLeft;
    changePosition();
}
menupage.addEventListener('click', (e) => e.stopPropagation());
const fadePage = ()=>{
    themeSong.pause();
    menupage.style.opacity = 0;
    setTimeout(()=>{
        menupage.style.display = "none";
    },500);
    play();
}
const play = ()=>{
    setInterval(()=>{
        timer()
    },1000);
}
const gameOver = ()=>{
    alert(`Game Over \n Your Score = ${score}`);
    if(+localStorage.getItem('highScore') < score){
        localStorage.setItem('highscore', score);
        highscore = score;
        highscoreText.innerHTML = `Highscore ${highscore}`;
    }
    score = 0;
    timeLeft = 15+2;
    scoreText.innerHTML = score;
    timerText.innerHTML = timeLeft;
}
const timer = ()=>{
    if(timerLeft === 0){
        gameover.play();
        gameOver();
        timerLeft = 15+2;
    }
    timerLeft -= 1;
    timerText.innerHTML = timerLeft;
}

document.addEventListener('mousemove',(e)=>{
    cross.style.left = `${e.clientX}px`;
    cross.style.top = `${e.clientY}px`;
});

const changePosition = ()=>{
    const xAxis = Math.floor(Math.random()* 1880);
    const yAxis = Math.floor(Math.random()* 577);
    target.style.top = `${yAxis}px`;
    target.style.left = `${xAxis}px`
};

const scoreIncrease = ()=>{
    gunshot.currentTime = 0;
    gunshot.play();
    score += 1;
    scoreText.innerHTML = score;
    changePosition();
    pass()
}


function pass() {
    if(score>=5 &&  document.title == 'Game'){
        window.location.href = 'level2.html';
        level++;
    }else if(score>=7 &&  document.title == 'Level 2'){
        window.location.href = 'level3.html';
        level++;
    }else if(score>=10 &&  document.title == 'Level 3'){
        window.location.href = 'level4.html';
        level++;
    }else if(score>=14 &&  document.title == 'Level 4'){
        alert("You Won")
    }else{
        alert("You lost")
    }
}





target.addEventListener('click', scoreIncrease);
playGame.addEventListener('click', fadePage);