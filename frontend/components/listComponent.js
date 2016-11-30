import component from './component';

const listComponent = {
    setItems: function (items) {
        const newItems = new Map();
        items.forEach(item => newItems.set(parseInt(item.id), item));
        this.items = newItems;
    },

    updateItem: function (id, item) {
        const items = this.items;
        Object.assign(items.get(parseInt(id)), item);
    },

    deleteItem: function (id) {
        this.items.delete(parseInt(id))
    },

    setItemProp: function (id, name, value) {
        this.items.get(parseInt(id))[name] = value;
    }
};

Object.setPrototypeOf(listComponent, component);

export default listComponent;
