import ConfigProviderContext from '@qsxy/element-plus-react/ConfigProvider/ConfigProviderContext';
import { Message } from '@qsxy/element-plus-react/Message/index';
import { MessageMethod, MessageParams, MessageProps } from '@qsxy/element-plus-react/Message/typings';
import { MessageBox, MessageBoxProps, instanceFactory } from '@qsxy/element-plus-react/MessageBox';
import { Action, MessageBoxInputData } from '@qsxy/element-plus-react/MessageBox/typings';
import { isEmpty } from '@qsxy/element-plus-react/Util/base';
import { isValidElement, useContext } from 'react';

export const useConfigProvider = () => {
    const { message: messageConfig, locale } = useContext(ConfigProviderContext);

    const ElMessage: MessageMethod = function (opts: MessageParams = {} as MessageParams) {
        if (typeof opts === 'string' || isValidElement(opts)) {
            opts = {
                ...messageConfig,
                message: opts,
            };
        }

        if (isEmpty(opts)) {
            opts = {
                ...messageConfig,
                message: '',
            };
        } else {
            opts = {
                ...messageConfig,
                ...opts,
            };
        }
        const options: MessageProps = opts as MessageProps;
        Message(options);
    } as any;

    ['primary', 'success', 'warning', 'info', 'error'].forEach(type => {
        ElMessage[type] = options => {
            if (typeof options === 'string' || isValidElement(options)) {
                options = {
                    ...messageConfig,
                    message: options,
                    type,
                };
            } else {
                options = {
                    ...messageConfig,
                    ...options,
                    type,
                };
            }
            return Message(options);
        };
    });

    ElMessage.closeAll = Message.closeAll;

    const ElMessageBox = (options: MessageBoxProps = {} as MessageBoxProps) => {
        return MessageBox({ locale, ...options });
    };

    /**
     * 消息弹窗提示
     * @param message 消息内容
     * @param title 标题
     * @param options 其他设置项
     * @returns
     */
    ElMessageBox.alert = instanceFactory<Action>('alert', locale);

    /**
     * 确认消息
     * @param message 消息内容
     * @param title 标题
     * @param options 其他设置项
     * @returns
     */
    ElMessageBox.confirm = instanceFactory<Action>('confirm', locale);

    ElMessageBox.prompt = instanceFactory<MessageBoxInputData>('prompt', locale);

    return {
        ElMessage,
        ElMessageBox,
    };
};
