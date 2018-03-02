'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import RectDatePicker from '../../datepicker/rectDatePicker';

import { CheckIcon } from '../../svg/Svg';

class EditLine extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeSum = this.handleChangeSum.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.state = {
            date: this.props.date,
            sum: this.props.sum,
            text: this.props.text,
        };
    }

    handleChangeDate(date) {
        this.setState({date: date});
    }

    handleChangeSum(e) {
        const sum = parseInt(e.target.value);

        this.setState({sum: sum});
    }

    handleChangeText(e) {
        const text = e.target.value;

        this.setState({text: text});
    }

    handleSave() {
        const id = this.props.id;

        const spending = Object.assign({id: id}, this.state);

        this.props.onSave(spending);
    }

    render() {
        return(
            <tr>
                <td>
                    <div className="incoming_date">
                        <RectDatePicker className="form-control"
                            defaultValue={this.props.date} onChange={this.handleChangeDate} />
                    </div>
                </td>
                <td>
                    <div className="incoming_sum">
                        <input className="form-control"
                            value={this.state.sum} onChange={this.handleChangeSum} />
                    </div>
                </td>
                <td>
                    <div className="incoming_text">
                        <input className="form-control"
                            value={this.state.text} onChange={this.handleChangeText} />
                    </div>
                </td>
                <td>
                    <div className="incoming_action">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.handleSave}>
                            <CheckIcon />
                        </button>
                    </div>
                </td>
            </tr>
        );
    }
}

EditLine.propTypes = {
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    sum: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired
};

export default EditLine;