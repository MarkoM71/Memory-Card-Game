const soccerBall = '⚽️';
const basketBall = '🏀';
const tennisBall = '🎾';
const football = '🏈';
const baseball = '⚾️';
const golf = '⛳️'; 

const sportsArray = [soccerBall, soccerBall, baseball, baseball,
    tennisBall, tennisBall, football, football,
    basketBall, basketBall, golf, golf];

const boardEl = document.querySelector('#board');
const movesEl = document.querySelector('#moves-num');
const missesEl = document.querySelector('#misses-num');
const accuracyEl = document.querySelector('#accuracy-num');
const playAgainBtnEl = document.querySelector('.play-again-button')
const playerInputEl = document.querySelector('#player-input');
const playerDisplayEl = document.querySelector('#p-name'); 

let randomlyPopulatedArray;
let selectedSquares;
let matchedPairs;
let moves;
let misses;
let accuracy;
let gameFinish;
let playerName; 
let leadershipArray = [];
let finalArray = [];
let gameOutcome;

class Player{
    constructor(name, moves, misses, accuracy, gameOutcome) {
        this.name = name;
        this.moves = moves;
        this.misses = misses;
        this.accuracy = accuracy;
        this.gameOutcome = gameOutcome
    }
}

function startGame() {
    randomlyPopulatedArray = []
    selectedSquares = [];
    matchedPairs = 0;
    moves = 0;
    misses = 0;
    accuracy = 0;
    gameFinish = false;
    movesEl.textContent = '0';
    missesEl.textContent = '0';
    accuracyEl.textContent = '0%';
    playerName = playerInputEl.value;
    playerDisplayEl.textContent = "Your Name";
    
    boardEl.innerHTML = '';

    for (let i = 0; i < 12; i++) {
        boardEl.innerHTML += `<div class="square"></div>`
    }

    randomlyPopulatedArray = shuffleArray([...sportsArray]);

    const squareEls = document.querySelectorAll(".square");

    squareEls.forEach(function (squareEl, index) {
    squareEl.addEventListener('click', function () {
        handleClick(index);
    });
    });
    
    function handleClick(index) {
    if (selectedSquares.length < 2 && !selectedSquares.includes(index) && gameFinish === false && !squareEls[index].textContent) {
        selectedSquares.push(index);
        squareEls[index].textContent = randomlyPopulatedArray[index];

        if (selectedSquares.length === 2) {
            const [index1, index2] = selectedSquares;
            const content1 = randomlyPopulatedArray[index1];
            const content2 = randomlyPopulatedArray[index2];
            addMove();

            if (content1 === content2) {
                matchedPairs++;
                squareEls[index1].style.backgroundColor = 'yellow';
                squareEls[index2].style.backgroundColor = 'yellow';
                setTimeout(() => {
                    squareEls[index1].style.visibility = 'hidden';
                    squareEls[index2].style.visibility = 'hidden';
                    
                }, 1000);

            } else {
                setTimeout(() => {
                    squareEls[index1].textContent = '';
                    squareEls[index2].textContent = '';
                }, 1250);
                addMisses();
            }
            checkWin();
            selectedSquares = [];
        }
    }
}
}

startGame();

document.querySelector(".new-player-name").addEventListener("submit", function (event) {
    event.preventDefault();
    playerName = playerInputEl.value;
    addPlayerName(playerName);
    let playerForm = document.querySelector(".new-player-name");
    playerForm.reset();
    popUpPlayerName.style.display = "none";
})

function addPlayerName(name) {
    playerDisplayEl.textContent = `${name}`;
}

// The Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function checkWin() {
    if (misses === 10) {
        gameFinish = true;
        checkAccuracy();
        lossMessage();
        gameOutcome = 'Loss';
        addToLeadershipArray();
        displayLeaders();
        
    }
    else if (matchedPairs === 6) {
        gameFinish = true;
        checkAccuracy();
        winMessage();
        gameOutcome = 'Win';
        addToLeadershipArray();
        displayLeaders();
        
    } else {
        gameFinish = false;
    }
}

function addMove() {
    moves += 1;
    movesEl.textContent = `${moves}`;
}

function addMisses() {
    misses += 1;
    missesEl.textContent = `${misses}`;
}

