import { RefObject } from 'react';
import { findDOMNode } from 'react-dom';

const getRefTarget = (ref: RefObject<Element> | Element | null | undefined) => {
    return ref && ('current' in ref ? ref.current : ref);
};

export function getDOMNode(elementOrRef: any) {
    // If elementOrRef is an instance of Position, child is returned. [PositionInstance]
    const element = elementOrRef?.ref || elementOrRef?.child || getRefTarget(elementOrRef);

    // Native HTML elements
    if (element?.nodeType && typeof element?.nodeName === 'string') {
        return element;
    }

    // If you can't get the native HTML element, you can only get it through findDOMNode.
    return findDOMNode(element) as Element;
}

export function getAnimationEnd() {
    const style = document.createElement('div').style;
    if ('webkitAnimation' in style) {
        return 'webkitAnimationEnd';
    }

    return 'animationend';
}
