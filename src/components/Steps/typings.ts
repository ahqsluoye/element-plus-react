import { IconName } from '@qsxy/element-plus-react/Icon/typings';
import type { BaseProps, NativeProps } from '@qsxy/element-plus-react/types/common';
import React from 'react';

export type StepsStatus = '' | 'wait' | 'process' | 'finish' | 'error' | 'success';

export interface StepsProps extends BaseProps, NativeProps {
    /**
     * 每个 step 的间距，不填写将自适应间距。支持百分比。
     * @default ''
     */
    space?: number | string;
    /**
     * 设置当前激活步骤
     * @default 0
     */
    active?: number;
    /**
     * 显示方向
     * @default 'horizontal'
     */
    direction?: 'horizontal' | 'vertical';
    /**
     * 是否进行居中对齐
     * @default false
     */
    alignCenter?: boolean;
    /**
     * 是否应用简洁风格
     * @default false
     */
    simple?: boolean;
    /**
     * 设置结束步骤的状态
     * @default 'finish'
     */
    finishStatus?: StepsStatus;
    /**
     * 设置当前步骤的状态
     * @default 'process'
     */
    processStatus?: StepsStatus;
    /**
     * 步骤切换时触发
     */
    onChange?: (newVal: number, oldVal: number) => void;
}

export interface StepItemState {
    /**
     * 步骤唯一标识
     */
    uid: number;
    /**
     * 当前步骤状态
     */
    currentStatus: string;
    /**
     * 内部状态
     */
    internalStatus: string;
    /**
     * 步骤索引
     */
    indexRef: React.MutableRefObject<number>;
    /**
     * 设置步骤索引
     */
    setIndex: (val: number) => void;
    /**
     * 计算进度条动画
     */
    calcProgress: (status: string) => void;
    /**
     * 更新步骤状态
     */
    updateStatus: (activeIndex: number) => void;
}

export interface StepsContextProps {
    /**
     * Steps 组件的 props
     */
    props: StepsProps;
    /**
     * 所有步骤项的状态列表
     */
    steps: StepItemState[];
    /**
     * 注册步骤项
     */
    addStep: (item: StepItemState) => void;
    /**
     * 当前激活步骤
     * @default 0
     */
    active?: number;
    /**
     * 移除步骤项
     */
    removeStep: (item: StepItemState) => void;
}

export interface StepProps extends BaseProps, NativeProps {
    /**
     * 标题
     * @default ''
     */
    title?: string | React.ReactNode;
    /**
     * Step 组件的自定义图标
     */
    icon?: IconName;
    /**
     * 描述文案
     * @default ''
     */
    description?: string | React.ReactNode;
    /**
     * 设置当前步骤的状态，不设置则根据 steps 确定状态
     * @default ''
     */
    status?: StepsStatus;
}
