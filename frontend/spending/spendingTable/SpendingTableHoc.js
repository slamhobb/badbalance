'use strict';

import React from 'react';
import PropTypes from 'prop-types';


function withFiltered(WrappedComponent) {
    class FilteredTable extends React.PureComponent {
        constructor(props) {
            super(props);

            this.handleToggle = this.handleToggle.bind(this);
            this.handleChangeFilter = this.handleChangeFilter.bind(this);
            this.handleChangeCategoryFilter = this.handleChangeCategoryFilter.bind(this);

            this.state = {
                filterEnable: false,
                filter: '',
                categoryFilter: ''
            };
        }

        filterItems(items) {
            if (!this.state.filterEnable) {
                return items;
            }

            const { filter, categoryFilter } = this.state;
            const categories = this.props.categories;

            if (filter !== '') {
                items = items.filter(x => x.text.toLowerCase().indexOf(filter) !== -1);
            }

            if (categoryFilter !== '') {
                items = items.filter(x => categories.get(x.category_id).name.toLowerCase().indexOf(categoryFilter) !== -1);
            }

            return items;
        }

        handleToggle(e) {
            e.preventDefault();

            this.setState((prevState) => ({ filterEnable: !prevState.filterEnable }));
        }

        handleChangeFilter(e) {
            const filter = e.target.value;

            this.setState({
                filter: filter.toLowerCase()
            });
        }

        handleChangeCategoryFilter(e) {
            const filter = e.target.value;

            this.setState({
                categoryFilter: filter.toLowerCase()
            });
        }

        render() {
            const { items, ...rest } = this.props;

            let itms = items.slice();

            itms = this.filterItems(itms);

            return <WrappedComponent
                items={itms}
                {...rest}
                filterEnable={this.state.filterEnable}
                filter={this.state.filter}
                categoryFilter={this.state.categoryFilter}
                onToggleFilter={this.handleToggle}
                onChangeFilter={this.handleChangeFilter}
                onChangeCategoryFilter={this.handleChangeCategoryFilter} />;
        }
    }

    FilteredTable.propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            date: PropTypes.string.isRequired,
        })).isRequired,
        categories: PropTypes.instanceOf(Map).isRequired,
    };

    return FilteredTable;
}

export default withFiltered;
