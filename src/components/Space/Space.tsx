import { mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import isArray from 'lodash/isArray';
import React, { memo, useCallback, useMemo } from 'react';
import SpaceItem from './SpaceItem';
import { SpaceProps } from './typings';
import { useSpace } from './useSpace';

const Space = memo(({ ref, ...props }: SpaceProps & { ref?: React.Ref<HTMLDivElement | null> }) => {
    props = mergeDefaultProps({ direction: 'horizontal', prefixCls: 'el-space', alignment: 'center', justify: '', size: 'small', fillRatio: 100 }, props);
    const { direction, style, prefixCls, spacer, children } = props;

    const { classes, containerStyle, itemStyle } = useSpace(props);

    // Extract children and handle fragments
    const extractChildren = useCallback(
        (childrenArray: React.ReactNode[], parentKey = '', extractedChildren: React.ReactNode[] = []): React.ReactNode[] => {
            childrenArray.forEach((child, loopKey) => {
                if (React.isValidElement(child) && child.type === React.Fragment) {
                    // Handle React Fragment
                    const fragmentChildren = (child as React.ReactElement<any>).props?.children || null;
                    if (isArray(fragmentChildren)) {
                        fragmentChildren.forEach((nested: React.ReactNode, key: number) => {
                            if (React.isValidElement(nested) && nested.type === React.Fragment) {
                                const nestedChildren = (nested as React.ReactElement<any>).props?.children || null;
                                if (isArray(nestedChildren)) {
                                    extractChildren(nestedChildren, `${parentKey}${key}-`, extractedChildren);
                                } else {
                                    if (React.isValidElement(nested) && nested.type === React.Fragment) {
                                        extractedChildren.push(nested);
                                    } else {
                                        extractedChildren.push(
                                            <SpaceItem key={`nested-${parentKey}${key}`} style={itemStyle} prefixCls={prefixCls}>
                                                {nested}
                                            </SpaceItem>,
                                        );
                                    }
                                }
                            } else {
                                extractedChildren.push(
                                    <SpaceItem key={`nested-${parentKey}${key}`} style={itemStyle} prefixCls={prefixCls}>
                                        {nested}
                                    </SpaceItem>,
                                );
                            }
                        });
                    }
                } else if (React.isValidElement(child)) {
                    // Handle valid React elements
                    extractedChildren.push(
                        <SpaceItem key={`LoopKey${parentKey}${loopKey}`} style={itemStyle} prefixCls={prefixCls}>
                            {child}
                        </SpaceItem>,
                    );
                } else if (child !== null && child !== undefined && child !== false) {
                    // Handle text nodes and other valid content
                    extractedChildren.push(
                        <SpaceItem key={`LoopKey${parentKey}${loopKey}`} style={itemStyle} prefixCls={prefixCls}>
                            {child}
                        </SpaceItem>,
                    );
                }
            });

            return extractedChildren;
        },
        [itemStyle, prefixCls],
    );

    const childrenArray = React.Children.toArray(children);
    let extractedChildren = useMemo(() => extractChildren(childrenArray), [childrenArray, extractChildren]);

    // Process children
    if (childrenArray.length === 0) {
        return null;
    }

    // Add spacers if provided
    if (spacer) {
        const len = extractedChildren.length - 1;
        extractedChildren = extractedChildren.reduce<React.ReactNode[]>((acc, child, idx) => {
            const childrenNodes = [...acc, child];

            if (idx !== len) {
                childrenNodes.push(
                    <span
                        key={`spacer-${idx}`}
                        style={{
                            ...itemStyle,
                            ...(direction === 'vertical' ? { width: '100%' } : {}),
                        }}
                    >
                        {React.isValidElement(spacer) ? spacer : String(spacer)}
                    </span>,
                );
            }

            return childrenNodes;
        }, []);
    }

    return (
        <div ref={ref} className={classes} style={{ ...containerStyle, ...style }}>
            {extractedChildren}
        </div>
    );
});

Space.displayName = 'ElSpace';

export default Space;
