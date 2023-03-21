/**
 * loop
 * @description loop `n` times
 * @param n number of iterations
 * @param fn callback function to be run on each iteration
 * @returns promise that resolves when loop is complete
 */
export function loop(n: number, fn: (i: number) => void): Promise<void>;

/**
 * each
 * @description loop through an array
 * @param arr array-like object to loop through
 * @param fn callback function to be run on each iteration
 * @returns promise that resolves when loop is complete
 */
export function each(arr: any[], fn: (item: any, i: number) => void): Promise<void>;

/**
 * num
 * @description convert a value to a number
 * @param n number to be converted
 * @returns converted number
 * @throws error if value cannot be converted to a number
 */
export function num(n: number | string | object | any[]): number;

declare const _default: {
    loop: typeof loop;
    each: typeof each;
    num: typeof num;
};

export default _default;
