'use strict';

import categoryComponent from './categoryComponent';

import { closest, delegate } from '../core/domUtils';
import httpClient from '../core/httpClient';

let $ui = {},
    urls = {
        getCategoryList: '/category/get_list',
        saveCategory: '/category/save',
        removeCategory: '/category/delete'
    },
    component;

function bindUi() {
    return {
        categoryTable: document.getElementById('categoryTable')
    };
}

function setupEvents() {
    $ui.categoryTable.addEventListener('click', delegate('category_edit', onClickEdit));
    $ui.categoryTable.addEventListener('click', delegate('category_save', onClickSave));
    $ui.categoryTable.addEventListener('click', delegate('category_delete', onClickDelete));
}

function onClickEdit(event, el) {
    event.preventDefault();

    let id = closest(el, 'tr').getElementsByClassName('category-id')[0].value;
    component.setEdit(id, true);
    component.render();
}

function onClickSave(event, el) {
    event.preventDefault();

    var $tr = closest(el, 'tr');

    var data = {
        id: $tr.getElementsByClassName('category-id')[0].value,
        name: $tr.getElementsByClassName('category-name')[0].value
    };

    httpClient.postjson(urls.saveCategory, data)
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

    var id = $tr.getElementsByClassName('category-id')[0].value;

    var data = {
        id: id
    };

    httpClient.postjson(urls.removeCategory, data)
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

function getCategoryList() {
    httpClient.getjson(urls.getCategoryList)
        .then(result => {
            component.setItems(result.categories);
            component.render();
        })
        .catch(error => {
            alert('Произошла ошибка ' + error);
        });
}

function init() {
    $ui = bindUi();
    setupEvents();

    component = Object.create(categoryComponent);
    component.init($ui.categoryTable);
}

export { init, getCategoryList };
