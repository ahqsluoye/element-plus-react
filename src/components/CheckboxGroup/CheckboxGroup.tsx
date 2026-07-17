import Checkbox from '@qsxy/element-plus-react/Checkbox/Checkbox';
import { type CheckboxProps, type ValueType } from '@qsxy/element-plus-react/Checkbox/typings';
import useChildrenInstance from '@qsxy/element-plus-react/hooks/useChildrenInstance';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useDisabled, useSize } from '@qsxy/element-plus-react/hooks/useCommonProps';
import useControlled from '@qsxy/element-plus-react/hooks/useControlled';
import { BaseProps, FormControlBaseProps, NativeProps, TypeAttributes } from '@qsxy/element-plus-react/types/common';
import { mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import shallowEqual from '@qsxy/element-plus-react/Util/shallowEqual';
import classNames from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import remove from 'lodash/remove';
import React, { Children, FC, forwardRef, memo, useCallback, useMemo } from 'react';
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
    /** 选项的数据源， value 的 key 和 label 和  disabled可以通过 props自定义. */
    options?: Array<{ [key: string]: any }>;
    /** options 的配置 */
    props?: { value?: string; label?: string; disabled?: string };
}

const CheckboxGroup: FC<CheckboxGroupProps> = memo(
    forwardRef<HTMLDivElement, CheckboxGroupProps>((props, ref) => {
        props = mergeDefaultProps(
            {
                props: {},
                options: [],
            },
            props,
        );
        const { className, name, value: valueProp, defaultValue, classPrefix = 'checkbox-group', readOnly, onChange, getBooleanOnSingle, min, max, options } = props;

        const { m } = useClassNames(classPrefix);
        const [value, setValue, isControlled] = useControlled(valueProp, defaultValue);
        const disabled = useDisabled(props.disabled);
        const size = useSize(props.size);
        const aliasProps = mergeDefaultProps({ value: 'value', label: 'label', disabled: 'disabled' }, props.props);

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

        const optionChilds = useMemo(() => {
            let checkboxs = null;
            if (options.length > 0) {
                checkboxs = options.map(item => (
                    <Checkbox key={item[aliasProps.value]} value={item[aliasProps.value]} disabled={item[aliasProps.disabled]}>
                        {item[aliasProps.label]}
                    </Checkbox>
                ));
                if (min > 0 && value instanceof Array && value.length <= min) {
                    return checkboxs.map((item, index) => {
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
                    return checkboxs.map((item, index) => {
                        const isChcked = value.some(i => i === item.props.value);
                        return React.cloneElement(item, { key: index, ...item.props, disabled: !isChcked });
                    });
                }
            }
            return checkboxs;
        }, [max, min, options, aliasProps.disabled, aliasProps.label, aliasProps.value, value]);

        return (
            <CheckboxGroupContext.Provider value={contextValue}>
                <div ref={ref} /* {...omit(rest, ['disabled', 'size'])} */ className={classNames(className, m({ [size]: size }))}>
                    {Children.count(children) === 0 ? optionChilds : childs}
                </div>
            </CheckboxGroupContext.Provider>
        );
    }),
);

CheckboxGroup.displayName = 'ElCheckboxGroup';

export default CheckboxGroup;
