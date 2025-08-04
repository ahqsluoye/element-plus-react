import './locale/i18n';

/* Basic 基础组件 */
export { Link as ElLink } from './Link';
export type { LinkProps } from './Link';

export { Button as ElButton } from './Button';
export type { ButtonGroupProps, ButtonProps } from './Button';

export { Col as ElCol } from './Col';
export type { ColProps } from './Col';

export { Icon as ElIcon } from './Icon';
export type { IconName, IconPrefix, IconProps } from './Icon';
export * from './Icon/IconList';

export { Row as ElRow, RowContext } from './Row';
export type { RowProps } from './Row';

export { Scrollbar as ElScrollbar } from './Scrollbar';
export type { BarProps, ScrollbarProps, ScrollbarRef } from './Scrollbar';

export { Popper as ElPopper } from './Popper';
export type { PopperOptionRef, PopperOptions, PopperProps } from './Popper';

export { Transition as ElTransition } from './Transition';
export type { TransitionProps } from './Transition';

/* Form 表单组件 */
export { Cascader as ElCascader } from './Cascader';
export type { CascaderMenuProps, CascaderProps } from './Cascader';

export { Checkbox as ElCheckbox, CheckboxButton as ElCheckboxButton } from './Checkbox';
export type { CheckboxProps, ValueType as CheckboxValueType } from './Checkbox';

export { CheckboxGroup as ElCheckboxGroup } from './CheckboxGroup';
export type { CheckboxGroupContextValue, CheckboxGroupProps } from './CheckboxGroup';

export { ColorPicker as ElColorPicker } from './ColorPicker';
export type { ColorPickerProps } from './ColorPicker';

export { Radio as ElRadio } from './Radio';
export type { RadioProps, ValueType } from './Radio';

export { RadioGroup as ElRadioGroup } from './RadioGroup';
export type { RadioContextProps, RadioGroupProps } from './RadioGroup';

export { Input as ElInput } from './Input';
export type { InputProps, InputRangeProps, InputRef, TextareaProps, TextareaRef } from './Input';

export { InputNumber as ElInputNumber } from './InputNumber';
export type { InputNumberProps, InputNumberRef } from './InputNumber';

export { Option as ElOption, OptionGroup as ElOptionGroup, Select as ElSelect } from './Select';
export type { SelectOptionGroupProps, SelectOptionProps, SelectProps, SelectRef } from './Select';

export { Calendar, CalendarContext } from './Calendar';
export type { DateRangeType, DateType } from './Calendar';

export { DatePicker as ElDatePicker } from './DatePicker';
export type { DatePickerProps, DatePickerRef } from './DatePicker';

export { TimePicker as ElTimePicker } from './TimePicker';
export type { TimePickerProps, TimePickerRef } from './TimePicker';

export { Switch as ElSwitch } from './Switch';
export type { ChangeValue, ISwitchProps, ValueType as SwitchValueType } from './Switch';

export { Transfer as ElTransfer } from './Transfer';
export type { ListStyle, SelectAllLabel, TransferDirection, TransferItem, TransferLocale, TransferProps, TransferRender } from './Transfer';

export { Form as ElForm, useForm } from './Form';
export type {
    FormInstance,
    FormItemProps,
    FormProps,
    FormRules,
    InternalFormInstance,
    InternalNamePath,
    NamePath,
    Rule,
    RuleType,
    ValidateErrorEntity,
    ValidateMessages,
    ValidateOptions,
} from './Form';

export { Upload as ElUpload } from './Upload';
export type { UploadFile, UploadFiles, UploadProps, UploadRawFile, UploadRef, UploadStatus, UploadUserFile } from './Upload';

/* Data 数据展示 */
export { Avatar as ElAvatar } from './Avatar';
export type { AvatarProps } from './Avatar';

export { Badge as ElBadge } from './Badge';
export type { BadgeProps } from './Badge';

export { Card as ElCard } from './Card';
export type { CardProps } from './Card';

export { Carousel as ElCarousel, CarouselItem as ElCarouselItem } from './Carousel';
export type { CarouselItemProps, CarouselProps, CarouselRef } from './Carousel';

export { Collapse as ElCollapse, CollapseItem as ElCollapseItem } from './Collapse';
export type { CollapseItemProps, CollapseProps } from './Collapse';

export { Descriptions as ElDescriptions, DescriptionsItem as ElDescriptionsItem } from './Descriptions';
export type { DescriptionsItemProps, DescriptionsProps } from './Descriptions';

export { Pagination as ElPagination } from './Pagination';
export type { PageType, PaginationProps, PaginationRef } from './Pagination';

export { Progress as ElProgress } from './Progress';
export type { PropgressProps } from './Progress';

