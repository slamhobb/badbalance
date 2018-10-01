'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Debt from './Debt';

ReactDOM.render(
    <Debt
        geDebtsUrl='/debt/list'
        addDebtUrl='/debt/add'
        addDebtItemUrl='/debt/add_item'
        deleteDebtUrl='/debt/remove'
        deleteDebtItemUrl='/debt/remove_item'
    />,
    document.getElementById('debt-js'));
