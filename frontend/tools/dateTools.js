'use strict';

export function dateToString(date) {
    let localDate = new Date(date);
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());

    return localDate.toISOString().slice(0, 10);
}