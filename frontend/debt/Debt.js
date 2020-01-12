'use strict';

import React from 'react';
//import PropTypes from 'prop-types';

import AddDebtForm from './DebtPanel/AddDebtForm';
import DebtPanel from './DebtPanel';

import { IncomeIcon, OutcomeIcon } from '../svg/Svg';

import debtService from '../services/debtService';

class Debt extends React.Component {
    constructor(props) {
        super(props);

        this.handleAddDebt = this.handleAddDebt.bind(this);
        this.handleAddDebtItem = this.handleAddDebtItem.bind(this);
        this.handleDeleteDebt = this.handleDeleteDebt.bind(this);
        this.handleDeleteDebtItem = this.handleDeleteDebtItem.bind(this);

        this.state = {
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
        this.loadDebtData();
    }

    loadDebtData() {
        debtService.getDebts()
            .then(result => {
                if (result.status) {
                    this.setState({
                        items: this.mapDebts(result.items)
                    });
                }
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    handleAddDebt(debtName) {
        return debtService.addDebt(debtName)
            .then(result => {
                const debtId = parseInt(result.id);

                const newDebt = {
                    debt_id: debtId,
                    name: debtName,
                    items: new Map()
                };
                const newItems = new Map(this.state.items);
                newItems.set(debtId, newDebt);

                this.setState({
                    items: newItems,
                });
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    handleDeleteDebt(debtId) {
        return debtService.removeDebt(debtId)
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
        return debtService.addDebtItem(debtItem.date, debtItem.sum, debtItem.text, debtId)
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
        return debtService.removeDebtItem(id, debtId)
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

    render() {
        const debts = Array.from(this.state.items.values());
        const debtItems = debts.map(x => Object.assign({}, x, { items: Array.from(x.items.values()) }));

        const debtSum = debtItems.reduce((sum, item) => {
            return sum + item.items.reduce((sum, item) => {
                return sum + item.sum;
            }, 0);
        }, 0);

        return (
            <React.Fragment>
                <h2 className="mt-4">Управление долгами</h2>

                <div className="row">
                    <div className="col-sm-4 d-flex align-items-center">
                        <OutcomeIcon className="d-flex align-items-end mr-1 text-success"/>
                        <span className="text-success">- Дал</span>
                        <IncomeIcon className="d-flex align-items-center ml-3 mr-1"/>
                        <span>- Взял</span>
                    </div>
                </div>

                <AddDebtForm onAdd={this.handleAddDebt} />

                <div className="row mt-3">
                    <div className="col-sm-4">
                        {debtSum > 0 ? (
                            <span>Итого я должен: {Math.abs(debtSum)}</span>
                        ) : (
                            <span>Итого мне должны: {Math.abs(debtSum)}</span>
                        )}
                    </div>
                </div>

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
};

export default Debt;