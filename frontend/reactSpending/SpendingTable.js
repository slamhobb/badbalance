'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import AddForm from './AddSpendingForm';
import Header from './Header';
import Line from './Line';
import EditLine from './EditLine';

import HttpClient from '../core/httpClient';

class SpendingTable extends React.Component {
    constructor(props) {
        super(props);

        this.getMap = this.getMap.bind(this);

        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onAdd = this.onAdd.bind(this);

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

    formatItems(items) {
        let prevDate = '';

        return items.map(item => {

            const dateStr = item.date === prevDate
                ? ''
                : item.date; //moment(item.date).format('ddd D');

            prevDate = item.date;

            return {
                id: item.id,
                date: item.date,
                dateStr: dateStr,
                sum: item.sum,
                text: item.text,
                category_id: item.category_id,
                edit: item.edit
            };
        });
    }

    componentDidMount() {
        HttpClient.getjson(this.props.getCategoriesUrl)
            .then(result => {
                this.setState({
                   categories: this.getMap(result.categories)
                });
            });

        HttpClient.getjson(this.props.getSpendingUrl).then(result => {
           this.setState({
               items: this.getMap(result.spending)
           });
        });
    }

    render() {
        const categories = Array.from(this.state.categories.values());

        let items = Array.from(this.state.items.values());
        items = items.sort((a, b) => new Date(b.date) - new Date(a.date));
        const formattedItems = this.formatItems(items);

        const listItems = formattedItems.map(s => {
            return s.edit
                ? <EditLine
                    key={s.id}
                    id={s.id}
                    date={s.date}
                    sum={s.sum}
                    text={s.text}
                    category_id={s.category_id}
                    categories={categories}
                    onSave={this.onSave} />
                : <Line
                    key={s.id}
                    id={s.id}
                    date={s.dateStr}
                    sum={s.sum}
                    text={s.text}
                    category={this.state.categories.get(s.category_id).name}
                    onEdit={this.onEdit}
                    onDelete={this.onDelete} />
        });

        return (
            <div>
                <div className="table-responsive">
                    <AddForm categories={categories} addSpendingUrl={this.props.saveSpendingUrl}
                             onAdd={this.onAdd}/>
                </div>
                <div className="table-responsive">
                    <table className="spending_table table table-striped table-bordered">
                        <thead>
                            <Header/>
                        </thead>
                        <tbody>
                            {listItems}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

SpendingTable.propTypes = {
    getSpendingUrl:  PropTypes.string.isRequired,
    getCategoriesUrl: PropTypes.string.isRequired,
    saveSpendingUrl: PropTypes.string.isRequired,
    removeSpendingUrl: PropTypes.string.isRequired
};

export default SpendingTable;