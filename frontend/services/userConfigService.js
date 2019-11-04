import httpClient from '../core/httpClient';

function successResult(result) {
    if (result.status) {
        return result;
    }

    throw new Error(JSON.stringify(result.message));
}

export function setDefaultPageFastSpending(value) {
    const url = value ? '/user-config/set' : '/user-config/clear';

    return httpClient.post(url)
        .then(successResult);
}

export function getUserConfig() {
    return httpClient.getjson('/user-config/get')
        .then(successResult);
}
