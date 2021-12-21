//Sonic should have health (100hp)
//Speed up blocks after reaching certain score; new Level
//Track/display score - levels
//Have blocks randomly appearing moving down the page
//Collision (change gif on impact)

//DOM Queries
const sonic = document.querySelector('#sonic');
const enemy = document.querySelector('#obstacle');




// Have Sonic run - Move Left , Right, Up and Down//
function sonicLeft () {
    let left = parseInt(window.getComputedStyle(sonic).getPropertyValue("left"));
    console.log(`going left`);
    left -= 50;
    if (left >= 0){
       sonic.style.left = left  + 'px' 
    }
}

function sonicRight () {
    let left = parseInt(window.getComputedStyle(sonic).getPropertyValue("left"));
    console.log(`going right`);
    left += 50;
    if (left < 600){
      sonic.style.left = left  + 'px'  
    }
    
}
function sonicUp () {
    let top = parseInt(window.getComputedStyle(sonic).getPropertyValue("top"));
    console.log(`going up`);
    top -= 50;
    if (top >= 0){
      sonic.style.top = top  + 'px'  
    }
}
function sonicDown () {
    let top = parseInt(window.getComputedStyle(sonic).getPropertyValue("top"));
    console.log(`going down`);
    top += 50;
    if (top < 600){
      sonic.style.top = top  + 'px'  
    }
}

document.addEventListener('keydown', event => {
    if (event.key === "ArrowLeft"){
        sonicLeft();
    }
    if (event.key === "ArrowRight"){
        sonicRight();
    }
    if (event.key === "ArrowUp"){
        sonicUp();
    }
    if (event.key === "ArrowDown"){
        sonicDown();
    }
})

