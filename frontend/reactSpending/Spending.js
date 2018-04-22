'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import MonthBalance from './MonthBalance';
import PeriodSelector from './PeriodSelector';
import Switcher from './Switcher';

import SpendingTable from './spendingTable/SpendingTable';

import IncomingTable from './incomingTable/IncomingTable';

import BadChart from '../chart';

import HttpClient from '../core/httpClient';

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

        this.year = this.props.curDate.getFullYear();
        this.month = this.props.curDate.getMonth() + 1;

        this.state = {
            items: new Map(),
            categories: new Map(),
            incomingItems: new Map(),
            showIncoming: false,
            visibleTable: 'spending'
        };
    }

    componentDidMount() {
        this.refreshTable(this.year, this.month);
        this.refreshChart(this.year, this.month);
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

    dateToString(date) {
        let localDate = new Date(date);
        localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());

        return localDate.toISOString().slice(0, 10);
    }

    successResult(result) {
        if (result.status) {
            return result;
        }

        throw new Error(JSON.stringify(result.message));
    }

    handleChangePeriod(period) {
        this.year = period.year;
        this.month = period.month;

        this.refreshTable(this.year, this.month);
        this.refreshChart(this.year, this.month);

        if (this.state.showIncoming) {
            this.refreshTableIncoming(this.year, this.month);
        }
    }

    refreshTable(year, month) {
        HttpClient.getjson(this.props.getSpendingUrl + '/' + year + '/' + month)
            .then(this.successResult)
            .then(result => {
                this.setState({
                    items: this.getMap(result.spending),
                    categories: this.getMap(result.categories)
                });
            });
    }

    refreshTableIncoming(year, month) {
        HttpClient.getjson(this.props.getIncomingUrl + '/' + year + '/' + month)
            .then(this.successResult)
            .then(result => {
                this.setState({
                    incomingItems: this.getMap(result.incoming)
                });
            });
    }

    refreshChart(year, month) {
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

        if (this.state.visibleTable === 'spending')
        {
            table = 'incoming';
        }

        if (this.state.visibleTable === 'incoming')
        {
            table = 'spending';
        }

        if (!this.state.showIncoming) {
            this.refreshTableIncoming(this.year, this.month);
        }

        this.setState({
            showIncoming: true,
            visibleTable: table
        });
    }

    handleAddSpending(spending) {
        HttpClient.postjson(this.props.saveSpendingUrl, spending)
            .then(this.successResult)
            .then(result => {
                const curDate = {
                    year: this.year,
                    month: this.month
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

                this.refreshChart(this.year, this.month);
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

                this.refreshChart(this.year, this.month);
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

                this.refreshChart(this.year, this.month);
            })
            .catch(error => {
                alert('Произошла ошибка ' + error);
            });
    }

    handleAddIncoming(incoming) {
        HttpClient.postjson(this.props.saveIncomingUrl, incoming)
            .then(this.successResult)
            .then(result => {
                const curDate = {
                    year: this.year,
                    month: this.month
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
            .catch(error => {
                alert('Произошла ошибка ' + error);
            });
    }

    renderIncoming() {
        if (!this.state.showIncoming) {
            return null;
        }

        const items = Array.from(this.state.incomingItems.values());

        return (
            <IncomingTable
                items={items}
                curDate={this.dateToString(this.props.curDate)}
                onAdd={this.handleAddIncoming}
                onEdit={this.handleEditIncoming}
                onSave={this.handleSaveIncoming}
                onDelete={this.handleDeleteIncoming} />
        );
    }

    render() {
        const items = Array.from(this.state.items.values());

        const balance = items.reduce((sum, item) => {
            return sum + item.sum;
        }, 0);

        // берём иммено из props что-бы не перерисовывать PeriodSelector каждый раз
        const year = this.props.curDate.getFullYear();
        const month = this.props.curDate.getMonth() + 1;

        return (
            <React.Fragment>
                <div className="row mt-4 mb-3">
                    <div className="col-sm-8">
                        <MonthBalance balance={balance} />
                    </div>
                </div>
                <div className="row mb-3 ">
                    <div className="col-sm-4">
                        <PeriodSelector
                            year={year}
                            month={month}
                            onChange={this.handleChangePeriod} />
                    </div>
                    <div className="col-sm-4">
                        <div className="d-flex">
                            <div className="ml-sm-auto">
                                <Switcher currentTable={this.state.visibleTable} onSwitch={this.handleSwitchTable}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        <div className={this.state.visibleTable === 'spending' ? 'd-block' : 'd-none'}>
                            <SpendingTable
                                items={items}
                                categories={this.state.categories}
                                curDate={this.dateToString(this.props.curDate)}
                                onAdd={this.handleAddSpending}
                                onEdit={this.handleEditSpending}
                                onSave={this.handleSaveSpending}
                                onDelete={this.handleDeleteSpending} />
                        </div>
                        <div className={this.state.visibleTable === 'incoming' ? 'd-block' : 'd-none'}>
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
