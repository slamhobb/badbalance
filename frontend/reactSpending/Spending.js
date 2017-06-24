'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import SpendingTable from './SpendingTable';
import PeriodSelector from './PeriodSelector';

class Spending extends React.PureComponent {
    constructor(props) {
        super(props);


    }

    render() {
        return (
            <div>
                <PeriodSelector year={2017} month={1} onChange={this.ale} />
                <SpendingTable
                  getSpendingUrl='/spending/list_month/2017/5'
                  getCategoriesUrl='/category/get_list'
                  saveSpendingUrl='/spending/save'
                  removeSpendingUrl='/spending/remove' />
            </div>
        )
    }
}

Spending.propTypes = {

};

export default Spending;