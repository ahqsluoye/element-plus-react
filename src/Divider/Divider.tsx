/* eslint-disable lines-around-comment */
import classNames from 'classnames';
import React, { FC, memo } from 'react';
import { useClassNames } from '../hooks';
import { BaseProps, NativeProps } from '../types/common';

export interface DividerProps
    extends BaseProps,
        NativeProps<'--el-divider-text-bg-color' | '--el-divider-border-color' | '--el-divider-margin' | '--el-divider-tip-bg-color' | '--el-border-style'> {
    /** 设置分割线方向 */
    direction?: 'horizontal' | 'vertical';
    /** 设置分隔符样式 */
    borderStyle?: string;
    /** 自定义文本样式 */
    textStyle?: React.CSSProperties;
    /** 设置分割线文案的位置 */
    contentPosition?: 'left' | 'right' | 'center';
}

/**
 * @author	Parker
 * @CreateTime	2022/3/24下午8:46:40
 * @LastEditor	Parker
 * @ModifyTime	2022/5/13 13:56:36
 * @Description	Divider 分割线组件
 */
const Divider: FC<DividerProps> = props => {
    const { direction, borderStyle, contentPosition, classPrefix = 'divider' } = props;
    const { b, m, e, is } = useClassNames(classPrefix);

    return (
        // @ts-ignore
        <div className={classNames(b(), m(direction), props.className)} style={{ ...props.style, '--el-border-style': borderStyle }}>
            {props.children && (
                <div className={classNames(e`text`, is(contentPosition))} style={props.textStyle}>
                    {props.children}
                </div>
            )}
        </div>
    );
};

Divider.defaultProps = {
    direction: 'horizontal',
    borderStyle: 'solid',
    contentPosition: 'left',
};
Divider.displayName = 'Divider';

export default memo(Divider);
