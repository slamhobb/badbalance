import React from 'react';
import PropTypes from 'prop-types';

import MobileAddSpendingForm from './MobileAddSpendingForm';
import MobileLine from './MobileLine';
import MobileEditLine from './MobileEditLine';

import {groupBy} from '../../tools/dataTools';
import {formatDate} from '../../tools/dateTools';

import './mobileLine.css';

class MobileSpendingTable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.renderMobileLine = this.renderMobileLine.bind(this);
    }

    renderMobileLine(s, categories) {
        const category = this.props.categories.get(s.category_id);

        return s.edit
            ? <MobileEditLine
                key={s.id}
                id={s.id}
                date={s.date}
                sum={s.sum}
                text={s.text}
                categoryId={s.category_id}
                categories={categories}
                onSave={this.props.onSave} />
            : <MobileLine
                key={s.id}
                id={s.id}
                date={s.dateStr}
                sum={s.sum}
                text={s.text}
                categoryName={category ? category.name : ''}
                onEdit={this.props.onEdit}
                onDelete={this.props.onDelete} />;
    }

    render() {
        const categories = Array.from(this.props.categories.values());

        let items = this.props.items.slice();

        items.sort((a, b) => {
            const diff = new Date(b.date) - new Date(a.date);

            return diff === 0 ? b.id - a.id : diff;
        });

        const g = groupBy(items, 'date');

        const listItems = g.map(x => {
            return (
                <div key={x[0].id} className="mt-3">
                    <h5 className="text-muted">{formatDate(x[0].date)}</h5>
                    <ul className="list-group mt-1">
                        { x.map(x => this.renderMobileLine(x, categories))}
                    </ul>
                </div>
            );
        });

        return (
            <div className="row">
                <div className="col-sm-4">
                    <MobileAddSpendingForm
                        defaultDate={this.props.curDate}
                        categories={categories}
                        onAdd={this.props.onAdd} />
                    {listItems}
                    <div className="mb-3" />
                </div>
            </div>
        );
    }
}

MobileSpendingTable.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        date: PropTypes.string.isRequired,
        sum: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        category_id: PropTypes.number.isRequired
    })).isRequired,
    categories: PropTypes.instanceOf(Map).isRequired,
    curDate: PropTypes.string.isRequired,
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default MobileSpendingTable;
