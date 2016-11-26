'use strict';

import './category.css';
import httpClient from '../core/httpClient';
import template from './categoriesTable.pug';

let $ui = {},
    urls = {
        get_category_list: '/category/get_list'
    };

function bindUi() {
    return {
        categoryTable: document.getElementById('categoryTable')
    }
}

function getCategoryList() {
    httpClient.getjson(urls.get_category_list)
        .then((result) => {
            renderCategoryList(result);
        })
        .catch((error) => {
           alert('Произошла ошибка ' + error);
        });

}

function renderCategoryList(categoryData) {
    $ui.categoryTable.innerHTML = template({categories: categoryData.categories});
}

export default function start() {
    $ui = bindUi();

    getCategoryList();
}
