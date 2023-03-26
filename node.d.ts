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

/**
 * watch
 * @description watch a file for changes, with a few improvements
 * @param file path to the file to watch
 * @param callback callback to run when the file changes
 * @example
 * watch('file.json', (file, eventType) => {
 *    console.log(`File ${file}: ${eventType}`); // File file.json: change
 * });
 */
export function watch(file: string, callback: (file: string, eventType: any) => void): void;

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

/**
 * color
 * @description Effortlessly colour and style a string.
 * @param message - the string to colour
 * @param colours - the colours/styles to apply to the string
 * @example
 * color('Hello World', 'bold', 'red');
 */
export function color(message: any, ...colours: string[]): string;

/**
 * global
 * @description global nodejs utilities
 */
export interface global {
    /**
     * __dirname
     * @description get the directory name of the current file
     * @param meta import.meta
     * @returns the directory name of the current file
     * @example
     * __dirname(import.meta); // /home/user/project/src
     */
    __dirname: (meta: ImportMeta) => string;
    /**
     * __filename
     * @description get the file name of the current file
     * @param meta import.meta
     * @returns the file name of the current file
     * @example
     * __filename(import.meta); // index.ts
     */
    __filename: (meta: ImportMeta) => string;
    /**
     * node
     * @description whether or not the current environment is running in a nodejs process
     */
    get node(): boolean;
    /**
     * browser
     * @description whether or not the current environment is running in a browser process
     */
    get browser(): boolean;
}

declare const _default: {
    json: typeof json;
    set: typeof set;
    stream: typeof stream;
    loop: typeof loop;
    each: typeof each;
    num: typeof num;
    log: typeof log;
    color: typeof color;
    ASCII: ASCII;
    global: global;
};

export default _default;
