'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import Line from './Line';
import EditLine from './EditLine';

import './categoryTable.css';

class CategoryTable extends React.PureComponent {
    constructor(props) {
        super(props);

        this.renderLine = this.renderLine.bind(this);
    }

    renderLine(c) {
        return c.edit
            ? <EditLine key={c.id} id={c.id} name={c.name} onSave={this.props.onSave}/>
            : <Line key={c.id} id={c.id} name={c.name} onEdit={this.props.onEdit} onDelete={this.props.onDelete} />;
    }

    render() {
        const items = this.props.items.map(this.renderLine);

        return (
            <table className="category_table table table-bordered table-md">
                <thead>
                    <tr>
                        <td>
                            <div className="category_name">
                                Название
                            </div>
                        </td>
                        <td>
                            <div className="category_action">
                                &nbsp;
                            </div>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    { items }
                </tbody>
            </table>
        );
    }
}

CategoryTable.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })).isRequired,
    onEdit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default CategoryTable;
