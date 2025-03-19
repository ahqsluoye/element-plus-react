import forEach from 'lodash/forEach';
import includes from 'lodash/includes';
import { TransitionProps } from '../Transition';

// @ts-ignore
export const animationAllProps = ['transitionAppear', 'unmountOnExit', 'beforeEnter', 'onEnter', 'afterEnter', 'beforeLeave', 'onLeave', 'afterLeave', 'duration', 'display'];

/**
 * Returns an array of objects consisting of: props of html input element and rest.
 * @author	Parker
 * @CreateTime	2022/4/8 17:46:40
 * @LastEditor	Parker
 * @ModifyTime	2022/4/22 15:38:45
 * @param {object} props A ReactElement props object
 * @param {Object} [options={}]
 * @param {Array} [options.htmlProps] An array of html input props
 * @param {boolean} [options.includeAria] Includes all input props that starts with "aria-"
 * @returns {[{}, {}]} An array of objects
 */
export const partitionAnimationProps = (props: any, options: any = {}): [TransitionProps, any] => {
    const { animationProps = animationAllProps } = options;

    const inputProps: { [key: string]: string } = {};
    const rest = {};

    forEach(props, (val, prop) => {
        const target: any = includes(animationProps, prop) ? inputProps : rest;
        target[prop] = val;
    });

    return [inputProps, rest];
};
