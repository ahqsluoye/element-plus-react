import React, { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Tooltip } from '../Tooltip';
import { TooltipRef } from '../Tooltip/typings';
import { globalKey } from '../hooks/prefix';
import { TableColumnCtx, TableProps } from './typings';

export const TableIdManager: {
    tableId: number;
    nextTableId: () => string;
    columnId: number;
    nextColumnId: (start?: number) => string;
} = {
    tableId: 0,
    columnId: 0,
    nextTableId: () => `r-table_${++TableIdManager.tableId}`,
    nextColumnId: (start?: number) => `column_${start ? ++start : ++TableIdManager.columnId}`,
};

const cacheStringFunction = (fn: (str: string) => string) => {
    const cache = Object.create(null);
    return (str: string) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    };
};

const camelizeRE = /-(\w)/g;

/**
 * @private
 */
const camelize = cacheStringFunction(str => {
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
});

export const getStyle = (element: HTMLElement, styleName: keyof React.CSSProperties): string => {
    if (!element || !styleName) {
        return '';
    }

    let key = camelize(styleName + '');
    if (key === 'float') {
        key = 'cssFloat';
    }
    try {
        const style = (element.style as any)[key];
        if (style) {
            return style;
        }
        const computed: any = document.defaultView?.getComputedStyle(element, '');
        return computed ? computed[key] : '';
    } catch {
        return (element.style as any)[key];
    }
};

export let removePopper: () => void | undefined;

export function createTablePopper(parentNode: HTMLElement | undefined, trigger: HTMLElement, popperContent: string, tooltipRef: React.MutableRefObject<TooltipRef>) {
    // const { nextZIndex } = PopupManager;
    const ns = globalKey || 'r';
    const scrollContainer = parentNode?.querySelector(`.${ns}-scrollbar__wrap`);
    // function renderContent(): HTMLDivElement {
    //     const isLight = tooltipEffect === 'light';
    //     const content = document.createElement('div');
    //     content.className = `${ns}-popper ${isLight ? 'is-light' : 'is-dark'} r-slide-down`;
    //     content.style.padding = '6px';
    //     popperContent = escapeHtml(popperContent);
    //     content.innerHTML = popperContent;
    //     content.style.zIndex = String(nextZIndex());
    //     // Avoid side effects caused by append to body
    //     parentNode?.appendChild(content);
    //     return content;
    // }
    // function renderArrow(): HTMLDivElement {
    //     const arrow = document.createElement('div');
    //     arrow.className = `${ns}-popper__arrow`;
    //     return arrow;
    // }
    // function showPopper() {
    //     timeOut && clearTimeout(timeOut);
    //     timeOut = window.setTimeout(() => {
    //         popperInstance && popperInstance.update();
    //     }, 200);

    // }
    removePopper?.();
    const renderDom = document.createDocumentFragment();
    const root = createRoot(renderDom);
    removePopper = () => {
        try {
            // root.unmount();
            tooltipRef.current?.hide();
            // popperInstance && popperInstance.destroy();
            // content && parentNode?.removeChild(content);
            // trigger.removeEventListener('mouseenter', showPopper);
            // trigger.removeEventListener('mouseleave', removePopper);
            scrollContainer?.removeEventListener('scroll', removePopper);
            // @ts-ignore
            removePopper = undefined;
        } catch {
            //
        }
    };
    if (!tooltipRef.current) {
        const vm = createElement(Tooltip, {
            enterable: true,
            onMouseLeave: removePopper,
            virtualTriggering: true,
            virtualRef: {
                getBoundingClientRect: () => trigger.getBoundingClientRect(),
            },
            defaultVisible: true,
            content: popperContent,
            placement: 'top',
            // @ts-ignore
            ref: tooltipRef,
            hideAfter: 20,
        });
        root.render(vm);
    } else {
        tooltipRef.current?.onOpen();
    }
    // let popperInstance: PopperInstance | null = null;
    // const content = renderContent();
    // const arrow = renderArrow();
    // content.appendChild(arrow);
    // popperInstance = createPopper({
    //     getBoundingClientRect: () => trigger.getBoundingClientRect(),
    //     contextElement: parentNode
    // }, content, {
    //     strategy: 'absolute',
    //     modifiers: [
    //         {
    //             name: 'offset',
    //             options: {
    //                 offset: [0, 8],
    //             },
    //         },
    //         {
    //             name: 'arrow',
    //             options: {
    //                 element: arrow,
    //                 padding: 10,
    //             },
    //         },
    //     ],
    //     ...popperOptions,
    // });
    // trigger.addEventListener('mouseenter', showPopper);
    trigger.addEventListener('mouseleave', () => {
        tooltipRef.current?.hide();
    });
    scrollContainer?.addEventListener('scroll', removePopper);
}

export const getRowIdentity = <T>(row: T, rowKey: TableProps<T>['rowKey']): string => {
    if (!row) {
        throw new Error('Row is required when get row identity');
    }
    if (typeof rowKey === 'string') {
        if (!rowKey.includes('.')) {
            // @ts-ignore
            return `${row[rowKey]}`;
        }
        const key = rowKey.split('.');
        let current = row;
        for (const element of key) {
            // @ts-ignore
            current = current[element];
        }
        return `${current}`;
    } else if (typeof rowKey === 'function') {
        return rowKey.call(null, { row });
    }
    return '';
};

export const getRowIndex = <T>(index: TableColumnCtx<T>['index'], rowIndex: number, row: T) => {
    if (index) {
        if (typeof index === 'number') {
            return index;
        } else {
            return index(rowIndex, row);
        }
    }
    return rowIndex;
};

export function parseHeight(height: number | string) {
    if (typeof height === 'number') {
        return height;
    }
    if (typeof height === 'string') {
        if (/^\d+(?:px)?$/.test(height)) {
            return Number.parseInt(height, 10);
        } else {
            return height;
        }
    }
    return null;
}

/**
 *  ��д�߼�
    1�������ҵ�����������Ҫ�����Ԫ�غ�������λ��Ŀ��Ԫ��
    2������Ŀ��Ԫ���ҵ�����Ԫ�صĸ�Ԫ��
    3���ж�Ŀ��Ԫ���ǲ��Ǹ�Ԫ���ڵ�Ψһ��Ԫ��.
    4�������,��Ԫ��ִ��׷�Ӳ���,����appendChild(newElement)
    5���������,��Ŀ��Ԫ�ص�֮��Ľ����ŵĽڵ�֮ǰִ��inserBefore()����
 * @param newElement 
 * @param targetElement 
 */
export const insertAfter = (newElement: HTMLElement, targetElement: HTMLElement) => {
    const parentElement = targetElement.parentNode; //find parent element
    if (parentElement) {
        if (parentElement.lastChild == targetElement) {
            //To determimeȷ��,�¾��� whether the last element of the parent element is the same as the target element
            parentElement.appendChild(newElement);
        } else {
            parentElement.insertBefore(newElement, targetElement.nextSibling);
        }
    }
};
