let title = "project";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 15;
let rollback = 66;
let fullPrice = 3000;
let adaptive = true;

alert ("Первое задание в процессе выполнения");

console.log ("Продолжай в том же духе... :-)");

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log('Стоимость верстки экранов' + ' ' + screenPrice + ' ' + 'рублей/долларов/гривен/юани');
console.log('Стоимость разработки сайта' + ' ' + fullPrice + ' ' + 'рублей/долларов/гривен/юани');

screens = screens.toLowerCase();
let screensA = screens.split(', ');
console.log(screensA);

console.log("Процент отката посреднику за работу" + " " + (fullPrice * (rollback/100)));