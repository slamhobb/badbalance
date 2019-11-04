import React from 'react';
import ReactDOM from 'react-dom';

import FastSpending from './FastSpending';

const curDate = new Date();

ReactDOM.render(<FastSpending curDate={curDate} />, document.getElementById('fastSpending-js'));
