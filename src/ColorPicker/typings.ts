/* eslint-disable lines-around-comment */
import { PopperOptions } from '../Popper';
import { AnimationEventProps, BaseProps, NativeProps, TypeAttributes } from '../types/common';

export interface ColorPickerProps extends BaseProps, NativeProps, AnimationEventProps, PopperOptions {
    /** 绑定值（可控模式） */
    value?: string;
    /** 默认值 */
    defaultValue?: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 尺寸 */
    size?: TypeAttributes.Size;
    /** 是否支持透明度选择 */
    showAlpha?: boolean;
    /** 颜色的格式 */
    colorFormat?: 'hsl' | 'hsv' | 'hex' | 'rgb';
    /** 预定义颜色 */
    predefine?: string[];
    /** 当绑定值变化时触发 */
    onChange?: (value?: string) => void;
    /** 面板中当前显示的颜色发生改变时触发 */
    activeChange?: (value?: string) => void;
}
