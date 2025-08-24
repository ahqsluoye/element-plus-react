import { BaseProps, TypeAttributes } from '../types/common';

export interface ConfigProviderProps extends BaseProps {
    /** 对按钮进行配置 */
    button?: {
        /** 自动在两个中文字符之间插入空格 */
        autoInsertSpace?: boolean;
        /** 类型 */
        type?: TypeAttributes.Appearance;
        /** 是否为朴素按钮 */
        plain?: boolean;
        /** 是否为圆角按钮 */
        round?: boolean;
    };
    link?: {
        /** 类型 */
        type?: TypeAttributes.Appearance;
        /** 是否下划线  */
        underline?: 'always' | 'hover' | 'never';
    };
    /** 全局组件大小 */
    size?: TypeAttributes.Size;
    /** 对 Card 进行配置 */
    card?: {
        /** 设置阴影显示时机 */
        shadow?: 'always' | 'never' | 'hover';
    };

    /** 对消息进行配置 */
    message?: {
        /** 可同时显示的消息最大数量 */
        // max?: number;
        /** 是否显示关闭按钮 */
        showClose?: boolean;
        /** 显示时间，单位为毫秒。 设为 0 则不会自动关闭 */
        duration?: number; // default 3000
        /** 合并内容相同的消息，不支持 VNode 类型的消息 */
        grouping?: boolean;
        /** Message 距离窗口顶部的偏移量 */
        offset?: number; // defaults 20
    };
    /** 对数字输入框进行配置 */
    inputNumber?: {
        /** 控制按钮位置 */
        controlsPositionRight?: boolean;
        max?: number;
        min?: number;
    };
    popper?: {
        appendTo?: HTMLElement;
    };
    locale?: 'en' | 'zh-cn';
}

export type ConfigProviderContextProps = Omit<ConfigProviderProps, 'locale'> & {
    locale?: 'en' | 'zh-CN';
};
