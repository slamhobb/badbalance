'use strict';

import 'whatwg-fetch';
import getCSRFToken from './CSRFToken';

const defaultOptions = {
    credentials: 'same-origin'
};

export default {
    gettext: function(url){
        let requestOptions = Object.assign({}, defaultOptions);

        return window.fetch(url, requestOptions)
            .then(handleError)
            .then(parseText);
    },

    getjson: function(url){
        let requestOptions = Object.assign({}, defaultOptions);

        return window.fetch(url, requestOptions)
            .then(handleError)
            .then(parseJson);
    },

    post: function(url) {
        let requestOptions = Object.assign(
            {},
            defaultOptions,
            {
                method: 'post'
            }
        );

        return window.fetch(url, requestOptions)
            .then(handleError)
            .then(parseJson);
    },

    postform: function(url, data){
        let requestOptions = Object.assign(
            {},
            defaultOptions,
            {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                method: 'post',
                body: data
            }
        );

        return window.fetch(url, requestOptions)
            .then(handleError)
            .then(parseJson);
    },

    postjson: function(url, data) {
        let requestOptions = Object.assign(
            {},
            defaultOptions,
            {
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRFToken': getCSRFToken()
                },
                method: 'post',
                body: JSON.stringify(data)
            }
        );

        return window.fetch(url, requestOptions)
            .then(handleError)
            .then(parseJson);
    }
};

function handleError(response){
    if (!response.ok) {
        throw Error(response.statusText);
    }

    return response;
}

function parseText(response) {
    return response.text();
}

function parseJson(response){
    return response.json();
}
