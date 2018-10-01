'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import ReactDatePicker from '../../datepicker/reactDatePicker';

import {dateToString} from '../../tools/dateTools';


class AddDebtForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeSum = this.handleChangeSum.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleAddIncoming = this.handleAddIncoming.bind(this);
        this.handleAddOutgoing = this.handleAddOutgoing.bind(this);

        this.curDate = dateToString(new Date());

        this.state = {
            date: this.curDate,
            sum: '',
            text: ''
        };
    }

    handleChangeDate(date) {
        this.setState({
            date: date
        });
    }

    handleChangeSum(e) {
        this.setState({
            sum: e.target.value
        });
    }

    handleChangeText(e) {
        this.setState({
            text: e.target.value
        });
    }

    handleAddIncoming() {
        const data = {
            date: this.state.date,
            sum: parseInt(this.state.sum),
            text: this.state.text,
        };

        this.setState({
            sum: '',
            text: ''
        });

        this.props.onAdd(data);
    }

    handleAddOutgoing() {
        const data = {
            date: this.state.date,
            sum: parseInt('-' + this.state.sum),
            text: this.state.text,
        };

        this.setState({
            sum: '',
            text: ''
        });

        this.props.onAdd(data);
    }

    render() {
        return (
            <div className="card p-2">
                <ReactDatePicker className="form-control mb-2" placeholder="Дата"
                    defaultValue={this.curDate} onChange={this.handleChangeDate}/>
                <div className="input-group mb-2">
                    <input type="text" className="form-control" placeholder="Описание"
                        value={this.state.text} onChange={this.handleChangeText}/>
                    <input type="text" className="form-control" placeholder="Сумма"
                        value={this.state.sum} onChange={this.handleChangeSum}/>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-outline-dark debt_button"
                        onClick={this.handleAddIncoming}>Дал</button>
                    <button type="button" className="btn btn-outline-dark debt_button"
                        onClick={this.handleAddOutgoing}>Взял</button>
                </div>
            </div>
        );
    }
}

AddDebtForm.propTypes = {
    onAdd: PropTypes.func.isRequired
};

export default AddDebtForm;