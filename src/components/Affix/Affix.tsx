import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { addUnit, mergeDefaultProps, nextTick } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import React, { memo, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { AffixProps, AffixRef } from './typings';

/** 判断是否 window 对象 */
const isWindow = (el: unknown): el is Window => {
    return el === window;
};

/** 判断元素是否可滚动 */
const isScroll = (el: HTMLElement, isVertical?: boolean): boolean => {
    const key = isVertical ? 'overflow-y' : 'overflow-x';
    const overflow = window.getComputedStyle(el).getPropertyValue(key);
    return ['scroll', 'auto', 'overlay'].some(s => overflow.includes(s));
};

/** 查找滚动容器 */
const getScrollContainer = (el: HTMLElement, isVertical?: boolean): Window | HTMLElement | undefined => {
    let parent: HTMLElement = el;
    while (parent) {
        if ([window, document, document.documentElement].includes(parent as any)) {
            return window;
        }
        if (isScroll(parent, isVertical)) {
            return parent;
        }
        parent = parent.parentNode as HTMLElement;
    }
    return parent;
};

const Affix = memo(({ ref, ...props }: AffixProps & { ref?: React.Ref<AffixRef | null> }) => {
    props = mergeDefaultProps({ zIndex: 100, target: '', offset: 0, position: 'top', appendTo: 'body' }, props);
    const { classPrefix = 'affix', zIndex, target, offset, position, teleported, appendTo, onScroll, onChange, className, style, children } = props;

    const { b, m } = useClassNames(classPrefix);

    const rootRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLElement>(null);
    const scrollContainerRef = useRef<Window | HTMLElement>(null);

    const [fixed, setFixed] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const [transform, setTransform] = useState(0);

    // 用 ref 存储 root rect 信息，避免频繁 re-render
    const [rootRect, setRootRect] = useState({ height: 0, width: 0, top: 0, bottom: 0, left: 0 });

    /** 更新 root 元素的 bounding rect */
    const updateRoot = useCallback(() => {
        const root = rootRef.current;
        if (!root) {
            return;
        }
        const rect = root.getBoundingClientRect();
        setRootRect({
            height: rect.height,
            width: rect.width,
            top: rect.top,
            bottom: rect.bottom,
            left: rect.left,
        });
    }, []);

    /** 更新固钉状态 */
    const update = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) {
            return;
        }

        const currentScrollTop = isWindow(container) ? document.documentElement.scrollTop : (container as HTMLElement).scrollTop || 0;

        setScrollTop(currentScrollTop);

        const { height, top, bottom } = rootRect;
        const rootHeightOffset = offset + height;

        let shouldFixed = false;
        let currentTransform = 0;

        if (position === 'top') {
            if (target) {
                const targetEl = targetRef.current;
                if (targetEl) {
                    const targetRect = targetEl.getBoundingClientRect();
                    const difference = targetRect.bottom - rootHeightOffset;
                    shouldFixed = offset > top && targetRect.bottom > 0;
                    currentTransform = difference < 0 ? difference : 0;
                }
            } else {
                shouldFixed = offset > top;
            }
        } else if (target) {
            const targetEl = targetRef.current;
            if (targetEl) {
                const targetRect = targetEl.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const difference = windowHeight - targetRect.top - rootHeightOffset;
                shouldFixed = windowHeight - offset < bottom && windowHeight > targetRect.top;
                currentTransform = difference < 0 ? -difference : 0;
            }
        } else {
            shouldFixed = window.innerHeight - offset < bottom;
        }

        setFixed(shouldFixed);
        setTransform(currentTransform);
    }, [offset, position, rootRect, target]);

    /** 更新 rootRect：如果已固定，先取消固定再测量，然后恢复固定 */
    const updateRootRect = useCallback(async () => {
        if (!fixed) {
            updateRoot();
            return;
        }
        setFixed(false);
        // 等待 DOM 更新，使用 requestAnimationFrame 替代 nextTick
        await nextTick();
        updateRoot();
        setFixed(true);
    }, [fixed, updateRoot]);

    /** 滚动事件处理 */
    const handleScroll = useCallback(async () => {
        updateRoot();
        // 等待下一帧确保 DOM 已更新
        await nextTick();
        onScroll?.({
            scrollTop: isWindow(scrollContainerRef.current) ? document.documentElement.scrollTop : (scrollContainerRef.current as HTMLElement)?.scrollTop || 0,
            fixed,
        });
    }, [updateRoot, fixed, onScroll]);

    // 监听 fixed 变化，触发 onChange
    const prevFixedRef = useRef(fixed);
    useEffect(() => {
        if (prevFixedRef.current !== fixed) {
            onChange?.(fixed);
        }
        prevFixedRef.current = fixed;
    }, [fixed]);

    // 挂载：查找 target 和 scrollContainer
    useEffect(() => {
        if (target) {
            targetRef.current = document.querySelector<HTMLElement>(target) ?? undefined;
            if (!targetRef.current) {
                console.error(`ElAffix: Target does not exist: ${target}`);
            }
        } else {
            targetRef.current = document.documentElement;
        }

        const root = rootRef.current;
        if (root) {
            scrollContainerRef.current = getScrollContainer(root, true);
        }

        updateRoot();
    }, []);

    // 监听 scroll 事件
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) {
            return;
        }

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    // 监听 resize 和 update
    useEffect(() => {
        update();
    });

    // 暴露实例方法
    useImperativeHandle(
        ref,
        () => ({
            update,
            updateRoot: updateRootRect,
        }),
        [update, updateRootRect],
    );

    // 计算 root 样式（占位）
    const rootStyle: React.CSSProperties = {
        display: 'flow-root',
        height: fixed ? `${rootRect.height}px` : '',
        width: fixed ? `${rootRect.width}px` : '',
    };

    // 计算 affix 定位样式
    const affixStyle: React.CSSProperties = fixed
        ? {
              height: `${rootRect.height}px`,
              width: `${rootRect.width}px`,
              top: position === 'top' ? addUnit(offset) : '',
              bottom: position === 'bottom' ? addUnit(offset) : '',
              left: teleported ? `${rootRect.left}px` : '',
              transform: transform ? `translateY(${transform}px)` : '',
              zIndex,
          }
        : {};

    // 是否禁用 teleport：未启用 teleport 或未固定时，不禁用 teleport（即不传送）
    const shouldTeleport = teleported && fixed;

    const content = (
        <div
            className={classNames({
                [m('fixed')]: fixed,
            })}
            style={affixStyle}
        >
            {children}
        </div>
    );

    // 获取挂载目标元素
    const getAppendTarget = (): HTMLElement => {
        if (typeof appendTo === 'string') {
            return document.querySelector<HTMLElement>(appendTo) || document.body;
        }
        return appendTo;
    };

    return (
        <div ref={rootRef} className={classNames(b(), className)} style={{ ...rootStyle, ...style }}>
            {shouldTeleport ? createPortal(content, getAppendTarget()) : content}
        </div>
    );
});

Affix.displayName = 'ElAffix';

export default Affix;
