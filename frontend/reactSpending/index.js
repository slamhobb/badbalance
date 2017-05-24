'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Table from './SpendingTable';

const spendings = [
    { id: 1, date: '2016-01-01', sum: 123, text: 'milk', category: 'Eat' },
    { id: 2, date: '2016-01-01', sum: 1, text: 'water', category: 'Other' },
    { id: 3, date: '2016-01-02', sum: 55, text: 'oil', category: 'Road' }
];

ReactDOM.render(
  <Table getUrl='/spending/list_month/2017/5' />,
  document.getElementById('spendingTable')
);