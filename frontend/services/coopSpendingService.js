import httpClient from '../core/httpClient';

function successResult(result) {
    if (result.status) {
        return result;
    }

    throw new Error(JSON.stringify(result.message));
}

function getCoops() {
    return httpClient.getjson('/coop-spending/list')
        .then(successResult);
}

function getCoopData(coopId) {
    return httpClient.getjson(`/coop-spending/get-data/${coopId}`)
        .then(successResult);
}

function addCoop(coopSpending) {
    return httpClient.postjson('/coop-spending/add', coopSpending)
        .then(successResult);
}

function addCoopSpendingItem(coopSpendingItem) {
    return httpClient.postjson('/coop-spending/add-item', coopSpendingItem)
        .then(successResult);
}

export default { getCoops, getCoopData, addCoop, addCoopSpendingItem };
