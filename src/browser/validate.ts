export const isNode = () => {
    try {
        return typeof process.versions !== 'undefined';
    } catch (e) {
        return true;
    }
};
