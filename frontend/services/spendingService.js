import httpClient from '../core/httpClient';

function successResult(result) {
    if (result.status) {
        return result;
    }

    throw new Error(JSON.stringify(result.message));
}


//spending

function getSpending(year, month) {
    return httpClient.getjson('/spending/list_month' + '/' + year + '/' + month)
        .then(successResult);
}

function addSpending(date, sum, text, categoryId) {
    const data = {
        date: date,
        sum: sum,
        text: text,
        category_id: categoryId
    };

    return httpClient.postjson('/spending/save', data)
        .then(successResult);
}

function saveSpending(id, date, sum, text, categoryId) {
    const data = {
        id: id,
        date: date,
        sum: sum,
        text: text,
        category_id: categoryId
    };

    return httpClient.postjson('/spending/save', data)
        .then(successResult);
}

function removeSpending(id) {
    return httpClient.postjson('/spending/remove', { id: id })
        .then(successResult);
}


//incoming

function getIncoming(year, month) {
    return httpClient.getjson('/incoming/list' + '/' + year + '/' + month)
        .then(successResult);
}

function addIncoming(date, sum, text) {
    const data = {
        date: date,
        sum: sum,
        text: text
    };

    return httpClient.postjson('/incoming/save', data)
        .then(successResult);
}

function saveIncoming(id, date, sum, text) {
    const data = {
        id: id,
        date: date,
        sum: sum,
        text: text,
    };

    return httpClient.postjson('/incoming/save', data)
        .then(successResult);
}

function removeIncoming(id) {
    return httpClient.postjson('/incoming/remove', {id: id})
        .then(successResult);
}


//stat

function getStat(year, month) {
    return httpClient.getjson('/spending/stat/' + year + '/' + month)
        .then(successResult);
}


export default { getSpending, addSpending, saveSpending, removeSpending,
    getIncoming, addIncoming, saveIncoming, removeIncoming,
    getStat };