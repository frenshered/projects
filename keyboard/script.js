const btn = document.querySelectorAll('.btn');
const monitor = document.querySelector('.monitor');
const shift = document.querySelector('.shift');
const deleteAll = document.querySelector('.del-all');
const deleteOne = document.querySelector('.del-one');

let shiftActive = false;

monitor.textContent = '';

document.addEventListener('keypress', (event) => {
    monitor.textContent += event.key;
    for (let i = 0; i < btn.length; i++) {
        if (btn[i].textContent.toLowerCase() === event.key.toLowerCase() || btn[i].textContent.toUpperCase() === event.key.toUpperCase()) {
            addActive(btn[i].id);
        }
        if (btn[i].textContent == 'Space' && event.code == 'Space') {
            addActive(btn[i].id);
        }
    }
});

document.addEventListener('click', (event) => {
    if (event.target.classList[0] === 'btn' && event.target.textContent.length === 1 && shiftActive === false) { 
        addActive(event.target.id);
        monitor.textContent += event.target.textContent.toLowerCase();
    }

    if (event.target.textContent === 'Space') {
        addActive(event.target.id);
        monitor.textContent += ' ';
    }

    if (event.target.textContent.length > 1 && event.target.textContent.length < 5 && shiftActive === false) {
        let text = event.target.textContent;
        monitor.textContent += text[0];
    }

    if (shiftActive === true && event.target.classList[0] === 'btn') {
        addActive(event.target.id);
        if (event.target.textContent.length === 1) {
            monitor.textContent += event.target.textContent.toUpperCase();
        } 
    }

    if (shiftActive == true && event.target.textContent.length > 1 && event.target.textContent.length < 5) {
        let text = event.target.textContent;
        monitor.textContent += text[2];
    }
});

shift.addEventListener('click', () => {
    shift.classList.toggle('shift-active');
    if (shift.classList[2]) {
        shiftActive = true;
    } else  {
        shiftActive = false;
    }
});

deleteAll.addEventListener('click', () => {
    deleteAll.classList.add('active');
    setTimeout(() => {
        deleteAll.classList.remove('active');
    }, 200);
    monitor.textContent = '';
});

deleteOne.addEventListener('click', () => {
    deleteOne.classList.add('active');
    setTimeout(() => {
        deleteOne.classList.remove('active');
    }, 200);
    if (monitor.textContent.length > 0) {
        let text = monitor.textContent;
        let arrText = text.split('');
        arrText.pop();
        //let arr = arrText.slice();
        let valid = arrText.join('');
        monitor.textContent = valid;
    }
    deleteOne.removeEventListener('click', () => {
        deleteOne.classList.add('active');
        setTimeout(() => {
            deleteOne.classList.remove('active');
        }, 200);
        if (monitor.textContent.length > 0) {
            let text = monitor.textContent;
            let arrText = text.split('');
            arrText.pop();
            //let arr = arrText.slice();
            let valid = arrText.join('');
            monitor.textContent = valid;
        }
    });
});

const addActive = (id) => {
    let btnId = document.getElementById(`${id}`);
    btnId.classList.add('active');
    setTimeout(() => {
        btnId.classList.remove('active');
    }, 200);
}