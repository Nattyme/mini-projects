const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const scrore = document.querySelector('#score');

let result = 0;

function randomSquare () {
    squares.forEach(square => {
        square.classList.remove('mole')
    });

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');
}

function  moveMole() {
    let timeId = null;
    timeId = setInterval(randomSquare, 500);
}
moveMole();