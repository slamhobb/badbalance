'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import ReactDatePicker from '../../datepicker';

import { CheckIcon } from '../../svg/Svg';

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
        const sum = parseInt(e.target.value);

        this.setState({
            sum: isNaN(sum) ? '' : sum
        });
    }

    handleChangeText(e) {
        this.setState({
            text: e.target.value
        });
    }

    handleAdd() {
        const data = Object.assign({}, this.state);

        this.props.onAdd(data)
            .then(() => {
                this.setState({
                    sum: '',
                    text: ''
                });
            });
    }

    render() {
        return(
            <table className="table table-bordered table-md">
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
                                <input type="text" className="form-control" placeholder="Описание"
                                    value={this.state.text} onChange={this.handleChangeText} />
                            </div>
                        </td>
                        <td>
                            <div className="incoming_action">
                                <button className="btn btn-outline-secondary" type="button"
                                    onClick={this.handleAdd}>
                                    <CheckIcon />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

AddIncomingForm.propTypes = {
    defaultDate: PropTypes.string,
    onAdd: PropTypes.func.isRequired
};

export default AddIncomingForm;