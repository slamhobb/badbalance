import React from 'react';
import PropTypes from 'prop-types';

const addState = {
    INIT: 0,
    ADD: 1
};

class AddDebtForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleShowAdd = this.handleShowAdd.bind(this);
        this.handleChangeDebtName = this.handleChangeDebtName.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.state = {
            addState: addState.INIT,
            debtName: '',
        };
    }

    handleShowAdd(e) {
        e.preventDefault();

        this.setState({
            addState: addState.ADD
        });
    }

    handleChangeDebtName(e) {
        this.setState({
            debtName: e.target.value
        });
    }

    handleAdd() {
        this.props.onAdd(this.state.debtName)
            .then(() => {
                this.setState({
                    debtName: '',
                    addState: addState.INIT
                });
            });
    }

    render() {
        if (this.state.addState === addState.INIT) {
            return (
                <div className="row mt-4">
                    <div className="col-sm-4">
                        <a href="#" onClick={this.handleShowAdd}>Добавить нового человека</a>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row mt-4">
                    <div className="col-sm-4">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Имя человека"
                                value={this.state.debtName} onChange={this.handleChangeDebtName}/>
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-primary"
                                    onClick={this.handleAdd}>
                                    Добавить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

AddDebtForm.propTypes = {
    onAdd: PropTypes.func.isRequired
};

export default AddDebtForm;