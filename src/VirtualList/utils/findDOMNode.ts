import React from 'react';

/**
 * Return if a node is a DOM node. Else will return by `findDOMNode`
 */
export default function findDOMNode<T = Element | Text>(node: React.ReactElement | HTMLElement): T {
    if (node instanceof HTMLElement) {
        return node as unknown as T;
    }
    // @ts-ignore
    // eslint-disable-next-line no-undef
    return ReactDOM.findDOMNode(node) as unknown as T;
}
