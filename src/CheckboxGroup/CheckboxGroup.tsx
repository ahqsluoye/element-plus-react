import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import remove from 'lodash/remove';
import React, { FC, forwardRef, memo, useCallback, useMemo } from 'react';
import type { CheckboxProps, ValueType } from '../Checkbox/index';
import { shallowEqual } from '../Util';
import { useChildrenInstance, useClassNames, useControlled, useDisabled, useSize } from '../hooks';
import { BaseProps, FormControlBaseProps, NativeProps, TypeAttributes } from '../types/common';
import { CheckboxGroupContext } from './CheckboxGroupContext';

export interface CheckboxGroupProps<V = ValueType[] | boolean> extends FormControlBaseProps<V>, BaseProps, NativeProps {
    name?: string;
    /** 尺寸 */
    size?: TypeAttributes.Size;
    /** 单个CheckBox时获取Boolean类型的值 */
    getBooleanOnSingle?: boolean;
    /** 可被勾选的 checkbox 的最小数量 */
    min?: number;
    /** 可被勾选的 checkbox 的最大数量 */
    max?: number;
}

const CheckboxGroup: FC<CheckboxGroupProps> = memo(
    forwardRef<HTMLDivElement, CheckboxGroupProps>((props, ref) => {
        const { className, name, value: valueProp, defaultValue, classPrefix = 'checkbox-group', readOnly, onChange, getBooleanOnSingle, min, max, ...rest } = props;

        const { m } = useClassNames(classPrefix);
        const [value, setValue, isControlled] = useControlled(valueProp, defaultValue);
        const disabled = useDisabled(props.disabled);
        const size = useSize(props.size);

        /** 获取子组件 */
        const getTabPaneInstance = useChildrenInstance<CheckboxProps>(['ElCheckbox', 'ElCheckboxButton']);

        /** 获取TabPane组件中的配置数据 */
        const children = useMemo(() => {
            const componentChildren: React.ReactElement<CheckboxProps>[] = getTabPaneInstance(props?.children);
            return componentChildren;
        }, [getTabPaneInstance, props?.children]);

        const isSingle = useMemo(() => {
            return children.length === 1;
        }, [children]);

        const handleChange = useCallback(
            (itemValue: any, itemChecked: boolean, event) => {
                let nextValue: any[] | boolean = cloneDeep(value) ?? [];
                if (isSingle) {
                    if (itemChecked) {
                        nextValue = getBooleanOnSingle ? itemChecked : [cloneDeep(itemValue)];
                    } else {
                        nextValue = getBooleanOnSingle ? itemChecked : [];
                    }
                } else {
                    if (nextValue instanceof Array) {
                        if (itemChecked) {
                            nextValue.push(itemValue);
                        } else {
                            // @ts-ignore
                            remove(nextValue, i => shallowEqual(i, itemValue));
                        }
                    }
                }

                setValue(nextValue);
                onChange?.(nextValue, event);
            },
            [getBooleanOnSingle, isSingle, onChange, setValue, value],
        );

        const contextValue = useMemo(
            () => ({
                name,
                value,
                readOnly,
                disabled,
                size,
                controlled: isControlled,
                onChange: handleChange,
            }),
            [disabled, handleChange, isControlled, name, readOnly, size, value],
        );

        const childs = useMemo(() => {
            if (min > 0 && value instanceof Array && value.length <= min) {
                return children.map((item, index) => {
                    const isChcked = value.some(i => i === item.props.value);
                    if (isChcked && value.length < max) {
                        return React.cloneElement(item, { key: index, ...item.props, disabled: isChcked });
                    } else if (value.length == max) {
                        return React.cloneElement(item, { key: index, ...item.props, disabled: !isChcked });
                    } else {
                        return React.cloneElement(item, { key: index, ...item.props });
                    }
                });
            }
            if (max > 0 && value instanceof Array && value.length == max) {
                return children.map((item, index) => {
                    const isChcked = value.some(i => i === item.props.value);
                    return React.cloneElement(item, { key: index, ...item.props, disabled: !isChcked });
                });
            }
            return children;
        }, [children, max, min, value]);

        return (
            <CheckboxGroupContext.Provider value={contextValue}>
                <div ref={ref} /* {...omit(rest, ['disabled', 'size'])} */ className={classNames(className, m({ [size]: size }))}>
                    {childs}
                </div>
            </CheckboxGroupContext.Provider>
        );
    }),
);

CheckboxGroup.displayName = 'ElCheckboxGroup';

export default CheckboxGroup;
