import React from 'react';
import { isObject, isUndefined } from '../Util';
import Main from './Main';
import { Action, MessageBoxData, MessageBoxProps, MessageState } from './typings';

const MESSAGE_BOX_DEFAULT_OPTS: Record<'prompt' | 'alert' | 'confirm', Partial<MessageBoxProps>> = {
    alert: { closeOnClickModal: false },
    confirm: { showCancelButton: true },
    prompt: { showCancelButton: true, showInput: true },
};

const instanceFactory = (boxType: MessageState['boxType']) => {
    return (message: string | React.ReactElement, title: string | React.ReactElement | MessageBoxProps, options: MessageBoxProps) => {
        const { distinguishCancelAndClose } = options;
        let titleOrOpts = '';
        if (isObject(title)) {
            options = title as unknown as MessageBoxProps;
            titleOrOpts = '';
        } else if (isUndefined(title)) {
            titleOrOpts = '';
        } else {
            titleOrOpts = title as string;
        }
        return new Promise<MessageBoxData>((resolve, reject) => {
            new Main({
                boxType,
                options: {
                    message,
                    title: titleOrOpts,
                    ...MESSAGE_BOX_DEFAULT_OPTS[boxType],
                    ...options,
                },
                onAction: (action: Action, value: string) => {
                    if (action === 'confirm') {
                        resolve(boxType === 'prompt' ? { value, action } : action);
                    } else if (action === 'cancel') {
                        reject(action);
                    } else if (action === 'close') {
                        reject(distinguishCancelAndClose ? action : 'cancel');
                    }
                },
            });
        });
    };
};

export const MessageBox = (options: MessageBoxProps = {} as MessageBoxProps) => {
    return new Promise((resolve, reject) => {
        new Main({
            options,
            boxType: '',
            onAction: action => {
                if (action === 'confirm') {
                    resolve(action);
                } else if (action === 'cancel') {
                    reject(action);
                } else if (action === 'close') {
                    reject(options?.distinguishCancelAndClose ? action : 'cancel');
                }
            },
        });
    });
};

/**
 * 消息弹窗提示
 * @param message 消息内容
 * @param title 标题
 * @param options 其他设置项
 * @returns
 */
MessageBox.alert = instanceFactory('alert');

/**
 * 确认消息
 * @param message 消息内容
 * @param title 标题
 * @param options 其他设置项
 * @returns
 */
MessageBox.confirm = instanceFactory('confirm');

MessageBox.prompt = instanceFactory('prompt');

export type { Action as MessageBoxAction, MessageBoxMethod, MessageBoxProps, MessageBoxRef } from './typings';
