'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import './periodSelector.css';

function generateYears(minYear) {
    const nextYear = new Date().getFullYear() + 1;

    const years = [];

    let current = minYear;
    while (current <= nextYear) {
        years.push(current);

        current++;
    }

    years.reverse();

    return years;
}

const years = generateYears(2016);
const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

class PeriodSelector extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleChangeYear = this.handleChangeYear.bind(this);
        this.handleChangeMonth = this.handleChangeMonth.bind(this);
    }

    handleChangeYear(e) {
        const year = parseInt(e.target.value);

        this.props.onChange({
            year: year,
            month: this.props.month
        });
    }

    handleChangeMonth(e) {
        const month = parseInt(e.target.value);

        this.props.onChange({
            year: this.props.year,
            month: month
        });
    }

    render() {
        const yearsList = years.map(y => <option key={y} value={y}>{y}</option>);
        const monthList = months.map((m, i) => <option key={i} value={i + 1}>{m}</option>);

        return (
            <div className="d-flex">
                <select className="form-control period-width-auto mr-1" value={this.props.year} onChange={this.handleChangeYear}>
                    {yearsList}
                </select>
                <select className="form-control period-width-auto" value={this.props.month} onChange={this.handleChangeMonth}>
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