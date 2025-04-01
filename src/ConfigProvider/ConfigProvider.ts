import { createContext } from 'react';

export interface ConfigProviderProps {
    /** 对按钮进行配置 */
    button?: {
        /** 自动在两个中文字符之间插入空格 */
        autoInsertSpace?: boolean;
    };
    /** 对消息进行配置 */
    // message?: {
    //     /** 可同时显示的消息最大数量 */
    //     max?: number;
    // };
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
}
const ConfigProvider = createContext<ConfigProviderProps>({
    // message: { max: Infinity },
    inputNumber: {
        controlsPositionRight: false,
    },
    popper: {},
});

ConfigProvider.displayName = 'ConfigProvider';

export default ConfigProvider;
