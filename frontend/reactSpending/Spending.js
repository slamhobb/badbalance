'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import MonthBalance from './MonthBalance';
import PeriodSelector from './PeriodSelector';
import AddForm from './AddSpendingForm';
import SpendingTable from './SpendingTable';


import HttpClient from '../core/httpClient';

class Spending extends React.PureComponent {
    constructor(props) {
        super(props);

        this.getMap = this.getMap.bind(this);

        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onAdd = this.onAdd.bind(this);

        this.changePeriod = this.changePeriod.bind(this);
        this.refreshTable = this.refreshTable.bind(this);

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
                } else {
                    alert(JSON.stringify(result.message));
                }
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    changePeriod(period) {
        this.refreshTable(period.year, period.month);
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

    componentDidMount() {
        const year = this.props.curDate.getFullYear();
        const month = this.props.curDate.getMonth() + 1;

        this.refreshTable(year, month);
    }

    render() {
        const items = Array.from(this.state.items.values());

        let balance = 0;
        for (let i of items) {
            balance += i.sum;
        }

        const categories = Array.from(this.state.categories.values());

        const year = this.props.curDate.getFullYear();
        const month = this.props.curDate.getMonth() + 1;

        return (
            <div>
                <MonthBalance balance={balance} />
                <PeriodSelector
                    year={year}
                    month={month}
                    onChange={this.changePeriod} />
                <AddForm defaultDate={this.props.curDate.toISOString()}
                         categories={categories} onAdd={this.onAdd}/>
                <SpendingTable
                    items={items}
                    categories={this.state.categories}
                    onAdd={this.onAdd}
                    onEdit={this.onEdit}
                    onSave={this.onSave}
                    onDelete={this.onDelete} />
            </div>
        )
    }
}

Spending.propTypes = {
    curDate: PropTypes.instanceOf(Date).isRequired,
    saveSpendingUrl: PropTypes.string.isRequired,
    getSpendingUrl:  PropTypes.string.isRequired,
};

export default Spending;