'use strict';

import React from 'react';
import PropTypes from 'prop-types';

class AddCategoryForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            name: ''
        };
    }

    handleChangeName(name) {
        this.setState({
            name: name
        });
    }

    handleAdd() {
        const data = {
            name: this.state.name
        };

        this.props.onAdd(data);
    }

    render() {
        return(
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <td>
                            <div className="category_name">
                                <input type="text" className="form-control" placeholder="Сумма"
                                    value={this.state.sum} onChange={this.handleChangeSum} />
                            </div>
                        </td>
                        <td>
                            <div className="category_action">
                                <button className="btn btn-default btn-sm" type="button" onClick={this.handleAdd}>
                                    <span className="glyphicon glyphicon-ok" aria-hidden="true" />
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