import React from 'react';
import PropTypes from 'prop-types';

import CategoriesOptions from '../sharedComponents/categoriesOptions/CategoriesOptions';

import { generateDataForChart } from './chartDataGenerator';
import { formatSum } from '../tools/sumTools';

class DetailStatistic extends React.Component {
    constructor(props) {
        super(props);

        this.handleChangeCategory = this.handleChangeCategory.bind(this);

        this.state = {
            category_id: 0
        };
    }

    handleChangeCategory(value) {
        this.setState({ category_id: value });
    }

    renderList(items) {
        const data = generateDataForChart(items, 'text');

        return (
            <table className="table table-sm table-borderless table-striped mt-2">
                <tbody>
                    {data.map(x =>
                        <tr key={x.text}>
                            <td>{formatSum(x.sum)}</td>
                            <td>{x.text}</td>
                        </tr>)}
                </tbody>
            </table>
        );
    }

    render() {
        const { categories } = this.props;
        let { category_id } = this.state;

        const categoryInScope = categories.some(x => x.id === category_id);
        if (!categoryInScope) {
            const firstCategory = categories[0];
            if (firstCategory) {
                category_id = firstCategory.id;
            }
        }

        const filtered = this.props.items.filter(x => x.category_id === category_id);

        return (
            <React.Fragment>
                <CategoriesOptions value={category_id} items={categories}
                    onChange={this.handleChangeCategory} />
                {this.renderList(filtered)}
            </React.Fragment>
        );
    }
}

DetailStatistic.propTypes = {
    items: PropTypes.array.isRequired,
    categories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })).isRequired
};

export default DetailStatistic;
