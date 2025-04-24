import { createContext, useContext } from 'react';

export const SkeletonContext = createContext<{
    /** 骨架屏段落数量 */
    rows?: number;
    /** 是否使用动画 */
    animated?: boolean;
    /* height of rows */
    rowHeight?: number;
    /* margin of rows */
    rowMargin?: number;
}>({});

export const useSkeletonContext = () => useContext(SkeletonContext);
