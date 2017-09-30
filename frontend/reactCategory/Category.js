'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import AddCategoryForm from './AddCategoryForm';
import CategoryTable from './CategoryTable';

import HttpClient from '../core/httpClient';

class Category extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleAdd = this.handleAdd.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            items: new Map()
        };
    }

    componentDidMount() {
        this.refreshTable();
    }

    getMap(array) {
        const map = new Map();
        array.forEach(x => map.set(parseInt(x.id), x));
        return map;
    }

    successResult(result) {
        if (result.status) {
            return result;
        }

        throw new Error(JSON.stringify(result.message));
    }


    refreshTable() {
        HttpClient.getjson(this.props.getCategoryUrl)
            .then(this.successResult)
            .then(result => {
                this.setState({
                    items: this.getMap(result.categories),
                });
            });
    }

    handleAdd(category) {
        HttpClient.postjson(this.props.saveCategoryUrl, category)
            .then(this.successResult)
            .then(result => {
                const id = parseInt(result.id);
                Object.assign(category, {id: id});

                const newItems = new Map(this.state.items);
                newItems.set(category.id, category);
                this.setState({items: newItems});
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    handleSave(category) {
        const data = {
            id: category.id,
            name: category.name
        };

        HttpClient.postjson(this.props.saveCategoryUrl, data)
            .then(this.successResult)
            .then(() => {
                const newItems = new Map(this.state.items);
                newItems.set(category.id, category);
                this.setState({items: newItems});
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    handleEdit(id) {
        const newItems = new Map(this.state.items);
        newItems.get(id).edit = true;

        this.setState({items: newItems});
    }

    handleDelete(id) {
        HttpClient.postjson(this.props.removeCategoryUrl, {id: id})
            .then(this.successResult)
            .then(() => {
                const newItems = new Map(this.state.items);
                newItems.delete(id);
                this.setState({items: newItems});
            })
            .catch(error => {
                alert('Произошла ошибка ' + error);
            });
    }

    render() {
        const items = Array.from(this.state.items.values());

        return (
            <div className="row">
                <div className="col-sm-4">
                    <div className="tab_title">
                        <p>Редактирование списка категорий:</p>
                    </div>

                    <AddCategoryForm onAdd={this.handleAdd}/>
                    <CategoryTable
                        items={items}
                        onEdit={this.handleEdit}
                        onSave={this.handleSave}
                        onDelete={this.handleDelete}/>
                </div>
            </div>
        );
    }
}

Category.propTypes = {
    getCategoryUrl: PropTypes.string.isRequired,
    saveCategoryUrl: PropTypes.string.isRequired,
    removeCategoryUrl: PropTypes.string.isRequired
};

export default Category;