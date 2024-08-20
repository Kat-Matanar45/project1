let title;
let screens;
let screenPrice;
let adaptive;
let service1;
let service2;

let fullPrice; 
let servicePercentPrice; 
let allServicePrices;
let rollback = 10;

const isNumber = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
}

const asking = function() {
    title = prompt("Как называется ваш проект?", " калькулятор верстки");
    screens = prompt("Какие типы экранов нужно разработать?", "Простые, сложные");

//   screenPrice = prompt('Сколько будет стоить данная работа?');

//   while((!isNumber(screenPrice)) || (screenPrice === "null")) {
//        screenPrice = prompt('Сколько будет стоить данная работа?');
//    }

    do {screenPrice = prompt('Сколько будет стоить данная работа?')} 
    while((!isNumber(screenPrice)) || (screenPrice === null));

    adaptive = confirm("Нужен ли адаптив на сайте?");
}

const getAllServicePrices = function() {
    let sum = 0;
    for (let i = 0; i<2; i++) {
        if (i===0) {service1 = prompt('Какой дополнительный тип услуги нужен?');}
        if (i===1) {service2 = prompt('Какой дополнительный тип услуги нужен?');}

        sum += +prompt('Сколько это будет стоить?');
    }
    return sum
}

const showTypeOf = function(variable) {
    console.log (variable, typeof variable);
}

const getRollbackMessage = function(price) {
    switch (true) {
        case price >= 30000:
            return "Даем скидку в 10% \nИтоговая сумма за работу:" + " " + (price - (price/100*10));
        case price >= 15000 && price < 30000:
            return "Даем скидку в 5% \nИтоговая сумма за работу:" + " " + (price - (price/100*5));
        case price >= 0 && price < 15000:
            return "Скидка не предусмотрена \nИтоговая сумма за работу:" + " " + price;
        case price < 0:
            return "Что-то пошло не так";
    }}

function getFullPrice(screenPrice, allServicePrices) {
        return screenPrice + allServicePrices
    }

function getTitle(title) {
    if (!title) {return title;}
    if (title[0] === ' ') {return title[1].toUpperCase() + title.slice(2);}
    if (title[0] !== ' ') {return title[0].toUpperCase() + title.slice(1);}
    }

function getServicePercentPrices(fullPrice, rollback) {
    return fullPrice - (fullPrice * (rollback / 100))
}

asking();
screenPrice = Number(screenPrice.trim());

allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices); 
title = getTitle(title);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

screens = screens.toLowerCase().split(', ');

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(screens);

console.log("allServicePrices", allServicePrices);
console.log(servicePercentPrice);
console.log(title);
console.log(getRollbackMessage(fullPrice));

console.log("Стоимость верстки экранов " + screenPrice + " рублей" + "\nСтоимость разработки сайта " + fullPrice + " рублей");