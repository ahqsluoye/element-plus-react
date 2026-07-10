import { addUnit } from '@qsxy/element-plus-react/Util';
import { RefObject, useCallback, useEffect, useRef } from 'react';
import { DialogProps } from './typings';

export const useDraggable = (targetRef: RefObject<HTMLElement | undefined>, dragRef: RefObject<HTMLElement | undefined>, props: DialogProps) => {
    const { draggable, visible, overflow, showDuration, destroyOnClose } = props;
    const transform = useRef({
        offsetX: 0,
        offsetY: 0,
    });
    const overflowRef = useRef(overflow);
    const initRef = useRef(false);

    const onMousedown = useCallback(
        (e: MouseEvent) => {
            const downX = e.clientX;
            const downY = e.clientY;
            const { offsetX, offsetY } = transform.current;

            const targetRect = targetRef.current?.getBoundingClientRect();
            const targetLeft = targetRect.left;
            const targetTop = targetRect.top;
            const targetWidth = targetRect.width;
            const targetHeight = targetRect.height;

            const clientWidth = document.documentElement.clientWidth;
            const clientHeight = document.documentElement.clientHeight;

            const minLeft = -targetLeft + offsetX;
            const minTop = -targetTop + offsetY;
            const maxLeft = clientWidth - targetLeft - targetWidth + offsetX;
            const maxTop = clientHeight - targetTop - targetHeight + offsetY;

            if (targetRef.current) {
                targetRef.current.classList.add('is-dragging');
            }

            const onMousemove = (evt: MouseEvent) => {
                let moveX = offsetX + evt.clientX - downX;
                let moveY = offsetY + evt.clientY - downY;

                if (!overflowRef.current) {
                    moveX = Math.min(Math.max(moveX, minLeft), maxLeft);
                    moveY = Math.min(Math.max(moveY, minTop), maxTop);
                }

                transform.current = {
                    offsetX: moveX,
                    offsetY: moveY,
                };

                if (targetRef.current) {
                    targetRef.current.style.transform = `translate(${addUnit(moveX)}, ${addUnit(moveY)})`;
                }
            };
            // 拖拽结束时移除is-dragging类
            const onMouseup = () => {
                document.removeEventListener('mousemove', onMousemove);
                document.removeEventListener('mouseup', onMouseup);
                if (targetRef.current) {
                    targetRef.current.classList.remove('is-dragging');
                }
            };

            document.addEventListener('mousemove', onMousemove);
            document.addEventListener('mouseup', onMouseup);
        },
        [targetRef],
    );

    const onDraggable = useCallback(() => {
        if (dragRef.current && targetRef.current) {
            dragRef.current.addEventListener('mousedown', onMousedown);
        }
        if (destroyOnClose) {
            transform.current = {
                offsetX: 0,
                offsetY: 0,
            };
        }
    }, [destroyOnClose, dragRef, onMousedown, targetRef]);

    const offDraggable = useCallback(() => {
        if (dragRef.current && targetRef.current) {
            dragRef.current.removeEventListener('mousedown', onMousedown);
        }
    }, [dragRef, onMousedown, targetRef]);

    useEffect(() => {
        overflowRef.current = overflow;
        if (!draggable || !visible) {
            offDraggable();
            return;
        }
        if (visible) {
            setTimeout(() => {
                onDraggable();
            }, showDuration);
            initRef.current = true;
        } else {
            offDraggable();
        }
        offDraggable();

        return offDraggable;
    }, [draggable, visible, overflow]);
};
