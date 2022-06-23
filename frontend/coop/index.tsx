import React from 'react';
import ReactDOM from 'react-dom';

import CoopSpendingList from './CoopSpendingList/CoopSpendingList';
import CoopSpending from './CoopSpending/CoopSpending';

const coopIdValue = (document.getElementById('coopId-js') as HTMLInputElement).value;
const coopId = parseInt(coopIdValue);

if (isNaN(coopId)) {
    ReactDOM.render(<CoopSpendingList />, document.getElementById('coopSpending-js'));
} else {
    ReactDOM.render(<CoopSpending coopId={coopId}/>, document.getElementById('coopSpending-js'));
}
