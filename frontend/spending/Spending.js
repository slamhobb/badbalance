'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import PeriodSelector from './PeriodSelector';
import Switcher from './Switcher';

import SpendingTable from './spendingTable/SpendingTable';
import withFiltered from './spendingTable/SpendingTableHoc';
import MobileSpendingTable from './mobileSpending/MobileSpendingTable';

import IncomingTable from './incomingTable/IncomingTable';

import BadChart from '../chart';

import HttpClient from '../core/httpClient';

import {dateToString} from '../tools/dateTools';

const tableType = {
    spending: 'spending',
    incoming: 'incoming'
};

const SpendingTableWithFilter = withFiltered(SpendingTable);

class Spending extends React.PureComponent {
    constructor(props) {
        super(props);

        this.loadSpendingData = this.loadSpendingData.bind(this);
        this.loadIncomingData = this.loadIncomingData.bind(this);
        this.loadStatData = this.loadStatData.bind(this);

        this.handleChangePeriod = this.handleChangePeriod.bind(this);
        this.handleSwitchTable = this.handleSwitchTable.bind(this);

        this.handleEditSpending = this.handleEditSpending.bind(this);
        this.handleDeleteSpending = this.handleDeleteSpending.bind(this);
        this.handleSaveSpending = this.handleSaveSpending.bind(this);
        this.handleAddSpending = this.handleAddSpending.bind(this);

        this.handleEditIncoming = this.handleEditIncoming.bind(this);
        this.handleDeleteIncoming = this.handleDeleteIncoming.bind(this);
        this.handleSaveIncoming = this.handleSaveIncoming.bind(this);
        this.handleAddIncoming = this.handleAddIncoming.bind(this);

        const { year, month } = this.getYearMonth(this.props.curDate);

        this.state = {
            year: year,
            month: month,

            items: new Map(),
            categories: new Map(),
            incomingItems: new Map(),

            incomingLoaded: false,
            visibleTable: tableType.spending
        };
    }

    componentDidMount() {
        this.loadSpendingData();
        this.loadStatData();
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
            this.loadSpendingData();
            this.loadStatData();

            if (this.state.incomingLoaded) {
                this.loadIncomingData();
            }
        });
    }

    loadSpendingData() {
        const year = this.state.year;
        const month = this.state.month;

        HttpClient.getjson(this.props.getSpendingUrl + '/' + year + '/' + month)
            .then(this.successResult)
            .then(result => {
                this.setState({
                    items: this.getMap(result.spending),
                    categories: this.getMap(result.categories)
                });
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    loadIncomingData() {
        const year = this.state.year;
        const month = this.state.month;

        HttpClient.getjson(this.props.getIncomingUrl + '/' + year + '/' + month)
            .then(this.successResult)
            .then(result => {
                this.setState({
                    incomingItems: this.getMap(result.incoming)
                });
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    loadStatData() {
        const year = this.state.year;
        const month = this.state.month;

        HttpClient.getjson('/spending/stat/' + year + '/' + month)
            .then(this.successResult)
            .then(result => {
                this.setState({
                    stat: result
                });
            })
            .catch(error => alert('Произошла ошибка ' + error));
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

        if (!this.state.incomingLoaded) {
            this.loadIncomingData();
        }

        this.setState({
            incomingLoaded: true,
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

        return HttpClient.postjson(this.props.saveSpendingUrl, data)
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

                this.loadStatData();
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
                const curDate = {
                    year: this.state.year,
                    month: this.state.month
                };

                const newDate = this.getYearMonth(spending.date);

                const newItems = new Map(this.state.items);

                // если элемент переходит в другой месяц, то удаляем его
                if (curDate.year !== newDate.year || curDate.month !== newDate.month) {
                    newItems.delete(spending.id);
                } else {
                    newItems.set(spending.id, spending);
                }

                this.setState({items: newItems});

                this.loadStatData();
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

                this.loadStatData();
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
                const curDate = {
                    year: this.state.year,
                    month: this.state.month
                };

                const newDate = this.getYearMonth(incoming.date);

                const newItems = new Map(this.state.incomingItems);

                // если элемент переходит в другой месяц, то удаляем его
                if (curDate.year !== newDate.year || curDate.month !== newDate.month) {
                    newItems.delete(incoming.id);
                } else {
                    newItems.set(incoming.id, incoming);
                }


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

    renderIncoming(items) {
        if (!this.state.incomingLoaded) {
            return null;
        }

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

    renderSpending(items) {
        if (this.props.mobile) {
            return (
                <MobileSpendingTable
                    items={items}
                    categories={this.state.categories}
                    curDate={dateToString(this.props.curDate)}
                    onAdd={this.handleAddSpending}
                    onEdit={this.handleEditSpending}
                    onSave={this.handleSaveSpending}
                    onDelete={this.handleDeleteSpending} />);
        }

        return (
            <SpendingTableWithFilter
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

        const balance = items.reduce((sum, item) => sum + item.sum, 0);

        const balanceText = this.state.visibleTable === tableType.spending
            ? `Расход за месяц: ${balance}`
            : `Доход за месяц: ${balance}`;

        return (
            <React.Fragment>
                <div className="row mt-4">
                    <div className="col-sm-8">
                        <span>{balanceText}</span>
                    </div>
                </div>
                <div className="row mt-3">
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
                        <div className={this.state.visibleTable === tableType.spending ? '' : 'd-none'}>
                            { this.renderSpending(items) }
                        </div>
                        <div className={this.state.visibleTable === tableType.incoming ? '' : 'd-none'}>
                            { this.renderIncoming(items) }
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
    removeIncomingUrl: PropTypes.string.isRequired,

    mobile: PropTypes.bool.isRequired
};

export default Spending;
