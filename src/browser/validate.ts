export const isNode = () => {
    return typeof window.process?.versions !== 'undefined';
};
