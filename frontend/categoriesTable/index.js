'use strict';

import './category.css';
import { init, getCategoryList } from './categoryWidget';

import httpClient from '../core/httpClient';
import formToJSON from '../core/formToJSON';

let $ui = {},
    urls = {
        addCategory: '/category/save'
    };

function bindUi() {
    return {
        addCategoryForm: document.getElementById('addCategoryForm')
    };
}

function setupEvents() {
    $ui.addCategoryForm.addEventListener('submit', addCategory);
}

function addCategory(e) {
    e.preventDefault();

    var data = formToJSON($ui.addCategoryForm);

    httpClient.postjson(urls.addCategory, data)
        .then(onAddCategory)
        .catch(error => alert(error));
}

function onAddCategory(result) {
    if (result.status) {
        getCategoryList();
    } else {
        alert(JSON.stringify(result.message));
    }
}

export default function start() {
    $ui = bindUi();
    setupEvents();

    init();
    getCategoryList();
}
