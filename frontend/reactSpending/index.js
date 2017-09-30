'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Spending from './Spending';

const curDate = new Date();

ReactDOM.render(
    <Spending
        curDate={curDate}

        getSpendingUrl='/spending/list_month'
        saveSpendingUrl='/spending/save'
        removeSpendingUrl='/spending/remove'

        getIncomingUrl='/incoming/list'
        saveIncomingUrl='/incoming/save'
        removeIncomingUrl='/incoming/remove' />,
    document.getElementById('spending')
);
