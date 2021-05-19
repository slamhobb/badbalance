import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import CategoriesOptions from '../sharedComponents/categoriesOptions/CategoriesOptions';

function SeparateCategories(props) {
    const [categoryId, setCategoryId] = useState(1);

    useEffect(() => {
        let cats = Array.from(props.categories.values());
        cats = cats.filter(c => !props.categoryIds.includes(c.id));
        if (cats.length > 0) {
            setCategoryId(cats[0].id);
        }

    }, [props.categoryIds, props.categories]);

    function handleSelectCategory(categoryId) {
        setCategoryId(categoryId);
    }

    function handleAddCategory() {
        const categoryIds = props.categoryIds.slice();
        categoryIds.push(categoryId);
        categoryIds.sort();

        props.onChange(categoryIds);
    }

    function handleDeleteCategory(categoryId) {
        const categoryIds = props.categoryIds.slice();
        const index = categoryIds.indexOf(categoryId);
        categoryIds.splice(index, 1);

        props.onChange(categoryIds);
    }

    function renderCategoryLine(categoryId) {
        const category = props.categories.get(categoryId);

        return (
            <li className="list-group-item" key={categoryId}>
                <div className="d-flex">
                    <span>{ category ? category.name : '' }</span>
                    <a href="#" className="ml-auto" onClick={() => handleDeleteCategory(categoryId)}>
                        &times;
                    </a>
                </div>
            </li>
        );
    }

    function renderAddCategory() {
        let cats = Array.from(props.categories.values());
        cats = cats.filter(c => !props.categoryIds.includes(c.id));

        return cats.length > 0
            ? <div className="d-flex mt-1">
                <CategoriesOptions
                    items={cats}
                    value={categoryId}
                    onChange={handleSelectCategory} />
                <button className="btn btn-outline-secondary ml-2" onClick={handleAddCategory}>+</button>
            </div>
            : null;
    }

    const lines = props.categoryIds.map(id => renderCategoryLine(id));

    return (
        <React.Fragment>
            <ul className="list-group">
                { lines }
            </ul>
            {renderAddCategory()}
        </React.Fragment>
    );
}

SeparateCategories.propTypes = {
    categoryIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    categories: PropTypes.instanceOf(Map).isRequired,
    onChange: PropTypes.func.isRequired
};

export default SeparateCategories;
