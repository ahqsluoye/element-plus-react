import { ReactElement, RefObject } from 'react';
import { IconName } from '../Icon';
import { BaseProps, NativeProps } from '../types/common';

export interface LoadingProps extends BaseProps, NativeProps {
    /** Loading 需要覆盖的 DOM 节点。 可传入一个 DOM 对象或字符串； 若传入字符串，则会将其作为参数传入 document.querySelector以获取到对应 DOM 节点 */
    target?: RefObject<HTMLElement>;
    /** 是否显示Loading */
    visible?: boolean;
    /** 是否让加载组件铺满整个屏幕 */
    fullscreen?: boolean;
    /** 是否锁定父级元素滚动 */
    lock?: boolean;
    /** 显示在加载图标下方的加载文案 */
    text?: string;
    /** 自定义加载图标类名 */
    spinner?: IconName;
    /** 自定义 SVG 元素覆盖默认加载器 */
    svg?: ReactElement;
    /** 设置用于加载 svg 元素的 viewBox 属性 */
    svgViewBox?: string;
    /** 遮罩背景色 */
    background?: string;
}

export type LoadingService = (props?: LoadingProps) => {
    close: () => void;
};
