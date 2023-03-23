import { each, loop, num } from '.';

export * from '.';

/**
 * json
 * @description read a JSON file and return the parsed data
 * @param file path to the JSON file
 * @param encoding encoding to use when reading/writing to the file
 */
export function json(
    file: string,
    encoding?: BufferEncoding
): {
    [x: string]: any;
};

/**
 * set
 * @description set a value in a JSON file
 * @param file path to the JSON file
 * @param key key to set
 * @param value value to set
 * @param encoding encoding to use when reading/writing to the file
 */
export function set(file: string, key: string | symbol, value: any, encoding?: BufferEncoding): void;

/**
 * stream
 * @description read a JSON file and return a proxy that can be used to read and write to the file
 * @param file path to the JSON file
 * @param encoding encoding to use when reading/writing to the file
 * @returns proxy object that can be used to read and write to the file
 */
export function stream(
    file: string,
    encoding?: BufferEncoding
): {
    [x: string]: any;
    /**
     * __data
     * @description the raw data of the JSON file
     */
    __data: {
        [x: string]: any;
    };
    /**
     * __filename
     * @description the path to the JSON file
     */
    __filename: string;
};

export interface ASCII {
    reset: '\x1b[0m';
    bold: '\x1b[1m';
    dim: '\x1b[2m';
    underscore: '\x1b[4m';
    blink: '\x1b[5m';
    reverse: '\x1b[7m';
    hidden: '\x1b[8m';
    black: '\x1b[30m';
    red: '\x1b[31m';
    green: '\x1b[32m';
    yellow: '\x1b[33m';
    blue: '\x1b[34m';
    magenta: '\x1b[35m';
    cyan: '\x1b[36m';
    white: '\x1b[37m';
    bg_black: '\x1b[40m';
    bg_red: '\x1b[41m';
    bg_grees: '\x1b[42m';
    bg_yellow: '\x1b[43m';
    bg_blue: '\x1b[44m';
    bg_magenta: '\x1b[45m';
    bg_cyan: '\x1b[46m';
    bg_white: '\x1b[47m';
}

/**
 * log
 * @description Effortlessly colour and style your console logs.
 * @param message - the message to log
 * @param colours - the colours/styles to apply to the message
 * @example
 * log('Hello World', 'bold', 'red');
 */
export function log(message: any, ...colours: string[]): void;

declare const _default: {
    json: typeof json;
    set: typeof set;
    stream: typeof stream;
    loop: typeof loop;
    each: typeof each;
    num: typeof num;
    log: typeof log;
    ASCII: ASCII;
};

export default _default;
