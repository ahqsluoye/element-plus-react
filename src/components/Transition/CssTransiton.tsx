import { useComposeRef } from 'rc-util';
import React, { FC } from 'react';
import { BaseProps, NativeProps } from '../types/common';

export interface CssTransitonProps extends BaseProps<React.ReactElement>, NativeProps {}

export enum STATUS {
    UNMOUNTED = 0,
    BEFORE_ENTER = 1,
    ENTER = 2,
    AFTER_ENTER = 3,
    BEFORE_LEAVE = 4,
    LEAVE = 5,
    AFTER_LEAVE = 6,
}

const CssTransiton: FC<CssTransitonProps> = props => {
    const [status, setStatus] = React.useState(STATUS.UNMOUNTED);

    const nodeRef = React.useRef<React.ReactElement>(null);

    const mergedRef = useComposeRef(nodeRef, props.children.props?.ref);

    return React.cloneElement(props.children);
};

export default CssTransiton;
