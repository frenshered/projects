'use strict';

const cartBtn = document.querySelector('#cart-btn');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close');
const buttonAuth = document.querySelector('.btn-auth');
const modalAuth = document.querySelector('#modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const buttonModalAuth = document.querySelector('#button-modal-auth');
const loginInput = document.querySelector('.login');
const passwordInput = document.querySelector('.password');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.btn-out');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logotype');
const cardsMenu = document.querySelector('.cards-menu');
const modalBody = document.querySelector('.modal-body');
const modalPrise = document.querySelector('.prise-tag');
const clearCart = document.querySelector('.clear-cart');

let login = localStorage.getItem('login');

const cart = [];

// ! FUNCTION

const getData = async function(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`error at address ${url}, status ${response.status}`);
    }

    return await response.json();
};

const toogleModal = () => {
    modal.classList.toggle('modal-open');
};
const toogleModalAuth = () => {
    modalAuth.classList.toggle('modal-open');
};

function logIn(event) {
    event.preventDefault();

    loginInput.addEventListener('click', () => {
        loginInput.style.color = '#000000';
        loginInput.value = '';
    });
    passwordInput.addEventListener('click', () => {
        passwordInput.style.color = '#000000';
        passwordInput.value = '';
    });

    if (loginInput.value.length < 2 || passwordInput.value < 5) {
        if (loginInput.value.length < 2) {
            loginInput.style.color = '#f44336';
            loginInput.value = '';
            loginInput.value = 'Вы ничего не ввели';
            return;
        }
        if (passwordInput.value.length < 5) {
            passwordInput.style.color = '#f44336';
            passwordInput.value = '';
            passwordInput.value = 'Вы ничего не ввели';
            return;
        }

    } else {

        login = loginInput.value;

        localStorage.setItem('login', login);

        toogleModalAuth();

        buttonAuth.removeEventListener('click', toogleModalAuth);
        closeAuth.removeEventListener('click', toogleModalAuth);
        logInForm.removeEventListener('submit', logIn);

        logInForm.reset();

        checkAuth();
    };
};

function notAuthorized() {
    console.log("not authorized");

    buttonAuth.addEventListener('click', toogleModalAuth);
    closeAuth.addEventListener('click', toogleModalAuth);
    logInForm.addEventListener('submit', logIn);
};

function logOut() {
        login = null;

        localStorage.removeItem('login');

        buttonAuth.style.display = 'flex';
        userName.style.display = 'none';
        buttonOut.style.display = 'none';

        buttonOut.removeEventListener('click', logIn);

        checkAuth();
};

function authorized() {
    console.log('authorized');

    userName.textContent = login;

    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    buttonOut.style.display = 'flex';
    cartBtn.style.display = 'flex';

    buttonOut.addEventListener('click', logOut);
};

function checkAuth () {
    if (login) {
        authorized();
    } else {
        notAuthorized();
    }
};

function createCardsRestaurants(res) {
    const { image, kitchen, name, price, stars, products, time_of_delivery: timeOfDelivery } = res;

    const card = `<a class="card wow fadeInUp card-restaurant" data-wow-delay="1s" data-products="${products}">
                    <img src="${image}" alt="card-img" class="card-img ind">
                    <div class="card-text">
                        <div class="card-heading">
                            <h3 class="card-title">${name}</h3>
                            <span class="card-tag tag">${timeOfDelivery}&nbspмин</span>
                        </div>
                        <div class="card-info">
                            <div class="rating"><img src="img/rating.svg" alt="star" class="rating-star">${stars}</div>
                            <div class="price">От ${price} ₽</div>
                            <div class="category">${kitchen}</div>
                        </div>
                    </div>
                </a>`;

    cardsRestaurants.insertAdjacentHTML('beforeend', card);
};

