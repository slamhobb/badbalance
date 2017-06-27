'use strict';

export default function getCSRFToken() {
    const token = document.querySelector('meta[name="csrf-token"]');

    return token ? token.content : '';
}