/* eslint-disable indent */
import classNames from 'classnames';
import isBoolean from 'lodash/isBoolean';
import last from 'lodash/last';
import { useCallback } from 'react';
import { ISplitCode, prefix as addPrefix, namespace } from './prefix';

export type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | boolean;

// This is the only way I found to break circular references between ClassArray and ClassValue
// https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128553540

export interface ClassArray extends Array<ClassValue> {} //eslint-disable-line @typescript-eslint/no-empty-interface

export type ClassDictionary = Record<string, any>;
export type ClassNameM = {
    wb: (...classes: ClassValue[]) => string;
    b: (...classes: ClassValue[]) => string;
    e: (...classes: ClassValue[]) => string;
    m: (...classes: ClassValue[]) => string;
    be: (prefix: string, sub: string, compName?: boolean) => string;
    em: (sub: string, modifier: string, compName?: boolean) => string;
    bm: (prefix: string, modifier: string, compName?: boolean) => string;
    bem: (prefix: string, sub: string, modifier: string, compName?: boolean) => string;
    ebm: (sub: string, prefix: string, modifier: string, compName?: boolean) => string;
    is: (...classes: ClassValue[]) => string;
};
//
/**
 * Add a prefix to all classNames.
 *
 * @param str prefix of className
 * @returns { wb, merge, prefix }
 *  - wb: A function of combining className and adding a prefix to each className.
 *    At the same time, the default `classPrefix` is the first className.
 *  - merge: A merge className function.
 *  - prefix: Add a prefix to className
 */
