'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import './debtPanel.css';

import AddDebtForm from './AddDebtForm';
import { dateToRuString } from '../../tools/dateTools';
import { ChevronRightIcon, ChevronDownIcon, IncomeIcon, OutcomeIcon } from '../../svg/Svg';

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
        e.stopPropagation();

        this.props.onDelete(this.props.debt_id);
    }

    handleDeleteDebtItem(e, debtItemId) {
        e.preventDefault();

        const confirmDelete = confirm('Вы действительно хотите удалить запись?');
        if (!confirmDelete) {
            return;
        }

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
                    <h4 className="d-flex justify-content-between align-items-center my-0" onClick={this.handleToggle}>
                        <div className="d-flex align-items-center">
                            <span className="mr-2">
                                {props.name}
                            </span>
                            <div className="text-muted">
                                {this.state.minimized
                                    ? <ChevronRightIcon />
                                    : <ChevronDownIcon /> }
                            </div>
                        </div>
                        
                        <div className="d-flex align-items-center">
                            <div className="badge badge-secondary badge-pill">
                                <span>{allSum}</span>
                            </div>
                            { !this.state.minimized &&
                                <button type="button" className="close ml-2" onClick={this.handleDeleteDebt}>
                                    <span>&times;</span>
                                </button>
                            }
                        </div>
                    </h4>

                    {!this.state.minimized &&
                        <ul className="list-group mt-3">
                            {props.items.map(x =>
                                <li key={x.id} className="list-group-item d-flex justify-content-between debt_line">
                                    <div>
                                        <h6 className="my-0">{x.text}</h6>
                                        <small className="text-muted">{dateToRuString(x.date)}</small>
                                    </div>
                                    <div className={x.sum < 0 ? 'd-flex align-items-start text-success' : 'd-flex align-items-start' }>
                                        <span className="mr-1">
                                            {x.sum < 0 ? Math.abs(x.sum) : '+' + Math.abs(x.sum) }
                                        </span>
                                        <div className="d-flex flex-column justify-content-end">
                                            {x.sum < 0
                                                ? <OutcomeIcon className="d-flex align-items-center" />
                                                : <IncomeIcon className="d-flex align-items-center" /> }
                                            <a href="#" className="ml-auto" onClick={e => this.handleDeleteDebtItem(e, x.id)}>
                                                &times;
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            )}
                            <AddDebtForm onAdd={this.props.onAdd}/>
                        </ul>
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