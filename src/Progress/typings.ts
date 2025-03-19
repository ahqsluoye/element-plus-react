import { BaseProps, NativeProps } from '../types/common';

export interface PropgressProps extends BaseProps, NativeProps {
    // eslint-disable-next-line lines-around-comment
    /** 百分比，必填 */
    percentage: number;

    /** 进度条类型 */
    type?: 'line' | 'circle' | 'dashboard';

    /** 进度条的宽度 */
    strokeWidth?: number;

    /** 进度条显示文字内置在进度条内（仅 type 为 'line' 时可用） */
    textInside?: boolean;

    /** 进度条当前状态 */
    status?: 'success' | 'exception' | 'warning';

    /** 是否为动画进度条 */
    indeterminate?: boolean;

    /** 控制动画进度条速度 */
    duration?: number;

    /** 进度条背景色 进度条背景色 （会覆盖 status 状态颜色） */
    color?: string | ((percentage: number) => string) | { color: string; percentage: number }[];

    /** 环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用） */
    width?: number;

    /** 是否显示进度条文字内容 */
    showText?: boolean;

    /** circle/dashboard 类型路径两端的形状 */
    strokeLinecap?: 'butt' | 'round' | 'square';

    /** 指定进度条文字内容 */
    format?: (percentage: number) => string;
}
