const search = document.querySelector('.button');
const date = document.querySelector('.input__date-depart');
const mainCityTo = document.querySelector('.input__cities-to');
const mainCityFrom = document.querySelector('.input__cities-from');
const biletFrom = document.querySelector('.cityFrom-value');
const biletTo = document.querySelector('.cityTo-value');
const dataValue = document.querySelector('.data-value');
const code = document.querySelector('.code-value');
const classValue = document.querySelector('.bilet-class');
const time = document.querySelector('.oclock');
const download = document.querySelector('.download');
const bilet = document.querySelector('.div-bilet');

const dataObj = {
    toCity: '',
    fromCity: '',
    departureDate: '',
    biletCode: '',
    biletClass: '',
    fulltime: ''
};

const biletClass = ['Перший клас', 'Бізнес-клас', 'Економ-клас'];

// function
const main = () => {

    const inputData = () => {

        // input to
        let dataFrom = mainCityFrom.value;
        dataObj.fromCity = dataFrom;
    
        // input from
        let dataTo = mainCityTo.value;
        dataObj.toCity = dataTo;

        // input date
        let depDate = date.value;
        dataObj.departureDate = depDate; 

        // randomized bilet code
        let ranCode = Math.floor(Math.random() * 1000000);
        dataObj.biletCode = ranCode;

        // randomized bilet class
        let randomClass = biletClass[Math.floor(Math.random() * 3)];
        dataObj.biletClass = randomClass;

    };
    
    const randomTime = () => {

        // departure hours
        let randomHours = Math.floor(Math.random() * 24);
        let validHours = randomHours;
        if (randomHours < 10) {
            validHours = '0' + randomHours;
        }
        dataObj.hours = validHours;

        //departure minutes
        let randomMinutes = Math.floor(Math.random() * 60);
        let validMinutes = randomMinutes;
        if (randomMinutes < 10) {
            validMinutes = '0' + randomMinutes;
        }
        dataObj.minutes = validMinutes;

    };

    const downloadData = () => {

        //bilet from
        biletFrom.textContent = dataObj.fromCity;  

        //bilet To
        biletTo.textContent = dataObj.toCity;

        //bilet date
        dataValue.textContent = dataObj.departureDate;

        //bilet code
        code.textContent = dataObj.biletCode;

        //bilet class
        classValue.textContent = dataObj.biletClass;

        // full time
        time.textContent = 'at ' + dataObj.hours + ':' + dataObj.minutes;

    };

    //start function
    inputData();
    randomTime();
    downloadData();
    
};

search.addEventListener('click', () => {

    search.style.background = '#e53935';
    download.style.display = 'flex';
    
    if(bilet.style.display = 'flex') {
        bilet.style.display = 'none';
    }

    setTimeout(() => {
        search.style.background = '#f57c00';
        download.style.display = 'none';
        bilet.style.display = 'flex';
        bilet.style.marginTop = '80px';
        main();
    }, 1500); 

});