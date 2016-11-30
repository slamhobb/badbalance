'use strict';

import listComponent from '../components/listComponent';
import template from './categoriesTable.pug';

const categoryComponent = {
    init: function (rootElement) {
        this.rootElement = rootElement;
    },

    template: function () {
        return template({
            categories: this.formatItems()
        });
    },

    formatItems: function () {
        const formattedItems = [];

        this.items.forEach(item => {
            formattedItems.push({
                id: item.id,
                name: item.name,
                edit: item.edit
            });
        });

        return formattedItems;
    },

    setEdit: function (id, value) {
        this.setItemProp(id, 'edit', value);
    }
};

Object.setPrototypeOf(categoryComponent, listComponent);

export default categoryComponent;
