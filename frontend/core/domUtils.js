'use strict';

const delegate = function (className, listener) {
    return function (event) {
        var el = event.target;

        do {
            if ( !(el.classList && el.classList.contains(className)) ) continue;

            listener.apply(this, [event, el]);
        }
        while ( (el = el.parentNode) )
    }
};

const closest = function (el, name) {
    name = name.toUpperCase();

    do {
        if ( !(el.nodeName && el.nodeName === name) ) continue;

        return el
    }
    while ( el = el.parentNode )
};

export { delegate, closest }
