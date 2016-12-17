'use strict';

//import Chart from 'chart.js';

import './spendingTable.css';
import { init, redrawSpendingTable } from './spendingWidget';
import template from './options.pug';

import httpClient from '../core/httpClient';
import Flatpickr from '../datepicker';
import formToJSON from '../core/formToJSON';

let $ui = {},
    urls = {
        addSpendingUrl: '/spending/save',
        getCategoryListUrl: '/category/get_list',
        statSpendingUrl: '/spending/stat'
    };

function bindUi() {
    return {
        addSpendingForm: document.getElementById('addSpendingForm'),
        monthForm: document.getElementById('monthForm'),
        chart: document.getElementById('chart'),
        categorySelect: document.querySelector('#addSpendingForm [name=category_id]')
    }
}

function setupEvents() {
    $ui.addSpendingForm.addEventListener('submit', addSpending);
    $ui.monthForm.addEventListener('submit', updatePageData);
}

function setupDatePicker() {
    new Flatpickr(document.getElementById('date'));
}

function renderChart() {
    var data = formToJSON($ui.monthForm);
    var url = urls.statSpendingUrl + '/' + data.year + '/' + data.month;

    httpClient.getjson(url)
        .then(drawChart)
        .catch(error => {
            alert('Произошла ошибка ' + error);
        });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function drawChart(result) {
    var ctx = $ui.chart.getContext("2d");

    var colors = result.stat.map(function () { return getRandomColor(); });

    var data = {
        labels: result.stat.map(function(x) { return x.category }),
        datasets: [
            {
                data: result.stat.map(function(x) { return x.sum }),
                backgroundColor: colors,
                hoverBackgroundColor: colors
            }]
    };

    let myPieChart = new Chart(ctx,{
        type: 'doughnut',
        data: data
        //options: options
    });
}

function renderTable() {
    var data = formToJSON($ui.monthForm);

    redrawSpendingTable(data.month, data.year);
}

function updatePageData(e) {
    if (e) {
        e.preventDefault();
    }

    renderTable();
    renderChart();
}

function getCategories() {
    return httpClient.getjson(urls.getCategoryListUrl)
        .then(result => {
            if (result.categories) {
                renderCategories(result.categories);

                return result.categories;
            }
        });
}

function renderCategories(categories) {
    $ui.categorySelect.innerHTML = template({categories: categories});
}

function addSpending(e) {
    e.preventDefault();

    var data = formToJSON($ui.addSpendingForm);

    httpClient.postjson(urls.addSpendingUrl, data)
        .then(onAddSpending)
        .catch(error => {
            alert('Произошла ошибка ' + error);
        });
}

function onAddSpending(result) {
    if (result.status) {
        updatePageData();
    } else {
        alert(JSON.stringify(result.message));
    }
}

export default function start() {
    $ui = bindUi();
    setupDatePicker();
    setupEvents();

    getCategories()
        .then(categories => {
            init(categories)
        })
        .then(updatePageData);
}
