'use strict';

import httpClient from '../core/httpClient';
import spendingWidget from './spendingWidget';
import formToJSON from '../core/formToJSON';

let $ui = {},
    urls = {
        getSpendingTableByMonthUrl: '/spending/list_month',
        addSpendingUrl: '/spending/save',
        removeSpendingUrl: '/spending/remove',
        statSpendingUrl: '/spending/stat'
    };

function bindUi() {
    return {
        addSpendingForm: document.getElementById('addSpendingForm'),
        spendingTable: $('#spendingTable'),
        monthForm: document.getElementById('monthForm'),
        chart: document.getElementById('chart')
    }
}

function setupDatePicker() {
    $.datepicker.setDefaults($.datepicker.regional["ru"]);
    $('.dateinput').datepicker({dateFormat: 'yy-mm-dd'});
}

function setupEvents() {
    $ui.addSpendingForm.addEventListener('submit', addSpending);
    $ui.monthForm.addEventListener('submit', updateTableByMonth);
    $ui.spendingTable.on('click', '.spending_edit', onClickEdit);
    $ui.spendingTable.on('click', '.spending_save', onClickSave);
    $ui.spendingTable.on('click', '.spending_delete', onClickDelete);
}

function initSpendingWidget() {
    let template = document.getElementById('spendingTemplate').innerHTML;
    spendingWidget.init1($ui.spendingTable[0], template);
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

function updateTableByMonth(e) {
    e.preventDefault();

    updateTable();
    updateChart();
}

function addSpending(e){
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

function updateTable() {
    var data = formToJSON($ui.monthForm);
    var url = urls.getSpendingTableByMonthUrl + '/' + data.year + '/' +data.month;

    httpClient.getjson(url)
        .then(function(result) {
            spendingWidget.setData(result.spending);
            spendingWidget.render();
        });
}

function onClickEdit(e) {
    e.preventDefault();

    var id = $(this).closest('tr').find('.spending-id--input').val();
    spendingWidget.setEdit(id, true);
    spendingWidget.render();
}

function onClickSave(e) {
    e.preventDefault();

    var $tr = $(this).closest('tr');

    var data = {
        id: $tr.find('.spending-id--input').val(),
        date: $tr.find('.spending-date--input').val(),
        sum: $tr.find('.spending-sum--input').val(),
        text: $tr.find('.spending-text--input').val(),
        category: $tr.find('.spending-category--input').val()
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

    updateTable();
    updateChart();
}

