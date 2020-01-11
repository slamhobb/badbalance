'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { PencilIcon, TrashcanIcon } from '../../svg/Svg';

class Line extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleEdit(e) {
        e.preventDefault();

        const id = this.props.item.id;
        this.props.onEdit(id);
    }

    handleDelete(e) {
        e.preventDefault();

        const confirmDelete = confirm('Вы действительно хотите удалить запись?');
        if (!confirmDelete) {
            return;
        }

        const id = this.props.item.id;
        this.props.onDelete(id);
    }

    render() {
        return (
            <tr>
                <td>
                    <div className="incoming_date text-right">
                        {this.props.item.date}
                    </div>
                </td>
                <td>
                    <div className="incoming_sum text-right">
                        {this.props.item.sum}
                    </div>
                </td>
                <td>
                    <div className="incoming_text">
                        {this.props.item.text}
                    </div>
                </td>
                <td>
                    <div className="incoming_action">
                        <div className="action_wrapper">
                            <a href="#" className="incoming_edit" onClick={this.handleEdit}>
                                <PencilIcon />
                            </a>
                            <a href="#" className="incoming_delete" onClick={this.handleDelete}>
                                <TrashcanIcon />
                            </a>
                        </div>
                    </div>
                </td>
            </tr>

        );
    }
}

Line.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        date: PropTypes.string,
        sum: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    }),
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Line;