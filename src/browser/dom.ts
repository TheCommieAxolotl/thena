import { isNode } from './validate';
import { each } from './structs';

export type Element = HTMLElementTagNameMap[keyof HTMLElementTagNameMap] | string | number | boolean;

export const h = (tag: keyof HTMLElementTagNameMap, props: Record<string, any> = {}, ...children: Element[]) => {
    if (isNode()) {
        throw new Error('`h` is only supported in a browser environment');
    }

    const element = document.createElement(tag);

    each(Object.keys(props), (prop) => {
        element[prop] = props[prop];
    });

    each(children, (child) => {
        if (typeof child === 'string' || typeof child === 'number' || typeof child === 'boolean') {
            element.appendChild(document.createTextNode(String(child)));
        } else {
            element.appendChild(child);
        }
    });

    return element;
};
