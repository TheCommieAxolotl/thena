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

declare const _default: {
    json: typeof json;
    set: typeof set;
    stream: typeof stream;
    loop: typeof loop;
    each: typeof each;
    num: typeof num;
};

export default _default;
