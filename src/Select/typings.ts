import React, { RefObject } from 'react';
import { InputRef } from '../Input';
import { PopperOptionRef, PopperOptions } from '../Popper';
import { AnimationEventProps, BaseProps, FormControlBaseProps, NativeProps, TypeAttributes } from '../types/common';

export type ValueType = string | number | (string | number)[];
export type SelectRef = {
    inputInstance?: RefObject<InputRef>;
    searchInstance?: RefObject<InputRef>;
    popperInstRef: RefObject<PopperOptionRef>;
    label: string;
    setLabel: (label: string) => void;
    getValue: () => ValueType;
    setValue: (value: ValueType) => void;
    onClear: (event?: any) => void;
    setVisible: (value: boolean) => void;
};

type Child = React.ReactElement<SelectOptionGroupProps | SelectOptionProps> | React.ReactElement<SelectOptionGroupProps | SelectOptionProps>[];

export interface SelectProps<V = ValueType> extends Omit<FormControlBaseProps<V>, 'onChange'>, BaseProps<Child | Child[]>, NativeProps, AnimationEventProps, PopperOptions {
    /** 是否多选 */
    multiple?: boolean;
    /** 是否禁用 */
    disabled?: boolean;
    /** 作为 value 唯一标识的键名，绑定值为对象类型时必填 */
    valueKey?: string;
    /** 是否可以清空选项 */
    clearable?: boolean;
    /** 占位符 */
    placeholder?: string;
    /** 是否可搜索 */
    filterable?: boolean;
    /** 自定义搜索方法 */
    filterMethod?: (val: ValueType, searchText: string) => boolean;
    /** 选项为空时显示的文字 */
    noDataText?: React.ReactElement | string;
    /** 搜索条件无匹配时显示的文字 */
    noMatchText?: React.ReactElement | string;
    /** 是否正在从远程获取数据 */
    loading?: boolean;
    /** 远程加载时显示的文字 */
    loadingText?: React.ReactElement | string;
    /**  */
    max?: boolean;
    /**  */
    required?: boolean;
    /** 表单校验错误提示 */
    error?: boolean;
    /** 表单校验警告提示 */
    warning?: boolean;
    /** 下拉项最大宽度 */
    maxWidth?: number;
    /** 多选时是否将选中值按文字的形式展示 */
    collapseTags?: boolean;
    /** 需要显示的 Tag 的最大数量 只有当 collapseTags 设置为 true 时才会生效。 */
    maxCollapseTags?: number;
    /** 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapseTags属性必须设定为 true */
    collapseTagsTooltip?: boolean;
    /** 鼠标悬停于折叠标签的文本格式化函数， 要使用此属性，collapseTags属性必须设定为 true*/
    collapseTips?: (collapseNum: number, total: number) => string;
    /** 是否允许用户创建新条目 */
    allowCreate?: boolean;
    /** 是否纯文本模式，即无边框 */
    plain?: boolean;
    /** 输入框前置内容，只对 type="text" 有效 */
    prepend?: React.ReactElement<any> | string | number;
    /** 输入框后置内容，只对 type="text" 有效 */
    append?: React.ReactElement | string | number;
    /** 尺寸 */
    size?: TypeAttributes.Size;
    /** 是否追加到body下 */
    appendToBody?: boolean;
    /** 选中值发生变化时触发 */
    onChange?: (value: ValueType, label?: string | (string | number)[]) => void;
    /** 数据加载成功时调用 */
    onLoadSuccess?: (value: ValueType, label?: (string | number | undefined)[]) => void;
}

export interface SelectOptionProps extends BaseProps, NativeProps {
    /** 选项的值 */
    value: string | number;
    /** 选项的标签，若不设置则默认与 value 相同 */
    label?: string;
    /** 是否禁用该选项 */
    disabled?: boolean;
    onClick?: (value: ValueType, label: string, e: Event) => void;
}

export interface SelectOptionGroupProps extends BaseProps<React.ReactElement<SelectOptionProps> | React.ReactElement<SelectOptionProps>[]>, NativeProps {
    /** 分组的组名 */
    label: string;
    /** 是否将该分组下所有选项置为禁用 */
    disabled?: boolean;
}

export interface SelectDropdownProps extends SelectProps {
    value: ValueType;
    searchInstance: RefObject<InputRef>;
    createItem: string;
    setCreateItem: (createItem: string) => void;
    onChoose: (val: string, text: string, event: any) => void;
    contentRef: RefObject<HTMLDivElement>;
    createInputRef: RefObject<HTMLInputElement>;
    popperInstRef: RefObject<PopperOptionRef>;
}

export interface SelectDropdownRef {
    clear: () => void;
    hover: (value: ValueType) => void;
    scrollToSelected: () => void;
}
