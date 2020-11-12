'use strict';

import React from 'react';
//import PropTypes from 'prop-types';

import AddCategoryForm from './AddCategoryForm';
import CategoryTable from './CategoryTable';

import categoryService from '../services/categoryService';

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
        this.loadCategoryData();
    }

    getMap(array) {
        const map = new Map();
        array.forEach(x => map.set(parseInt(x.id), x));
        return map;
    }

    loadCategoryData() {
        categoryService.getCategory()
            .then(result => {
                this.setState({
                    items: this.getMap(result.categories),
                });
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    handleAdd(category) {
        categoryService.addCategory(category.name)
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
        categoryService.saveCategory(category.id, category.name)
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
        categoryService.removeCategory(id)
            .then(() => {
                const newItems = new Map(this.state.items);
                newItems.delete(id);
                this.setState({items: newItems});
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    render() {
        const items = Array.from(this.state.items.values());

        return (
            <React.Fragment>
                <h2 className="mt-4">Редактирование списка категорий</h2>

                <div className="row mt-3">
                    <div className="col-sm-4">
                        <AddCategoryForm onAdd={this.handleAdd}/>
                        <CategoryTable
                            items={items}
                            onEdit={this.handleEdit}
                            onSave={this.handleSave}
                            onDelete={this.handleDelete}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Category.propTypes = {
};

export default Category;