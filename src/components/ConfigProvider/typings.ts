import { ButtonProps } from '@qsxy/element-plus-react/Button/typings';
import { CardProps } from '@qsxy/element-plus-react/Card/typings';
import { TextareaProps } from '@qsxy/element-plus-react/Input/typings';
import { InputNumberProps } from '@qsxy/element-plus-react/InputNumber/typings';
import { LinkProps } from '@qsxy/element-plus-react/Link/typings';
import { MessageProps } from '@qsxy/element-plus-react/Message/typings';
import { BaseProps, TypeAttributes } from '@qsxy/element-plus-react/types/common';

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
