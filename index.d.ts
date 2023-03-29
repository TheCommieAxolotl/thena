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
export function each<T>(arr: T[], fn: (item: T, i: number) => void): Promise<void>;

/**
 * num
 * @description convert a value to a number
 * @param n number to be converted
 * @returns converted number
 * @throws error if value cannot be converted to a number
 */
export function num(n: number | string | object | any[]): number;

/**
 * fetch
 * @description fetch data from a URL with a reconsumable body
 * @param url URL to fetch data from
 * @param options fetch options
 * @returns response object
 * @throws error if `fetch` is not supported in the current environment
 * @example
 * const response = await fetch('https://example.com/someData');
 *
 * const body = response.body.json();
 * const rawBody = response.body.text();
 * const htmlBody = response.body.html();
 */
export function fetch(
    url: string,
    options: {
        method?: string;
        headers?: any;
        body?: any;
    }
): Promise<{
    bodyUsed: boolean;
    headers: Headers;
    ok: boolean;
    redirected: boolean;
    status: number;
    statusText: string;
    type: string;
    url: string;
    body: {
        text: () => string;
        json: () => any;
        html: () => Document;
    };
}>;

/**
 * h
 * @description create an HTML element
 * @param tag HTML tag name
 * @param props HTML element properties
 * @param children HTML element children
 * @returns HTMLElement
 * @example
 * const div = h('div', { id: 'myDiv' }, 'Hello World');
 *
 * document.body.appendChild(div); // <div id="myDiv">Hello World</div>
 */
export function h(tag: keyof HTMLElementTagNameMap, props: Record<string, any>, ...children: any[]): HTMLElement;

declare const _default: {
    loop: typeof loop;
    each: typeof each;
    num: typeof num;
    fetch: typeof fetch;
    h: typeof h;
};

export default _default;
