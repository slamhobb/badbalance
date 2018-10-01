'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const years = [2016, 2017, 2018];
const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

class PeriodSelector extends React.PureComponent {
    constructor(props) {
        super(props);

        const nextYear = new Date().getFullYear() + 1;

        while (years[years.length-1] !== nextYear) {
            const last = years[years.length-1];

            years.push(last + 1);
        }

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
            <div className="form-inline">
                <select className="form-control" value={this.props.year} onChange={this.handleChangeYear}>
                    {yearsList}
                </select>
                &nbsp;
                <select className="form-control" value={this.props.month} onChange={this.handleChangeMonth}>
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