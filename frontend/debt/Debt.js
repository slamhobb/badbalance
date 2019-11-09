'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import HttpClient from '../core/httpClient';

import DebtPanel from './DebtPanel';

import { IncomeIcon, OutcomeIcon } from '../svg/Svg';

const addState = {
    INIT: 0,
    ADD: 1
};

class Debt extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeDebtName = this.handleChangeDebtName.bind(this);
        this.handleAddDebt = this.handleAddDebt.bind(this);
        this.handleAddDebtItem = this.handleAddDebtItem.bind(this);
        this.handleDeleteDebt = this.handleDeleteDebt.bind(this);
        this.handleDeleteDebtItem = this.handleDeleteDebtItem.bind(this);

        this.handleShowAdd = this.handleShowAdd.bind(this);

        this.renderAddDebt = this.renderAddDebt.bind(this);

        this.state = {
            addState: addState.INIT,
            debtName: '',
            items: new Map()
        };
    }

    mapDebts(array) {
        const dMap = new Map();
        array.forEach(x => dMap.set(parseInt(x.debt_id), this.mapDebtItems(x)));

        return dMap;
    }

    mapDebtItems(debt) {
        const iMap = new Map();

        const array = debt.items;

        array.forEach(x => iMap.set(parseInt(x.id), x));

        return Object.assign({}, debt, {items: iMap});
    }

    successResult(result) {
        if (result.status) {
            return result;
        }

        throw new Error(JSON.stringify(result.message));
    }

    componentDidMount() {
        HttpClient.getjson(this.props.geDebtsUrl)
            .then(this.successResult)
            .then(result => {
                if (result.status) {
                    this.setState({
                        items: this.mapDebts(result.items)
                    });
                }
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    handleChangeDebtName(e) {
        this.setState({
            debtName: e.target.value
        });
    }

    handleAddDebt() {
        const data = {
            name: this.state.debtName
        };

        HttpClient.postjson(this.props.addDebtUrl, data)
            .then(this.successResult)
            .then(result => {
                const debtId = parseInt(result.id);

                const newDebt = {
                    debt_id: debtId,
                    name: data.name,
                    items: new Map()
                };
                const newItems = new Map(this.state.items);
                newItems.set(debtId, newDebt);

                this.setState({
                    debtName: '',
                    items: newItems,
                    addState: addState.INIT
                });
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    handleDeleteDebt(debtId) {
        const data = {
            id: debtId
        };

        HttpClient.postjson(this.props.deleteDebtUrl, data)
            .then(this.successResult)
            .then(() => {
                const newItems = new Map(this.state.items);
                newItems.delete(debtId);

                this.setState({
                    items: newItems
                });
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    handleAddDebtItem(debtItem, debtId) {
        const data = {
            date: debtItem.date,
            sum: debtItem.sum,
            text: debtItem.text,
            debt_id: debtId
        };

        HttpClient.postjson(this.props.addDebtItemUrl, data)
            .then(this.successResult)
            .then(result => {
                const id = parseInt(result.id);

                Object.assign(debtItem, { id: id });

                const newItems = new Map(this.state.items);
                const debt = newItems.get(debtId);

                const newDebtItems = new Map(debt.items);
                newDebtItems.set(id, debtItem);

                const newDebt = Object.assign({}, debt, { items: newDebtItems });

                newItems.set(debtId, newDebt);

                this.setState({
                    items: newItems
                });
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    handleDeleteDebtItem(id, debtId) {
        const data = {
            id: id,
            debt_id: debtId
        };

        HttpClient.postjson(this.props.deleteDebtItemUrl, data)
            .then(this.successResult)
            .then(() => {
                const newItems = new Map(this.state.items);
                const debt = newItems.get(debtId);

                const newDebtItems = new Map(debt.items);
                newDebtItems.delete(id);

                const newDebt = Object.assign({}, debt, { items: newDebtItems });

                newItems.set(debtId, newDebt);

                this.setState({
                    items: newItems
                });
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    handleShowAdd(e) {
        e.preventDefault();

        this.setState({
            addState: addState.ADD
        });
    }

    renderAddDebt() {
        if (this.state.addState === addState.INIT) {
            return (
                <div className="row mt-4">
                    <div className="col-md-4">
                        <a href="#" onClick={this.handleShowAdd}>Добавить нового человека</a>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Новая группа"
                                value={this.state.debtName} onChange={this.handleChangeDebtName}/>
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-primary"
                                    onClick={this.handleAddDebt}>
                                    Добавить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        const debts = Array.from(this.state.items.values());
        const debtItems = debts.map(x => Object.assign({}, x, { items: Array.from(x.items.values()) }));

        return (
            <React.Fragment>
                <h2 className="mt-4">Управление долгами</h2>

                <div className="row">
                    <div className="col-md-4 d-flex align-items-center">
                        <OutcomeIcon className="d-flex align-items-end mr-1 text-success"/>
                        <span className="text-success">- Дал</span>
                        <IncomeIcon className="d-flex align-items-center ml-3 mr-1"/>
                        <span>- Взял</span>
                    </div>
                </div>

                {this.renderAddDebt()}

                {debtItems.map(x =>
                    <DebtPanel key={x.debt_id} name={x.name} debt_id={x.debt_id} items={x.items}
                        onAdd={n => this.handleAddDebtItem(n, x.debt_id)}
                        onDelete={this.handleDeleteDebt}
                        onDeleteItem={this.handleDeleteDebtItem} />)}
            </React.Fragment>
        );
    }
}

Debt.propTypes = {
    geDebtsUrl: PropTypes.string.isRequired,
    addDebtUrl: PropTypes.string.isRequired,
    addDebtItemUrl: PropTypes.string.isRequired,
    deleteDebtUrl: PropTypes.string.isRequired,
    deleteDebtItemUrl: PropTypes.string.isRequired
};

export default Debt;