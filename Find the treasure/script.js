const map = document.querySelector('.map');
const buttonStart = document.querySelector('.start');
const buttonNewGame = document.querySelector('.new-game');
const buttonEnd = document.querySelector('.end');
const clicks = document.querySelector('.clicks');
const distance = document.querySelector('.distance');
const record = document.querySelector('.record');
const winner = document.querySelector('.winner');
const dagger = document.querySelector('.dagger');

let randX, randY;
let coordX, coordY;
let dist, distX, distY;
let gameStart = false;
let click = 0;
let win = false;

if(!localStorage.getItem('record')) {
    record.textContent = '0';
} else {
    record.textContent = localStorage.getItem('record');
}

const randCoordFun = () => {
    randX = Math.floor(Math.random() * map.offsetWidth);
    randY = Math.floor(Math.random() * map.offsetHeight); 
}

const gipotenuse = (x, y, a, b) => {
    let daggerCoordX = a;
    let daggerCoordY = b;
    distX = x - randX;
    distY = y - randY;
    dist = Math.floor(Math.sqrt((distX ** 2) + (distY ** 2)));
    distCheck(dist, daggerCoordX, daggerCoordY);
};

const animate = () => {
    winner.classList.add('heartBeat');
};

const coordClick = (x, y, a, b) => {
    let daggerCoordX = a;
    let daggerCoordY = b;
    coordX = x;
    coordY = y;
    gipotenuse(coordX, coordY, daggerCoordX, daggerCoordY);
};

const daggerDraw = (x, y, color) => {
    dagger.style.top = (y - 10) + 'px';
    dagger.style.left = (x - 10) + 'px';
    dagger.style.color = color;
    dagger.style.display = 'flex';
};

const distCheck = (dist, x, y) => {
    if (dist < 6) {
        distance.textContent = '0';
        win = true;
        winner.style.display = 'block';
        winner.textContent = 'ТИ ВИГРАВ !';
        animate();
        daggerDraw(x, y, 'black'); 
        if (!localStorage.getItem('record')) {
            localStorage.setItem('record', click);
            record.textContent = localStorage.getItem('record');
        }
        if (click < localStorage.getItem('record')) {
            localStorage.clear();
            localStorage.setItem('record', click);
            record.textContent = localStorage.getItem('record');
        }    
    } else if (dist < 10) {
        distance.textContent = dist + '     Обпечешся!';
    } else if (dist < 20) {
        distance.textContent = dist + '     Дуже гараяче';
    } else if (dist < 40) {
        distance.textContent = dist + '     Гаряче';
    } else if (dist < 80) {
        distance.textContent = dist + '     Терло';
    } else if (dist < 160) {
        distance.textContent = dist + '     Холодно';
    } else if (dist < 320) {
        distance.textContent = dist + '     Дуже холодно';
    } else {
        distance.textContent = dist + '     Замерзнеш!';
    }
};

buttonStart.addEventListener('click', () => {
    gameStart = true;
    win = false;
    click = 0;
    winner.style.display = 'none';
    clicks.textContent = '0';
    distance.textContent = '0';
    dagger.style.display = 'none';
    if (localStorage.getItem('record')) {
        record.textContent = localStorage.getItem('record');
    } else {
        record.textContent = '0';
    }
    randCoordFun();
});

buttonNewGame.addEventListener('click', () => {
    winner.style.display = 'none';
    clicks.textContent = '0';
    distance.textContent = '0';
    record.textContent = '0';
    gameStart = true;
    click = 0;
    dagger.style.display = 'none';
    localStorage.clear();
    randCoordFun();
});

buttonEnd.addEventListener('click', () => {
    gameStart = false;
    clicks.textContent = '0';
    distance.textContent = '0';
    dagger.style.display = 'none';
    click = 0;
});

map.addEventListener('click', () => {
    if (gameStart == true && win != true && click < 30) {
        click++;
        clicks.textContent = click;
        coordClick(event.offsetX, event.offsetY, event.offsetX, event.offsetY);         
    }
    if (click == 30) {
        winner.style.display = 'block';
        winner.textContent = 'ТИ ПРОГРАВ !';
        animate();
        daggerDraw(randX, randY, 'red');
    }
});