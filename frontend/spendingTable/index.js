'use strict';

import httpClient from '../core/httpClient';
import SpendingWidget from './spendingWidget';
import formToJSON from '../core/formToJSON';
import Flatpickr from '../datepicker';

import template from './options.pug';

let $ui = {},
    urls = {
        getSpendingTableByMonthUrl: '/spending/list_month',
        addSpendingUrl: '/spending/save',
        removeSpendingUrl: '/spending/remove',
        statSpendingUrl: '/spending/stat',
        getCategoryListUrl: '/spending/get_category_list'
    },
    spendingWidget = new SpendingWidget();

function bindUi() {
    return {
        addSpendingForm: document.getElementById('addSpendingForm'),
        spendingTable: document.getElementById('spendingTable'),
        monthForm: document.getElementById('monthForm'),
        chart: document.getElementById('chart'),
        categorySelect: document.querySelector('#addSpendingForm [name=category]')
    }
}

function setupDatePicker() {
    new Flatpickr(document.getElementById('date'));
}


function delegate(className, listener) {
    return function (event) {
        var el = event.target;

        do {
            if ( !(el.classList && el.classList.contains(className)) ) continue;

            listener.apply(el, arguments);
        }
        while ( (el = el.parentNode) )
    }
}


function setupEvents() {
    $ui.addSpendingForm.addEventListener('submit', addSpending);
    $ui.monthForm.addEventListener('submit', updateTableByMonth);
    $ui.spendingTable.addEventListener('click', delegate('spending_edit', onClickEdit));
    $ui.spendingTable.addEventListener('click', delegate('spending_save', onClickSave));
    $ui.spendingTable.addEventListener('click', delegate('spending_delete', onClickDelete));
}

function initSpendingWidget() {
    spendingWidget.init($ui.spendingTable);
}

function updateChart() {
    var data = formToJSON($ui.monthForm);
    var url = urls.statSpendingUrl + '/' + data.year + '/' + data.month;

    httpClient.getjson(url)
        .then(drawChart)
        .catch(function (error) {
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

function updateTable() {
    var data = formToJSON($ui.monthForm);
    var url = urls.getSpendingTableByMonthUrl + '/' + data.year + '/' + data.month;

    httpClient.getjson(url)
        .then(function(result) {
            spendingWidget.setData(result.spending);
            spendingWidget.render();
        })
        .catch(function(error) {
            alert('Произошла ошибка' + error);
        });
}

function updateTableByMonth(e) {
    e.preventDefault();

    updateTable();
    updateChart();
}

function renderTable() {
    let table = spendingWidget.render();
    Array.from(table.getElementsByClassName('dateinput')).forEach(x => x.flatpickr());
}

function getCategories() {
    return httpClient.getjson(urls.getCategoryListUrl)
        .then(function (result) {
            if ('categories' in result) {
                renderCategories($ui.categorySelect, result.categories);
                spendingWidget.setCategories(result.categories);
            }
        });
}

function renderCategories($element, categories) {
    $element.innerHTML = template({categories: categories});
}

function addSpending(e) {
    e.preventDefault();

    var data = formToJSON($ui.addSpendingForm);

    httpClient.postjson(urls.addSpendingUrl, data)
        .then(onAddSpending)
        .catch(function(error){
            alert('Произошла ошибка ' + error);
        });
}

function onAddSpending(result) {
    if (result.hasOwnProperty('status')) {
        if (result.status) {
            updateTable();
        } else {
            alert(JSON.stringify(result.message));
        }
    }
}

function closest(el, name) {
    name = name.toUpperCase();

    do {
        if ( !(el.nodeName && el.nodeName === name) ) continue;

        return el
    }
    while ( el = el.parentNode )
}

function onClickEdit(e) {
    e.preventDefault();

    let id = closest(this, 'tr').getElementsByClassName('spending-id--input')[0].value;
    spendingWidget.setEdit(id, true);
    renderTable();
}

function onClickSave(e) {
    e.preventDefault();

    var $tr = closest(this, 'tr');

    var data = {
        id: $tr.getElementsByClassName('spending-id--input')[0].value,
        date: $tr.getElementsByClassName('spending-date--input')[0].value,
        sum: $tr.getElementsByClassName('spending-sum--input')[0].value,
        text: $tr.getElementsByClassName('spending-text--input')[0].value,
        category: $tr.getElementsByClassName('spending-category--input')[0].value
    };

    httpClient.postjson(urls.addSpendingUrl, data)
        .then(function(result) {
            onUpdateSpending(result, data);
        })
        .catch(function(error){
            alert('Произошла ошибка ' + error);
        });
}

function onUpdateSpending(result, data) {
    if (result.hasOwnProperty('status')) {
        if (result.status) {
            spendingWidget.updateData(data);
            spendingWidget.setEdit(data.id, false);
            spendingWidget.render();
        } else {
            alert(JSON.stringify(result.message));
        }
    }
}

function onClickDelete(e) {
    e.preventDefault();

    var $tr = $(this).closest('tr');

    var id = $tr.find('.spending-id--input').val();

    var data = {
        id: id
    };

    httpClient.postjson(urls.removeSpendingUrl, data)
        .then(function (result) {
            onDeleteSpending(result, id);
        })
        .catch(function (error) {
            alert('Произошла ошибка ' + error);
        });
}

function onDeleteSpending(result, id) {
    if (result.hasOwnProperty('status')) {
        if (result.status) {
            spendingWidget.deleteData(id);
            spendingWidget.render();
        } else {
            alert(JSON.stringify(result.message));
        }
    }
}

export default function start() {
    $ui = bindUi();
    setupDatePicker();
    setupEvents();
    initSpendingWidget();

    getCategories()
        .then(updateTable);
    updateChart();
}
