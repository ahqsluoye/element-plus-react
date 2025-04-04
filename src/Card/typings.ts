import React from 'react';
import { BaseProps, NativeProps } from '../types/common';

export interface CardProps extends BaseProps, NativeProps<'--el-card-border-color' | '--el-card-border-radius' | '--el-card-padding' | '--el-card-bg-color'> {
    /** 卡片的标题 你可以通过设置 header 来修改标题 */
    header?: string | React.ReactElement<any>;
    /** 卡片页脚。 你既可以通过设置 footer 来修改卡片底部内容 */
    footer?: string | React.ReactElement<any>;
    /** body 的 CSS 样式 */
    bodyStyle?: React.CSSProperties;
    /** 设置阴影显示时机 */
    shadow?: 'always' | 'never' | 'hover';
}
