'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import MonthBalance from './MonthBalance';
import PeriodSelector from './PeriodSelector';
import Switcher from './Switcher';

// spending
import AddForm from './spendingTable/AddSpendingForm';
import SpendingTable from './spendingTable/SpendingTable';

// incoming
import AddIncomingForm from './incomingTable/AddIncomingForm';
import IncomingTable from './incomingTable/IncomingTable';

import BadChart from '../chart';

import HttpClient from '../core/httpClient';

class Spending extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleChangePeriod = this.handleChangePeriod.bind(this);
        this.handleSwitchTable = this.handleSwitchTable.bind(this);

        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.refreshTable = this.refreshTable.bind(this);

        this.onEditIncoming = this.onEditIncoming.bind(this);
        this.onDeleteIncoming = this.onDeleteIncoming.bind(this);
        this.onSaveIncoming = this.onSaveIncoming.bind(this);
        this.onAddIncoming = this.onAddIncoming.bind(this);
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
        let localDate = date;
        localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset());

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

    onAdd(spending) {
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

    onSave(spending) {
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

    onEdit(id) {
        const newItems = new Map(this.state.items);
        newItems.get(id).edit = true;

        this.setState({items: newItems});
    }

    onDelete(id) {
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

    onAddIncoming(incoming) {
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

    onSaveIncoming(incoming) {
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

    onEditIncoming(id) {
        const newItems = new Map(this.state.incomingItems);
        newItems.get(id).edit = true;

        this.setState({incomingItems: newItems});
    }

    onDeleteIncoming(id) {
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
        const items = Array.from(this.state.incomingItems.values());

        return (
            <div>
                <AddIncomingForm
                    defaultDate={this.dateToString(this.props.curDate)}
                    onAdd={this.onAddIncoming}/>
                <IncomingTable
                    items={items}
                    onEdit={this.onEditIncoming}
                    onSave={this.onSaveIncoming}
                    onDelete={this.onDeleteIncoming} />
            </div>
        );
    }

    render() {
        const categories = Array.from(this.state.categories.values());
        const items = Array.from(this.state.items.values());

        const balance = items.reduce((sum, item) => {
            return sum + item.sum;
        }, 0);

        // берём иммено из props что-бы не перерисовывать PeriodSelector каждый раз
        const year = this.props.curDate.getFullYear();
        const month = this.props.curDate.getMonth() + 1;

        const incomingElement = this.state.showIncoming ? this.renderIncoming() : '';

        return (
            <div>
                <div className="row">
                    <div className="col-sm-8">
                        <MonthBalance balance={balance} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <PeriodSelector
                            year={year}
                            month={month}
                            onChange={this.handleChangePeriod} />
                    </div>
                    <div className="col-sm-4">
                        <div className="pull-right">
                            <Switcher currentTable={this.state.visibleTable} onSwitch={this.handleSwitchTable}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-8">
                        <div className={this.state.visibleTable === 'spending' ? 'show' : 'hidden'}>
                            <AddForm
                                defaultDate={this.dateToString(this.props.curDate)}
                                categories={categories}
                                onAdd={this.onAdd}/>
                            <SpendingTable
                                items={items}
                                categories={this.state.categories}
                                onEdit={this.onEdit}
                                onSave={this.onSave}
                                onDelete={this.onDelete} />
                        </div>
                        <div className={this.state.visibleTable === 'incoming' ? 'show' : 'hidden'}>
                            { incomingElement }
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <BadChart data={this.state.stat} />
                    </div>
                </div>
            </div>
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
