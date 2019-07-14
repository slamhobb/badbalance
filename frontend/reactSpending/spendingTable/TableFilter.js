'use strict';

import React from 'react';
import PropTypes from 'prop-types';


class TableFilter extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.visible) {
            return null;
        }

        return (
            <tr>
                <td>
                    <div className="spending_date text-right">

                    </div>
                </td>
                <td>
                    <div className="spending_sum text-right">
                        {this.props.filteredSum}
                    </div>
                </td>
                <td>
                    <div className="spending_text">
                        <input className="form-control form-control-sm" type="text"
                            placeholder="Фильтр описания"
                            value={this.props.textFilter} onChange={this.props.onChange} />
                    </div>
                </td>
                <td>
                    <div className="spending_category">
                        <input className="form-control form-control-sm" type="text"
                            placeholder="Фильтр категории"
                            value={this.props.categoryFilter} onChange={this.props.onChangeCategoryFilter} />
                    </div>
                </td>
                <td>
                    <div className="spending_action">
                        &nbsp;
                    </div>
                </td>
            </tr>
        );
    }
}

TableFilter.propTypes = {
    visible: PropTypes.bool.isRequired,
    textFilter: PropTypes.string.isRequired,
    categoryFilter: PropTypes.string.isRequired,

    filteredSum: PropTypes.number.isRequired,

    onChange: PropTypes.func.isRequired,
    onChangeCategoryFilter: PropTypes.func.isRequired
};

export default TableFilter;