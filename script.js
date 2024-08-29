'use strict'

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    service1: '',
    service2: '',
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,
    rollback: 10,
    isNumber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num)
    },
    asking: function() {
        appData.title = prompt("Как называется ваш проект?", " калькулятор верстки");
        appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, сложные");
    
        do {appData.screenPrice = prompt('Сколько будет стоить данная работа?')} 
        while((!appData.isNumber(appData.screenPrice)) || (appData.screenPrice === null));
        appData.screenPrice = Number(appData.screenPrice.trim());
    
        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },
    getAllServicePrices: function() {
        let sum = 0;
        let value;
        for (let i = 0; i<2; i++) {
            if (i===0) {appData.service1 = prompt('Какой дополнительный тип услуги нужен?');}
            if (i===1) {appData.service2 = prompt('Какой дополнительный тип услуги нужен?');}
    
            do {value = prompt('Сколько это будет стоить?')} 
            while((!appData.isNumber(value)) || (value === null));
            value = Number(value.trim());
            sum = sum + value;
        }
        return sum
    },
    getRollbackMessage: function(price) {
        switch (true) {
            case price >= 30000:
                return "Даем скидку в 10% \nИтоговая сумма за работу:" + " " + (price - (price/100*10));
            case price >= 15000 && price < 30000:
                return "Даем скидку в 5% \nИтоговая сумма за работу:" + " " + (price - (price/100*5));
            case price >= 0 && price < 15000:
                return "Скидка не предусмотрена \nИтоговая сумма за работу:" + " " + price;
            case price < 0:
                return "Что-то пошло не так";
        }},
    getFullPrice: function() {
            return appData.screenPrice + appData.allServicePrices
        },
    getTitle: function() {
            if (!appData.title) {return appData.title;}
            if (appData.title[0] === ' ') {return appData.title[1].toUpperCase() + appData.title.slice(2);}
            if (appData.title[0] !== ' ') {return appData.title[0].toUpperCase() + appData.title.slice(1);}
            },
    getServicePercentPrices: function() {
                return appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))
            }
}

appData.asking();

appData.allServicePrices = appData.getAllServicePrices();
appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices); 
appData.title = appData.getTitle(appData.title);
appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.rollback);

appData.screens = appData.screens.toLowerCase().split(', ');

console.log(appData.fullPrice);
console.log(appData.servicePercentPrice);
