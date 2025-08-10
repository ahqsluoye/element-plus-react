import { RefObject, useEffect, useRef, useState } from 'react';
import { useResizeObserver } from '../hooks/useResizeObserver';
import { MenuProps } from './typings';

const useEllipsis = (menuRef: RefObject<HTMLUListElement | null>, props: MenuProps) => {
    const [sliceIndex, setSliceIndex] = useState(-1);

    const isFirstTimeRender = useRef(true);

    const calcMenuItemWidth = (menuItem: HTMLElement) => {
        const computedStyle = getComputedStyle(menuItem);
        const marginLeft = Number.parseInt(computedStyle.marginLeft, 10);
        const marginRight = Number.parseInt(computedStyle.marginRight, 10);
        return menuItem.offsetWidth + marginLeft + marginRight || 0;
    };

    const calcSliceIndex = () => {
        if (!menuRef.current) {
            return -1;
        }
        const items = Array.from(menuRef.current?.childNodes ?? []).filter(item => item.nodeName !== '#text' || item.nodeValue) as HTMLElement[];
        const moreItemWidth = 64;
        const computedMenuStyle = getComputedStyle(menuRef.current);
        const paddingLeft = Number.parseInt(computedMenuStyle.paddingLeft, 10);
        const paddingRight = Number.parseInt(computedMenuStyle.paddingRight, 10);
        const menuWidth = menuRef.current.clientWidth - paddingLeft - paddingRight;
        let calcWidth = 0;
        let _sliceIndex = 0;
        items.forEach((item, index) => {
            if (item.nodeName === '#comment') {
                return;
            }
            calcWidth += calcMenuItemWidth(item);
            if (calcWidth <= menuWidth - moreItemWidth) {
                _sliceIndex = index + 1;
            }
        });
        return _sliceIndex === items.length ? -1 : _sliceIndex;
    };

    const debounce = (fn: () => void, wait = 33.34) => {
        let timmer: ReturnType<typeof setTimeout> | null;
        return () => {
            timmer && clearTimeout(timmer);
            timmer = setTimeout(() => {
                fn();
            }, wait);
        };
    };
    const handleResize = () => {
        if (props.mode === 'horizontal' && props.ellipsis) {
            // if (sliceIndex === calcSliceIndex()) {
            //     return;
            // }
            const callback = () => {
                setSliceIndex(-1);
                requestAnimationFrame(() => {
                    setSliceIndex(calcSliceIndex());
                });
            };
            // execute callback directly when first time resize to avoid shaking
            isFirstTimeRender.current ? callback() : debounce(callback)();
            isFirstTimeRender.current = false;
        }
    };

    const { stop: resizeStopper } = useResizeObserver(menuRef, handleResize);

    useEffect(() => {
        return resizeStopper;
    }, []);

    return { sliceIndex };
};
export default useEllipsis;
