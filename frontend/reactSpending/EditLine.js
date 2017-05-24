'use strict';

import React from 'react';
import PropTypes from 'prop-types';

class EditLine extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeSum = this.handleChangeSum.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.state = {
            date: this.props.date,
            sum: this.props.sum,
            text: this.props.text,
            category: this.props.category
        };
    }

    handleChangeDate(e) {
        this.setState({date: e.target.value});
    }

    handleChangeSum(e) {
        this.setState({sum: e.target.value});
    }

    handleChangeText(e) {
        this.setState({text: e.target.value});
    }

    handleChangeCategory(e) {
        this.setState({category: e.target.value});
    }

    handleSave() {
        const id = this.props.id;

        const spending = Object.assign({id: id}, this.state);

        this.props.onSave(id, spending);
    }

    render() {
        return(
            <tr>
                <td>
                    <input value={this.state.date} onChange={this.handleChangeDate} />
                </td>
                <td>
                    <input value={this.state.sum} onChange={this.handleChangeSum} />
                </td>
                <td>
                    <input value={this.state.text} onChange={this.handleChangeText} />
                </td>
                <td>
                    <input value={this.state.category} onChange={this.handleChangeCategory} />
                </td>
                <td>
                    <button onClick={this.handleSave}>Сохранить</button>
                </td>
            </tr>
        );
    }
}

EditLine.propTypes = {
    id: PropTypes.number,
    date: PropTypes.string,
    sum: PropTypes.number,
    text: PropTypes.string,
    category: PropTypes.string
};

export default EditLine;