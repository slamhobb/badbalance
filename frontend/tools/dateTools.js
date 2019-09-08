'use strict';

export function dateToString(date) {
    const localDate = new Date(date);
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());

    return localDate.toISOString().slice(0, 10);
}

export function dateToRuString(date) {
    const localDate = new Date(date);
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());

    const day = ('0' + localDate.getDate()).slice(-2);
    const month = ('0' + (localDate.getMonth() + 1)).slice(-2);

    return `${day}.${month}.${localDate.getFullYear()}`;
}