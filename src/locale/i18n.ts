import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import zhCn from './zhCn';

const transfer = (obj: object, path = '', result = {}): Record<string, string> => {
    Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (value && Object.prototype.toLocaleString.call(value) === '[object Object]') {
            transfer(value, path + key + '.', result);
        } else if (typeof value === 'string') {
            Object.assign(result, { [path + key]: value });
        }
    });
    return result;
};

i18n
    // 注入 react-i18next 实例
    .use(initReactI18next)
    // 初始化 i18next
    // 配置参数的文档: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
            prefix: '{',
            suffix: '}',
        },
        resources: {
            en: { translation: transfer(en) },
            'zh-CN': { translation: transfer(zhCn) },
        },
    });

export default i18n;
