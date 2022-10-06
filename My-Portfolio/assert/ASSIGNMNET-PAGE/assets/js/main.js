var container=document.querySelector('.container');
var arrow_left=container.querySelector('#arrow-left');
var arrow_right=container.querySelector('#arrow-right');
var slide=document.querySelectorAll('.slide');
var slideIndex=0;
var durationSliderInterval= setInterval(nextSlide, 6000);


function resetActive(){
    slide.forEach(item=>{
        item.classList.remove("active");
    });
}
function resetInterval(){
    clearInterval(durationSliderInterval)
    durationSliderInterval= setInterval(nextSlide, 6000);
}
function changeSlide(){
    resetActive();
    slide[slideIndex].classList.add('active');
}
function nextSlide(){
    slideIndex<slide.length-1 ? slideIndex++ : slideIndex=0;
    changeSlide();
}
function previousSlide(){
    slideIndex>0 ? slideIndex-- : slideIndex=slide.length-1;
    changeSlide();
}

arrow_left.addEventListener('click',()=>{
    resetInterval();
    previousSlide();
});

arrow_right.addEventListener('click',()=>{
     resetInterval();
     nextSlide();
});


