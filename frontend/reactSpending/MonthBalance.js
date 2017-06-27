'use strict';

import React from 'react';
import PropTypes from 'prop-types';

function MonthBalance(props) {
    return (
        <div className="balance-sum">
            <p>
                Расход за месяц: {props.balance}
            </p>
        </div>
    );
}

MonthBalance.propTypes = {
    balance: PropTypes.number.isRequired
};

export default MonthBalance;
