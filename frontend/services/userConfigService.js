import httpClient from '../core/httpClient';

function successResult(result) {
    if (result.status) {
        return result;
    }

    throw new Error(JSON.stringify(result.message));
}

function getUserConfig() {
    return httpClient.getjson('/user-config/get')
        .then(successResult);
}

function setDefaultPageFastSpending(value) {
    const url = value
        ? '/user-config/set-default-fast-spending'
        : '/user-config/clear-default-fast-spending';

    return httpClient.post(url)
        .then(successResult);
}

function saveSeparateCategoryIds(categoryIds) {
    const data = {
        separate_category_ids: categoryIds
    };

    return httpClient.postjson('/user-config/save-separate-category', data);
}

export default { getUserConfig, setDefaultPageFastSpending, saveSeparateCategoryIds };
