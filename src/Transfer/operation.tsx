import React, { FC } from 'react';
import { Button } from '../Button';

export interface TransferOperationProps {
    className?: string;
    leftArrowText?: string;
    rightArrowText?: string;
    moveToLeft?: React.MouseEventHandler<HTMLElement>;
    moveToRight?: React.MouseEventHandler<HTMLElement>;
    leftActive?: boolean;
    rightActive?: boolean;
    style?: React.CSSProperties;
    disabled?: boolean;
    oneWay?: boolean;
}

const Operation: FC<TransferOperationProps> = ({
    disabled,
    moveToLeft,
    moveToRight,
    leftArrowText = '',
    rightArrowText = '',
    leftActive,
    rightActive,
    className,
    style,
    oneWay,
}: TransferOperationProps) => (
    <div className={className} style={style}>
        <Button type="primary" size="small" disabled={disabled || !rightActive} onClick={moveToRight} icon={rightArrowText ? false : 'angle-right'} style={{ marginBottom: 4 }}>
            {rightArrowText}
        </Button>
        {!oneWay && (
            <Button type="primary" size="small" disabled={disabled || !leftActive} onClick={moveToLeft} icon={leftArrowText ? false : 'angle-left'}>
                {leftArrowText}
            </Button>
        )}
    </div>
);

export default Operation;
