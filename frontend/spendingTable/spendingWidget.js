'use strict';

import spendingComponent from './spendingComponent';
import Flatpickr from '../datepicker';

import { closest, delegate } from '../core/domUtils';
import httpClient from '../core/httpClient';


let $ui = {},
    urls = {
        getSpendingTableByMonthUrl: '/spending/list_month',
        saveSpendingUrl: '/spending/save',
        removeSpendingUrl: '/spending/remove',
    },
    component;

function bindUi() {
    return {
        spendingTable: document.getElementById('spendingTable')
    }
}

function setupEvents() {
    $ui.spendingTable.addEventListener('click', delegate('spending_edit', onClickEdit));
    $ui.spendingTable.addEventListener('click', delegate('spending_save', onClickSave));
    $ui.spendingTable.addEventListener('click', delegate('spending_delete', onClickDelete));
}

function setupDatePickers() {
    Array.from($ui.spendingTable.getElementsByClassName('dateinput')).forEach(x => new Flatpickr(x));
}

function onClickEdit(event, el) {
    event.preventDefault();

    let id = closest(el, 'tr').getElementsByClassName('spending-id--input')[0].value;
    component.setEdit(id, true);
    component.render();
    setupDatePickers();
}

function onClickSave(event, el) {
    event.preventDefault();

    var $tr = closest(el, 'tr');

    var data = {
        id: $tr.getElementsByClassName('spending-id--input')[0].value,
        date: $tr.getElementsByClassName('spending-date--input')[0].value,
        sum: $tr.getElementsByClassName('spending-sum--input')[0].value,
        text: $tr.getElementsByClassName('spending-text--input')[0].value,
        category: $tr.getElementsByClassName('spending-category--input')[0].value
    };

    httpClient.postjson(urls.saveSpendingUrl, data)
        .then(result => {
            onSaveSpending(result, data);
        })
        .catch(error => {
            alert('Произошла ошибка ' + error);
        });
}

function onSaveSpending(result, data) {
    if (result.status) {
        component.updateItem(data.id, data);
        component.setEdit(data.id, false);
        component.render();
    } else {
        alert(JSON.stringify(result.message));
    }
}

function onClickDelete(event, el) {
    event.preventDefault();

    var $tr = closest(el, 'tr');

    var id = $tr.getElementsByClassName('spending-id--input')[0].value;

    var data = {
        id: id
    };

    httpClient.postjson(urls.removeSpendingUrl, data)
        .then(result => {
            onDeleteSpending(result, id);
        })
        .catch(error => {
            alert('Произошла ошибка ' + error);
        });
}

function onDeleteSpending(result, id) {
    if (result.status) {
        component.deleteItem(id);
        component.render();
    } else {
        alert(JSON.stringify(result.message));
    }
}

function redrawSpendingTable(month, year) {
    var url = urls.getSpendingTableByMonthUrl + '/' + year + '/' + month;

    httpClient.getjson(url)
        .then(result => {
            component.setItems(result.spending);
            component.render();
        })
        .catch(error => {
            alert('Произошла ошибка' + error);
        });
}

function init(categories) {
    $ui = bindUi();
    setupEvents();

    component = Object.create(spendingComponent);
    component.init($ui.spendingTable, categories);
}

export { init, redrawSpendingTable }