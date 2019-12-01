'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Spending from './Spending';

import { isMobile } from '../tools/browserTools';

const curDate = new Date();

const mobile = isMobile();

ReactDOM.render(
    <Spending curDate={curDate} mobile={mobile} />,
    document.getElementById('spending-js')
);
