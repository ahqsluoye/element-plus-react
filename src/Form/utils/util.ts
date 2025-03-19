/* eslint-disable no-useless-escape */
import get from 'lodash/get';
import { isEmpty, isNotEmpty } from '../../Util';
import { NamePath, RuleObject, ValidateOptions } from '../typings';

export function getName(path: NamePath | null): string {
    if (isEmpty(path)) {
        return '';
    } else if (path instanceof Array) {
        return path.join('.');
    } else if (typeof path === 'number') {
        return path + '';
    }
    return path;
}

export function getErrorMsg(options: ValidateOptions, type: string, rule?: RuleObject): string {
    let message: string | ((rule?: RuleObject) => string) = get(options, `validateMessages.${type}`);
    if (isNotEmpty(message)) {
        if (typeof message === 'function') {
            return message(rule);
        } else {
            if (/(?<=\$\{)(\w*)(?=\})/g.test(message)) {
                message.match(/(?<=\$\{)(\w*)(?=\})/g).forEach(item => {
                    // @ts-ignore
                    message = message.replace(`\$\{${item}\}`, rule[item] || '');
                });
            }
            return message;
        }
    }
    // @ts-ignore
    return message;
}
