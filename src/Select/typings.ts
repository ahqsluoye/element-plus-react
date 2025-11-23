import React, { RefObject } from 'react';
import { IconName } from '../Icon';
import { PopperOptionRef, PopperOptions } from '../Popper';
import { AnimationEventProps, BaseProps, FormControlBaseProps, NativeProps, TypeAttributes } from '../types/common';

export type OptionValue = string | number | boolean;
export type ValueType = OptionValue | OptionValue[];
export type SelectRef = {
    popperInstRef: RefObject<PopperOptionRef>;
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
    /** 自定义清除图标 */
    clearIcon?: IconName;
    /** 占位符 */
    placeholder?: string;
    /** 是否可搜索 */
    filterable?: boolean;
    /** 自定义搜索方法 */
    filterMethod?: (val: ValueType, searchText: string) => boolean;
    /** 选项为空时显示的文字 */
    noDataText?: string;
    /** 搜索条件无匹配时显示的文字 */
    noMatchText?: string;
    /** 是否正在从远程获取数据 */
    loading?: boolean;
    /** 远程加载时显示的文字 */
    loadingText?: string;
    /** 远程加载时显示的图标 */
    loadingIcon?: React.ReactElement;
    /**  */
    max?: boolean;
    /** 下拉菜单的内容是否有箭头 */
    showArrow?: boolean;
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
    /** 其中的选项是否从服务器远程加载 */
    remote?: boolean;
    /** 自定义搜索方法 */
    remoteMethod?: (searchText: string) => void;
    /** 远程搜索方法显示后缀图标 */
    remoteShowSuffix?: boolean;
    /** 自定义后缀图标组件 */
    suffixIcon?: IconName;
    /** 标签类型 */
    tagType?: TypeAttributes.Appearance;
    /** 标签效果 */
    tagEffect?: 'light' | 'dark' | 'plain';
    labelFormat?: (index: number, value: OptionValue, label?: OptionValue) => React.ReactElement;
    /** 选中值发生变化时触发 */
    onChange?: (value: ValueType, data?: OptionData | OptionData[]) => void;
    /** 下拉框出现/隐藏时触发   */
    onVisibleChange?: (visible: boolean) => void;
    /** 多选模式下移除tag时触发/隐藏时触发   */
    onRemoveTag?: (tagValue: any) => void;
    /** 可清空的单选模式下用户点击清空按钮时触发  */
    onClear?: () => void;
    /** 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单 */
    automaticDropdown?: boolean;
    /** 下拉列表顶部的内容 */
    header?: React.ReactElement;
    /** 下拉列表底部的内容 */
    footer?: React.ReactElement;
    /** 作为 Select 组件的内容时 */
    tag?: (params: { data: OptionData[]; selectDisabled: boolean; deleteTag: (event: React.MouseEvent<HTMLElement, MouseEvent>, tag: OptionData) => void }) => React.ReactElement;
    /** 数据加载成功时调用 */
    // onLoadSuccess?: (value: ValueType, data?: any) => void;
}

export interface SelectOptionProps extends BaseProps, NativeProps {
    /** 选项的值 */
    value: OptionValue;
    /** 选项的标签，若不设置则默认与 value 相同 */
    label?: OptionValue;
    /** option 的附加数据，会传递到 onClick 事件的参数 data 中 */
    data?: any;
    /** 是否禁用该选项 */
    disabled?: boolean;
    onClick?: (value: ValueType, data: OptionData) => void;
}

export interface OptionData {
    index?: number;
    value: OptionValue;
    label: OptionValue;
    disabled?: boolean;
    data?: any;
}

export interface SelectOptionGroupProps extends BaseProps<React.ReactElement<SelectOptionProps> | React.ReactElement<SelectOptionProps>[]>, NativeProps {
    /** 分组的组名 */
    label: string;
    /** 是否将该分组下所有选项置为禁用 */
    disabled?: boolean;
}

export interface SelectDropdownProps extends SelectProps {
    value: ValueType;
    inputValue: string;
    setInputValue: (value: string) => void;
    onChoose: (val: string, data: OptionData, event: any) => void;
    contentRef: RefObject<HTMLDivElement>;
    popperInstRef: RefObject<PopperOptionRef>;
    /** 下拉列表顶部的内容 */
    header?: React.ReactElement;
    /** 下拉列表底部的内容 */
    footer?: React.ReactElement;
}

export interface SelectDropdownRef {
    clear: () => void;
    hover: (value: ValueType) => void;
    scrollToSelected: () => void;
}
