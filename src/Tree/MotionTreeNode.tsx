import classNames from 'classnames';
import { useComposeRef } from 'rc-util';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';
import * as React from 'react';
import { useRef } from 'react';
import Transition from '../Transition/Transition';
import TreeNode from './TreeNode';
import { TreeContext } from './contextTypes';
import type { FlattenNode, TreeNodeProps } from './typings';
import useUnmount from './useUnmount';
import { getTreeNodeProps, type TreeNodeRequiredProps } from './utils/treeUtil';

interface MotionTreeNodeProps extends Omit<TreeNodeProps, 'domRef'> {
    active: boolean;
    motion?: any;
    motionNodes?: FlattenNode[];
    onMotionStart: () => void;
    onMotionEnd: () => void;
    motionType?: 'show' | 'hide';

    treeNodeRequiredProps: TreeNodeRequiredProps;
}

const MotionTreeNode = React.forwardRef<HTMLDivElement, MotionTreeNodeProps>((oriProps, ref) => {
    const {
        className,
        style,
        motion,
        motionNodes,
        motionType,
        onMotionStart: onOriginMotionStart,
        onMotionEnd: onOriginMotionEnd,
        active,
        treeNodeRequiredProps,
        ...props
    } = oriProps;
    const [visible, setVisible] = React.useState(true);
    const { prefixCls } = React.useContext(TreeContext);

    // Calculate target visible here.
    // And apply in effect to make `leave` motion work.
    const targetVisible = motionNodes && motionType !== 'hide';

    const motionedRef = useRef(false);
    const containerRef = useRef(null);

    const mergedRef = useComposeRef(ref, containerRef);

    const onMotionEnd = () => {
        if (!motionedRef.current) {
            onOriginMotionEnd();
        }
        motionedRef.current = true;
    };

    useLayoutEffect(() => {
        if (motionNodes) {
            if (targetVisible !== visible) {
                setVisible(targetVisible);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [motionNodes]);

    const triggerMotionStart = () => {
        if (motionNodes) {
            onOriginMotionStart();
        }
    };

    // Should only trigger once
    const triggerMotionEndRef = React.useRef(false);
    const triggerMotionEnd = () => {
        if (motionNodes && !triggerMotionEndRef.current) {
            triggerMotionEndRef.current = true;
            onOriginMotionEnd();
        }
    };

    // Effect if unmount
    useUnmount(triggerMotionStart, triggerMotionEnd);

    // Motion end event
    const onVisibleChanged = (nextVisible: boolean) => {
        if (targetVisible === nextVisible) {
            triggerMotionEnd();
        }
    };

    if (motionNodes) {
        return (
            <Transition nodeRef={containerRef} visible={visible} {...motion} transitionAppear={motionType === 'show'} afterEnter={onMotionEnd} afterLeave={onMotionEnd}>
                <div ref={mergedRef} className={classNames(`${prefixCls}-treenode-motion`, className)} style={style}>
                    {motionNodes.map(treeNode => {
                        const {
                            data: { ...restProps },
                            title,
                            key,
                            isStart,
                            isEnd,
                        } = treeNode;
                        delete restProps.children;

                        const treeNodeProps = getTreeNodeProps(key, treeNodeRequiredProps);

                        return (
                            <TreeNode
                                {...(restProps as Omit<typeof restProps, 'children'>)}
                                {...treeNodeProps}
                                title={title}
                                active={active}
                                data={treeNode.data}
                                key={key}
                                isStart={isStart}
                                isEnd={isEnd}
                            />
                        );
                    })}
                </div>
                {/* {({ className: motionClassName, style: motionStyle }, motionRef) => (
                )} */}
            </Transition>
        );
    }
    return <TreeNode domRef={ref} className={className} style={style} {...props} active={active} />;
});

if (process.env.NODE_ENV !== 'production') {
    MotionTreeNode.displayName = 'MotionTreeNode';
}

export default MotionTreeNode;
