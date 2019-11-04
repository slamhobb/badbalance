import httpClient from '../core/httpClient';

function successResult(result) {
    if (result.status) {
        return result;
    }

    throw new Error(JSON.stringify(result.message));
}

export function getCategory() {
    return httpClient.getjson('/category/get_list')
        .then(successResult);
}