function useClassNames(str: string, classPrefix = namespace) {
    const componentName = addPrefix(classPrefix, str);

    /**
     * @example
     *
     * 如果组件前缀是'button':
     * prefix('red', { active: true }) => 'el-button-red el-button-active'
     */
    const prefixSplit = useCallback(
        (splitCode: ISplitCode, ...classes: ClassValue[]) => {
            let compName = true;
            if (classes?.length > 0) {
                if (isBoolean(last(classes))) {
                    compName = last(classes) as boolean;
                }
            }

            const mergeClasses = classes.length
                ? classNames(...classes)
                      .split(' ')
                      .map(item => addPrefix(compName ? componentName : classPrefix, item, splitCode))
                : [];

            return mergeClasses.filter(cls => cls).join(' ');
        },
        [classPrefix, componentName],
    );

    /**
     * 如果组件前缀是'button':
     *
     * b('red', { active: true }) => 'el-button-red el-button-active'
     *
     * b('red', { active: true }, false) => 'el-red el-active'
     */
    const b = useCallback(
        (...classes: ClassValue[]) => {
            let compName = true;
            if (classes?.length > 0) {
                if (isBoolean(last(classes))) {
                    compName = last(classes) as boolean;
                }
            }
            const mergeClasses = classes.length
                ? classNames(...classes)
                      .split(' ')
                      .map(item => addPrefix(compName ? componentName : classPrefix, item))
                : [componentName];

            return mergeClasses.filter(cls => cls).join(' ');
        },
        [classPrefix, componentName],
    );

    /**
     * 如果组件前缀是'button':
     *
     * wb('red', { active: true }) => 'el-button el-button-red el-button-active'
     *
     * wb('red', { active: true }, false) => 'el-button el-red el-active'
     */
    const wb = useCallback(
        (...classes: ClassValue[]) => {
            let compName = true;
            if (classes?.length > 0) {
                if (isBoolean(last(classes))) {
                    compName = last(classes) as boolean;
                }
            }
            const mergeClasses = b(classes, compName);
            return mergeClasses ? `${componentName} ${mergeClasses}` : componentName;
        },
        [componentName, b],
    );

    /**
     * 如果组件前缀是'button':
     *
     * e('red', { active: true }) => 'el-button__red el-button__active'
     *
     * e('red', { active: true }, false) => 'r__red r__active'
     */
    const e = useCallback(
        (...classes: ClassValue[]) => {
            const mergeClasses = prefixSplit('__', ...classes);
            return mergeClasses;
        },
        [prefixSplit],
    );

    /**
     * 如果组件前缀是'button':
     *
     * m('red', { active: true }) => 'el-button--red el-button--active'
     *
     * m('red', { active: true }, false) => 'el--red el--active'
     */
    const m = useCallback(
        (...classes: ClassValue[]) => {
            const mergeClasses = prefixSplit('--', ...classes);
            return mergeClasses;
        },
        [prefixSplit],
    );

    /**
     * 如果组件前缀是'button':
     *
     * be('red', 'active') => 'el-button-red__active'
     *
     * be('red', 'active', false) => 'el-red__active'
     */
    const be = useCallback(
        (prefix: string, sub: string, compName = true) => {
            return `${compName ? componentName : classPrefix}-${prefix}__${sub}`;
        },
        [classPrefix, componentName],
    );

    /**
     * 如果组件前缀是'button':
     *
     * em( 'color", 'active') => 'el-button__color--active'
     *
     * em( 'color", 'active', false) => 'r__color--active'
     */
    const em = useCallback(
        (sub: string, modifier: string, compName = true) => {
            return `${compName ? componentName : classPrefix}__${sub}--${modifier}`;
        },
        [classPrefix, componentName],
    );

    /**
     * 如果组件前缀是'button':
     *
     * be( 'color", 'active') => 'el-button-color--active'
     *
     * be( 'color", 'active', false) => 'el-color--active'
     */
    const bm = useCallback(
        (prefix: string, modifier: string, compName = true) => {
            return `${compName ? componentName : classPrefix}-${prefix}--${modifier}`;
        },
        [classPrefix, componentName],
    );

    /**
     * 如果组件前缀是'button':
     *
     * bem('red', 'color", 'active') => 'el-button-red__color--active'
     *
     * bem('red', 'color", 'active', false) => 'el-red__color--active'
     */
    const bem = useCallback(
        (prefix: string, sub: string, modifier: string, compName = true) => {
            return `${compName ? componentName : classPrefix}-${prefix}__${sub}--${modifier}`;
        },
        [classPrefix, componentName],
    );

    /**
     * 如果组件前缀是'button':
     *
     * ebm('close', 'icon", 'hidden') => 'el-button__close-icon--hidden'
     *
     * ebm('close', 'icon", 'hidden', false) => 'r__close-icon--hidden'
     */
    const ebm = useCallback(
        (sub: string, prefix: string, modifier: string, compName = true) => {
            return `${compName ? componentName : classPrefix}__${sub}-${prefix}--${modifier}`;
        },
        [classPrefix, componentName],
    );

    /**
     * 如果组件前缀是'button':
     *
     * is({ block: true }) => 'is-block'
     */
    const is = useCallback((...classes: ClassValue[]) => {
        const mergeClasses = classes.length
            ? classNames(...classes)
                  .split(' ')
                  .filter(cls => cls)
                  .map(item => `is-${item}`)
            : [];
        return mergeClasses.join(' ');
    }, []);

    // with block
    const cssVarBlock = (object: Record<string, string>) => {
        const styles: Record<string, string> = {};
        for (const key in object) {
            if (object[key]) {
                styles[`--${componentName}-${key}`] = object[key];
            }
        }
        return styles;
    };

    return {
        /**
         * 如果组件前缀是'button':
         *
         * wb('red', { active: true }) => 'el-button el-button-red el-button-active'
         *
         * wb('red', { active: true }, false) => 'el-button el-red el-active'
         */
        wb,

        /**
         * 如果组件前缀是'button':
         *
         * b('red', { active: true }) => 'el-button-red el-button-active'
         *
         * b('red', { active: true }, false) => 'el-red el-active'
         */
        b,

        /**
         * 如果组件前缀是'button':
         *
         * e('red', { active: true }) => 'el-button__red el-button__active'
         *
         * e('red', { active: true }, false) => 'r__red r__active'
         */
        e,

        /**
         * 如果组件前缀是'button':
         *
         * m('red', { active: true }) => 'el-button--red el-button--active'
         *
         * m('red', { active: true }, false) => 'el--red el--active'
         */
        m,

        /**
         * 如果组件前缀是'button':
         *
         * be('red', 'active') => 'el-button-red__active'
         *
         * be('red', 'active', false) => 'el-red__active'
         */
        be,

        /**
         * 如果组件前缀是'button':
         *
         * em( 'color", 'active') => 'el-button__color--active'
         *
         * em( 'color", 'active', false) => 'r__color--active'
         */
        em,

        /**
         * 如果组件前缀是'button':
         *
         * be( 'color", 'active') => 'el-button-color--active'
         *
         * be( 'color", 'active', false) => 'el-color--active'
         */
        bm,

        /**
         * 如果组件前缀是'button':
         *
         * bem('red', 'color", 'active') => 'el-button-red__color--active'
         *
         * bem('red', 'color", 'active', false) => 'el-red__color--active'
         */
        bem,

        /**
         * 如果组件前缀是'button':
         *
         * ebm('close', 'icon", 'hidden') => 'el-button__close-icon--hidden'
         *
         * ebm('close', 'icon", 'hidden', false) => 'r__close-icon--hidden'
         */
        ebm,

        /**
         * 如果组件前缀是'button':
         *
         * is('block', { block: true }) => 'is-block'
         */
        is,

        cssVarBlock,
    };
}

export default useClassNames;
