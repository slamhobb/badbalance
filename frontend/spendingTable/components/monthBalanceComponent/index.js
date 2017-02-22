'use strict';

import component from '../../../components/component';
import template from './balance.pug';
import './balance.css';

const monthBalanceComponent = {
    init: function (rootElement) {
        this.rootElement = rootElement;
        this.balance = 0;
    },

    template: function () {
        return template({ balance: this.balance });
    },

    setBalance: function (balance) {
        this.balance = balance;
    }
};

Object.setPrototypeOf(monthBalanceComponent, component);

export default monthBalanceComponent;
