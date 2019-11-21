function isMobile() {
    return !!navigator.userAgent.toLowerCase().match(/mobile/i);
}

function vibrate(ms) {
    if ('vibrate' in navigator) {
        navigator.vibrate(ms);
    }
}

export { isMobile, vibrate };
