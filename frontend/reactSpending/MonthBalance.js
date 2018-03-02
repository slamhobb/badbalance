'use strict';

import React from 'react';
import PropTypes from 'prop-types';

function MonthBalance(props) {
    return (
        <p>
            Расход за месяц: {props.balance}
        </p>
    );
}

MonthBalance.propTypes = {
    balance: PropTypes.number.isRequired
};

export default MonthBalance;
