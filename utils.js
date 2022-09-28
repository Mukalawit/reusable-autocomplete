const debounce = (func) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearInterval(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, 500)

    }
}