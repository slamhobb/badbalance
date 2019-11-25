'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Spending from './Spending';

import { isMobile } from '../tools/browserTools';

const curDate = new Date();

const mobile = isMobile();

ReactDOM.render(
    <Spending
        curDate={curDate}

        getSpendingUrl='/spending/list_month'
        saveSpendingUrl='/spending/save'
        removeSpendingUrl='/spending/remove'

        getIncomingUrl='/incoming/list'
        saveIncomingUrl='/incoming/save'
        removeIncomingUrl='/incoming/remove'

        mobile={mobile} />,
    document.getElementById('spending-js')
);
