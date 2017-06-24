'use strict';

import React from 'react';
import PropTypes from 'prop-types';

const years = [2016, 2017, 2018];
const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

class PeriodSelector extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleChaneYear = this.handleChaneYear.bind(this);
        this.handleChaneMonth = this.handleChaneMonth.bind(this);
        this.handleShow = this.handleShow.bind(this);

        this.state = {
            year: this.props.year,
            month: this.props.month
        };
    }

    handleChaneYear(e) {
        const year = parseInt(e.target.value);

        this.setState({
           year: year
        });
    }

    handleChaneMonth(e) {
        const month = parseInt(e.target.value);

        this.setState({
           month: month
        });
    }

    handleShow() {
        this.props.onChange({
            year: this.state.year,
            month: this.state.month
        });
    }

    render() {
        const yearsList = years.map(y => <option key={y} value={y}>{y}</option>);
        const monthList = months.map((m, i) => <option key={i} value={i + 1}>{m}</option>);

        return (
            <div className="form-inline">
                <div className="form-group">
                    <select className="form-control"
                            value={this.state.year} onChange={this.handleChaneYear}>
                        {yearsList}
                    </select>
                </div>
                <div className="form-group">
                    <select className="form-control"
                            value={this.state.month} onChange={this.handleChaneMonth}>
                        {monthList}
                    </select>
                </div>
                <button className="btn btn-link" onClick={this.handleShow}>Показать</button>
            </div>
        )
    }
}

PeriodSelector.propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

export default PeriodSelector;