'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { CheckIcon } from '../svg/Svg';

class EditLine extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleSave = this.handleSave.bind(this);

        this.state = {
            name: this.props.name
        };
    }

    handleChangeName(e) {
        const name = e.target.value;

        this.setState({
            name: name
        });
    }

    handleSave() {
        const id = this.props.id;

        const category = Object.assign({id: id}, this.state);

        this.props.onSave(category);
    }

    render() {
        return (
            <tr>
                <td>
                    <div className="category_name">
                        <input className="form-control" value={this.state.name} onChange={this.handleChangeName}/>
                    </div>
                </td>
                <td>
                    <div className="category_action">
                        <button className="btn btn-outline-secondary" type="button" onClick={this.handleSave}>
                            <CheckIcon />
                        </button>
                    </div>
                </td>
            </tr>
        );
    }
}

EditLine.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired
};

export default EditLine;
