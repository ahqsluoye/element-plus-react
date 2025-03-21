import classNames from 'classnames';
import getTransitionEnd from 'dom-lib/getTransitionEnd';
import on from 'dom-lib/on';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import React, { Children, cloneElement, Component, createRef, RefObject } from 'react';
import { AnimationEventProps, ComponentChildren } from '../types/common';
import { getAnimationEnd } from './util';

export enum STATUS {
    UNMOUNTED = 0,
    BEFORE_ENTER = 1,
    ENTER = 2,
    AFTER_ENTER = 3,
    BEFORE_LEAVE = 4,
    LEAVE = 5,
    AFTER_LEAVE = 6,
}

interface ExtraProps {
    nodeRef: RefObject<HTMLElement> | (() => RefObject<HTMLElement>);
}

export interface TransitionProps extends AnimationEventProps {
    animation?: boolean;

    /** Primary content */
    // children?: ((props: any, ref: Ref<any>) => React.ReactElement) | VNode;
    children?: ComponentChildren;

    /** Additional classes */
    className?: string;

    name?: string;

    display?: string;

    /** Show the component; triggers the enter or exit animation */
    visible?: boolean;

    /** Unmount the component (remove it from the DOM) when it is not shown */
    unmountOnExit?: boolean;

    /** Run the enter animation when the component mounts, if it is initially shown */
    transitionAppear?: boolean;

    /** A Timeout for the animation */
    duration?: number;

    /** CSS class or classes applied when the component is exited */
    exitedClassName?: string;

    /** CSS class or classes applied while the component is exiting */
    exitingClassName?: string;

    /** CSS class or classes applied when the component is entered */
    enteredClassName?: string;

    /** CSS class or classes applied while the component is entering */
    enteringClassName?: string;
}

interface TransitionState {
    status?: number;
}

class Transition extends Component<TransitionProps & ExtraProps, TransitionState> {
    static displayName = 'Transition';
    static defaultProps = {
        duration: 100,
    };

    animationEventListener = null;
    instanceElement = null;
    nextCallback: any = null;
    needsUpdate = null;
    childRef: RefObject<any>;

    constructor(props: TransitionProps & ExtraProps) {
        super(props);

        let initialStatus: number;
        if (props.visible) {
            initialStatus = props.transitionAppear ? STATUS.BEFORE_ENTER : STATUS.BEFORE_LEAVE;
        } else {
            initialStatus = props.unmountOnExit ? STATUS.UNMOUNTED : STATUS.BEFORE_ENTER;
        }

        this.state = {
            status: initialStatus,
        };

        this.nextCallback = null;
        this.childRef = createRef();
    }

    static getDerivedStateFromProps(nextProps: TransitionProps, prevState: TransitionState) {
        if (nextProps.visible && nextProps.unmountOnExit) {
            if (prevState.status === STATUS.UNMOUNTED) {
                // Start enter transition in componentDidUpdate.
                return { status: STATUS.BEFORE_ENTER };
            }
        }
        return null;
    }

    getSnapshotBeforeUpdate() {
        if (!this.props.visible || !this.props.unmountOnExit) {
            this.needsUpdate = true;
        }
        return null;
    }

    componentDidMount() {
        if (this.props.transitionAppear && this.props.visible) {
            this.performEnter(this.props);
        }
    }

    componentDidUpdate() {
        const { status } = this.state;
        const { unmountOnExit } = this.props;

        if (unmountOnExit && status === STATUS.BEFORE_ENTER) {
            if (this.props.visible) {
                this.performEnter(this.props);
            } else {
                if (this.instanceElement) {
                    this.setState({ status: STATUS.UNMOUNTED });
                }
            }
            return;
        }

        if (this.needsUpdate) {
            this.needsUpdate = false;

            if (this.props.visible) {
                if (status === STATUS.LEAVE || status === STATUS.BEFORE_ENTER) {
                    this.performEnter(this.props);
                }
            } else if (status === STATUS.ENTER || status === STATUS.BEFORE_LEAVE) {
                this.performExit(this.props);
            }
        }
    }

    componentWillUnmount() {
        this.cancelNextCallback();
        this.instanceElement = null;
    }

