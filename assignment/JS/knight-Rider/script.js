var initArray = [];
var leftColors = [ '#D5212E', '#C62121', '#E84C3D', '#900A22', '#8D0101', '#680101'];
var rightColors = ['#680101', '#8D0101', '#900A22', '#E84C3D', '#C62121', '#D5212E'];
let interval;

const audio = new Audio("assets/KnightRider.mp3");

function animateRight() {
    let firstValue = initArray.shift();
    initArray.push(firstValue);
}

function animateLeft() {
    let lastColor = initArray.pop();
    initArray.unshift(lastColor);
}

var count = 0;

function animate() {
    count++;
    if (count <= leftColors.length) {
        initArray = leftColors;
        animateLeft();
    } else {
        if (count >= (leftColors.length * 2)) {
            count = 0;
        }
        initArray = rightColors;
        animateRight();
    }
}
audio.addEventListener("canplaythrough", () => {
    audio.loop = true;
    audio.play().catch(e => {
        $("#btnStart").click(function () {
                audio.play();
        })
    })
});

function renderKnightRider() {
    $("#ktt").empty();
    for (let i = 0; i < (initArray.length) / 2; i++) {
        $("#ktt").append(`<div style="background-color: ${initArray[i]}"></div>`)
    }
    animate();
}

$("#btnStart").on("click", function () {
    clearInterval(interval);
    interval = setInterval(renderKnightRider, 100);
});

$("#btnStop").on("click", function () {
    audio.pause();
    clearInterval(interval);
});
