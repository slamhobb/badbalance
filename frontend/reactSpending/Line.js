'use strict';

import React from 'react';
import PropTypes from 'prop-types';

class Line extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleEdit() {
        let id = this.props.id;
        this.props.onEdit(id);
    }

    handleDelete() {
        let id = this.props.id;
        this.props.onDelete(id);
    }

    render() {
        return (
            <tr>
                <td>{this.props.date}</td>
                <td>{this.props.sum}</td>
                <td>{this.props.text}</td>
                <td>{this.props.category}</td>
                <td>
                    <button onClick={this.handleEdit}>Ред</button>
                    <button onClick={this.handleDelete}>Удал</button>
                </td>
            </tr>

        );
    }
}

Line.propTypes = {
    id: PropTypes.number.isRequired,
    date: PropTypes.string,
    sum: PropTypes.number.isRequired,
    text: PropTypes.string,
    category: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Line;
