'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import CategoriesList from '../../sharedComponents/categoriesOptions/CategoriesOptions';

import ReactDatePicker from '../../datepicker';

import { CheckIcon } from '../../svg/Svg';

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
            categoryId: this.props.categoryId,

            loading: false
        };
    }

    handleChangeDate(date) {
        this.setState({date: date});
    }

    handleChangeSum(e) {
        const sum = parseInt(e.target.value);

        this.setState({
            sum: isNaN(sum) ? '' : sum
        });
    }

    handleChangeText(e) {
        const text = e.target.value;

        this.setState({text: text});
    }

    handleChangeCategory(categoryId) {
        this.setState({categoryId: categoryId});
    }

    handleSave() {
        const spending = {
            id: this.props.id,
            date: this.state.date,
            sum: this.state.sum,
            text: this.state.text,
            category_id: parseInt(this.state.categoryId)
        };

        this.setState({
            loading: true
        }, () => {
            this.props.onSave(spending);
        });
    }

    render() {
        const categories = this.props.categories;

        return(
            <tr>
                <td>
                    <div className="spending_date">
                        <ReactDatePicker className="form-control"
                            defaultValue={this.props.date} onChange={this.handleChangeDate} />
                    </div>
                </td>
                <td>
                    <div className="spending_sum">
                        <input type="text" className="form-control" placeholder="Сумма"
                            value={this.state.sum} onChange={this.handleChangeSum} />
                    </div>
                </td>
                <td>
                    <div className="spending_text">
                        <input type="text" className="form-control" placeholder="Описание"
                            value={this.state.text} onChange={this.handleChangeText} />
                    </div>
                </td>
                <td>
                    <div className="spending_category">
                        <CategoriesList items={categories}
                            value={this.state.categoryId}
                            onChange={this.handleChangeCategory} />
                    </div>
                </td>
                <td>
                    <div className="spending_action">
                        {this.state.loading ? (
                            <button className="btn btn-outline-secondary" type="button" disabled>
                                <span className="spinner-border spinner-border-sm"
                                    role="status" aria-hidden="true" />
                            </button>
                        ) : (
                            <button className="btn btn-outline-secondary" type="button" onClick={this.handleSave}>
                                <CheckIcon />
                            </button>
                        )}
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
    categoryId: PropTypes.number.isRequired,
    categories: PropTypes.array.isRequired,
    onSave: PropTypes.func.isRequired
};

export default EditLine;