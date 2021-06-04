import React from 'react';

import SeparateCategories from './SeparateCategories';

import { CheckIcon } from '../svg/Svg';

import userConfigService from '../services/userConfigService';
import categoryService from '../services/categoryService';

class UserConfig extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeDefaultPageFastSpending = this.handleChangeDefaultPageFastSpending.bind(this);
        this.handleChangeSeparateCategories = this.handleChangeSeparateCategories.bind(this);
        this.handleChangeSpendingGoal = this.handleChangeSpendingGoal.bind(this);
        this.handleSaveSpendingGoal = this.handleSaveSpendingGoal.bind(this);

        this.state = {
            defaultPageFastSpending: false,

            separateCategoryIds: [],
            categories: new Map(),

            spendingGoal: 0,
            spendingGoalLoading: false
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
                const cookieConfig = result.cookie_config;
                const userConfig = result.user_config;

                this.setState({
                    defaultPageFastSpending: cookieConfig.default_page_fast_spending,
                    separateCategoryIds: userConfig.separate_category_ids,
                    spendingGoal: userConfig.spending_goal
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

    handleChangeSpendingGoal(e) {
        const sum = parseInt(e.target.value);

        this.setState({
            spendingGoal: isNaN(sum) ? 0 : sum
        });
    }

    handleSaveSpendingGoal() {
        this.setState({
            spendingGoalLoading: true
        }, () => {
            userConfigService.saveSpendingGoal(this.state.spendingGoal)
                .then(() => {
                    this.setState({
                        spendingGoalLoading: false
                    });
                })
                .catch(error => alert('Произошла ошибка ' + error));
        });
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

                <div className="row mt-3">
                    <div className="col">
                        Цель потратить в этом месяце максимум
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-sm-4">
                        <div className="d-flex">
                            <input type="text" className="form-control mr-2"
                                value={this.state.spendingGoal}
                                onChange={this.handleChangeSpendingGoal} />
                            {this.state.spendingGoalLoading ? (
                                <button className="btn btn-outline-secondary">
                                    <span className="spinner-border spinner-border-sm"
                                        role="status" aria-hidden="true" />
                                </button>
                            ) : (
                                <button className="btn btn-outline-secondary" onClick={this.handleSaveSpendingGoal}>
                                    <CheckIcon/>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

UserConfig.propTypes = {

};

export default UserConfig;
