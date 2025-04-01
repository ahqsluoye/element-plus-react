import React from 'react';
import { IconName } from '../Icon';
import { BaseProps, NativeProps } from '../types/common';

export type TimeLineProps = BaseProps &
    NativeProps<
        | '--el-timeline-node-size-normal'
        | '--el-timeline-node-size-large'
        | '--el-timeline-timestamp-color'
        | '--el-timeline-content-color'
        | '--el-timeline-content-font-size-small'
        | '--el-timeline-content-font-size-large'
        | '--el-timeline-node-color'
    >;

export type TimeLineItemProps = BaseProps &
    NativeProps & {
        /** 时间戳 */
        timestamp?: string;
        /** 是否隐藏时间戳 */
        hideTimestamp?: boolean;
        /** 是否垂直居中 */
        center?: boolean;
        /** 时间戳位置 */
        placement?: 'top' | 'bottom';
        /** 节点类型 */
        type?: 'primary' | 'success' | 'warning' | 'error' | 'info';
        /** 节点颜色 */
        color?: string;
        /** 节点尺寸 */
        size?: 'normal' | 'large';
        /** 自定义图标 */
        icon?: IconName | React.ReactElement<any>;
        /** 是否空心点 */
        hollow?: boolean;
    };
