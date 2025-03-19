/* eslint-disable lines-around-comment */
import React, { Component } from 'react';
import TransitionGroupContext from './TransitionGroupContext';

import { getChildMapping, getInitialChildMapping, getNextChildMapping } from './childMapping';

const values = Object.values || (obj => Object.keys(obj).map(k => obj[k]));

const defaultProps = {
    component: 'div',
    childFactory: child => child,
};

export interface TransitionGroupProps {
    /**
     * `<TransitionGroup>` renders a `<div>` by default. You can change this
     * behavior by providing a `component` prop.
     * If you use React v16+ and would like to avoid a wrapping `<div>` element
     * you can pass in `component={null}`. This is useful if the wrapping div
     * borks your css styles.
     */
    component: any;
    /**
     * A set of `<Transition>` components, that are toggled `in` and out as they
     * leave. the `<TransitionGroup>` will inject specific transition props, so
     * remember to spread them through if you are wrapping the `<Transition>` as
     * with our `<Fade>` example.
     *
     * While this component is meant for multiple `Transition` or `CSSTransition`
     * children, sometimes you may want to have a single transition child with
     * content that you want to be transitioned out and in when you change it
     * (e.g. routes, images etc.) In that case you can change the `key` prop of
     * the transition child as you change its content, this will cause
     * `TransitionGroup` to transition the child out and back in.
     */
    children: React.ReactNode;
    /**
     * A convenience prop that enables or disables transitionAppear animations
     * for all children. Note that specifying this will override any defaults set
     * on individual children Transitions.
     */
    transitionAppear: boolean;
    /**
     * A convenience prop that enables or disables enter animations
     * for all children. Note that specifying this will override any defaults set
     * on individual children Transitions.
     */
    enter: boolean;
    /**
     * A convenience prop that enables or disables exit animations
     * for all children. Note that specifying this will override any defaults set
     * on individual children Transitions.
     */
    exit: boolean;
    /**
     * You may need to apply reactive updates to a child as it is exiting.
     * This is generally done by using `cloneElement` however in the case of an exiting
     * child the element has already been removed and not accessible to the consumer.
     *
     * If you do need to update a child as it leaves you can provide a `childFactory`
     * to wrap every child, even the ones that are leaving.
     *
     * @type Function(child: ReactElement) -> ReactElement
     */
    childFactory: (child: React.ReactNode) => React.ReactNode;
}

interface State {
    children?: React.ReactElement<any>[] | React.ReactElement<any>;
    contextValue?: { isMounting: boolean };
    handleExited?: (child: any, node: any) => void;
    firstRender?: boolean;
}

/**
 * The `<TransitionGroup>` component manages a set of transition components
 * (`<Transition>` and `<CSSTransition>`) in a list. Like with the transition
 * components, `<TransitionGroup>` is a state machine for managing the mounting
 * and unmounting of components over time.
 *
 * Consider the example below. As items are removed or added to the TodoList the
 * `in` prop is toggled automatically by the `<TransitionGroup>`.
 *
 * Note that `<TransitionGroup>`  does not define any animation behavior!
 * Exactly _how_ a list item animates is up to the individual transition
 * component. This means you can mix and match animations across different list
 * items.
 */
class TransitionGroup extends Component<TransitionGroupProps, State> {
    mounted: boolean | undefined;
    static defaultProps = defaultProps;
    constructor(props, context) {
        super(props, context);

        const handleExited = this.handleExited.bind(this);

        // Initial children should all be entering, dependent on transitionAppear
        this.state = {
            contextValue: { isMounting: true },
            handleExited,
            firstRender: true,
        };
    }

    componentDidMount() {
        this.mounted = true;
        this.setState({
            contextValue: { isMounting: false },
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    static getDerivedStateFromProps(nextProps, { children: prevChildMapping, handleExited, firstRender }) {
        return {
            children: firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
            firstRender: false,
        };
    }

    // node is `undefined` when user provided `nodeRef` prop
    handleExited(child, node) {
        // @ts-ignore
        const currentChildMapping = getChildMapping(this.props.children);

        if (child.key in currentChildMapping) {
            return;
        }

        if (child.props.afterLeave) {
            child.props.afterLeave(node);
        }

        if (this.mounted) {
            this.setState(state => {
                const children = { ...state.children };

                delete children[child.key];
                return { children };
            });
        }
    }

    render() {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { component: Component = 'div', childFactory = child => child, ...props } = this.props;
        const { contextValue } = this.state;
        const children = values(this.state.children).map(childFactory);

        delete props.transitionAppear;
        delete props.enter;
        delete props.exit;

        if (Component === null) {
            return <TransitionGroupContext.Provider value={contextValue}>{children}</TransitionGroupContext.Provider>;
        }
        return (
            <TransitionGroupContext.Provider value={contextValue}>
                <Component {...props}>{children}</Component>
            </TransitionGroupContext.Provider>
        );
    }
}

export default TransitionGroup;
