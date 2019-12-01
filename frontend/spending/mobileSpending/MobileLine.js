'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { PencilIcon, TrashcanIcon } from '../../svg/Svg';

import { vibrate } from '../../tools/browserTools';

class MobileLine extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handleLongPress = this.handleLongPress.bind(this);

        this.state = {
            showControl: false
        };
    }

    handleEdit(e) {
        e.preventDefault();

        let id = this.props.id;
        this.props.onEdit(id);
    }

    handleDelete(e) {
        e.preventDefault();

        const confirmDelete = confirm('Вы действительно хотите удалить запись?');
        if (!confirmDelete) {
            return;
        }

        let id = this.props.id;
        this.props.onDelete(id);
    }

    handleTouchStart() {
        this.timer = setTimeout(this.handleLongPress, 500);
    }

    handleTouchEnd() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    handleLongPress() {
        vibrate(50);

        this.setState(prev => {
            return { showControl: !prev.showControl };
        });
    }

    render() {
        return (
            <li className="list-group-item d-flex justify-content-between spending_line py-2"
                onTouchStart={this.handleTouchStart}
                onTouchEnd={this.handleTouchEnd}
                onTouchCancel={this.handleTouchEnd}
                onTouchMove={this.handleTouchEnd} >
                <div>
                    <h6 className="my-0">{this.props.text}</h6>
                    <small className="text-muted">{this.props.categoryName}</small>
                </div>
                <span className="ml-auto">
                    {this.props.sum}
                </span>

                {this.state.showControl &&
                    <div className="d-flex flex-column justify-content-start">
                        <a href="#" className="btn btn-outline-secondary btn-sm ml-1" onClick={this.handleEdit}>
                            <PencilIcon/>
                        </a>
                        <a href="#" className="btn btn-outline-secondary btn-sm ml-1 mt-1" onClick={this.handleDelete}>
                            <TrashcanIcon/>
                        </a>
                    </div>
                }
            </li>
        );
    }
}

MobileLine.propTypes = {
    id: PropTypes.number.isRequired,
    date: PropTypes.string,
    sum: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default MobileLine;
