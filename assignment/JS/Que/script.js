let image="assets/man.gif"
let queData = {
    man: [
        {letter: "A", img: image},
        {letter: "B", img: image},
        {letter: "C", img: image},
        {letter: "D", img: image},
        {letter: "E", img: image},
        {letter: "F", img: image}
    ],
    nextMan: function () {
        let lastMan = this.man.pop();
        this.man.unshift(lastMan);
    }
}

function renderQue() {
    $("main> section:first-child").empty();
    for (let i = 0; i < queData.man.length; i++) {
        $("main> section:first-child").append(`<div><img src="${queData.man[i].img}" alt="man"><h2>${queData.man[i].letter}</h2></div>`);
    }
    queData.nextMan();
}
setInterval(renderQue, 3000);
renderQue();