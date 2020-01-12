import httpClient from '../core/httpClient';

function successResult(result) {
    if (result.status) {
        return result;
    }

    throw new Error(JSON.stringify(result.message));
}


// debt

function getDebts() {
    return httpClient.getjson('/debt/list')
        .then(successResult);
}

function addDebt(debtName) {
    const data = {
        name: debtName
    };

    return httpClient.postjson('/debt/add', data)
        .then(successResult);
}

function removeDebt(debtId) {
    const data = {
        id: debtId
    };

    return httpClient.postjson('/debt/remove', data)
        .then(successResult);
}


// debt item

function addDebtItem(date, sum, text, debtId) {
    const data = {
        date: date,
        sum: sum,
        text: text,
        debt_id: debtId
    };

    return httpClient.postjson('/debt/add_item', data)
        .then(successResult);
}

function removeDebtItem(id, debtId) {
    const data = {
        id: id,
        debt_id: debtId
    };

    return httpClient.postjson('/debt/remove_item', data)
        .then(successResult);
}


export default { getDebts, addDebt, removeDebt, addDebtItem, removeDebtItem };
