const formSearch = document.querySelector('.form-search');
const inputCitiesFrom = formSearch.querySelector('.input__cities-from');
const dropdownCitiesFrom = formSearch.querySelector('.dropdown__cities-from');
const inputCitiesTo = formSearch.querySelector('.input__cities-to');
const dropdownCitiesTo = formSearch.querySelector('.dropdown__cities-to');
const inputDateDepart = formSearch.querySelector('.input__date-depart');
const seachBTN = document.getElementById('seach-btn');
const cityFrom = document.querySelector('.cityFrom-value');
const cityTo = document.querySelector('.cityTo-value');



// Data
const CITIES_API = 'Data/cities.json'; // дані з містами 
const PROXY = '​https://cors-anywhere.herokuapp.com/';
const CALENDAR = 'http://min-prices.aviasales.ru/calendar_preload';  // календар польотів

let city = [];

// Функції

// запит на сервер
const getData = (url, callback) => {
    const reguest = new XMLHttpRequest();

    reguest.open('GET', url);

    reguest.addEventListener('readystatechange', () => {
        if (reguest.readyState  !== 4) return;

        if (reguest.status === 200) {
            callback(reguest.response);
        } else {
            console.error(reguest.status);
        }
    });

    reguest.send();

};

const showCity = (input, list) => {
    list.textContent = ''; // при кліку на інпут вікно не появляється

    if (input.value === '') return; // якщо інпут пустий то вікно не появляється
 
    const filterCity = city.filter((item) => {
        const fixItem = item.name.toLowerCase();  // записуємо міста в нижньому регістрі
        return fixItem.includes(input.value.toLowerCase());  // повертаємо містя в нижньому регістрі в filterCity
    });

    // створюємо список міст
    filterCity.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('dropdown__city');  // добавляємо клас
        li.textContent = item.name;
        list.append(li);  // вставляємо назву міста в li
    });
};

const selectCity = (event, input, list) => {
    const target = event.target; // куди ми клікнули = li --> назва міста в випадаючому списку
    if (target.tagName.toLowerCase() === 'li') {  // перевіряємо чи клікнули точно на li, а не повз нього
        input.value = target.textContent;  // записуємо місто в інпут
        list.textContent = '';  // при кліку на місто вікно пропадає
    }
};

// Обработчик подій

inputCitiesFrom.addEventListener('input', () => {
    showCity(inputCitiesFrom, dropdownCitiesFrom);  // передаємо значення в showSity
});

inputCitiesTo.addEventListener('input', () => {
    showCity(inputCitiesTo, dropdownCitiesTo);  // передаємо значення в showSity
});

// при кліку на елемент списку значення записується в інпут
dropdownCitiesFrom.addEventListener('click', (event) => {
    selectCity(event, inputCitiesFrom, dropdownCitiesFrom);
});

dropdownCitiesTo.addEventListener('click', (event) => {
    selectCity(event, inputCitiesTo, dropdownCitiesTo);
});

// виклики функцій 

getData(CITIES_API, (data) => {
    // фільтруємо дані з CITIES_API
    city = JSON.parse(data).filter((item) => {
        return item.name; // повертаються дані в яких поле name не є пустим
    });
});

//  getData(CITIES_API, data => city = JSON.parse(data).filter(item => item.name));  // --> те саме що і код вище

// let cityFromValue; 
// let cityToValue;

// const classFly = ['Перший клас', 'Бізнес-клас', 'Економ-клас'];




// seachBTN.addEventListener('click', () => {
//     let cityFromValue = inputCitiesFrom.value; 
//     let cityToValue = inputCitiesTo.value;

//     console.log(cityFromValue);
//     console.log(cityToValue);

//     let dataText = data;
//     let codeText = code;
//     let biletClassValue = biletClass;

//     cityFrom.textContent = cityFromValue;
//     cityTo.textContent = cityToValue;
    


//     codeRandom = Math.floor(Math.random() * 100000);
//     codeText.textContent = codeRandom;
//     let day = Math.floor(Math.random() * 32 + 1);
//     let month = Math.floor(Math.random() * 11 + 1);
//     dataText.textContent = `${day}` + '/' + `${month}` + '/' + '2020';

//     let randomClass = classFly[Math.floor(Math.random()*3)];
//     console.log(randomClass);

//     biletClassValue.textContent = randomClass;

//     fromOclock  = oclock;
//     let frOcHours = Math.floor(Math.random() * 23 + 1);
//     console.log(frOcHours);
//     let frOcMinutes = Math.floor(Math.random() * 59 + 1);
//     console.log(frOcMinutes);

//     fromOclock.textContent = 'at ' + `${frOcHours}` + ':' + `${frOcMinutes}`;
// });

