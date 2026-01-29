import { BaseProps, NativeProps, TypeAttributes } from '../types/common';

export interface TextProps extends BaseProps, NativeProps {
    /** 类型 */
    type?: TypeAttributes.Appearance;
    /** 大小 */
    size?: TypeAttributes.Size;
    /** 显示省略号 */
    truncated?: boolean;
    /** 最大行数 */
    lineClamp?: string | number;
    /** 自定义元素标签 */
    tag?: string;
    /** 标题 */
    title?: string;
}
