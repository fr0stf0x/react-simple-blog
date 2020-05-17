export const getSafe = (fn, defaultValue = '') => {
    try {
        return fn() || defaultValue;
    } catch (er) {
        return defaultValue;
    }
};

export const emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;