import React from 'react';

import SeparateCategories from './SeparateCategories';

import userConfigService from '../services/userConfigService';
import categoryService from '../services/categoryService';

class UserConfig extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeDefaultPageFastSpending = this.handleChangeDefaultPageFastSpending.bind(this);
        this.handleChangeSeparateCategories = this.handleChangeSeparateCategories.bind(this);

        this.state = {
            defaultPageFastSpending: false,
            separateCategoryIds: [],
            categories: new Map()
        };
    }

    getMap(array) {
        const map = new Map();
        array.forEach(x => map.set(parseInt(x.id), x));
        return map;
    }

    componentDidMount() {
        userConfigService.getUserConfig()
            .then(result => {
                this.setState({
                    defaultPageFastSpending: result.cookie_config.default_page_fast_spending,
                    separateCategoryIds: result.user_config.separate_category_ids
                });
            })
            .catch(error => alert('Произошла ошибка ' + error));

        categoryService.getCategory()
            .then(result => {
                this.setState({
                    categories: this.getMap(result.categories)
                });
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    handleChangeDefaultPageFastSpending(e) {
        const checked = e.target.checked;

        userConfigService.setDefaultPageFastSpending(checked)
            .then(() => {
                this.setState({
                    defaultPageFastSpending: checked
                });
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    handleChangeSeparateCategories(categoryIds) {
        userConfigService.saveSeparateCategoryIds(categoryIds)
            .then(() => {
                this.setState({
                    separateCategoryIds: categoryIds
                });
            })
            .catch(error => alert('Произошла ошибка ' + error));
    }

    render() {
        return (
            <React.Fragment>
                <div className="row mt-4">
                    <div className="col">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox"
                                checked={this.state.defaultPageFastSpending}
                                onChange={this.handleChangeDefaultPageFastSpending} />
                            <label className="form-check-label">Открывать страницу &quot;Быстрый расход&quot; по-умолчанию</label>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col">
                        Категории, по которым сумма показывается отдельно
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-sm-4">
                        <SeparateCategories
                            categoryIds={this.state.separateCategoryIds}
                            categories={this.state.categories}
                            onChange={this.handleChangeSeparateCategories} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

UserConfig.propTypes = {

};

export default UserConfig;
