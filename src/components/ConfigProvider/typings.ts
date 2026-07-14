import { ButtonProps } from '../Button/typings';
import { CardProps } from '../Card/typings';
import { TextareaProps } from '../Input/typings';
import { InputNumberProps } from '../InputNumber/typings';
import { LinkProps } from '../Link/typings';
import { MessageProps } from '../Message/typings';
import { BaseProps, TypeAttributes } from '../types/common';

export interface ConfigProviderProps extends BaseProps {
    /** 对文本域进行配置 */
    textarea?: Pick<TextareaProps, 'autosize'>;
    /** 对按钮进行配置 */
    button?: Pick<ButtonProps, 'autoInsertSpace' | 'type' | 'plain' | 'round'>;
    link?: Pick<LinkProps, 'type' | 'underline'>;
    /** 全局组件大小 */
    size?: TypeAttributes.Size;
    /** 全局组件是否可清空 */
    clearable?: boolean;
    /** 对 Card 进行配置 */
    card?: Pick<CardProps, 'shadow'>;
    /** 对消息进行配置 */
    message?: Pick<MessageProps, 'showClose' | 'duration' | 'grouping' | 'offset'>;
    /** 对数字输入框进行配置 */
    inputNumber?: Pick<InputNumberProps, 'controlsPosition' | 'max' | 'min'>;
    popper?: {
        appendTo?: HTMLElement;
    };
    locale?: 'en' | 'zh-cn';
}

export type ConfigProviderContextProps = Omit<ConfigProviderProps, 'locale'> & {
    locale?: 'en' | 'zh-CN';
};
