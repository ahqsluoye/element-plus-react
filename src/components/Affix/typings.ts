import type { BaseProps, NativeProps } from '@qsxy/element-plus-react/types/common';

export interface AffixProps extends BaseProps, NativeProps {
    /**
     * 固钉元素 z-index 值
     * @default 100
     */
    zIndex?: number;
    /**
     * 指定容器。CSS 选择器字符串
     * @default ''
     */
    target?: string;
    /**
     * 偏移距离
     * @default 0
     */
    offset?: number;
    /**
     * 固钉位置
     * @default 'top'
     */
    position?: 'top' | 'bottom';
    /**
     * 是否启用 teleport，若为 true 则固钉元素会通过 Portal 渲染到 appendTo 指定的位置
     */
    teleported?: boolean;
    /**
     * 固钉元素挂载到哪个元素
     * @default 'body'
     */
    appendTo?: string | HTMLElement;
    /**
     * 滚动时触发
     */
    onScroll?: (data: { scrollTop: number; fixed: boolean }) => void;
    /**
     * 固钉状态改变时触发
     */
    onChange?: (fixed: boolean) => void;
}

/** Affix 组件暴露的实例方法 */
export interface AffixRef {
    /** 更新固钉状态 */
    update: () => void;
    /** 更新 rootRect 信息 */
    updateRoot: () => void;
}
