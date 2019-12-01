'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import CategoriesList from '../CategoriesOptions';

import ReactDatePicker from '../../datepicker';

import { CheckIcon } from '../../svg/Svg';

class MobileEditLine extends React.PureComponent {
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
            category_id: this.props.category_id,

            loading: false
        };
    }

    handleChangeDate(date) {
        this.setState({date: date});
    }

    handleChangeSum(e) {
        const sum = parseInt(e.target.value);

        if (!isNaN(sum)) {
            this.setState({sum: sum});
        }
    }

    handleChangeText(e) {
        const text = e.target.value;

        this.setState({text: text});
    }

    handleChangeCategory(category_id) {
        this.setState({category_id: category_id});
    }

    handleSave() {
        const spending = {
            id: this.props.id,
            date: this.state.date,
            sum: parseInt(this.state.sum),
            text: this.state.text,
            category_id: parseInt(this.state.category_id)
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
            <div className="card p-2">
                <div className="d-flex justify-content-center mb-2">
                    <ReactDatePicker className="form-control" placeholder="Дата"
                        defaultValue={this.props.date} onChange={this.handleChangeDate} />
                    {this.state.loading ? (
                        <button type="button" className="btn btn-outline-secondary ml-2" disabled>
                            <span className="spinner-border spinner-border-sm"
                                role="status" aria-hidden="true" />
                        </button>
                    ) : (
                        <button type="button" className="btn btn-outline-secondary ml-2"
                            onClick={this.handleSave}>
                            <CheckIcon />
                        </button>
                    )}
                </div>

                <div className="input-group mb-2">
                    <input type="number" className="form-control" value={this.state.sum}
                        onChange={this.handleChangeSum} />
                    <CategoriesList items={categories} value={this.state.category_id}
                        onChange={this.handleChangeCategory} />
                </div>

                <input type="text" className="form-control" value={this.state.text}
                    onChange={this.handleChangeText} />
            </div>
        );
    }
}

MobileEditLine.propTypes = {
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    sum: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    category_id: PropTypes.number.isRequired,
    categories: PropTypes.array.isRequired,
    onSave: PropTypes.func.isRequired
};

export default MobileEditLine;