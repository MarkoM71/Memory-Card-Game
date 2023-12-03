const squareEls = document.querySelectorAll(".square");

const soccerBall = '⚽️';
const basketBall = '🏀';
const tennisBall = '🎾';
const football = '🏈';
const baseball = '⚾️';
const golf = '⛳️'; 

const sportsArray = [soccerBall, soccerBall, baseball, baseball,
    tennisBall, tennisBall, football, football,
    basketBall, basketBall, golf, golf];

const movesEl = document.querySelector('#moves-num');
const missesEl = document.querySelector('#misses-num');
const accuracyEl = document.querySelector('#accuracy-num')

let randomlyPopulatedArray = []
let selectedSquares = [];
let matchedPairs = 0;
let moves = 0;
let misses = 0;
let accuracy = 0;
let gameWon = false;

// The Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

randomlyPopulatedArray = shuffleArray([...sportsArray]);


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
                console.log(matchedPairs);
                // squareEls[index1].style.background = 'white';
                // squareEls[index2].style.background = 'white';
            } else {
                setTimeout(() => {
                    squareEls[index1].textContent = '';
                    squareEls[index2].textContent = '';
                }, 1000);
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