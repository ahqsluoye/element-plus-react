/**
 * Handle virtual list of the TreeNodes.
 */

import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';
import VirtualList, { type ListRef } from 'rc-virtual-list';
import * as React from 'react';
import MotionTreeNode from './MotionTreeNode';
import type { BasicDataNode, DataEntity, DataNode, FlattenNode, Key, KeyEntities, ScrollTo } from './typings';
import { findExpandedKeys, getExpandRange } from './utils/diffUtil';
import { getKey, getTreeNodeProps } from './utils/treeUtil';

const HIDDEN_STYLE = {
    width: 0,
    height: 0,
    display: 'flex',
    overflow: 'hidden',
    opacity: 0,
    border: 0,
    padding: 0,
    margin: 0,
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export const MOTION_KEY = `RC_TREE_MOTION_${Math.random()}`;

const MotionNode: DataNode = {
    key: MOTION_KEY,
};

export const MotionEntity: DataEntity = {
    key: MOTION_KEY,
    level: 0,
    index: 0,
    pos: '0',
    node: MotionNode,
    nodes: [MotionNode],
};

const MotionFlattenData: FlattenNode = {
    parent: null,
    children: [],
    pos: MotionEntity.pos,
    data: MotionNode,
    title: null,
    key: MOTION_KEY,

    /** Hold empty list here since we do not use it */
    isStart: [],
    isEnd: [],
};

export interface NodeListRef {
    scrollTo: ScrollTo;
    getIndentWidth: () => number;
}

interface NodeListProps<TreeDataType extends BasicDataNode> {
    prefixCls: string;
    style: React.CSSProperties;
    data: FlattenNode<TreeDataType>[];
    motion: any;
    focusable?: boolean;
    activeItem: FlattenNode<TreeDataType>;
    focused?: boolean;
    tabIndex: number;
    checkable?: boolean;
    selectable?: boolean;
    disabled?: boolean;

    expandedKeys: Key[];
    selectedKeys: Key[];
    checkedKeys: Key[];
    loadedKeys: Key[];
    loadingKeys: Key[];
    halfCheckedKeys: Key[];
    keyEntities: KeyEntities;

    dragging: boolean;
    dragOverNodeKey: Key;
    dropPosition: number;

    // Virtual list
    height: number;
    itemHeight: number;
    virtual?: boolean;
    scrollWidth?: number;

    onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    onBlur?: React.FocusEventHandler<HTMLDivElement>;
    onActiveChange: (key: Key) => void;

    onListChangeStart: () => void;
    onListChangeEnd: () => void;
}

/**
 * We only need get visible content items to play the animation.
 */
export function getMinimumRangeTransitionRange(list: FlattenNode[], virtual: boolean, height: number, itemHeight: number) {
    if (virtual === false || !height) {
        return list;
    }

    return list.slice(0, Math.ceil(height / itemHeight) + 1);
}

function itemKey(item: FlattenNode) {
    const { key, pos } = item;
    return getKey(key, pos);
}

function getAccessibilityPath(item: FlattenNode): string {
    let path = String(item.data.key);
    let current = item;

    while (current.parent) {
        current = current.parent;
        path = `${current.data.key} > ${path}`;
    }

    return path;
}

const NodeList = React.forwardRef<NodeListRef, NodeListProps<any>>((props, ref) => {
    const {
        prefixCls,
        data,
        selectable,
        checkable,
        expandedKeys,
        selectedKeys,
        checkedKeys,
        loadedKeys,
        loadingKeys,
        halfCheckedKeys,
        keyEntities,
        disabled,

        dragging,
        dragOverNodeKey,
        dropPosition,
        motion,

        height,
        itemHeight,
        virtual,
        scrollWidth,

        focusable,
        activeItem,
        focused,
        tabIndex,

        onKeyDown,
        onFocus,
        onBlur,
        onActiveChange,

        onListChangeStart,
        onListChangeEnd,

        ...domProps
    } = props;

    // =============================== Ref ================================
    const listRef = React.useRef<ListRef>(null);
    const indentMeasurerRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => ({
        scrollTo: scroll => {
            listRef.current.scrollTo(scroll);
        },
        getIndentWidth: () => indentMeasurerRef.current.offsetWidth,
    }));

    // ============================== Motion ==============================
    const [prevExpandedKeys, setPrevExpandedKeys] = React.useState(expandedKeys);
    const [prevData, setPrevData] = React.useState(data);
    const [transitionData, setTransitionData] = React.useState(data);
    const [transitionRange, setTransitionRange] = React.useState([]);
    const [motionType, setMotionType] = React.useState<'show' | 'hide' | null>(null);

    // When motion end but data change, this will makes data back to previous one
    const dataRef = React.useRef(data);
    dataRef.current = data;

    function onMotionEnd() {
        const latestData = dataRef.current;

        setPrevData(latestData);
        setTransitionData(latestData);
        setTransitionRange([]);
        setMotionType(null);

        onListChangeEnd();
    }

    // Do animation if expanded keys changed
    // layoutEffect here to avoid blink of node removing
    useLayoutEffect(() => {
        setPrevExpandedKeys(expandedKeys);

        const diffExpanded = findExpandedKeys(prevExpandedKeys, expandedKeys);

        if (diffExpanded.key !== null) {
            if (diffExpanded.add) {
                const keyIndex = prevData.findIndex(({ key }) => key === diffExpanded.key);

                const rangeNodes = getMinimumRangeTransitionRange(getExpandRange(prevData, data, diffExpanded.key), virtual, height, itemHeight);

                const newTransitionData: FlattenNode[] = prevData.slice();
                newTransitionData.splice(keyIndex + 1, 0, MotionFlattenData);

                setTransitionData(newTransitionData);
                setTransitionRange(rangeNodes);
                setMotionType('show');
            } else {
                const keyIndex = data.findIndex(({ key }) => key === diffExpanded.key);

                const rangeNodes = getMinimumRangeTransitionRange(getExpandRange(data, prevData, diffExpanded.key), virtual, height, itemHeight);

                const newTransitionData: FlattenNode[] = data.slice();
                newTransitionData.splice(keyIndex + 1, 0, MotionFlattenData);

                setTransitionData(newTransitionData);
                setTransitionRange(rangeNodes);
                setMotionType('hide');
            }
        } else if (prevData !== data) {
            // If whole data changed, we just refresh the list
            setPrevData(data);
            setTransitionData(data);
        }
    }, [expandedKeys, data]);

    // We should clean up motion if is changed by dragging
    React.useEffect(() => {
        if (!dragging) {
            onMotionEnd();
        }
    }, [dragging]);

    const mergedData = motion ? transitionData : data;

    const treeNodeRequiredProps = {
        expandedKeys,
        selectedKeys,
        loadedKeys,
        loadingKeys,
        checkedKeys,
        halfCheckedKeys,
        dragOverNodeKey,
        dropPosition,
        keyEntities,
    };

    return (
        <>
            {focused && activeItem && (
                <span style={HIDDEN_STYLE} aria-live="assertive">
                    {getAccessibilityPath(activeItem)}
                </span>
            )}

            <div>
                <input
                    style={HIDDEN_STYLE}
                    disabled={focusable === false || disabled}
                    tabIndex={focusable !== false ? tabIndex : null}
                    onKeyDown={onKeyDown}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    value=""
                    onChange={noop}
                    aria-label="for screen reader"
                />
            </div>

            <div
                className={`${prefixCls}-treenode`}
                aria-hidden
                style={{
                    position: 'absolute',
                    pointerEvents: 'none',
                    visibility: 'hidden',
                    height: 0,
                    overflow: 'hidden',
                    border: 0,
                    padding: 0,
                }}
            >
                <div className={`${prefixCls}-indent`}>
                    <div ref={indentMeasurerRef} className={`${prefixCls}-indent-unit`} />
                </div>
            </div>

            <VirtualList<FlattenNode>
                {...domProps}
                data={mergedData}
                itemKey={itemKey}
                height={height}
                fullHeight={false}
                virtual={virtual}
                itemHeight={itemHeight}
                scrollWidth={scrollWidth}
                prefixCls={`${prefixCls}-list`}
                ref={listRef}
                role="tree"
                onVisibleChange={originList => {
                    // The best match is using `fullList` - `originList` = `restList`
                    // and check the `restList` to see if has the MOTION_KEY node
                    // but this will cause performance issue for long list compare
                    // we just check `originList` and repeat trigger `onMotionEnd`
                    if (originList.every(item => itemKey(item) !== MOTION_KEY)) {
                        onMotionEnd();
                    }
                }}
            >
                {treeNode => {
                    const {
                        pos,
                        data: { ...restProps },
                        title,
                        key,
                        isStart,
                        isEnd,
                    } = treeNode;
                    const mergedKey = getKey(key, pos);
                    delete restProps.key;
                    delete restProps.children;

                    const treeNodeProps = getTreeNodeProps(mergedKey, treeNodeRequiredProps);

                    return (
                        <MotionTreeNode
                            {...(restProps as Omit<typeof restProps, 'children'>)}
                            {...treeNodeProps}
                            title={title}
                            active={!!activeItem && key === activeItem.key}
                            pos={pos}
                            data={treeNode.data}
                            isStart={isStart}
                            isEnd={isEnd}
                            motion={motion}
                            motionNodes={key === MOTION_KEY ? transitionRange : null}
                            motionType={motionType}
                            onMotionStart={onListChangeStart}
                            onMotionEnd={onMotionEnd}
                            treeNodeRequiredProps={treeNodeRequiredProps}
                            onMouseMove={() => {
                                onActiveChange(null);
                            }}
                        />
                    );
                }}
            </VirtualList>
        </>
    );
});

if (process.env.NODE_ENV !== 'production') {
    NodeList.displayName = 'NodeList';
}

export default NodeList;
