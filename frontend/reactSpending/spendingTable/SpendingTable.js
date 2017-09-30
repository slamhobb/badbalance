'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Line from './Line';
import EditLine from './EditLine';

import './spendingTable.css';

const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

class SpendingTable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.renderLine = this.renderLine.bind(this);
    }

    formatItems(items) {
        let prevDate = '';

        function formatDate(date) {
            const dateObj = new Date(date);

            return `${days[dateObj.getDay()]} ${dateObj.getDate()}`;
        }

        return items.map(item => {

            const dateStr = item.date === prevDate
                ? ''
                : formatDate(item.date); //moment(item.date).format('ddd D');

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

    renderLine(s, categories) {
        return s.edit
            ? <EditLine
                key={s.id}
                id={s.id}
                date={s.date}
                sum={s.sum}
                text={s.text}
                category_id={s.category_id}
                categories={categories}
                onSave={this.props.onSave} />
            : <Line
                key={s.id}
                id={s.id}
                date={s.dateStr}
                sum={s.sum}
                text={s.text}
                categoryName={this.props.categories.get(s.category_id).name}
                onEdit={this.props.onEdit}
                onDelete={this.props.onDelete} />;
    }

    render() {
        const categories = Array.from(this.props.categories.values());

        let items = this.props.items;
        items = items.sort((a, b) => new Date(b.date) - new Date(a.date));

        const formattedItems = this.formatItems(items);

        const listItems = formattedItems.map(s => this.renderLine(s, categories));

        return (
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
        );
    }
}

SpendingTable.propTypes = {
    items: PropTypes.array.isRequired,
    categories: PropTypes.instanceOf(Map).isRequired,
    onEdit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default SpendingTable;