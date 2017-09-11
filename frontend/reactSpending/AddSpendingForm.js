'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import CategoriesList from './CategoriesOptions';

import ReactDatePicker from '../datepicker/rectDatePicker';

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
            category_id: 1
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

    handleChangeCategory(category_id) {
        this.setState({
            category_id: category_id
        });
    }

    handleAdd() {
        const data = {
            date: this.state.date,
            sum: parseInt(this.state.sum),
            text: this.state.text,
            category_id: parseInt(this.state.category_id)
        };

        this.props.onAdd(data);
    }

    render() {
        const categories = this.props.categories;

        return(
            <div className="table-responsive">
                <table className="table table-bordered">
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
                                    <CategoriesList items={categories} value={this.state.category_id}
                                        onChange={this.handleChangeCategory} />
                                </div>
                            </td>
                            <td>
                                <div className="spending_action">
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

AddSpendingForm.propTypes = {
    defaultDate: PropTypes.string,
    categories: PropTypes.array.isRequired,
    onAdd: PropTypes.func.isRequired
};

export default AddSpendingForm;