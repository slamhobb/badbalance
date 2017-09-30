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
                <td>
                    <div className="incoming_date">
                        {this.props.date}
                    </div>
                </td>
                <td>
                    <div className="incoming_sum">
                        {this.props.sum}
                    </div>
                </td>
                <td>
                    <div className="incoming_text">
                        {this.props.text}
                    </div>
                </td>
                <td>
                    <div className="incoming_action">
                        <div className="action_wrapper">
                            <a className="incoming_edit" onClick={this.handleEdit}>
                                <span className="glyphicon glyphicon-pencil" aria-hidden="true" />
                            </a>
                            <a className="incoming_delete" onClick={this.handleDelete}>
                                <span className="glyphicon glyphicon-trash" aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </td>
            </tr>

        );
    }
}

Line.propTypes = {
    id: PropTypes.number.isRequired,
    date: PropTypes.string,
    sum: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Line;