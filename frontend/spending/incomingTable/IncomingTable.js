'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import AddIncomingForm from './AddIncomingForm';
import Header from './Header';
import Line from './Line';
import EditLine from './EditLine';

import './incomingTable.css';

const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

class IncomingTable extends React.PureComponent {
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
                edit: item.edit
            };
        });
    }

    renderLine(s) {
        return s.edit
            ? <EditLine
                key={s.id}
                item={{
                    id: s.id,
                    date: s.date,
                    sum: s.sum,
                    text: s.text
                }}
                onSave={this.props.onSave} />
            : <Line
                key={s.id}
                item={{
                    id: s.id,
                    date: s.dateStr,
                    sum: s.sum,
                    text: s.text
                }}
                onEdit={this.props.onEdit}
                onDelete={this.props.onDelete} />;
    }

    render() {
        const items = this.props.items.slice();
        items.sort((a, b) => {
            const diff = new Date(b.date) - new Date(a.date);

            return diff === 0 ? b.id - a.id : diff;
        });

        const formattedItems = this.formatItems(items);

        const listItems = formattedItems.map(s => this.renderLine(s));

        return (
            <div className="table-responsive">
                <AddIncomingForm
                    defaultDate={this.props.curDate}
                    onAdd={this.props.onAdd} />
                <table className="incoming_table table table-bordered table-striped table-md">
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

IncomingTable.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        sum: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    })).isRequired,
    curDate: PropTypes.string.isRequired,
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default IncomingTable;