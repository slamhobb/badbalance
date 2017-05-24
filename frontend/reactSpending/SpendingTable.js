'use strict';

import React from 'react';

import HttpClient from '../core/httpClient';

import Header from './Header';
import Line from './Line';
import EditLine from './EditLine';

class SpendingTable extends React.Component {
    constructor(props) {
        super(props);

        this.getMap = this.getMap.bind(this);

        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSave = this.onSave.bind(this);
        //this.addSpending = this.addSpending.bind(this);

        const items = new Map();

        this.state = {
            items: items
        };
    }

    getMap(spendings) {
        const items = new Map();
        spendings.forEach(x => items.set(parseInt(x.id), x));
        return items;
    }

    onEdit(id) {
        const newItems = new Map(this.state.items);
        newItems.get(id).edit = true;

        this.setState({items: newItems});
    }

    onDelete(id) {
        const newItems = new Map(this.state.items);
        newItems.delete(id);

        this.setState({items: newItems});
    }

    onSave(id, spending) {
        const newItems = new Map(this.state.items);
        newItems.set(id, spending);

        this.setState({items: newItems});
    }

    // addSpending(spending) {
    //     const spendings = new Map(this.state.spendings);
    //
    //     spendings.set(spending.id, spending);
    //
    //     this.setState({spendings: spendings});
    // }

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
                category: item.category,
                edit: item.edit
            };
        });
    }

    componentDidMount() {
        HttpClient.getjson(this.props.getUrl).then(result => {
           this.setState({
               items: this.getMap(result.spending)
           });
        });
    }

    render() {
        let items = this.state.items;

        const formattedItems = this.formatItems(Array.from(items.values()));

        const listItems = formattedItems.map(s => {
            return s.edit
                ? <EditLine
                    key={s.id}
                    id={s.id}
                    date={s.date}
                    sum={s.sum}
                    text={s.text}
                    category={s.category}
                    onSave={this.onSave} />
                : <Line
                    key={s.id}
                    id={s.id}
                    date={s.dateStr}
                    sum={s.sum}
                    text={s.text}
                    category={s.category}
                    onEdit={this.onEdit}
                    onDelete={this.onDelete} />
        });

        return (
            <div>
                <table>
                    <thead>
                        {/*<AddForm addSpending={this.addSpending}/>*/}
                        <Header/>
                    </thead>
                    <tbody>
                        {listItems}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SpendingTable;