function checkAccuracy() {
    accuracy = Math.round(((moves - misses) / moves)*100);
    accuracyEl.textContent = `${accuracy}%`
}

function lossMessage() {
    boardEl.classList.remove('grid-board')
    boardEl.classList.add('finish-message');
    boardEl.textContent = "You Lost!";
}

function winMessage() { 
    boardEl.classList.remove('grid-board')
    boardEl.classList.add('finish-message');
    boardEl.textContent = "You Won!";
}   

playAgainBtnEl.addEventListener('click', function () {
    boardEl.textContent = ''; 
    boardEl.classList.remove('finish-message');
    boardEl.classList.add('grid-board');
    startGame(); 
});

function addToLeadershipArray() {
    let newPlayer = new Player(playerName, moves, misses, accuracy, gameOutcome);
    leadershipArray.push(newPlayer);
    sortingFinalArray()
    storeData();
}

//STORE FINAL ARRAY IN LOCAL STORAGE
function storeData() { 
    localStorage.setItem(`finalArray`, JSON.stringify(finalArray));
}

//RESTORE FINAL ARRAY FROM LOCAL STORAGE WHEN PAGE REFRESHED
function restoreData() {
    if (!localStorage.finalArray) {
        displayLeaders();
    } else {
        let objects = localStorage.getItem('finalArray')
        objects = JSON.parse(objects);
        finalArray = objects;
        displayLeaders();
    }
}

restoreData();

function displayLeaders() { 
    let resultsLeaders = document.querySelector(".leadership-container");
    resultsLeaders.innerHTML = "";
    for (let i = 0; i < finalArray.length; i++) {
        let player = finalArray[i];
        let playerResultsEl = document.createElement("div");
        playerResultsEl.setAttribute("class", "player-row");
        playerResultsEl.innerHTML = `
            <div>${player.name}</div>
            <div>${player.moves}</div>
            <div>${player.misses}</div>
            <div>${player.accuracy}%</div>
            <div>${player.gameOutcome}</div>`
        resultsLeaders.appendChild(playerResultsEl);
    }
}

function sortingFinalArray() {
    const namedPlayers = leadershipArray.filter(player => player.name);

    const sortedPlayers = namedPlayers.sort((a, b) => {
        if (a.gameOutcome === "Win" && b.gameOutcome !== "Win") {
            return -1;
        } else if (a.gameOutcome !== "Win" && b.gameOutcome === "Win") {
            return 1;
        } else {
            return 0;
        }
    });

    const winners = sortedPlayers.filter(player => player.gameOutcome === "Win");
    const sortedWinners = winners.sort((a, b) => b.accuracy - a.accuracy);

    const losers = sortedPlayers.filter(player => player.gameOutcome !== "Win");
    const sortedLosers = losers.sort((a, b) => b.accuracy - a.accuracy);

    finalArray = [...sortedWinners, ...sortedLosers].slice(0, 10);
}

//DISPLAY LEADERSHIP BOARD
let leadershipButton = document.querySelector(".leadership-button");
const popUpLeaders = document.querySelector('.pop-up-leaders');
leadershipButton.addEventListener("click", function () {
    popUpLeaders.style.display = "block";
})

//CLOSE LEADERSHIP BOARD
let popUpButton = document.querySelector(".close");
popUpButton.addEventListener("click", function () {
    popUpLeaders.style.display = "none";
})

//CLOSE LEADERSHIP BOARD OR ADD-NAME FORM WITH CLICK OUTSIDE OF MODAL
window.onclick = function(event) {
  if (event.target == popUpLeaders) {
    popUpLeaders.style.display = "none";
  } else if (event.target == popUpPlayerName) {
    popUpPlayerName.style.display = "none";
  }
}

//DISPLAY ADD-NAME FORM
let addNameButton = document.querySelector(".add-name-button");
const popUpPlayerName = document.querySelector('.pop-up-player-name');
addNameButton.addEventListener("click", function () {
    popUpPlayerName.style.display = "block";
})

//CLOSE ADD-NAME FORM
let closeAddNameButton = document.querySelector(".close-new-player");
closeAddNameButton.addEventListener("click", function () {
    popUpPlayerName.style.display = "none";
})
