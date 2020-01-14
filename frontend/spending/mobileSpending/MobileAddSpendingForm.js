'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import CategoriesList from '../../sharedComponents/categoriesOptions/CategoriesOptions';

import ReactDatePicker from '../../datepicker';

import { CheckIcon } from '../../svg/Svg';

class MobileAddSpendingForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleShowForm = this.handleShowForm.bind(this);
        this.handleHideForm = this.handleHideForm.bind(this);

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeSum = this.handleChangeSum.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeCategory = this.handleChangeCategory.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            date: this.props.defaultDate,
            sum: '',
            text: '',
            category_id: 1,

            showForm: false,

            loading: false
        };
    }

    handleShowForm() {
        this.setState({
            showForm: true
        });
    }

    handleHideForm() {
        this.setState({
            showForm: false
        });
    }

    handleChangeDate(date) {
        this.setState({
            date: date
        });
    }

    handleChangeSum(e) {
        const sum = parseInt(e.target.value);

        this.setState({
            sum: isNaN(sum) ? 0 : sum
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

        this.setState({
            sum: '',
            text: '',
            loading: true
        }, () => {
            this.props.onAdd(data)
                .then(() => {
                    this.setState({
                        loading: false
                    });
                });
        });
    }

    render() {
        const categories = this.props.categories;

        if (!this.state.showForm) {
            return (
                <button className="btn btn-secondary btn-block" onClick={this.handleShowForm}>
                    Добавить
                </button>
            );
        }

        return (
            <div className="card p-2">
                <div className="d-flex mb-2">
                    <ReactDatePicker className="form-control" placeholder="Дата"
                        defaultValue={this.props.defaultDate} onChange={this.handleChangeDate} />

                    <button type="button" className="btn btn-outline-danger ml-2"
                        onClick={this.handleHideForm}>
                        &times;
                    </button>
                </div>

                <div className="input-group mb-2">
                    <input type="number" className="form-control" placeholder="Сумма"
                        value={this.state.sum} onChange={this.handleChangeSum} />
                    <CategoriesList items={categories} value={this.state.category_id}
                        onChange={this.handleChangeCategory} />
                </div>

                <div className="d-flex">
                    <input type="text" className="form-control" placeholder="Описание"
                        value={this.state.text} onChange={this.handleChangeText} />

                    {this.state.loading ? (
                        <button type="button" className="btn btn-outline-secondary ml-2" disabled>
                            <span className="spinner-border spinner-border-sm"
                                role="status" aria-hidden="true" />
                        </button>
                    ) : (
                        <button type="button" className="btn btn-outline-secondary ml-2"
                            onClick={this.handleAdd}>
                            <CheckIcon />
                        </button>
                    )}

                </div>
            </div>
        );
    }
}

MobileAddSpendingForm.propTypes = {
    defaultDate: PropTypes.string,
    categories: PropTypes.array.isRequired,
    onAdd: PropTypes.func.isRequired
};

export default MobileAddSpendingForm;