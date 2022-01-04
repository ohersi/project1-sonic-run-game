//DOM Queries

//characters
const sonic = document.querySelector('#sonic');
const enemy = document.querySelector('.obstacles');
const manyEnemies = document.querySelector('.blocks');
//game vaules
const scoreBoard = document.querySelector('#score');
const highScoreList = document.querySelector('.highScoreList');
const levels = document.querySelector('#levels');
const healthbar = document.querySelector('#healthbar');
//game box
const container = document.querySelector('.game-container');
//game state
const start = document.querySelector('#start-game');
const endScreen = document.querySelector('#game-over')
//image
let image = document.querySelector('#sonic-body');
//sounds
let toggle = document.querySelector('#musicBtn');
let theme = new Audio('/sounds/theme.mp3');
theme.volume = 0.1;
let greenhill = new Audio('/sounds/greenhill.mp3');
greenhill.loop = true;
greenhill.volume = 0.05;
let hit_sound = new Audio('/sounds/hit.mp3');
hit_sound.volume = 0.1;
let dash = new Audio('/sounds/dash.mp3');
dash.volume = 0.07;

//Track score - levels
let counter = 1;
let level = 1;
//Sonic health (100hp)
let Health = 100;
//speed of enemy
let speed = 5;
//speed of background
let BG_SPEED = 2.65;
//enemy starting position
let startPosition = -190;
//game over
isGameOver = false;


runGame = () => {

// Controls
 sonicLeft = () => {
    let left = parseInt(window.getComputedStyle(sonic).getPropertyValue("left"));
    console.log(`going left`);
    left -= 50;
    if (left >= 0){
       sonic.style.left = left  + 'px' 
    }
}

 sonicRight = () => {
    let left = parseInt(window.getComputedStyle(sonic).getPropertyValue("left"));
    console.log(`going right`);
    left += 50;
    if (left < 600){
      sonic.style.left = left  + 'px'  
    }
    
}
 sonicUp = () => {
    let top = parseInt(window.getComputedStyle(sonic).getPropertyValue("top"));
    console.log(`going up`);
    top -= 50;
    if (top >= 0){
      sonic.style.top = top  + 'px'  
    }
    dash.play();
}
 sonicDown = () => {
    let top = parseInt(window.getComputedStyle(sonic).getPropertyValue("top"));
    console.log(`going down`);
    top += 50;
    if (top < 600){
      sonic.style.top = top  + 'px'  
    }
}

document.addEventListener('keydown', e => {
    switch (e.key) {
        case "ArrowLeft":
            sonicLeft()
            break;
        case "ArrowRight":
            sonicRight()
            break;
        case "ArrowUp":
            sonicUp()
            break;
        case "ArrowDown":
            sonicDown()
            break;
    }
})


moveDown = () => {
    if (counter % 10 === 0 && speed < 22){
        speed +=0.02;
    }
    startPosition += speed;
    enemy.style.top = startPosition + 'px';
    requestAnimationFrame(moveDown);

    //reset enemy position
    if (Math.abs(startPosition) >= 700){
        startPosition = -190;

        //# of columns enemy can appear randomly
        let random = Math.floor(Math.random() * 6);
        left = random * 100;
        if (left < 600){
            enemy.style.left =  left + 'px'   
            }
            increaseSpeed();
        }
    }
    moveDown();

//Update score
setInterval(() => {
    if (!isGameOver){
        counter++;
        scoreBoard.textContent = `Score: ${counter}`;
        updateLevel();
        increaseSpeed();
    }
}, 1000);
  
//speed up background
increaseSpeed = () => {
    if (counter % 10 === 0 && BG_SPEED >= 0.9) {
        BG_SPEED -= 0.17;
        console.log(`background speed: ${BG_SPEED}`);
        container.style.animationDuration = BG_SPEED + 's';
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

//Collision
setInterval( () => {
//get size and position of element rectangle relative to viewport
const sonicBody = sonic.getBoundingClientRect(); 
const enemyBody = enemy.getBoundingClientRect();
//Check absolute value (distance between) of sonic and enemy top and left compared to sonic height and width
if(Math.abs(sonicBody.top - enemyBody.top) < sonicBody.height && 
    Math.abs(sonicBody.left - enemyBody.left) < sonicBody.width) {
        console.log("HIT");
        hit_sound.play();
        removeHealth();
    if (Health <= 0) {
        isGameOver = true;
        enemy.style.top = -200;
        dash.pause();
        hit_sound.pause();
        cancelAnimationFrame(moveDown);
        container.style.backgroundImage = "none";
        endScreen.style.display = "flex";
        gameOver();
        }
    }
}, 400);

//remove Health 
removeHealth = () => {
    Health -= 10;
    if(Health >= 0) {
        healthbar.style.width = Health + '%'
        healthbar.innerHTML = `${Health} HP`
        //change gif when sonic gets hit
        image.src = "/images/sonic-hit.gif"
        //change back to original
        setTimeout(() => {
            image.src = "/images/run.gif"
        }, 800);
    }
}

//End the game
gameOver = () => {
    greenhill.pause();
    localStorage.setItem('mostRecentScore', counter);
    setTimeout(() => {
        return window.location.assign("/end-screen.html")
    }, 2500);
    
}

//Turn music on and off
musicToggle = (greenhill) => {
    if (greenhill.paused) {
        greenhill.play();
        toggle.innerHTML = "Music Off";
    }
    else {
        greenhill.pause();
      toggle.innerHTML = "Music On";
        }
    }
}
//play theme when player clicks anywhere
let playonce = true;
document.addEventListener("mouseenter", function () {
    if(playonce){
        theme.play();
    }
    playonce = false;
    
})

///////////////////////////////////////////////////

//Start screen
startGame = () => {
    greenhill.play();
    theme.pause();
    start.style.display = "none";
    runGame();
}

// updating high score //
//Data (string) from local storage is converted into array object
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScores.forEach(score => {
    //create list 
    const listItem = document.createElement('li');
    listItem.classList.add('high-score');
    listItem.innerText = `${score.name} - ${score.score}`;
    highScoreList.appendChild(listItem);
   })