import isArray from 'lodash/isArray';
import { useEffect, useMemo, useRef } from 'react';

import type { TableV2Props } from '../table';
import type { KeyType } from '../types';
import type { UseRowReturn } from './use-row';

type UseDataProps = {
    expandedRowKeys: UseRowReturn['expandedRowKeys'];
    lastRenderedRowIndex: UseRowReturn['lastRenderedRowIndex'];
    setLastRenderedRowIndex: UseRowReturn['setLastRenderedRowIndex'];
    resetAfterIndex: UseRowReturn['resetAfterIndex'];
};

export const useData = (props: TableV2Props, { expandedRowKeys, lastRenderedRowIndex, setLastRenderedRowIndex, resetAfterIndex }: UseDataProps) => {
    // const [depthMap, setDepthMap] = useState<Record<KeyType, number>>({});
    const depthMap = useRef<Record<KeyType, number>>({});

    const flattenedData = useMemo(() => {
        const depths: Record<KeyType, number> = {};
        const { data, rowKey } = props;

        if (!expandedRowKeys || !expandedRowKeys.length) {
            return data;
        }

        const array: any[] = [];
        const keysSet = new Set();
        expandedRowKeys.forEach(x => keysSet.add(x));

        let copy: any[] = data.slice();
        copy.forEach(x => (depths[x[rowKey]] = 0));
        while (copy.length > 0) {
            const item = copy.shift();

            array.push(item);
            if (keysSet.has(item[rowKey]) && isArray(item.children) && item.children.length > 0) {
                copy = [...item.children, ...copy];
                item.children.forEach((child: any) => (depths[child[rowKey]] = depths[item[rowKey]] + 1));
            }
        }

        depthMap.current = depths;
        return array;
    }, [props.data, props.rowKey, expandedRowKeys]);

    const data = useMemo(() => {
        const { expandColumnKey } = props;
        return expandColumnKey ? flattenedData : props.data;
    }, [props.expandColumnKey, flattenedData, props.data]);

    // Equivalent to watch(data, ...)
    useEffect(() => {
        setLastRenderedRowIndex(-1);
        resetAfterIndex(0, true);
    }, [data]);

    return {
        data,
        depthMap: depthMap.current,
    };
};

export type UseDataReturn = ReturnType<typeof useData>;
