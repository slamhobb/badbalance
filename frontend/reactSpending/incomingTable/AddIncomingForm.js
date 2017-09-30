'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import ReactDatePicker from '../../datepicker/rectDatePicker';

class AddIncomingForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeSum = this.handleChangeSum.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            date: this.props.defaultDate,
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

    handleAdd() {
        const data = {
            date: this.state.date,
            sum: parseInt(this.state.sum),
            text: this.state.text,
        };

        this.props.onAdd(data);
    }

    render() {
        return(
            <div className="table-responsive">
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>
                                <div className="incoming_date">
                                    <ReactDatePicker className="form-control" placeholder="Дата"
                                        defaultValue={this.props.defaultDate} onChange={this.handleChangeDate} />
                                </div>
                            </td>
                            <td>
                                <div className="incoming_sum">
                                    <input type="text" className="form-control" placeholder="Сумма"
                                        value={this.state.sum} onChange={this.handleChangeSum} />
                                </div>
                            </td>
                            <td>
                                <div className="incoming_text">
                                    <input type="text" className="form-control" placeholder="Текст"
                                        value={this.state.text} onChange={this.handleChangeText} />
                                </div>
                            </td>
                            <td>
                                <div className="incoming_action">
                                    <button className="btn btn-default btn-sm" type="button"
                                        onClick={this.handleAdd}>
                                        <span className="glyphicon glyphicon-ok" aria-hidden="true" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

AddIncomingForm.propTypes = {
    defaultDate: PropTypes.string,
    onAdd: PropTypes.func.isRequired
};

export default AddIncomingForm;