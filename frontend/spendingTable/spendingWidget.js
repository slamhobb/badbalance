'use strict';

import './spendingTable.css';
import template from './spendingTable.pug';

let $renderElement;
let list;
let categories;

export default class SpendingWidget {

    init($element) {
        $renderElement = $element;
    }

    setCategories(data) {
        categories = data;
    }

    setData(data) {
        list = data;
    }

    render() {
        let items = formatTable(list);
        $renderElement.innerHTML = template({
            items: items,
            categories: categories
        });
    }

    setEdit(id, edit) {
        let indx = getIndexById(id);

        list[indx].edit = edit;
    }

    updateData(data) {
        let indx = getIndexById(data.id);

        list[indx] = Object.assign({}, list[indx], data);
    }

    deleteData(id) {
        let indx = getIndexById(id);

        list.splice(indx, 1);
    }
};

function getIndexById(id) {
    return list.map(function(x) { return parseInt(x.id) }).indexOf(parseInt(id));
}

function formatTable(items) {
    let prevDate = new Date(0);

    return items.map(function (item) {
        var curDate = new Date(item.date);

        var dateStr = curDate.getTime() !== prevDate.getTime()
            ? item.date
            : '';

        prevDate = curDate;

        let categoryIndx = categories.map(x => parseInt(x.id)).indexOf(parseInt(item.category));

        return {
            id: item.id,
            dateStr: dateStr,
            date: item.date,
            sum: item.sum,
            text: item.text,
            categoryId: item.category,
            categoryName: categories[categoryIndx].name,
            edit: item.edit
        };
    });
}

