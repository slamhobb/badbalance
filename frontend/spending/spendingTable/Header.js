'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { FilterIcon } from '../../svg/Svg';

function Header(props) {
    return (
        <tr>
            <td>
                <div className="spending_date text-right">
                    День
                </div>
            </td>
            <td>
                <div className="spending_sum text-right">
                    Сумма
                </div>
            </td>
            <td>
                <div className="spending_text">
                    Описание
                </div>
            </td>
            <td>
                <div className="spending_category">
                    Категория
                </div>
            </td>
            <td>
                <div className="spending_action">
                    <a className="spending_filter" href="#" onClick={props.onToggleFilter}>
                        <FilterIcon />
                    </a>
                </div>
            </td>
        </tr>
    );
}

Header.propTypes = {
    onToggleFilter: PropTypes.func.isRequired
};

export default Header;