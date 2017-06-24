'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import CategoriesList from './CategoriesOptions';

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
            category_id: this.props.category_id
        };
    }

    handleChangeDate(e) {
        this.setState({date: e.target.value});
    }

    handleChangeSum(e) {
        this.setState({sum: parseInt(e.target.value)});
    }

    handleChangeText(e) {
        this.setState({text: e.target.value});
    }

    handleChangeCategory(category_id) {
        this.setState({category_id: category_id});
    }

    handleSave() {
        const id = this.props.id;

        const spending = Object.assign({id: id}, this.state);

        this.props.onSave(spending);
    }

    render() {
        const categories = this.props.categories;

        return(
            <tr>
                <td>
                    <div className="spending_date">
                        <input className="form-control"
                               value={this.state.date} onChange={this.handleChangeDate} />
                    </div>
                </td>
                <td>
                    <div className="spending_sum">
                        <input className="form-control"
                               value={this.state.sum} onChange={this.handleChangeSum} />
                    </div>
                </td>
                <td>
                    <div className="spending_text">
                        <input className="form-control"
                               value={this.state.text} onChange={this.handleChangeText} />
                    </div>
                </td>
                <td>
                    <div className="spending_category">
                        <CategoriesList items={categories}
                                        value={this.state.category_id}
                                        onChange={this.handleChangeCategory} />
                    </div>
                </td>
                <td>
                    <div className="spending_action">
                        <button className="btn btn-default btn-sm" onClick={this.handleSave}>
                            <span className="glyphicon glyphicon-ok" aria-hidden="true" />
                        </button>
                    </div>
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
    category_id: PropTypes.number,
    categories: PropTypes.array.isRequired
};

export default EditLine;