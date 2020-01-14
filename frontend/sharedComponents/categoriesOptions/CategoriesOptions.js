'use strict';

import React from 'react';
import PropTypes from 'prop-types';

class CategoriesOptions extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const value = parseInt(e.target.value);

        this.props.onChange(value);
    }

    render() {
        const items = this.props.items;

        const options = items.map(x => <option key={x.id} value={x.id}>{x.name}</option>);

        return(
            <select className="form-control" title="Категория"
                value={this.props.value} onChange={this.handleChange}>
                {options}
            </select>
        );
    }
}

CategoriesOptions.propTypes = {
    value: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })).isRequired,
    onChange: PropTypes.func.isRequired
};

export default CategoriesOptions;
