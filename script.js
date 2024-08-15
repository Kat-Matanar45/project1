let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = + prompt('Сколько будет стоить данная работа?');
let rollback = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice1 = + prompt('Сколько это будет стоить?');
let service2 = prompt('Какой дополнительный тип услуги нужен?');
let servicePrice2 = + prompt('Сколько это будет стоить?');
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.ceil(fullPrice - (fullPrice * (rollback/100)));
let adaptive = true;
let screensA = screens.split(', ');

screens = screens.toLowerCase();

switch (true) {
    case fullPrice >= 30000:
        console.log("Даем скидку в 10% \nИтоговая сумма за работу:" + " " + (fullPrice - (fullPrice/100*10)));
        break
    case fullPrice >= 15000 && fullPrice < 30000:
        console.log("Даем скидку в 5% \nИтоговая сумма за работу:" + " " + (fullPrice - (fullPrice/100*5)));
        break
    case fullPrice >= 0 && fullPrice < 15000:
            console.log("Скидка не предусмотрена \nИтоговая сумма за работу:" + " " + fullPrice);
            break
    case fullPrice < 0:
            console.log("Что-то пошло не так");
            break
};

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log('Стоимость верстки экранов' + ' ' + screenPrice + ' ' + 'рублей/долларов/гривен/юани');
console.log('Стоимость разработки сайта' + ' ' + fullPrice + ' ' + 'рублей/долларов/гривен/юани');

console.log(screensA);
console.log("Процент отката посреднику за работу" + " " + (fullPrice * (rollback/100)));
console.log(servicePercentPrice);

