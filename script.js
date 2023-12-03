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
const squareEls = document.querySelectorAll(".square");
const movesEl = document.querySelector('#moves-num');
const missesEl = document.querySelector('#misses-num');
const accuracyEl = document.querySelector('#accuracy-num')

let randomlyPopulatedArray = []
let selectedSquares = [];
let matchedPairs;
let moves;
let misses;
let accuracy;
let gameWon;

function startGame() {
    matchedPairs = 0;
    moves = 0;
    misses = 0;
    accuracy = 0;
    gameWon = false;
    randomlyPopulatedArray = shuffleArray([...sportsArray]);
}

startGame();

// The Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


squareEls.forEach(function (squareEl, index) {
    squareEl.addEventListener('click', function () {
        handleClick(index);
    });
});

function handleClick(index) {
    if (selectedSquares.length < 2 && !selectedSquares.includes(index) && gameWon === false && !squareEls[index].textContent) {
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

function checkWin() {
    if (matchedPairs === 6) {
        gameWon = true;
        checkAccuracy();
        winMessage();
    } else {
        gameWon = false;
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

function winMessage() { 
    squareEls.forEach(function (squareEl) {
    squareEl.style.display = 'none'
    })
    
    boardEl.textContent = "You Won!";
    boardEl.style.display = 'flex';
    boardEl.style.justifyContent = 'center';
    boardEl.style.alignItems = 'center';
    boardEl.style.fontSize = '60px';
    boardEl.style.height = '450px';
    boardEl.style.width = '700px';
}





// boardEl.classList.add('winning-message');

// boardEl.style.display = 'none'

// squareEl.remove();
// squareEls[index1].remove();
// squareEls[index2].remove();


// squaresMatch(content1, content2);
// function squaresMatch(square1, square2) {
//     if (square1 === square2) {
//         matchedPairs++
//     } else {
//         setTimeout(() => {
//             squareEls[index1].textContent = '';
//             squareEls[index2].textContent = '';
//         }, 1000);
//     }
// }


// squareEls[index1].style.backgroundColor = "white";
//                 squareEls[index2].style.backgroundColor = "white";
//                 squareEls[index1].remove()
//                 boardEl.removeChild(squareEls[index1]);
//                 boardEl.remove(squareEls[index2]);