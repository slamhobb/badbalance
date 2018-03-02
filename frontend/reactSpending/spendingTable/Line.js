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
                    <div className="spending_date text-right">
                        {this.props.date}
                    </div>
                </td>
                <td>
                    <div className="spending_sum text-right">
                        {this.props.sum}
                    </div>
                </td>
                <td>
                    <div className="spending_text">
                        {this.props.text}

                    </div>
                </td>
                <td>
                    <div className="spending_category">
                        {this.props.categoryName}
                    </div>
                </td>
                <td>
                    <div className="spending_action">
                        <div className="action_wrapper">
                            <a href="#" className="spending_edit" onClick={this.handleEdit}>
                                <PencilIcon />
                            </a>
                            <a href="#" className="spending_delete" onClick={this.handleDelete}>
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
    date: PropTypes.string,
    sum: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Line;
