const data = [
    {
        city: "Lviv",
        temp: {1: 20, 2: 11, 3: -10, 4: 0, 5: 5},
        speed: {1: 20, 2: 11, 3: 1, 4: 0, 5: 5},
        rainfall: {1: 15, 2: 9, 3: 0, 4: 0, 5: 3},
        pressure: {1: 760, 2: 762, 3: 755, 4: 760, 5: 761}
    },
    {
        city: "Kyiv",
        temp: {1: 20, 2: 11, 3: -10, 4: 0, 5: 5},
        speed: {1: 20, 2: 11, 3: 1, 4: 0, 5: 5},
        rainfall: {1: 15, 2: 9, 3: 0, 4: 0, 5: 3},
        pressure: {1: 760, 2: 762, 3: 755, 4: 760, 5: 761}
    },
    {
        city: "Kharkiv",
        temp: {1: 20, 2: 11, 3: -10, 4: 0, 5: 5},
        speed: {1: 20, 2: 11, 3: 1, 4: 0, 5: 5},
        rainfall: {1: 15, 2: 9, 3: 0, 4: 0, 5: 3},
        pressure: {1: 760, 2: 762, 3: 755, 4: 760, 5: 761}
    }
];

const weatherImg = [
    { 
        weatherNow: 'sun',
        1: 'sun.jpg',
        2: 'sun.jpg',
        3: 'sun.jpg',
        4: 'sun.jpg',
        5: 'sun.jpg',
        6: 'sun.jpg'
    },
    { 
        weatherNow: 'frost',
        1: 'snow.jpg',
        2: 'snow.jpg',
        3: 'snow.jpg',
        4: 'snow.jpg',
        5: 'snow.jpg',
        6: 'snow.jpg'
    },
    { 
        weatherNow: 'rain',
        1: 'rain.jpg',
        2: 'rain.jpg',
        3: 'storm.jpg',
        4: 'rain.jpg',
        5: 'rain.jpg',
        6: 'sun.jpg'
    },
    { 
        weatherNow: 'storm',
        1: 'storm.jpg',
        2: 'storm.jpg',
        3: 'rain.jpg',
        4: 'storm.jpg',
        5: 'sun.jpg',
        6: 'rain.jpg'
    }

];

const img = document.querySelectorAll('.img');
const city = document.querySelector('.city-title');
const dateText = document.querySelector('.date');
const speed = document.querySelector('.speed');
const temp = document.querySelector('.temp');
const rainfall = document.querySelector('.rainfall');
const pressure = document.querySelector('.pressure');
const input = document.querySelector('.search');
const button = document.querySelector('.btn-search');

let currentWeather;

// ! START SETTING

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
let day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }
let fullDate = day + '.' + month + '.' + year;

dateText.textContent = fullDate;

let randTemp;

const randTempFun = () => {
   randTemp = Math.floor(Math.random() * 5) + 1;
}

randTempFun();

let startCity = city.textContent;

for (i = 0; i < data.length; i++) {
    if (startCity == data[i].city) {
        speed.textContent = data[i].speed[randTemp];
        temp.textContent = data[i].temp[randTemp];
        rainfall.textContent = data[i].rainfall[randTemp];
        pressure.textContent = data[i].pressure[randTemp];
        break;
    }
}

const addData = () => {

    if (temp.textContent >= 20) { // sun
        currentWeather = 'sun';
        for (i = 0; i < weatherImg.length; i++) {
            if (currentWeather == weatherImg[i].weatherNow) {
                for (j = 0; j < img.length; j++) {
                    img[j].src = 'img/' + weatherImg[i][j + 1];
                }
                break;
            }
        }
    }

    if (temp.textContent > 0 && temp.textContent < 11) { // storm
        currentWeather = 'storm';
        for (i = 0; i < weatherImg.length; i++) {
            if (currentWeather == weatherImg[i].weatherNow) {
                for (j = 0; j < img.length; j++) {
                    img[j].src = 'img/' + weatherImg[i][j + 1];
                }
                break;
            }    
        }
    }

    if (temp.textContent >= 11 && temp.textContent < 20) { // rain
        currentWeather = 'rain';
        for (i = 0; i < weatherImg.length; i++) {
            if (currentWeather == weatherImg[i].weatherNow) {
                for (j = 0; j < img.length; j++) {
                    img[j].src = 'img/' + weatherImg[i][j + 1];
                }
                break;
            }  
        }
    }

    if (temp.textContent <= 0) { // frost
        currentWeather = 'frost';
        for (i = 0; i < weatherImg.length; i++) {
            if (currentWeather == weatherImg[i].weatherNow) {
                for (j = 0; j < img.length; j++) {
                    img[j].src = 'img/' + weatherImg[i][j + 1];
                }
                break;
            }  
        }
    }

}

addData();

// * END START SETTING

let cityArr = [];

for (i = 0; i < data.length; i++) {
    cityArr.push(data[i].city);
}

const checkCity = (inputValue) => {
    for (i = 0; i < cityArr.length; i++) {
        if (inputValue.toLowerCase() == cityArr[i].toLowerCase()) {
            city.textContent = inputValue[0].toUpperCase() + inputValue.replace(inputValue[0], '');
            input.value = '';           
            weather(city.textContent);
            break;
        } else {
            input.value = 'No city found';
            input.style.color = 'red';
        }
    }
}

const weather = (cityName) => {
    for (i = 0; i < cityArr.length; i++) {
        if (cityName == cityArr[i]) {
            for (j = 0; j < data.length; j++) {
                if (cityName == data[j].city) {
                    speed.textContent = data[i].speed[randTemp];
                    temp.textContent = data[i].temp[randTemp];
                    rainfall.textContent = data[i].rainfall[randTemp];
                    pressure.textContent = data[i].pressure[randTemp];
                }
            }
            break;
        }
    }
    addData();
};

input.addEventListener('click', () => {
    if ( input.style.color == 'red') {
        input.value = '';
        input.style.color = 'black';
    }
});

button.addEventListener('click', () => {
    for (i = 0; i < cityArr.length; i++) {
        if (input.value == cityArr[i].toLowerCase()) {
            randTempFun();
        }
    }
    checkCity(input.value);
});
