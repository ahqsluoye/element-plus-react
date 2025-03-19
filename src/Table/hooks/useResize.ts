import { addClass, hasClass, removeClass } from 'dom-lib';
import React, { useContext, useRef } from 'react';
import { TableContext } from '../TableContext';
import { TableColumnCtx } from '../typings';

export const useResize = <T>(scheduleLayout: (/* needUpdateColumns?: boolean,  */ immediate?: boolean) => void) => {
    const { props, tableRefs } = useContext(TableContext);
    const draggingColumn = useRef<TableColumnCtx<T> | null>(null);
    const dragging = useRef(false);
    const dragState = useRef({});

    const handleMouseDown = (event: React.MouseEvent<Element>, column: TableColumnCtx<T>) => {
        if (column.children && column.children.length > 0) {
            return;
        }
        /* istanbul ignore if */
        if (draggingColumn.current && props.border) {
            dragging.current = true;

            // emit('set-drag-visible', true);
            const tableEl = tableRefs.tableWrapper;
            if (tableEl.current && tableRefs.resizeHelper.current) {
                const resizeProxy = tableRefs.resizeHelper.current as HTMLElement;
                resizeProxy.style.display = '';
                const tableLeft = tableEl.current.getBoundingClientRect().left;
                const columnEl = tableEl.current.querySelector(`th.${column.id}`);
                if (columnEl) {
                    const columnRect = columnEl.getBoundingClientRect();
                    const minLeft = columnRect?.left - tableLeft + 30;

                    addClass(columnEl, 'noclick');
                    dragState.current = {
                        startMouseLeft: event.clientX,
                        startLeft: columnRect.right - tableLeft,
                        startColumnLeft: columnRect.left - tableLeft,
                        tableLeft,
                    };
                    resizeProxy.style.left = `${(dragState.current as any).startLeft}px`;

                    document.onselectstart = function () {
                        return false;
                    };
                    document.ondragstart = function () {
                        return false;
                    };

                    const handleMouseMove = (e: MouseEvent) => {
                        const deltaLeft = e.clientX - (dragState.current as any).startMouseLeft;
                        const proxyLeft = (dragState.current as any).startLeft + deltaLeft;

                        resizeProxy.style.left = `${Math.max(minLeft, proxyLeft)}px`;
                    };

                    const handleMouseUp = () => {
                        if (dragging.current) {
                            const { startColumnLeft, startLeft } = dragState.current as any;
                            const finalLeft = Number.parseInt(resizeProxy.style.left, 10);
                            const columnWidth = finalLeft - startColumnLeft;
                            column.width = column.realWidth = columnWidth;
                            props?.onHeaderDragend?.(column.width, startLeft - startColumnLeft, column, event);
                            requestAnimationFrame(() => scheduleLayout?.(false));
                            document.body.style.cursor = '';
                            dragging.current = false;
                            draggingColumn.current = null;
                            dragState.current = {};
                            resizeProxy.style.display = 'none';
                            // emit('set-drag-visible', false);
                        }

                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                        document.onselectstart = null;
                        document.ondragstart = null;

                        setTimeout(() => {
                            removeClass(columnEl, 'noclick');
                        }, 0);
                    };

                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                }
            }
        }
    };

    const handleMouseMove = (event: React.MouseEvent<Element>, column: TableColumnCtx<T>) => {
        if (column.children && column.children.length > 0) {
            return;
        }

        const target = (event.target as HTMLElement)?.closest('th');

        if (!column || !column.resizable) {
            return;
        }

        if (!dragging.current && target && props.border) {
            const rect = target.getBoundingClientRect();

            const bodyStyle = document.body.style;
            if (rect.width > 12 && rect.right - event.pageX < 8) {
                bodyStyle.cursor = 'col-resize';
                if (hasClass(target, 'is-sortable')) {
                    target.style.cursor = 'col-resize';
                }
                draggingColumn.current = column;
            } else if (!dragging.current) {
                bodyStyle.cursor = '';
                if (hasClass(target, 'is-sortable')) {
                    target.style.cursor = 'pointer';
                }
                draggingColumn.current = null;
            }
        }
    };

    const handleMouseOut = () => {
        document.body.style.cursor = '';
    };

    return { handleMouseDown, handleMouseMove, handleMouseOut };
};
