'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import './switcher.css';

class Switcher extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleClickSpending = this.handleClickSpending.bind(this);
        this.handleClickIncoming = this.handleClickIncoming.bind(this);
    }

    handleClickSpending(e) {
        e.preventDefault();

        if (this.props.currentTable === 'spending') {
            return;
        }

        this.props.onSwitch();
    }

    handleClickIncoming(e) {
        e.preventDefault();

        if (this.props.currentTable === 'incoming') {
            return;
        }

        this.props.onSwitch();
    }

    render() {
        const isSpending = this.props.currentTable === 'spending';
        const isIncoming = this.props.currentTable === 'incoming';

        return (
            <div className="btn-group" role="group" aria-label="switcher">
                <a className={isSpending ? 'btn btn-primary active disable-switcher' : 'btn btn-light' } role="button" onClick={this.handleClickSpending}>Расходы</a>
                <a className={isIncoming ? 'btn btn-primary active disable-switcher' : 'btn btn-light' } role="button" onClick={this.handleClickIncoming}>Доходы</a>
            </div>
        );
    }
}

Switcher.propTypes = {
    currentTable: PropTypes.string.isRequired,
    onSwitch: PropTypes.func.isRequired
};

export default Switcher;
