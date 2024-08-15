let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = + prompt('Сколько будет стоить данная работа?');
let rollback = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = + prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = + prompt('Сколько это будет стоить?');
let fullPrice //= screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice //= Math.ceil(fullPrice - (fullPrice * (rollback/100)));
let adaptive = true;

const showTypeOf = function(variable) {
    console.log (variable, typeof variable);
}

const allServicePrices = function(servicePrice1, servicePrice2) {
    return servicePrice1 + servicePrice2
}

fullPrice = function getFullPrice(screenPrice, allServicePrices) {
    return screenPrice + allServicePrices
}

const getRollbackMessage = function(price) {
    switch (true) {
        case price >= 30000:
            console.log("Даем скидку в 10% \nИтоговая сумма за работу:" + " " + (price - (price/100*10)));
            break
        case price >= 15000 && price < 30000:
            console.log("Даем скидку в 5% \nИтоговая сумма за работу:" + " " + (price - (price/100*5)));
            break
        case price >= 0 && price < 15000:
                console.log("Скидка не предусмотрена \nИтоговая сумма за работу:" + " " + price);
                break
        case price < 0:
                console.log("Что-то пошло не так");
                break
    };
    }

function getTitle(title) {
    if (title[0] === "_") {
        title[1].toUpperCase()
    } else {title[0].toUpperCase()}
    return title
}

servicePercentPrice = function getServicePercentPrices(fullPrice, rollback) {
    return fullPrice - (fullPrice * (rollback/100))
}

screens = screens.toLowerCase().split(', ');

console.log(allServicePrices);
getFullPrice();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(screens);

console.log(getServicePercentPrices());

console.log(getRollbackMessage(fullPrice));