    onTransitionEnd(node: HTMLElement, handler) {
        this.setNextCallback(handler);

        this.animationEventListener?.off();

        if (node) {
            const { duration, animation } = this.props;
            this.animationEventListener = on(node, animation ? getAnimationEnd() : getTransitionEnd(), this.nextCallback);
            if (duration !== null) {
                setTimeout(this.nextCallback, duration);
            }
        } else {
            setTimeout(this.nextCallback, 0);
        }
    }

    setNextCallback(callback) {
        let active = true;

        this.nextCallback = (event?: AnimationEvent) => {
            if (!active) {
                return;
            }

            if (event) {
                if (this.instanceElement === event.target) {
                    callback(event);
                    active = false;
                    this.nextCallback = null;
                }
                return;
            }

            callback(event);
            active = false;
            this.nextCallback = null;
        };

        this.nextCallback.cancel = () => {
            active = false;
        };

        return this.nextCallback;
    }

    getChildElement() {
        if (this.props?.nodeRef instanceof Function) {
            return this.props?.nodeRef()?.current;
        }
        return this.props?.nodeRef?.current;
    }

    performEnter(props: TransitionProps) {
        const { beforeEnter, onEnter, afterEnter } = props || this.props;

        this.cancelNextCallback();
        const node = this.getChildElement();

        this.instanceElement = node;
        beforeEnter?.(node);

        // const callback = () => {
        // };
        this.safeSetState({ status: STATUS.ENTER }, () => {
            onEnter?.(node);
            this.onTransitionEnd(node, () => {
                this.safeSetState({ status: STATUS.BEFORE_LEAVE }, () => {
                    afterEnter?.(node);
                });
            });
        });
        // if (name) {
        //     setTimeout(callback, duration);
        // } else {
        //     callback();
        // }
    }

    performExit(props: TransitionProps) {
        const { beforeLeave, onLeave, afterLeave } = props || this.props;

        this.cancelNextCallback();
        const node = this.getChildElement();

        this.instanceElement = node;
        beforeLeave?.(node);

        this.safeSetState({ status: STATUS.LEAVE }, () => {
            this.onTransitionEnd(node, () => {
                onLeave?.(node);
                this.safeSetState({ status: STATUS.BEFORE_ENTER }, () => {
                    afterLeave?.(node);
                });
            });
        });
    }

    cancelNextCallback() {
        if (this.nextCallback !== null) {
            this.nextCallback.cancel();
            this.nextCallback = null;
        }
    }

    safeSetState(nextState: TransitionState, callback) {
        if (this.instanceElement) {
            this.setState(nextState, this.setNextCallback(callback));
        }
    }

    render() {
        const status = this.state.status;

        if (status === STATUS.UNMOUNTED) {
            return null;
        }
        const { children, className, name, ...rest } = this.props;
        const childProps: any = omit(rest, [
            'animation',
            'className',
            'visible',
            'unmountOnExit',
            'transitionAppear',
            'duration',
            'beforeEnter',
            'onEnter',
            'afterEnter',
            'beforeLeave',
            'onLeave',
            'afterLeave',
            'nodeRef',
        ]);

        let transitionClassName;
        if (name) {
            if (status === STATUS.BEFORE_ENTER) {
                transitionClassName = `${name}-leave-to`;
            } else if (status === STATUS.ENTER) {
                transitionClassName = `${name}-enter-from`;
            } else if (status === STATUS.BEFORE_LEAVE) {
                transitionClassName = `${name}-enter-active`;
            } else if (status === STATUS.LEAVE) {
                transitionClassName = `${name}-leave-active`;
            }
        }

        if (isFunction(children)) {
            childProps.className = classNames(className, transitionClassName);
            return children(childProps, this.childRef);
        }

        return Children.toArray(children).map(child => {
            if (typeof child === 'string' || typeof child === 'number') {
                child = <span>{child}</span>;
            }

            // @ts-ignore
            return cloneElement(child, {
                ...childProps,
                // ref: this.childRef,
                // @ts-ignore
                className: classNames(className, child.props?.className, transitionClassName),
                style: {
                    // @ts-ignore
                    ...(child.props?.style || {}),
                    display: this.state.status > 1 ? this.props.display ?? 'block' : 'none',
                },
            });
        });
    }
}

export default Transition;
