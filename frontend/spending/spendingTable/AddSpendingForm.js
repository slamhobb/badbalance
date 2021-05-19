'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import CategoriesOptions from '../../sharedComponents/categoriesOptions/CategoriesOptions';

import ReactDatePicker from '../../datepicker';

import { CheckIcon } from '../../svg/Svg';

class AddSpendingForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeSum = this.handleChangeSum.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            date: this.props.defaultDate,
            sum: '',
            text: '',
            categoryId: 1,

            loading: false
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

    handleChangeCategory(categoryId) {
        this.setState({
            categoryId: categoryId
        });
    }

    handleAdd() {
        const data = {
            date: this.state.date,
            sum: this.state.sum,
            text: this.state.text,
            category_id: parseInt(this.state.categoryId)
        };

        this.setState({
            loading: true
        }, () => {
            this.props.onAdd(data)
                .then(() => {
                    this.setState({
                        sum: '',
                        text: '',
                        loading: false
                    });
                });
        });
    }

    render() {
        const categories = this.props.categories;

        return(
            <table className="table table-bordered table-md">
                <tbody>
                    <tr>
                        <td>
                            <div className="spending_date">
                                <ReactDatePicker className="form-control" placeholder="Дата"
                                    defaultValue={this.props.defaultDate} onChange={this.handleChangeDate} />
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
                                <CategoriesOptions items={categories} value={this.state.categoryId}
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
                                    <button className="btn btn-outline-secondary" type="button"
                                        onClick={this.handleAdd}>
                                        <CheckIcon/>
                                    </button>
                                )}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

AddSpendingForm.propTypes = {
    defaultDate: PropTypes.string,
    categories: PropTypes.array.isRequired,
    onAdd: PropTypes.func.isRequired
};

export default AddSpendingForm;