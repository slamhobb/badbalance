'use strict';

import React from 'react';
import PropTypes from 'prop-types';

class IncomingTable extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <td>Дата</td>
                            <td>Сумма</td>
                            <td>Описание</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>09.09.2017</td>
                            <td>2000</td>
                            <td>Зарплата</td>
                        </tr>
                        <tr>
                            <td>09.09.2017</td>
                            <td>609</td>
                            <td>Кешбек</td>
                        </tr>
                        <tr>
                            <td>09.09.2017</td>
                            <td>53</td>
                            <td>Выиграл</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

IncomingTable.propTypes = {

};

export default IncomingTable;