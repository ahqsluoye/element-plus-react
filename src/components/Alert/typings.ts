import { ReactElement } from 'react';
import { IconName } from '../Icon/typings';
import { BaseProps, NativeProps } from '../types/common';

export interface AlertProps
    extends BaseProps,
        NativeProps<
            | '--el-alert-padding'
            | '--el-alert-border-radius-base'
            | '--el-alert-title-font-size'
            | '--el-alert-title-with-description-font-size'
            | '--el-alert-description-font-size'
            | '--el-alert-close-font-size'
            | '--el-alert-close-customed-font-size'
            | '--el-alert-icon-size'
            | '--el-alert-icon-large-size'
        > {
    /**
     * Alert 标题。
     */
    title?: string | ReactElement;
    /**
     * 描述性文本。
     */
    description?: string;
    /**
     * Alert 类型。
     */
    type?: 'primary' | 'success' | 'warning' | 'error' | 'info';
    /**
     * 是否可关闭。
     */
    closable?: boolean;
    /**
     * 替换关闭按钮的文本。
     */
    closeText?: string;
    /**
     * 是否显示图标。
     */
    showIcon?: boolean;
    /**
     * 是否将内容居中。
     */
    center?: boolean;
    /**
     * 主题样式
     */
    effect?: 'light' | 'dark';
    /**
     * 图标。
     */
    icon?: IconName;
    /**
     * 关闭时的回调函数。
     */
    onClose?: (evt: MouseEvent) => void;
}
