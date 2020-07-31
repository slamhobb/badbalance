import React from 'react';
import PropTypes from 'prop-types';

import ReactDatePicker from '../datepicker';

import { dateToString } from '../tools/dateTools';

import categoryService from '../services/categoryService';
import spendingService from '../services/spendingService';

import { vibrate } from '../tools/browserTools';

const showMessageTimeout = 6000;

class FastSpending extends React.Component {
    constructor(props) {
        super(props);

        this.loadData = this.loadData.bind(this);

        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeSum = this.handleChangeSum.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleSelectCategory = this.handleSelectCategory.bind(this);
        this.handleAddSpending = this.handleAddSpending.bind(this);

        this.renderCategories = this.renderCategories.bind(this);

        this.state = {
            categories: [],

            showCategories: false,

            date: dateToString(this.props.curDate),
            sum: '',
            text: '',

            messages: [],

            loading: false
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        categoryService.getCategory()
            .then(result => {
                this.setState({
                    categories: result.categories
                });
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    getCategoryName(id) {
        return this.state.categories.find(x => x.id === id).name;
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

    handleSelectCategory() {
        this.setState({
            showCategories: true
        });
    }

    handleAddSpending(categoryId) {
        const {
            date,
            sum,
            text
        } = this.state;

        this.setState({
            showCategories: false,
            loading: true
        }, () => {
            spendingService.addSpending(date, sum, text, categoryId)
                .then(result => {

                    vibrate(100);

                    this.setState(prev => {
                        const messages = prev.messages.slice();

                        // add message to tail
                        messages.push({
                            id: result.id,
                            text: `${sum} ${this.getCategoryName(categoryId)} (${text})`
                        });

                        return {
                            messages: messages
                        };
                    }, () => {
                        setTimeout(() => {
                            this.setState(prev => {
                                const messages = prev.messages.slice();

                                // remove message from head
                                messages.splice(0, 1);

                                return {
                                    messages: messages
                                };
                            });
                        }, showMessageTimeout);
                    });
                })
                .catch(error => alert('Произошла ошибка ' + error))
                .then(() => {
                    this.setState({
                        sum: '',
                        text: '',
                        loading: false
                    });
                });

        });
    }

    renderMessages() {
        const messages = this.state.messages;

        if (messages.length === 0) {
            return null;
        }

        return messages.map(x =>
            <div key={x.id} className="alert alert-success" role="alert">
                {x.text}
            </div>
        );
    }

    renderCategories() {
        return this.state.categories.map(x =>
            <button
                className="btn btn-outline-success btn-lg mr-2 mb-2"
                key={x.id}
                onClick={() => this.handleAddSpending(x.id)}
            >
                {x.name}
            </button>);
    }

    render() {
        return (
            <React.Fragment>
                <div className="row mt-4">
                    <div className="col-sm-4">
                        {this.renderMessages()}
                        <div className="form-group">
                            <ReactDatePicker
                                defaultValue={dateToString(this.props.curDate)}
                                className="form-control form-control-lg"
                                dateFormat="l, j M y"
                                onChange={this.handleChangeDate} />
                        </div>
                        <div className="form-group">
                            <input type="number" className="form-control form-control-lg" placeholder="Сумма"
                                value={this.state.sum}
                                onChange={this.handleChangeSum} />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control form-control-lg" placeholder="Описание"
                                value={this.state.text}
                                onChange={this.handleChangeText} />
                        </div>
                        <div className="form-group">
                            { this.state.showCategories ? (
                                this.renderCategories()
                            ) :
                                this.state.loading ? (
                                    <button className="btn btn-outline-secondary btn-lg btn-block" disabled>
                                        <span className="spinner-border spinner-border-sm"
                                            role="status" aria-hidden="true" />
                                    </button>
                                ) : (
                                    <button
                                        className="btn btn-outline-secondary btn-lg btn-block"
                                        onClick={this.handleSelectCategory}>
                                        Выбор категории
                                    </button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

FastSpending.propTypes = {
    curDate: PropTypes.instanceOf(Date).isRequired
};

export default FastSpending;
