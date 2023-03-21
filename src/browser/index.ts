/**
 * thena@0.0.1
 * A browser-safe, simple, lightweight, and fast utility library for JavaScript
 */

export const loop = (n: number, fn: (i: number) => void): Promise<void> => {
    return new Promise((resolve) => {
        for (let i = 0; i < n; i++) {
            fn(i);

            if (i === n - 1) {
                resolve();
            }
        }
    });
};

export const each = (arr: any[], fn: (item: any, i: number) => void): Promise<void> => {
    return new Promise((resolve) => {
        for (let i = 0; i < arr.length; i++) {
            fn(arr[i], i);

            if (i === arr.length - 1) {
                resolve();
            }
        }
    });
};

export const num = (n: number | string | object | any[]) => {
    switch (typeof n) {
        case 'number':
            return n;
        case 'string': {
            let number;

            if (n.includes(',')) {
                number = Number(n.replace(/,/g, ''));
            } else {
                number = Number(n);
            }

            if (isNaN(number)) {
                throw new Error(`Cannot convert '${n}' to number`);
            }

            return number;
        }
        case 'object':
            if (n instanceof Array) return n.length;

            return Object.keys(n).length;
        default:
            return 0;
    }
};

export default {
    loop,
    each,
    num,
};
