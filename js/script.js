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

const checkCms = document.querySelector('#cms-open');

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
    sumWord: 0,
    init: function () {
        this.addTitle();

        plus.addEventListener('click', this.addSreenBlock.bind(this));
        btnOk.addEventListener('click', this.inError.bind(this));
        inputRange.addEventListener('input', this.rangeSpan.bind(this));
        btnEsc.addEventListener('click', this.reset.bind(this));
        checkCms.addEventListener('click', this.cms.bind(this));
    },
    rangeSpan: function (event) {
        spanRange.textContent = event.target.value + "%";

        this.rollback = event.target.value;
    },
    inError: function () {
        let error = false;

        screen = document.querySelectorAll('.screen');

        screen.forEach((screenen) => {
            const select = screenen.querySelector('select');
            const input = screenen.querySelector('input');

            if ((select.value === '') || (input.value === '')) { 
                error = true 
            };
        });

        if (error === false) { 
            this.start();
            btnOk.style.display = 'none';  
            btnEsc.style.display = 'block'; 
            
        } else { 
            alert("Заполните все поля!") 
        };
    },
    addScreens: function () {
        screen = document.querySelectorAll('.screen');

        screen.forEach((screenen, index) => {
            const select = screenen.querySelector('select');
            const input = screenen.querySelector('input');
            const selectName = select.options[select.selectedIndex].textContent;

            this.screens.push({
                id: index,
                name: selectName,
                value: +select.value * +input.value,
                count: +input.value
            });
        });
    },
    sumCount: function (sum) {
        sum = 0;

        for (let i = 0; i < this.screens.length; i++) {
            sum = this.screens[i].count + sum;
        };

        return sum;
    },
    addServices: function () {
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
    },
    addSreenBlock: function () {
        const cloneScreen = screen[0].cloneNode(true);
        
        screen[screen.length - 1].after(cloneScreen);
    },
    addTitle: function () {
        document.title = title.textContent;
    },
    addPrices: function () {
        this.screenPrice = this.screens.reduce((sum, screens) => {
            return sum + screens.value
        }, 0);

        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key]
        }

        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }

        this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

        if (this.sumWord !== 0) {this.fullPrice = this.fullPrice + (this.fullPrice * this.sumWord / 100)}

        this.servicePercentPrice = this.fullPrice - (this.fullPrice * (this.rollback / 100));

        
    },
    showResult: function () {
        inputTotal.value = this.screenPrice;
        inputOther.value = this.servicePricesNumber + this.servicePricesPercent;
        inputFullCount.value = this.fullPrice;
        inputRollback.value = this.servicePercentPrice;
        inputCount.value = this.sumCount();
    },
    start: function () {
        this.addScreens();
        this.addServices();
        this.addPrices();
        this.showResult();
        this.blocking();
    },
    blocking: function() {
        screen = document.querySelectorAll('.screen');

        screen.forEach((screenen) => {
            const select = screenen.querySelector('select');
            const input = screenen.querySelector('input[type=text]');

            select.disabled = true;
            input.disabled = true;
        })

        plus.disabled = true;
    },
    reset: function() {
        btnOk.style.display = 'block';  
        btnEsc.style.display = 'none';

        this.resetData();
        this.resetScreen();
        this.resetService();
        this.resetInput();
        this.resetCms();

        plus.disabled = false;
    },
    resetData: function() {
        this.screenPrice = 0;
        this.servicesPercent = {};
        this.servicesNumber = {};
        this.fullPrice = 0;
        this.servicePercentPrice = 0;
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.rollback = 0;
        this.screens = [];
    },
    resetScreen: function() {
        screen = document.querySelectorAll('.screen');

        screen.forEach((screenen, index) => {
            const select = screenen.querySelector('select');
            const input = screenen.querySelector('input[type=text]');

            select.disabled = false;
            input.disabled = false;

            input.value = '';
            select.value = '';

            if (index > 0) {screenen.remove();}
        });
    },
    resetService: function() {
        percent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            check.checked = false;
        });

        number.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            check.checked = false;
        });
    },
    resetInput: function() {
        inputTotal.value = '';
        inputCount.value = '';
        inputOther.value = '';
        inputFullCount.value = '';
        inputRollback.value = '';

        inputRange.value = 0;
        spanRange.textContent = '0%';
    },
    cms: function() {
        const blokVariants = document.querySelector('.hidden-cms-variants');

        blokVariants.style.display = 'flex'; 

        checkCms.addEventListener('change', (event) => {
            if (event.target.checked) {  
                const selectCms = document.querySelector('#cms-select');  
                selectCms.addEventListener('change', (event) => {
                    
                const selectedValue = event.target.value; 
                if (selectedValue === "other") {this.cmsOther()};
                if (selectedValue === '50') {appData.sumWord = 50};
    })}});

    },
    cmsOther: function() {
        const blokVariantsOther = document.querySelector('.hidden-cms-variants .main-controls__input');
        blokVariantsOther.style.display = 'flex';
    },
    resetCms: function() {
        const blokVariants = document.querySelector('.hidden-cms-variants');
        blokVariants.style.display = 'none'; 
        
        checkCms.checked = false;
    }
};

appData.init();
