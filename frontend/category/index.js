'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import Category from './Category';

ReactDOM.render(
    <Category
        getCategoryUrl='/category/get_list'
        saveCategoryUrl='/category/save'
        removeCategoryUrl='/category/delete'
    />,
    document.getElementById('category-js')
);
