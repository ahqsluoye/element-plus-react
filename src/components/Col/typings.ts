import { BaseProps, NativeProps } from '../types/common';

export type MediaType = keyof Pick<ColProps, 'span' | 'offset' | 'push' | 'pull'>;
export type MediaLayout = Partial<Record<MediaType, number>>;
export type MediaSize = Pick<ColProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>;

export interface ColProps extends BaseProps, NativeProps {
    /** 栅格占据的列数 */
    span?: number;

    /** 栅格左侧的间隔格数 */
    offset?: number;

    /** 栅格向右移动格数 */
    push?: number;

    /** 栅格向左移动格数 */
    pull?: number;

    /** <768px 响应式栅格数或者栅格属性对象 */
    xs?: number | MediaLayout;

    /** ≥768px 响应式栅格数或者栅格属性对象 */
    sm?: number | MediaLayout;

    /** ≥992px 响应式栅格数或者栅格属性对象 */
    md?: number | MediaLayout;

    /** ≥1200px 响应式栅格数或者栅格属性对象 */
    lg?: number | MediaLayout;

    /** ≥1920px 响应式栅格数或者栅格属性对象 */
    xl?: number | MediaLayout;

    /** 自定义元素标签 */
    tag?: string;
}
