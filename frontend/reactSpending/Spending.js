'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import PeriodSelector from './PeriodSelector';
import Switcher from './Switcher';

import SpendingTable from './spendingTable/SpendingTable';

import IncomingTable from './incomingTable/IncomingTable';

import BadChart from '../chart';

import HttpClient from '../core/httpClient';

import {dateToString} from '../tools/dateTools';

const tableType = {
    spending: 'spending',
    incoming: 'incoming'
};

class Spending extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleChangePeriod = this.handleChangePeriod.bind(this);
        this.handleSwitchTable = this.handleSwitchTable.bind(this);

        this.handleEditSpending = this.handleEditSpending.bind(this);
        this.handleDeleteSpending = this.handleDeleteSpending.bind(this);
        this.handleSaveSpending = this.handleSaveSpending.bind(this);
        this.handleAddSpending = this.handleAddSpending.bind(this);
        this.refreshTable = this.refreshTable.bind(this);

        this.handleEditIncoming = this.handleEditIncoming.bind(this);
        this.handleDeleteIncoming = this.handleDeleteIncoming.bind(this);
        this.handleSaveIncoming = this.handleSaveIncoming.bind(this);
        this.handleAddIncoming = this.handleAddIncoming.bind(this);
        this.refreshTableIncoming = this.refreshTableIncoming.bind(this);

        this.refreshChart = this.refreshChart.bind(this);

        const {year, month} = this.getYearMonth(this.props.curDate);

        this.state = {
            items: new Map(),
            categories: new Map(),
            incomingItems: new Map(),
            showIncoming: false,
            visibleTable: tableType.spending,

            year: year,
            month: month
        };
    }

    componentDidMount() {
        this.refreshTable();
        this.refreshChart();
    }

    getYearMonth(date) {
        date = new Date(date);

        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1
        };
    }

    getMap(array) {
        const map = new Map();
        array.forEach(x => map.set(parseInt(x.id), x));
        return map;
    }

    successResult(result) {
        if (result.status) {
            return result;
        }

        throw new Error(JSON.stringify(result.message));
    }

    handleChangePeriod(period) {
        this.setState({
            year: period.year,
            month: period.month
        }, () => {
            this.refreshTable();
            this.refreshChart();

            if (this.state.showIncoming) {
                this.refreshTableIncoming();
            }
        });
    }

    refreshTable() {
        const year = this.state.year;
        const month = this.state.month;

        HttpClient.getjson(this.props.getSpendingUrl + '/' + year + '/' + month)
            .then(this.successResult)
            .then(result => {
                this.setState({
                    items: this.getMap(result.spending),
                    categories: this.getMap(result.categories)
                });
            });
    }

    refreshTableIncoming() {
        const year = this.state.year;
        const month = this.state.month;

        HttpClient.getjson(this.props.getIncomingUrl + '/' + year + '/' + month)
            .then(this.successResult)
            .then(result => {
                this.setState({
                    incomingItems: this.getMap(result.incoming)
                });
            });
    }

    refreshChart() {
        const year = this.state.year;
        const month = this.state.month;

        HttpClient.getjson('/spending/stat/' + year + '/' + month)
            .then(this.successResult)
            .then(result => {
                this.setState({
                    stat: result
                });
            });
    }

    handleSwitchTable() {
        let table;

        if (this.state.visibleTable === tableType.spending)
        {
            table = tableType.incoming;
        }

        if (this.state.visibleTable === tableType.incoming)
        {
            table = tableType.spending;
        }

        if (!this.state.showIncoming) {
            this.refreshTableIncoming();
        }

        this.setState({
            showIncoming: true,
            visibleTable: table
        });
    }

    handleAddSpending(spending) {
        const data = {
            date: spending.date,
            sum: spending.sum,
            text: spending.text,
            category_id: spending.category_id
        };

        HttpClient.postjson(this.props.saveSpendingUrl, data)
            .then(this.successResult)
            .then(result => {
                const curDate = {
                    year: this.state.year,
                    month: this.state.month
                };

                const newDate = this.getYearMonth(spending.date);

                if (curDate.year !== newDate.year || curDate.month !== newDate.month) {
                    return;
                }

                const id = parseInt(result.id);
                Object.assign(spending, {id: id});

                const newItems = new Map(this.state.items);
                newItems.set(spending.id, spending);
                this.setState({items: newItems});

                this.refreshChart();
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    handleSaveSpending(spending) {
        const data = {
            id: spending.id,
            date: spending.date,
            sum: spending.sum,
            text: spending.text,
            category_id: spending.category_id
        };

        HttpClient.postjson(this.props.saveSpendingUrl, data)
            .then(this.successResult)
            .then(() => {
                const newItems = new Map(this.state.items);
                newItems.set(spending.id, spending);
                this.setState({items: newItems});

                this.refreshChart();
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    handleEditSpending(id) {
        const newItems = new Map(this.state.items);
        newItems.get(id).edit = true;

        this.setState({items: newItems});
    }

    handleDeleteSpending(id) {
        HttpClient.postjson(this.props.removeSpendingUrl, {id: id})
            .then(this.successResult)
            .then(() => {
                const newItems = new Map(this.state.items);
                newItems.delete(id);
                this.setState({items: newItems});

                this.refreshChart();
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    handleAddIncoming(incoming) {
        const data = {
            date: incoming.date,
            sum: incoming.sum,
            text: incoming.text
        };

        HttpClient.postjson(this.props.saveIncomingUrl, data)
            .then(this.successResult)
            .then(result => {
                const curDate = {
                    year: this.state.year,
                    month: this.state.month
                };

                const newDate = this.getYearMonth(incoming.date);

                if (curDate.year !== newDate.year || curDate.month !== newDate.month) {
                    return;
                }

                const id = parseInt(result.id);
                Object.assign(incoming, {id: id});

                const newItems = new Map(this.state.incomingItems);
                newItems.set(incoming.id, incoming);
                this.setState({incomingItems: newItems});
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    handleSaveIncoming(incoming) {
        const data = {
            id: incoming.id,
            date: incoming.date,
            sum: incoming.sum,
            text: incoming.text,
        };

        HttpClient.postjson(this.props.saveIncomingUrl, data)
            .then(this.successResult)
            .then(() => {
                const newItems = new Map(this.state.incomingItems);
                newItems.set(incoming.id, incoming);
                this.setState({incomingItems: newItems});
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    handleEditIncoming(id) {
        const newItems = new Map(this.state.incomingItems);
        newItems.get(id).edit = true;

        this.setState({incomingItems: newItems});
    }

    handleDeleteIncoming(id) {
        HttpClient.postjson(this.props.removeIncomingUrl, {id: id})
            .then(this.successResult)
            .then(() => {
                const newItems = new Map(this.state.incomingItems);
                newItems.delete(id);
                this.setState({incomingItems: newItems});
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    renderIncoming() {
        if (!this.state.showIncoming) {
            return null;
        }

        const items = Array.from(this.state.incomingItems.values());

        return (
            <IncomingTable
                items={items}
                curDate={dateToString(this.props.curDate)}
                onAdd={this.handleAddIncoming}
                onEdit={this.handleEditIncoming}
                onSave={this.handleSaveIncoming}
                onDelete={this.handleDeleteIncoming} />
        );
    }

    renderSpending() {
        const items = Array.from(this.state.items.values());

        return (
            <SpendingTable
                items={items}
                categories={this.state.categories}
                curDate={dateToString(this.props.curDate)}
                onAdd={this.handleAddSpending}
                onEdit={this.handleEditSpending}
                onSave={this.handleSaveSpending}
                onDelete={this.handleDeleteSpending} />
        );
    }

    render() {
        const items = this.state.visibleTable === tableType.spending
            ? Array.from(this.state.items.values())
            : Array.from(this.state.incomingItems.values());

        const balance = items.reduce((sum, item) => {
            return sum + item.sum;
        }, 0);

        const balanceText = this.state.visibleTable === tableType.spending
            ? `Расход за месяц: ${balance}`
            : `Доход за месяц: ${balance}`;

        return (
            <React.Fragment>
                <div className="row mt-4 mb-3">
                    <div className="col-sm-8">
                        <p>{balanceText}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4 mb-3">
                        <PeriodSelector
                            year={this.state.year}
                            month={this.state.month}
                            onChange={this.handleChangePeriod} />
                    </div>
                    <div className="col-sm-4 mb-3">
                        <div className="d-flex">
                            <div className="ml-sm-auto">
                                <Switcher currentTable={this.state.visibleTable} onSwitch={this.handleSwitchTable}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        <div className={this.state.visibleTable === tableType.spending ? 'd-block' : 'd-none'}>
                            { this.renderSpending() }
                        </div>
                        <div className={this.state.visibleTable === tableType.incoming ? 'd-block' : 'd-none'}>
                            { this.renderIncoming() }
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <BadChart data={this.state.stat} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Spending.propTypes = {
    curDate: PropTypes.instanceOf(Date).isRequired,

    saveSpendingUrl: PropTypes.string.isRequired,
    getSpendingUrl:  PropTypes.string.isRequired,
    removeSpendingUrl: PropTypes.string.isRequired,

    saveIncomingUrl: PropTypes.string.isRequired,
    getIncomingUrl:  PropTypes.string.isRequired,
    removeIncomingUrl: PropTypes.string.isRequired
};

export default Spending;
