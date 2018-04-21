'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import AddSpendingForm from './AddSpendingForm';
import Header from './Header';
import Line from './Line';
import EditLine from './EditLine';

import TableFilter from './TableFilter';

import './spendingTable.css';

const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

class SpendingTable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.renderLine = this.renderLine.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleChangeFilter = this.handleChangeFilter.bind(this);
        this.handleChangeCategoryFilter = this.handleChangeCategoryFilter.bind(this);

        this.state = {
            filterEnable: false,
            filter: '',
            categoryFilter: ''
        };
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

    filterItems(itemsForFilter) {
        let items = itemsForFilter.slice();

        if (!this.state.filterEnable) {
            return items;
        }

        const { filter, categoryFilter } = this.state;
        const categories = this.props.categories;

        if (filter !== '') {
            items = items.filter(x => x.text.toLowerCase().indexOf(filter) !== -1);
        }

        if (categoryFilter !== '') {
            items = items.filter(x => categories.get(x.category_id).name.toLowerCase().indexOf(categoryFilter) !== -1);
        }

        return items;
    }

    renderLine(s, categories) {
        const category = this.props.categories.get(s.category_id);

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
                categoryName={category ? category.name : ''}
                onEdit={this.props.onEdit}
                onDelete={this.props.onDelete} />;
    }

    handleToggle() {
        this.setState((prevState) => ({ filterEnable: !prevState.filterEnable }));
    }

    handleChangeFilter(e) {
        const filter = e.target.value;

        this.setState({
            filter: filter.toLowerCase()
        });
    }

    handleChangeCategoryFilter(e) {
        const filter = e.target.value;

        this.setState({
            categoryFilter: filter.toLowerCase()
        });
    }

    render() {
        const categories = Array.from(this.props.categories.values());

        let items = this.props.items;
        items = items.sort((a, b) => {
            const diff = new Date(b.date) - new Date(a.date);

            return diff === 0 ? b.id - a.id : diff;
        });

        // важно сначала фильтровать, а затем уже делать formatItems,
        // т.к. при форматировании проставляется дата
        items = this.filterItems(items);

        const formattedItems = this.formatItems(items);

        const listItems = formattedItems.map(s => this.renderLine(s, categories));

        return (
            <div className="table-responsive">
                <AddSpendingForm
                    defaultDate={this.props.curDate}
                    categories={categories}
                    onAdd={this.props.onAdd} />
                <table className="spending_table table table-bordered table-striped table-md">
                    <thead>
                        <Header onToggleFilter={this.handleToggle}/>
                        <TableFilter visible={this.state.filterEnable}
                            filter={this.state.filter} categoryFilter={this.state.categoryFilter}
                            onChange={this.handleChangeFilter}
                            onChangeCategoryFilter={this.handleChangeCategoryFilter} />
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
    curDate: PropTypes.string.isRequired,
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default SpendingTable;
