'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import ReactDatePicker from '../../datepicker';

import { dateToString } from '../../tools/dateTools';

const addState = {
    INIT: 0,
    ADD: 1
};

class AddDebtForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeSum = this.handleChangeSum.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleAddIncoming = this.handleAddIncoming.bind(this);
        this.handleAddOutgoing = this.handleAddOutgoing.bind(this);

        this.handleShowAdd = this.handleShowAdd.bind(this);
        this.handleHideAdd = this.handleHideAdd.bind(this);

        this.curDate = dateToString(new Date());

        this.state = {
            date: this.curDate,
            sum: '',
            text: '',
            addState: addState.INIT
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
            sum: Math.abs(parseInt(this.state.sum)),
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
            sum: 0 - Math.abs(parseInt(this.state.sum)),
            text: this.state.text,
        };

        this.setState({
            sum: '',
            text: ''
        });

        this.props.onAdd(data);
    }

    handleShowAdd(e) {
        e.preventDefault();

        this.setState({
            addState: addState.ADD
        });
    }

    handleHideAdd(e) {
        e.preventDefault();

        this.setState({
            addState: addState.INIT
        });
    }

    render() {
        if (this.state.addState === addState.INIT) {
            return (
                <a href="#" className="list-group-item list-group-item-action text-center debt_line"
                    onClick={this.handleShowAdd}>
                        Добавить
                </a>
            );
        } else {
            return (
                <div className="card p-2">
                    <div className="d-flex justify-content-center mb-2">
                        <ReactDatePicker className="form-control" placeholder="Дата"
                            defaultValue={this.curDate} onChange={this.handleChangeDate}/>
                        <button type="button" className="btn btn-outline-danger ml-2"
                            onClick={this.handleHideAdd}>&times;</button>
                    </div>
                    <div className="input-group mb-2">
                        <input type="number" className="form-control" placeholder="Сумма"
                            value={this.state.sum} onChange={this.handleChangeSum}/>
                        <input type="text" className="form-control" placeholder="Описание"
                            value={this.state.text} onChange={this.handleChangeText}/>
                    </div>
                    
                    <div className="btn-group">
                        <button type="button" className="btn btn-outline-dark debt_button"
                            onClick={this.handleAddOutgoing}>Дал</button>
                        <button type="button" className="btn btn-outline-dark debt_button"
                            onClick={this.handleAddIncoming}>Взял</button>
                    </div>
                    
                </div>
            );
        }
    }
}

AddDebtForm.propTypes = {
    onAdd: PropTypes.func.isRequired
};

export default AddDebtForm;