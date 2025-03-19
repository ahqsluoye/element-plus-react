/* eslint-disable lines-around-comment */
import { BaseProps, NativeProps } from '../types/common';

export interface RowProps extends BaseProps, NativeProps {
    /** 栅格间隔 */
    gutter?: number;

    /** 布局下的水平排列方式 */
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';

    /** flex 布局下的垂直排列方式 */
    align?: 'top' | 'middle' | 'bottom';

    /** 自定义元素标签 */
    tag?: string;
}
