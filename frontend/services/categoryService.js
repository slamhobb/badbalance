import httpClient from '../core/httpClient';

function successResult(result) {
    if (result.status) {
        return result;
    }

    throw new Error(JSON.stringify(result.message));
}


function getCategory() {
    return httpClient.getjson('/category/get_list')
        .then(successResult);
}

function addCategory(name) {
    const data = {
        name: name
    };

    return httpClient.postjson('/category/save', data)
        .then(successResult);
}

function saveCategory(id, name) {
    const data = {
        id: id,
        name: name
    };

    return httpClient.postjson('/category/save', data)
        .then(successResult);
}

function removeCategory(id) {
    return httpClient.postjson('/category/delete', {id: id})
        .then(successResult);
}


export default { getCategory, addCategory, saveCategory, removeCategory };
