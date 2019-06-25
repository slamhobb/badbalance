'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import flatpickr from './flatpickr';

class ReactDatePicker extends React.PureComponent {
    componentDidMount() {
        this.datePicker = new flatpickr(this.inputElement, {
            onChange: (selectedDates, dateStr) => this.props.onChange(dateStr)
        });
    }

    componentWillUnmount() {
        this.datePicker.destroy();
    }

    render() {
        return <input className={this.props.className} defaultValue={this.props.defaultValue}
            placeholder={this.props.placeholder} ref={e => this.inputElement = e} />;
    }
}

ReactDatePicker.propTypes = {
    defaultValue: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string
};

export default ReactDatePicker;