import httpClient from '../core/httpClient';

function successResult(result) {
    if (result.status) {
        return result;
    }

    throw new Error(JSON.stringify(result.message));
}

export function addSpending(date, sum, text, categoryId) {
    const data = {
        date: date,
        sum: sum,
        text: text,
        category_id: categoryId
    };

    return httpClient.postjson('/spending/save', data)
        .then(successResult);
}
