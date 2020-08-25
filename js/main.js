//Event to load window
window.addEventListener('load', init);

//Global

//Available levels
const levels = {
    easy: 5,
    medium: 3,
    hard: 1
};

//Current level
let currentLevel = levels.easy;

let time = currentLevel + 1;
let score = 0;
let isPlaying;

//DOM elements

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
    'hat',
    'river',
    'lucky',
    'statue',
    'generate',
    'stubborn',
    'cocktail',
    'runaway',
    'joke',
    'developer',
    'establishment',
    'hero',
    'javascript',
    'nutrition',
    'revolver',
    'echo',
    'siblings',
    'investigate',
    'horrendous',
    'symptom',
    'laughter',
    'magic',
    'master',
    'space',
    'definition'
];

//Initial stage of game

function init() {
    //Load word from array
    showWord(words);
    //Start matching on word input
    wordInput.addEventListener('input', startMatch);
    //Call countdown function every second
    setInterval(countdown, 1000);
    //Check game status
    setInterval(checkStatus, 50);
}

//Start Match
function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }
    if (score===-1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }
    changeLevel();
}

function changeLevel(){
    if (score < 10) {
        currentLevel = levels.easy;
    } else if (score >= 10 && score <= 30) {
        currentLevel = levels.medium;
        seconds.innerHTML = currentLevel;
    } else {
        currentLevel = levels.hard;
        seconds.innerHTML = currentLevel;
    }
}

//Match current word to input
function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct!!!'
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }
}

//Pick & Show random word
function showWord(words) {

    //Output random word
    currentWord.innerHTML = words[Math.floor(Math.random() * words.length)];
}

//Countdown timer
function countdown() {
    //Make sure time is not run out
    if (time > 0) {
        //Time decrement
        time--;
    } else if (time === 0) {
        //Stop the game
        isPlaying = false;
    }
    //Show time
    timeDisplay.innerHTML = time;
}

//Check game status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Game Over!!!';
        score = -1;
    }
}