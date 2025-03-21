import classNames from 'classnames';
import React, { FC, memo, useCallback, useContext, useMemo, useRef } from 'react';
import { Icon } from '../Icon';
import { Transition } from '../Transition';
import { useClassNames } from '../hooks';
import { CollapseContext } from './CollapseContext';
import { afterEnter, afterLeave, beforeEnter, beforeLeave, onEnter, onLeave } from './CollapseTransition';
import { CollapseItemProps } from './typings';

const CollapseItem: FC<CollapseItemProps> = memo(props => {
    const { name, title, disabled, classPrefix = 'collapse-item' } = props;
    const { b, e, is } = useClassNames(classPrefix);

    const { value, setValue, accordion, onChange } = useContext(CollapseContext);

    const containerRef = useRef(null);

    const active = useMemo(() => {
        if (accordion && typeof value === 'string') {
            return name === value;
        } else {
            if (value instanceof Array) {
                return value.includes(name);
            }
        }
        return false;
    }, [accordion, name, value]);

    const handleClick = useCallback(() => {
        if (accordion) {
            setValue(active ? '' : name);
            onChange?.(active ? '' : name);
        } else {
            if (value instanceof Array) {
                if (active) {
                    const v = JSON.parse(JSON.stringify(value));
                    v.splice(v.indexOf(name), 1);
                    setValue(v);
                    onChange?.(v);
                } else {
                    setValue([...value, name]);
                    onChange?.([...value, name]);
                }
            } else {
                setValue(active ? [] : [name]);
                onChange?.(active ? [] : [name]);
            }
        }
    }, [accordion, active, name, onChange, setValue, value]);

    return (
        <div className={classNames(b(), is({ active, disabled }), props.className)} style={props.style}>
            <div>
                <div className={e`header`} onClick={handleClick}>
                    {title}
                    <Icon name="angle-right" className={classNames(e`arrow`, is({ active }))} />
                </div>
            </div>

            <Transition
                nodeRef={containerRef}
                name="r-menu-collapse"
                duration={300}
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
});

CollapseItem.displayName = 'CollapseItem';

export default CollapseItem;
