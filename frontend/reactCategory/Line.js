'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { PencilIcon, TrashcanIcon } from '../svg/Svg';

class Line extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleEdit(e) {
        e.preventDefault();

        let id = this.props.id;
        this.props.onEdit(id);
    }

    handleDelete(e) {
        e.preventDefault();

        let id = this.props.id;
        this.props.onDelete(id);
    }

    render() {
        return (
            <tr>
                <td>
                    <div className="category_name">
                        {this.props.name}
                    </div>
                </td>
                <td>
                    <div className="category_action">
                        <div className="action_wrapper">
                            <a href="#" className="category_edit" onClick={this.handleEdit}>
                                <PencilIcon />
                            </a>
                            <a href="#" className="category_delete" onClick={this.handleDelete}>
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Line;
