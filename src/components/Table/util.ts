import { namespace } from '@qsxy/element-plus-react/hooks/prefix';
import Tooltip from '@qsxy/element-plus-react/Tooltip/Tooltip';
import { TooltipRef } from '@qsxy/element-plus-react/Tooltip/typings';
import React, { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { TableColumnCtx, TableProps } from './typings';

export const TableIdManager: {
    tableId: number;
    nextTableId: () => string;
    columnId: number;
    nextColumnId: (start?: number) => string;
} = {
    tableId: 0,
    columnId: 0,
    nextTableId: () => `${namespace}-table_${++TableIdManager.tableId}`,
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

export function createTablePopper(
    parentNode: HTMLElement | undefined,
    trigger: HTMLElement,
    popperContent: React.ReactNode | string,
    tooltipRef: React.MutableRefObject<TooltipRef>,
) {
    // const { nextZIndex } = PopupManager;
    const ns = namespace || 'el';
    const scrollContainer = parentNode?.querySelector(`.${ns}-scrollbar__wrap`);
    removePopper?.();
    const renderDom = document.createDocumentFragment();
    const root = createRoot(renderDom);
    removePopper = () => {
        try {
            tooltipRef.current?.onClose();
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
            // onMouseLeave: removePopper,
            virtualTriggering: true,
            virtualRef: {
                getBoundingClientRect: () => trigger.getBoundingClientRect(),
            },
            defaultVisible: true,
            content: popperContent,
            placement: 'top',
            offset: 0,
            // @ts-ignore
            ref: tooltipRef,
            hideAfter: 0,
            showAfter: 0,
            disableTransition: true,
        });
        root.render(vm);
    } else {
        tooltipRef.current?.onOpen();
    }
    scrollContainer?.addEventListener('scroll', removePopper);
    return removePopper;
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
