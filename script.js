
//Speed up blocks after reaching certain score; new Level

//DOM Queries
const sonic = document.querySelector('#sonic');
const enemy = document.querySelector('#obstacles');
const manyEnemies = document.querySelector('.blocks')
const score = document.querySelector('#score');
const levels = document.querySelector('#levels');
const healthbar = document.querySelector('#healthbar')


//Track/display score - levels
let counter = 0;
let level = 1;
//Sonic should have health (100hp)
let Health = 100;
//speed of enemy
let speed = 1.7;
// let speed = window.getComputedStyle(enemy).getPropertyValue("animation-duration");
// console.log(`Intial speed is ${speed}`);


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

//Have blocks randomly appearing moving down the page
enemy.addEventListener('animationiteration', () => {
    let random = Math.floor(Math.random() * 6);
    left = random * 100;
    enemy.style.left =  left + 'px'
    counter++;
    //right now score is tied to the blocks appearence, should just be a timer
    score.textContent = `Score: ${counter}`;
    speedUp();
    updateLevel();
    addBlock();
    
})

//speed up blocks
speedUp = () => {
    if (counter % 10 === 0 && speed >= 0) {
        console.log("10+");
        // speed -= 0.2;
        console.log(speed);
        enemy.style.animationDuration = speed + 's';
    }
}

//update Level
updateLevel = () => {
    if(counter % 10 === 0) {
        level++;
        levels.textContent = `Level: ${level}`
        console.log("LEVEL UP")
    }
}

//add Enemies 

addBlock = () => {
    if(counter % 10 === 0 && counter < 100) {
        // manyEnemies.appendChild(enemy.cloneNode(true))
    }
}


//remove health 
removeHealth = () => {
    Health -= 10;
    if(Health >= 0) {
        healthbar.style.width = Health + '%'
        healthbar.innerHTML = Health + 'HP'
        sonic.style.backgroundImage = "url(images/sonic-hit.gif)"
    }
}
//End the game
gameOver = () => {
    alert(`Game Over! Final score is ${counter}.`)
        enemy.style.animation = 'none'; 
}


//Collision (change gif on impact)
setInterval( () => {
    let sonicLeft = parseInt(window.getComputedStyle(sonic).getPropertyValue("left"))
    // console.log(sonicLeft);
    let enemyLeft = parseInt(window.getComputedStyle(enemy).getPropertyValue("left"))
    // console.log(enemyLeft);
    let enemyTop = parseInt(window.getComputedStyle(enemy).getPropertyValue("top"))
    // console.log(enemyTop)
    if(sonicLeft === enemyLeft && enemyTop < 500 && enemyTop > 300){
        console.log("HIT");
        removeHealth();
            if (Health <= 0) gameOver();
    }
}, 200);
