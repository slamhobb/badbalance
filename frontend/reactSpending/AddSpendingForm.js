'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import CategoriesList from './CategoriesOptions';

class AddSpendingForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeSum = this.handleChangeSum.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            date: '',
            sum: '',
            text: '',
            category_id: 1
        };
    }

    handleChangeDate(e) {
        this.setState({
            date: e.target.value
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
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <td>
                            <div className="spending_date">
                                <input className="form-control" placeholder="Дата"
                                    value={this.state.date} onChange={this.handleChangeDate} />
                            </div>
                        </td>
                        <td>
                            <div className="spending_sum">
                                <input className="form-control" placeholder="Сумма"
                                    value={this.state.sum} onChange={this.handleChangeSum} />
                            </div>
                        </td>
                        <td>
                            <div className="spending_text">
                                <input className="form-control" placeholder="Текст"
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
                                <button className="btn btn-default btn-sm"
                                    onClick={this.handleAdd}>
                                    <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

AddSpendingForm.propTypes = {
    categories: PropTypes.array.isRequired,
    onAdd: PropTypes.func.isRequired
};

export default AddSpendingForm;