export { Table as ElTable, TableColumn as ElTableColumn } from './Table';
export type { RenderCell, TableColumnCtx, TableColumnProps, TableProps, TableRef, TableSort } from './Table';

export { Tag as ElTag } from './Tag';
export type { TagProps } from './Tag';

export { TimeLine as ElTimeLine, TimeLineItem as ElTimeLineItem } from './TimeLine';
export type { TimeLineItemProps, TimeLineProps } from './TimeLine';

export { DirectoryTree as ElDirectoryTree, Tree as ElTree /* , TreeNode */ } from './Tree';
export type {
    BasicDataNode,
    DataNode,
    DirectoryTreeExpandAction,
    DirectoryTreeProps,
    EventDataNode,
    Key,
    // AntTreeNode,
    // AntTreeNodeCheckedEvent,
    // AntTreeNodeExpandedEvent,
    // AntTreeNodeMouseEvent,
    // AntTreeNodeProps,
    // AntTreeNodeSelectedEvent,
    // AntdTreeNodeAttribute,
    TreeProps,
} from './Tree';

export { TreeSelect as ElTreeSelect } from './TreeSelect';
export type { SelectInfo, TreeSelectProps, TreeSelectRef } from './TreeSelect';

// export { VirtualList } from './VirtualList';
// export type { ListProps, ListRef, ScrollTo } from './VirtualList';

/* Navigation 导航 */
export { Breadcrumb as ElBreadcrumb, BreadcrumbItem as ElBreadcrumbItem } from './Breadcrumb';
export type { BreadcrumbItemProps, BreadcrumbProps } from './Breadcrumb';

export { Dropdown as ElDropdown, DropdownItem as ElDropdownItem, DropdownMenu as ElDropdownMenu } from './Dropdown';
export type { DropdownItemProps, DropdownMenuProps, DropdownProps } from './Dropdown';

export { Menu as ElMenu, MenuItem as ElMenuItem, MenuItemGroup as ElMenuItemGroup, SubMenu as ElSubMenu } from './Menu';

export { TabPane as ElTabPane, Tabs as ElTabs } from './Tabs';
export type { TabPaneProps, TabsPaneContext, TabsProps } from './Tabs';

export { Empty as ElEmpty } from './Empty';
export type { IEmptyProps } from './Empty';

export { Skeleton as ElSkeleton, SkeletonItem as ElSkeletonItem } from './Skeleton';
export type { SkeletonItemProps, SkeletonProps } from './Skeleton';

/* Feedback 反馈组件 */
export { Dialog as ElDialog } from './Dialog';
export type { DialogBeforeCloseFn, DialogProps } from './Dialog';

export { Drawer as ElDrawer } from './Drawer';
export type { DrawerProps } from './Drawer';

export { Loading as ElLoading } from './Loading';
export type { LoadingProps } from './Loading';

export { Message as ElMessage } from './Message';
export type { MessageDispatcher, MessageMethod, MessageProps, MessageType } from './Message';

export { MessageBox as ElMessageBox } from './MessageBox';
export type { MessageBoxAction, MessageBoxMethod, MessageBoxProps, MessageBoxRef } from './MessageBox';

export { Notification as ElNotification } from './Notification';
export type { INotification, INotificationHandle, INotificationOptions } from './Notification';

export { Tooltip as ElTooltip } from './Tooltip';
export type { TooltipProps } from './Tooltip';

export { Popconfirm as ElPopconfirm } from './Popconfirm';
export type { PopconfirmProps } from './Popconfirm';

export { Popover as ElPopover } from './Popover';
export type { PopoverProps } from './Popover';

/* Others 其他 */
export { Divider as ElDivider } from './Divider';
export type { DividerProps } from './Divider';

/* 工具库与hooks */
export { PopupManager, download, genFileId, generateTree, getScrollWidth, isEmpty, isNotEmpty, randomCode } from './Util';
export {
    htmlInputAttrs,
    htmlInputEvents,
    htmlInputProps,
    partitionAnimationProps,
    partitionHTMLProps,
    partitionPopperPropsUtils,
    partitionTreePropsUtils,
    prefix,
    useChildrenInstance,
    useClassNames,
    useClickOutside,
    useComponentWillMount,
    useControlled,
    useDisabled,
    useForceUpdate,
    useSize,
} from './hooks';

/* 通用types */
export type { AnimationEventProps, BaseProps, FormControlBaseProps, NativeProps, StandardProps, TooltipBaseProps, TypeAttributes } from './types/common';

/** 全局配置 */
export { ConfigProvider as ElConfigProvider } from './ConfigProvider';
export type { ConfigProviderProps } from './ConfigProvider';
