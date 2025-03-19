import classNames from 'classnames';
import omit from 'lodash/omit';
import React, { FC, Ref, forwardRef, useContext, useEffect, useRef, useState } from 'react';
import { Transition } from '../Transition';
import TreeNode, { TreeNodeProps } from './TreeNode';
import { TreeContext } from './contextTypes';
import { FlattenNode } from './typings';
import { TreeNodeRequiredProps, getTreeNodeProps } from './utils/treeUtil';

interface MotionTreeNodeProps extends Omit<TreeNodeProps, 'domRef'> {
    active: boolean;
    motion?: any;
    motionNodes?: FlattenNode[];
    onMotionStart: () => void;
    onMotionEnd: () => void;
    motionType?: 'show' | 'hide';

    treeNodeRequiredProps: TreeNodeRequiredProps;
}

const MotionTreeNode: FC<MotionTreeNodeProps> = forwardRef(
    (
        {
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
        }: MotionTreeNodeProps,
        ref: Ref<HTMLDivElement>,
    ) => {
        const [visible, setVisible] = useState(true);
        const { prefixCls } = useContext(TreeContext);

        const motionedRef = useRef(false);

        const onMotionEnd = () => {
            if (!motionedRef.current) {
                onOriginMotionEnd();
            }
            motionedRef.current = true;
        };

        useEffect(() => {
            if (motionNodes && motionType === 'hide' && visible) {
                setVisible(false);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [motionNodes]);

        useEffect(() => {
            // Trigger motion only when patched
            if (motionNodes) {
                onOriginMotionStart();
            }

            return () => {
                if (motionNodes) {
                    onMotionEnd();
                }
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        if (motionNodes) {
            return (
                <Transition ref={ref} visible={visible} {...motion} transitionAppear={motionType === 'show'} afterEnter={onMotionEnd} afterLeave={onMotionEnd}>
                    {({ className: motionClassName, style: motionStyle }, motionRef) => (
                        <div ref={motionRef} className={classNames(`${prefixCls}-treenode-motion`, motionClassName)} style={motionStyle}>
                            {motionNodes.map((treeNode: FlattenNode) => {
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
                                        {...omit(restProps, 'children')}
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
                    )}
                </Transition>
            );
        }
        return <TreeNode domRef={ref} className={className} style={style} {...props} active={active} />;
    },
);

MotionTreeNode.displayName = 'MotionTreeNode';

export default MotionTreeNode;
