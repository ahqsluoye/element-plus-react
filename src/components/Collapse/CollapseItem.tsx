import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import Icon from '@qsxy/element-plus-react/Icon/Icon';
import { IconName } from '@qsxy/element-plus-react/Icon/typings';
import Transition from '@qsxy/element-plus-react/Transition/Transition';
import classNames from 'classnames';
import React, { forwardRef, memo, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { CollapseContext } from './CollapseContext';
import { afterEnter, afterLeave, beforeEnter, beforeLeave, onEnter, onLeave } from './CollapseTransition';
import type { CollapseItemProps, CollapseItemRef } from './typings';

const CollapseItem = memo(
    forwardRef<CollapseItemRef, CollapseItemProps>((props, ref) => {
        const { name, title, icon, disabled, classPrefix = 'collapse-item' } = props;
        const { b, e, is } = useClassNames(classPrefix);

        const { activeNames, handleItemClick } = useContext(CollapseContext);
        const isClick = useRef(false);
        const [focusing, setFocusing] = useState(false);

        const containerRef = useRef(null);

        const active = useMemo(() => {
            return activeNames.includes(name);
        }, [activeNames, name]);

        const handleFocus = () => {
            setTimeout(() => {
                if (!isClick.current) {
                    setFocusing(true);
                } else {
                    isClick.current = false;
                }
            }, 50);
        };

        const handleHeaderClick = useCallback(
            (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                if (disabled) {
                    return;
                }
                const target = event.target as HTMLElement;
                if (target?.closest('input, textarea, select')) {
                    return;
                }

                handleItemClick(name);
                isClick.current = true;
                setFocusing(false);
            },
            [disabled, handleItemClick, name],
        );

        const handleEnterClick = (event: React.KeyboardEvent<HTMLDivElement>) => {
            event.preventDefault();
            if (event.key !== 'Enter' && event.code !== 'Space') {
                return;
            }
            event.stopPropagation();
            const target = event.target as HTMLElement;
            if (target?.closest('input, textarea, select')) {
                return;
            }
            handleItemClick(name);
        };

        const getIcon = () => {
            if (!icon) {
                return <Icon name="angle-right" className={classNames(e`arrow`, is({ active }))} />;
            }
            if (typeof icon === 'function') {
                return icon(active);
            }
            return React.isValidElement(icon) ? icon : <Icon name={icon as IconName} className={classNames(e`arrow`, is({ active }))} />;
        };

        React.useImperativeHandle(ref, () => ({
            isActive: active,
        }));

        return (
            <div className={classNames(b(), is({ active, disabled }), props.className)} style={props.style}>
                <div
                    className={classNames(e`header`, is({ active }), { focusing: focusing && !disabled })}
                    onClick={handleHeaderClick}
                    onKeyDown={handleEnterClick}
                    tabIndex={0}
                    onFocus={handleFocus}
                    onBlur={() => setFocusing(false)}
                >
                    <span className={e`title`}>{typeof title === 'function' ? title(active) : title}</span>
                    {getIcon()}
                </div>

                <Transition
                    nodeRef={containerRef}
                    // name={b('menu-collapse', false)}
                    duration={300}
                    showDuration={0}
                    visible={active}
                    beforeEnter={() => beforeEnter(containerRef)}
                    onEnter={() => onEnter(containerRef)}
                    afterEnter={() => afterEnter(containerRef)}
                    beforeLeave={() => beforeLeave(containerRef)}
                    onLeave={() => onLeave(containerRef)}
                    afterLeave={() => afterLeave(containerRef)}
                >
                    <div ref={containerRef} className={classNames(e`wrap`)} style={{ display: 'none' }}>
                        <div className={e`content`}>{props.children}</div>
                    </div>
                </Transition>
            </div>
        );
    }),
);

CollapseItem.displayName = 'CollapseItem';

export default CollapseItem;
