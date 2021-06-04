import React from 'react';
import PropTypes from 'prop-types';

import SpendingGoal from './SpendingGoal';

import { formatSum } from '../../tools/sumTools';

function SpendingBalance({
    items,
    categories,
    separateCategoryIds,
    spendingGoal
}) {
    function renderCategorySum(categoryId) {
        const category = categories.get(categoryId);
        const categoryName = category ? category.name : '';

        const filteredItems = items.filter(item => categoryId === item.category_id);
        const balance = filteredItems.reduce((sum, item) => sum + item.sum, 0);

        return balance > 0
            ? `${formatSum(balance)} (${categoryName})`
            : null;
    }

    const allBalance = items.reduce((sum, item) => sum + item.sum, 0);

    const mainItems = items.filter(item => !separateCategoryIds.includes(item.category_id));
    const mainBalance = mainItems.reduce((sum, item) => sum + item.sum, 0);

    const separateBalances = separateCategoryIds
        .map(renderCategorySum)
        .filter(b => b !== null);

    const balanceText = separateBalances.length > 0
        ? `Расход за месяц: ${formatSum(mainBalance)} + ${separateBalances.join(' + ')} = ${formatSum(allBalance)}`
        : `Расход за месяц: ${formatSum(allBalance)}`;

    return (
        <React.Fragment>
            {spendingGoal > 0 &&
                <div className="mb-2">
                    <SpendingGoal spendingGoal={spendingGoal} spendingSum={mainBalance}/>
                </div>
            }
            <span>{balanceText}</span>
        </React.Fragment>
    );
}

SpendingBalance.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        sum: PropTypes.number.isRequired,
        category_id: PropTypes.number.isRequired
    })).isRequired,

    categories: PropTypes.instanceOf(Map),
    separateCategoryIds: PropTypes.arrayOf(PropTypes.number).isRequired,

    spendingGoal: PropTypes.number.isRequired
};

export default SpendingBalance;