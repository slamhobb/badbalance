'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import './debtPanel.css';

import AddDebtForm from './AddDebtForm';

class DebtPanel extends React.Component {
    constructor(props) {
        super(props);

        this.handleToggle = this.handleToggle.bind(this);
        this.handleDeleteDebt = this.handleDeleteDebt.bind(this);
        this.handleDeleteDebtItem = this.handleDeleteDebtItem.bind(this);

        this.state = {
            minimized: true
        };
    }

    handleToggle() {
        this.setState(prev => ({
            minimized: !prev.minimized
        }));
    }

    handleDeleteDebt(e) {
        e.preventDefault();

        this.props.onDelete(this.props.debt_id);
    }

    handleDeleteDebtItem(e, debtItemId) {
        e.preventDefault();

        this.props.onDeleteItem(debtItemId, this.props.debt_id);
    }

    render() {
        const props = this.props;

        const allSum = props.items.reduce((sum, item) => {
            return sum + item.sum;
        }, 0);

        return (
            <div className="row mt-3">
                <div className="col-md-4">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-muted" onClick={this.handleToggle}>{props.name}</span>
                        <div className="badge badge-secondary badge-pill">
                            <span>{allSum}</span>
                            <a href="#" aria-hidden="true"
                                onClick={this.handleDeleteDebt}>
                                &times;
                            </a>
                        </div>
                    </h4>

                    {!this.state.minimized &&
                        <div>
                            <ul className="list-group mb-3">
                                {props.items.map(x =>
                                    <li key={x.id} className="list-group-item d-flex justify-content-between debt_line">
                                        <div>
                                            <h6 className="my-0">{x.text}</h6>
                                            <small className="text-muted">{x.date}</small>
                                        </div>
                                        <div>
                                            <div className="text-muted">{x.sum}</div>
                                            <a href="#" aria-hidden="true"
                                                onClick={e => this.handleDeleteDebtItem(e, x.id)}>
                                                &times;
                                            </a>
                                        </div>
                                    </li>
                                )}
                            </ul>
                            <AddDebtForm onAdd={this.props.onAdd}/>
                        </div>
                    }

                </div>
            </div>
        );
    }
}

DebtPanel.propTypes = {
    name: PropTypes.string.isRequired,
    debt_id: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        date: PropTypes.string.text,
        text: PropTypes.string.isRequired,
        sum: PropTypes.number.isRequired
    })).isRequired,
    onAdd: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired
};

export default DebtPanel;