//DOM Queries
const username = document.querySelector('#user-name');
const submitScore = document.querySelector('#submitScoreBtn');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.querySelector('#finalScore');
const highScoreList = document.querySelector('.highScoreList');
//Data (string) from local storage is converted into array object
const highScores = JSON.parse(localStorage.getItem("highScores")) || []; //empty array if no data
const max_High_Scores = 5;

//sounds
let toggle = document.querySelector('#musicBtn');
let theme = new Audio('/sounds/gameover.mp3');
theme.loop = true;
theme.volume = 0.05;
//Play ending music
theme.play();

//Final player score text is updated from local storage data
finalScore.innerText = mostRecentScore

//Button cannot be clicked if input box is empty
username.addEventListener('keyup', () => {
    submitScore.disabled = !username.value;
})

saveHighScore = (e) => {
    //Prevents default action of form
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
     };
        highScores.push(score);
        //Sorts highest to lowest
        highScores.sort((a,b) => {
         return b.score - a.score;
     });
        //removes after 5th index
        highScores.splice(5);

     //turn data string and update local storage 
     localStorage.setItem('highScores', JSON.stringify(highScores));
     window.location.assign("/index.html");
}

// display high score //
    highScores.forEach(score => {
        //create list 
        const listItem = document.createElement('li');
        listItem.classList.add('high-score');
        listItem.innerText = `${score.name} - ${score.score}`;
        highScoreList.appendChild(listItem);
       })
       
//Turn music on and off
musicToggle = (theme) => {
      if (theme.paused) {
          theme.play();
          toggle.innerHTML = "Music Off";
      }
      else {
          theme.pause();
        toggle.innerHTML = "Music On";
      }
}

//*Score code from James Q Quick video "Build a Quiz App" https://youtube.com/playlist?list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx//