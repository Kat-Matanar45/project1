'use strict'

let title = document.getElementsByTagName('h1')[0];

let btn = document.getElementsByClassName('handler_btn');
let btnOk = btn[0];
let btnEsc = btn[1];

let plus = document.querySelector('.screen-btn');

let percent = document.querySelectorAll('.other-items.percent');
let number = document.querySelectorAll('.other-items.number');

let inputRange = document.querySelector('.rollback input[type=range]');

let spanRange = document.querySelector('.rollback span[class="range-value"]');

let input = document.getElementsByClassName('total-input');
let inputTotal = input[0];
let inputCount = input[1];
let inputOther = input[2];
let inputFullCount = input[3];
let inputRollback = input[4];

let screen = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    servicesPercent: {},
    servicesNumber: {},
    fullPrice: 0,
    servicePercentPrice: 0,
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    rollback: 0,
    init: function() {
        appData.addTitle();

        plus.addEventListener('click', this.addSreenBlock); 
        btnOk.addEventListener('click', this.inError);

        inputRange.addEventListener('input', this.rangeSpan);
    },
    rangeSpan: function(event) {
        spanRange.textContent = event.target.value + "%";
        appData.rollback = event.target.value;
    },
    inError: function() {
       screen = document.querySelectorAll('.screen');

        let error = false;

        screen.forEach((screenen) => {
            const select = screenen.querySelector('select');
            const input = screenen.querySelector('input');
            
        if ((select.value === '') || (input.value === '')) {error = true};
        });

        if (error === false) {appData.start()} 
        else {alert("Заполните все поля!")};
    },
    addScreens: function() {
        screen = document.querySelectorAll('.screen');

        screen.forEach((screenen, index) => {
            const select = screenen.querySelector('select');
            const input = screenen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

        this.screens.push({ 
            id: index, 
            name: selectName, 
            value: +select.value * +input.value,
            count: +input.value});
        });
    },
    sumCount: function(sum) {
        sum = 0;
        for (let i=0; i<this.screens.length; i++) {
           sum = this.screens[i].count + sum;
        };
        return sum;
    },
    addServices: function() {
        percent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
            this.servicesPercent[label.textContent] = +input.value;
            };
        });

        number.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
            this.servicesNumber[label.textContent] = +input.value;
            };
        })

        console.log(appData)
    },
    addSreenBlock: function() {
        const cloneScreen = screen[0].cloneNode(true);
        screen[screen.length - 1].after(cloneScreen);
    },
    addTitle: function() {
        document.title = title.textContent;
    },
    addPrices: function() {
        appData.screenPrice = appData.screens.reduce(function (sum, screens) {
            return sum + screens.value
          }, 0);

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key]
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
        }

        appData.fullPrice = appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

        appData.servicePercentPrice = appData.fullPrice - (appData.fullPrice * (appData.rollback / 100));
    },
    showResult: function() {
        inputTotal.value = this.screenPrice;
        inputOther.value = this.servicePricesNumber + this.servicePricesPercent;
        inputFullCount.value = this.fullPrice;
        inputRollback.value = this.servicePercentPrice;
        inputCount.value = this.sumCount();
    },
    logger: function() {
            console.log(appData.fullPrice);
            console.log(appData.servicePercentPrice);
            console.log(appData.screens);
            console.log(appData.services);
            },
    start: function() {
       this.addScreens();
       this.addServices(); 
       this.addPrices();
       this.showResult();

       // appData.logger();
    }
}

appData.init();




