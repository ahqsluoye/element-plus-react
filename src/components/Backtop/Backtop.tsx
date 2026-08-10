import { namespace } from '@qsxy/element-plus-react/hooks/prefix';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import ElIcon from '@qsxy/element-plus-react/Icon/Icon';
import ElTransition from '@qsxy/element-plus-react/Transition/Transition';
import { mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import { cAF, rAF } from '@qsxy/element-plus-react/Util/raf';
import { useMount } from 'ahooks';
import classNames from 'classnames';
import { useComposeRef } from 'rc-util';
import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BacktopProps } from './typings';

/**
 * Backtop 回到顶部组件
 */
const Backtop = React.memo(({ ref, ...props }: BacktopProps & { ref?: React.Ref<HTMLDivElement | null> }) => {
    props = mergeDefaultProps(
        {
            classPrefix: 'backtop',
            visibilityHeight: 200,
            target: '',
            right: 40,
            bottom: 40,
        },
        props,
    );
    const { classPrefix, visibilityHeight, target, right, bottom, onClick, className, style, children } = props;

    const { b, e } = useClassNames(classPrefix);

    const elRef = useRef<HTMLElement>(null);
    const containerRef = useRef<Document | HTMLElement>(null);
    const [visible, setVisible] = useState(false);

    const nodeRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = useComposeRef(ref, nodeRef);

    /** 节流处理滚动事件 */
    const handleScroll = useCallback(() => {
        if (elRef.current) {
            setVisible(elRef.current.scrollTop >= visibilityHeight);
        }
    }, [visibilityHeight]);

    const throttledRef = useRef(handleScroll);
    throttledRef.current = handleScroll;

    const handleScrollThrottled = useRef<(() => void) & { cancel?: () => void }>(null);

    // 初始化节流函数
    useEffect(() => {
        let timer = 0;
        const fn = () => {
            if (timer) {
                cAF(timer);
            }
            timer = rAF(() => {
                throttledRef.current();
                timer = 0;
            });
        };
        fn.cancel = () => {
            cAF(timer);
            timer = 0;
        };
        handleScrollThrottled.current = fn;

        return () => {
            fn.cancel();
        };
    }, []);

    /** 点击回到顶部 */
    const handleClick = useCallback(
        (event: React.MouseEvent) => {
            elRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
            onClick?.(event);
        },
        [onClick],
    );

    // 挂载时初始化
    useMount(() => {
        containerRef.current = document;
        elRef.current = document.documentElement;

        if (target) {
            const el = document.querySelector<HTMLElement>(target);
            if (!el) {
                throw new Error(`[Backtop] target does not exist: ${target}`);
            }
            elRef.current = el;
            containerRef.current = el;
        }

        // 初始检查
        handleScroll();

        const container = containerRef.current;
        const scrollFn = handleScrollThrottled.current;
        if (container && scrollFn) {
            container.addEventListener('scroll', scrollFn, { passive: true });
        }

        return () => {
            if (container && scrollFn) {
                container.removeEventListener('scroll', scrollFn);
            }
        };
    });

    const backTopStyle = useMemo(
        () => ({
            right: `${right}px`,
            bottom: `${bottom}px`,
            ...style,
        }),
        [right, bottom, style],
    );

    return (
        <ElTransition visible={visible} name={`${namespace}-fade-in`} duration={300} nodeRef={() => nodeRef as RefObject<HTMLElement>} display="flex">
            <div ref={mergedRef} className={classNames(b(), className)} style={backTopStyle} onClick={handleClick}>
                {children || <ElIcon className={e`icon`} name="caret-up" prefix="fas" />}
            </div>
        </ElTransition>
    );
});

Backtop.displayName = 'ElBacktop';

export default Backtop;
