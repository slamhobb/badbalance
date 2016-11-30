'use strict';

const component = {
    render: function () {
        this.rootElement.innerHTML = this.template();
    }
};

export default component;
