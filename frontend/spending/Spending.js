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

import spendingService from '../services/spendingService';

import { dateToString } from '../tools/dateTools';

const tableType = {
    spending: 'spending',
    incoming: 'incoming'
};

const SpendingTableWithFilter = withFiltered(SpendingTable);

const colors = [
    //'#FFFF66',
    '#FFCC66',
    '#CC9933',
    '#FFCC99',
    '#FFCCCC',
    '#CC6666',
    '#FF99CC',
    '#FFCCFF',
    '#CC99CC',
    '#CC66FF',
    '#9966FF',
    '#CCCCFF',
];

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
            stat: [],

            incomingLoaded: false,
            visibleTable: tableType.spending,

            loadingData: true,
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

        spendingService.getSpending(year, month)
            .then(result => {
                this.setState({
                    items: this.getMap(result.spending),
                    categories: this.getMap(result.categories),
                });
            })
            .catch(error => alert('Произошла ошибка ' + error))
            .then(() => {
                this.setState({ loadingData: false });
            });
    }

    loadIncomingData() {
        const year = this.state.year;
        const month = this.state.month;

        spendingService.getIncoming(year, month)
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

        spendingService.getStat(year, month)
            .then(result => {
                this.setState({
                    stat: result.stat
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
        return spendingService.addSpending(spending.date, spending.sum, spending.text, spending.category_id)
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
        spendingService.saveSpending(spending.id, spending.date, spending.sum, spending.text, spending.category_id)
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
        spendingService.removeSpending(id)
            .then(() => {
                const newItems = new Map(this.state.items);
                newItems.delete(id);
                this.setState({items: newItems});

                this.loadStatData();
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    handleAddIncoming(incoming) {
        spendingService.addIncoming(incoming.date, incoming.sum, incoming.text)
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
        spendingService.saveIncoming(incoming.id, incoming.date, incoming.sum, incoming.text)
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
        spendingService.removeIncoming(id)
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
        if (this.state.loadingData) {
            return (
                <div className="d-flex justify-content-center">
                    <div className="spinner-grow" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        }

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

    renderChart() {
        const labels = this.state.stat.map(x => x.category);
        const sums = this.state.stat.map(x => x.sum);

        const datasets = [{
            data: sums,
            backgroundColor: colors
        }];

        return <BadChart type="doughnut" labels={labels} datasets={datasets} />;
    }

    render() {
        const sItems = Array.from(this.state.items.values());
        const iItems = Array.from(this.state.incomingItems.values());

        const items = this.state.visibleTable === tableType.spending
            ? sItems
            : iItems;

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
                            {this.renderSpending(sItems)}
                        </div>
                        <div className={this.state.visibleTable === tableType.incoming ? '' : 'd-none'}>
                            {this.renderIncoming(iItems)}
                        </div>
                    </div>
                    <div className="col-sm-4">
                        {this.renderChart()}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Spending.propTypes = {
    curDate: PropTypes.instanceOf(Date).isRequired,
    mobile: PropTypes.bool.isRequired
};

export default Spending;
