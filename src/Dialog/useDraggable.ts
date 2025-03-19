import { addUnit } from '@qsxy/element-plus-react/Util';
import { RefObject, useCallback, useEffect, useRef } from 'react';

export const useDraggable = (targetRef: RefObject<HTMLElement | undefined>, dragRef: RefObject<HTMLElement | undefined>, draggable: boolean, overflow?: boolean) => {
    const transform = useRef({
        offsetX: 0,
        offsetY: 0,
    });
    const overflowRef = useRef(overflow);

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

            const onMouseup = () => {
                document.removeEventListener('mousemove', onMousemove);
                document.removeEventListener('mouseup', onMouseup);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const offDraggable = useCallback(() => {
        if (dragRef.current && targetRef.current) {
            dragRef.current.removeEventListener('mousedown', onMousedown);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (draggable) {
            onDraggable();
        } else {
            offDraggable();
        }
        overflowRef.current = overflow;

        return offDraggable;
    }, [draggable, overflow, offDraggable, onDraggable]);
};
