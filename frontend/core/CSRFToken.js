'use strict';

export default function getCSRFToken() {
    let token = document.querySelector('meta[name="csrf-token"]');

    return token ? token.content : '';
}