'use strict';

import listComponent from '../components/listComponent';
import template from './spendingTable.pug';


const spendingComponent = {
    init: function (rootElement, categories) {
        this.rootElement = rootElement;
        this.categories = categories;
    },

    template: function () {
        return template({
            items: this.formatItems(),
            categories: this.categories
        });
    },

    formatItems: function () {
        let prevDate = new Date(0);

        const formattedItems = [];

        this.items.forEach(item => {
            let curDate = new Date(item.date);

            let dateStr = curDate.getTime() !== prevDate.getTime()
                ? '' + curDate.getDate()
                : '';

            prevDate = curDate;

            let categoryIndx = this.categories.map(x => parseInt(x.id)).indexOf(parseInt(item.category_id));

            formattedItems.push({
                id: item.id,
                dateStr: dateStr,
                date: item.date,
                sum: item.sum,
                text: item.text,
                categoryId: item.category_id,
                categoryName: categoryIndx > -1 ? this.categories[categoryIndx].name : 'Неизвестно',
                edit: item.edit
            });
        });

        return formattedItems;
    },

    setEdit: function (id, value) {
        this.setItemProp(id, 'edit', value);
    }
};

Object.setPrototypeOf(spendingComponent, listComponent);

export default spendingComponent;
