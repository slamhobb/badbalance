'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import flatpickr from './flatpickr';

class ReactDatePicker extends React.PureComponent {
    componentDidMount() {
        const config = {
            onChange: (selectedDates, dateStr) => this.props.onChange(dateStr)
        };

        const dateFormat = this.props.dateFormat;

        if (dateFormat) {
            Object.assign(config, { altFormat: dateFormat });
        }

        this.datePicker = new flatpickr(this.inputElement, config);
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
    defaultValue: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    dateFormat: PropTypes.string
};

export default ReactDatePicker;