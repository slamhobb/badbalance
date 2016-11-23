'use strict';

import './spendingTable.css';
import template from './spendingTable.pug';

let $renderElement;
let state;
let categories;

export default class SpendingWidget {

    init($element) {
        $renderElement = $element;
    }

    setCategories(data) {
        categories = data;
    }

    setData(array) {
        let newState = new Map();
        array.forEach(item => newState.set(parseInt(item.id), item));
        state = newState;
    }

    render() {
        let items = formatTable();
        $renderElement.innerHTML = template({
            items: items,
            categories: categories
        });

        return $renderElement;
    }

    setEdit(id, edit) {
        state.get(parseInt(id)).edit = edit;
    }

    updateData(data) {
        let id = parseInt(data.id);

        Object.assign(state.get(id), data);
    }

    deleteData(id) {
        state.delete(parseInt(id));
    }
}

function formatTable() {
    let prevDate = new Date(0);

    let returnList = [];

    state.forEach(item => {
        var curDate = new Date(item.date);

        var dateStr = curDate.getTime() !== prevDate.getTime()
            ? item.date
            : '';

        prevDate = curDate;

        let categoryIndx = categories.map(x => parseInt(x.id)).indexOf(parseInt(item.category));

        returnList.push({
            id: item.id,
            dateStr: dateStr,
            date: item.date,
            sum: item.sum,
            text: item.text,
            categoryId: item.category,
            categoryName: categories[categoryIndx].name,
            edit: item.edit
        });
    });

    return returnList;
}

