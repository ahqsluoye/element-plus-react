import { useEffect, useState } from 'react';
import type { GetKey } from '../interface';
import { findListDiffIndex } from '../utils/algorithmUtil';

export default function useDiffItem<T>(data: T[], getKey: GetKey<T>, onDiff?: (diffIndex: number) => void): [T] {
    const [prevData, setPrevData] = useState(data);
    const [diffItem, setDiffItem] = useState(null);

    useEffect(() => {
        const diff = findListDiffIndex(prevData || [], data || [], getKey);
        if (diff?.index !== undefined) {
            onDiff?.(diff.index);
            setDiffItem(data[diff.index]);
        }
        setPrevData(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return [diffItem];
}
