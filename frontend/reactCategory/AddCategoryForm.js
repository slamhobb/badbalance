'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { CheckIcon } from '../svg/Svg';

class AddCategoryForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            name: ''
        };
    }

    handleChangeName(e) {
        const name = e.target.value;

        this.setState({
            name: name
        });
    }

    handleAdd() {
        const data = {
            name: this.state.name
        };

        this.setState({
            name: ''
        });

        this.props.onAdd(data);
    }

    render() {
        return(
            <table className="table table-bordered table-md">
                <tbody>
                    <tr>
                        <td>
                            <div className="category_name">
                                <input type="text" className="form-control" placeholder="Название"
                                    value={this.state.name} onChange={this.handleChangeName} />
                            </div>
                        </td>
                        <td>
                            <div className="category_action">
                                <button className="btn btn-outline-secondary" type="button" onClick={this.handleAdd}>
                                    <CheckIcon />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

AddCategoryForm.propTypes = {
    onAdd: PropTypes.func.isRequired
};

export default AddCategoryForm;