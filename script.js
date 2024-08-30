'use strict'

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    services: {},
    fullPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,
    rollback: 10,
    isNumber: function(num) {
        return !isNaN(parseFloat(num)) && isFinite(num)
    },
    asking: function() {
        appData.title = prompt("Как называется ваш проект?", " калькулятор верстки");
    
        appData.adaptive = confirm("Нужен ли адаптив на сайте?");

        for (let i = 0; i<2; i++) {
            let name = prompt("Какие типы экранов нужно разработать?");
            let value = 0;

            do {value = prompt('Сколько будет стоить данная работа?')} 
            while((!appData.isNumber(value)) || (value === null));
            value = Number(value.trim());

            appData.screens.push({ id: i, name: name, value: value });
        }

        for (let i = 0; i<2; i++) {
            let name = prompt('Какой дополнительный тип услуги нужен?');
            let value = 0;
    
            do {value = prompt('Сколько это будет стоить?')} 
            while((!appData.isNumber(value)) || (value === null));
            value = Number(value.trim());
            appData.services[name] = +value;
        }

    },

    addPrices: function() {
        for (let screens of appData.screens) {
            appData.screenPrice += +screens.value;
        }

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key]
        }
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
        appData.fullPrice = appData.screenPrice + appData.allServicePrices
        },
    getTitle: function() {
            if (!appData.title) {appData.title = appData.title;}
            if (appData.title[0] === ' ') {appData.title = appData.title[1].toUpperCase() + appData.title.slice(2);}
            if (appData.title[0] !== ' ') {appData.title = appData.title[0].toUpperCase() + appData.title.slice(1);}
            },
    getServicePercentPrices: function() {
        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))
            },
    logger: function() {
            console.log(appData.fullPrice);
            console.log(appData.servicePercentPrice);
            console.log(appData.screens);
            for (let key in appData) {
                console.log("Ключ: " + key + " " + "Значение: " + appData[key]);
            }
            },
    start: function() {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice();
        appData.getServicePercentPrices();
        appData.getTitle();
        appData.logger();
    }
}

appData.start();




