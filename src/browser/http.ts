import { isNode } from './validate';

interface IFetchOptions {
    method?: string;
    headers?: any;
    body?: any;
}

export const fetch = async (url: string, options: IFetchOptions = {}): Promise<any> => {
    if (isNode()) {
        throw new Error('`fetch` is only supported in a browser environment');
    }

    const response = await window.fetch(url, {
        method: options.method || 'GET',
        headers: options.headers || {},
        body: options.body || null,
    });

    const body = await response.text();

    return {
        bodyUsed: response.bodyUsed,
        headers: response.headers,
        ok: response.ok,
        redirected: response.redirected,
        status: response.status,
        statusText: response.statusText,
        type: response.type,
        url: response.url,

        body: {
            text: () => body,
            json: () => JSON.parse(body),
            html: () => new DOMParser().parseFromString(body, 'text/html'),
        },
    };
};