function createCardGood(res) {

    const { description, id, image, name, price } = res;

    const card = document.createElement('div');
    card.className = 'card';

    card.insertAdjacentHTML('beforeend',  `
            <img src="${image}" alt="card-img" class="card-img img-restaurants">
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title reg">${name}</h3>
                </div>
                <div class="card-info">
                    <div class="ingredients">${description}</div>
                </div>
                <div class="card-btn">
                    <button class="button button-primary res add-to-cart" id="${id}">
                        <span class="btn-text">В&nbspкорзину</span>
                        <img src="img/shopcarwhite.svg" alt="shop" class="res-img">
                    </button>
                    <div class="prise-tag">
                        <strong class="prise-bold cart-price"><p class="goods-prise">${ price }</p><p class="nam">₽</p></strong>
                    </div>
                </div>
            </div>
    `);

    cardsMenu.insertAdjacentElement('beforeend', card);
};

function openGoods(event) {
    const target = event.target;

    if (login) {

        const restaurant = target.closest('.card-restaurant');

        if(restaurant) {
            cardsMenu.textContent = '';
            containerPromo.classList.add('hide');
            restaurants.classList.add('hide');
            menu.classList.remove('hide');

            getData(`./db/${restaurant.dataset.products}`).then(data => data.forEach(createCardGood));
        }

    } else {
        toogleModalAuth();
    }
};

const addToCart = (event) => {
    const target = event.target;
    const buttonAddToCart = target.closest('.add-to-cart');

    if (buttonAddToCart) {
        const card = target.closest('.card');
        const title = card.querySelector('.card-title').textContent;
        const cost = card.querySelector('.goods-prise').textContent;
        const id = buttonAddToCart.id;

        const food = cart.find(item => item.id === id);

        if (food) {
            food.count += 1;
        } else {
           cart.push({id:id, title:title, cost:cost, count:1});
        }
    }
};

const renderCard = () => {
    modalBody.textContent = '';

    cart.forEach(item => {
        const { id, title, cost, count } = item;

        const itemCart = `
            <div class="foods-row">
                <span class="food-name">${ title }</span>
                <div class="modal-block">
                    <strong class="food-prise">${ cost }&nbsp₽</strong>
                    <div class="food-counter">
                        <button class="counter-btn counter-plus" data-id=${ id }>+</button>
                        <span class="counter">${ count }</span>
                        <button class="counter-btn counter-minus" data-id=${ id }>-</button>
                    </div>
                </div>
            </div>
        `;

        modalBody.insertAdjacentHTML('afterbegin', itemCart);
    });

    const totalPrice = cart.reduce((total, item) => total + (+item.cost) * item.count, 0);
    modalPrise.textContent = totalPrice;
};

const changeCount = (event) => {
    const target = event.target;

    if (target.classList.contains('counter-plus')) {
        const food = cart.find(item => item.id === target.dataset.id);
        food.count++;
        renderCard();
    }

    if (target.classList.contains('counter-minus')) {
        const food = cart.find(item => item.id === target.dataset.id);
        food.count--;

        if (food.count === 0) {
            cart.splice(cart.indexOf(food), 1);
        }

        renderCard();
    }

};

const init = () => {
    getData('./db/partners.json').then(data => data.forEach(createCardsRestaurants));

    cartBtn.addEventListener('click', () => {
        renderCard();
        toogleModal();
    });

    clearCart.addEventListener('click', () => {cart.length = 0; renderCard();})

    modalBody.addEventListener('click', changeCount);

    closeModal.addEventListener('click', toogleModal);

    cardsRestaurants.addEventListener('click', openGoods);

    cardsMenu.addEventListener('click', addToCart);

    logo.addEventListener('click', () => {
        containerPromo.classList.remove('hide');
        restaurants.classList.remove('hide');
        menu.classList.add('hide');
    });

    checkAuth();

    var slider = new Swiper('.swiper-container', {
        loop: true,
        direction: 'horizontal',
        autoplay: {
            delay: 4000,
        }
    });
};

init();

new WOW().init();
