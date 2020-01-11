import React from 'react';
import ReactDOM from 'react-dom';

import Statistic from './Statistic';

ReactDOM.render(<Statistic curDate={new Date()}/>, document.getElementById('statistic-js'));
