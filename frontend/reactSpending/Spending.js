'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import MonthBalance from './MonthBalance';
import PeriodSelector from './PeriodSelector';
import AddForm from './AddSpendingForm';
import SpendingTable from './SpendingTable';

import BadChart from '../chart';

import HttpClient from '../core/httpClient';

class Spending extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onChangePeriod = this.onChangePeriod.bind(this);

        this.refreshTable = this.refreshTable.bind(this);
        this.refreshChart = this.refreshChart.bind(this);

        this.year = this.props.curDate.getFullYear();
        this.month = this.props.curDate.getMonth() + 1;

        this.state = {
            items: new Map(),
            categories: new Map()
        };
    }

    getMap(array) {
        const map = new Map();
        array.forEach(x => map.set(parseInt(x.id), x));
        return map;
    }

    onEdit(id) {
        const newItems = new Map(this.state.items);
        newItems.get(id).edit = true;

        this.setState({items: newItems});
    }

    onDelete(id) {
        HttpClient.postjson(this.props.removeSpendingUrl, {id: id})
            .then(result => {
                if (result.status) {

                    const newItems = new Map(this.state.items);
                    newItems.delete(id);
                    this.setState({items: newItems});

                    this.refreshChart(this.year, this.month);

                } else {
                    alert(JSON.stringify(result.message));
                }
            })
            .catch(error => {
                alert('Произошла ошибка ' + error);
            });
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
            .then(result => {
                if (result.status) {

                    const newItems = new Map(this.state.items);
                    newItems.set(spending.id, spending);
                    this.setState({items: newItems});

                    this.refreshChart(this.year, this.month);

                } else {
                    alert(JSON.stringify(result.message));
                }
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    onAdd(spending) {
        HttpClient.postjson(this.props.saveSpendingUrl, spending)
            .then(result => {
                if (result.status) {
                    const id = parseInt(result.id);
                    Object.assign(spending, {id: id});

                    const newItems = new Map(this.state.items);
                    newItems.set(spending.id, spending);
                    this.setState({items: newItems});

                    this.refreshChart(this.year, this.month);

                } else {
                    alert(JSON.stringify(result.message));
                }
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    onChangePeriod(period) {
        this.year = period.year;
        this.month = period.month;

        this.refreshTable(this.year, this.month);
        this.refreshChart(this.year, this.month);
    }

    refreshTable(year, month) {
        HttpClient.getjson(this.props.getSpendingUrl + '/' + year + '/' + month)
            .then(result => {
                this.setState({
                    items: this.getMap(result.spending),
                    categories: this.getMap(result.categories)
                });
            });
    }

    refreshChart(year, month) {
        HttpClient.getjson('/spending/stat/' + year + '/' + month)
            .then(result => {
                this.setState({
                    stat: result
                });
            });
    }

    componentDidMount() {
        this.refreshTable(this.year, this.month);
        this.refreshChart(this.year, this.month);
    }

    render() {
        const items = Array.from(this.state.items.values());

        let balance = 0;
        for (let i of items) {
            balance += i.sum;
        }

        const categories = Array.from(this.state.categories.values());

        // берём иммено из props что-бы не перерисовывать PeriodSelector каждый раз
        const year = this.props.curDate.getFullYear();
        const month = this.props.curDate.getMonth() + 1;

        return (
            <div>
                <MonthBalance balance={balance} />
                <PeriodSelector
                    year={year}
                    month={month}
                    onChange={this.onChangePeriod} />
                <div className="row">
                    <div className="col-sm-8">
                        <AddForm defaultDate={this.props.curDate.toISOString().slice(0, 10)}
                            categories={categories} onAdd={this.onAdd}/>
                        <SpendingTable
                            items={items}
                            categories={this.state.categories}
                            onAdd={this.onAdd}
                            onEdit={this.onEdit}
                            onSave={this.onSave}
                            onDelete={this.onDelete} />
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
    removeSpendingUrl: PropTypes.string.isRequired
};

export default Spending;
