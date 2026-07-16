import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import useControlled from '@qsxy/element-plus-react/hooks/useControlled';
import { isBoolean, isPromise, mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import { debugWarn, throwError } from '@qsxy/element-plus-react/Util/error';
import classNames from 'classnames';
import castArray from 'lodash/castArray';
import React, { forwardRef, memo, useCallback } from 'react';
import { CollapseContext } from './CollapseContext';
import { CollapseActiveName, CollapseProps, CollapseRef } from './typings';

const Collapse = memo(
    forwardRef<CollapseRef, CollapseProps>((props, ref) => {
        props = mergeDefaultProps(
            {
                expandIconPosition: 'right',
            },
            props,
        );
        const { accordion, expandIconPosition, onChange, beforeCollapse, classPrefix = 'collapse' } = props;
        const { b } = useClassNames(classPrefix);

        const [activeName, setActiveName] = useControlled(
            props.activeName ? castArray(props.activeName) : undefined,
            props.defaultActiveName ? castArray(props.defaultActiveName) : [],
        );

        const setActiveNames = useCallback(
            (activeNames: CollapseActiveName[]) => {
                setActiveName(activeNames);
                const _value = accordion ? activeNames[0] : activeNames;
                onChange?.(_value);
            },
            [setActiveName, accordion, onChange],
        );

        const handleChange = useCallback(
            (name: CollapseActiveName) => {
                if (accordion) {
                    setActiveNames([activeName[0] === name ? '' : name]);
                } else {
                    const _activeNames = [...activeName];
                    const index = _activeNames.indexOf(name);

                    if (index > -1) {
                        _activeNames.splice(index, 1);
                    } else {
                        _activeNames.push(name);
                    }
                    setActiveNames(_activeNames);
                }
            },
            [activeName, setActiveNames, accordion],
        );

        const handleItemClick = (name: CollapseActiveName) => {
            if (!beforeCollapse) {
                handleChange(name);
                return;
            }

            const shouldChange = beforeCollapse(name);
            const isPromiseOrBool = [isPromise(shouldChange), isBoolean(shouldChange)].includes(true);
            if (!isPromiseOrBool) {
                throwError('ElCollapse', 'beforeCollapse must return type `Promise<boolean>` or `boolean`');
            }

            if (isPromise(shouldChange)) {
                shouldChange
                    .then(result => {
                        if (result !== false) {
                            handleChange(name);
                        }
                    })
                    .catch(e => {
                        debugWarn('ElCollapse', `some error occurred: ${e}`);
                    });
            } else if (shouldChange) {
                handleChange(name);
            }
        };

        React.useImperativeHandle(ref, () => ({
            activeNames: activeName,
            setActiveNames,
        }));

        return (
            <div className={classNames(b(), b(`icon-position-${expandIconPosition}`), props.className)} style={props.style}>
                <CollapseContext.Provider value={{ activeNames: activeName, handleItemClick }}>{props.children}</CollapseContext.Provider>
            </div>
        );
    }),
);

Collapse.displayName = 'ElCollapse';

export default Collapse;
