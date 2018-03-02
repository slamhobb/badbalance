'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const years = [2016, 2017, 2018];
const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

class PeriodSelector extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleChangeYear = this.handleChangeYear.bind(this);
        this.handleChangeMonth = this.handleChangeMonth.bind(this);

        this.state = {
            year: this.props.year,
            month: this.props.month
        };
    }

    handleChangeYear(e) {
        const year = parseInt(e.target.value);

        this.setState({
            year: year
        });

        this.props.onChange({
            year: year,
            month: this.state.month
        });
    }

    handleChangeMonth(e) {
        const month = parseInt(e.target.value);

        this.setState({
            month: month
        });

        this.props.onChange({
            year: this.state.year,
            month: month
        });
    }

    render() {
        const yearsList = years.map(y => <option key={y} value={y}>{y}</option>);
        const monthList = months.map((m, i) => <option key={i} value={i + 1}>{m}</option>);

        return (
            <div className="form-inline">
                <select className="form-control" value={this.state.year} onChange={this.handleChangeYear}>
                    {yearsList}
                </select>
                &nbsp;
                <select className="form-control" value={this.state.month} onChange={this.handleChangeMonth}>
                    {monthList}
                </select>
            </div>
        );
    }
}

PeriodSelector.propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default PeriodSelector;