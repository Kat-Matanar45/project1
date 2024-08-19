let title = prompt("Как называется ваш проект?", " калькулятор верстки");
let screens = prompt("Какие типы экранов нужно разработать?", "Простые, сложные");
let screenPrice = +prompt('Сколько будет стоить данная работа?');
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = +prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = +prompt('Сколько это будет стоить?');

let fullPrice; 
let servicePercentPrice; 
let allServicePrices;
let rollback = 10;

const showTypeOf = function(variable) {
    console.log (variable, typeof variable);
}

const getAllServicePrices = function() {
    return servicePrice1 + servicePrice2;
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

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices); 
title = getTitle(title);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

screens = screens.toLowerCase().split(', ');

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(screens);

console.log(allServicePrices);
console.log(servicePercentPrice);
console.log(title);
console.log(getRollbackMessage(fullPrice));
