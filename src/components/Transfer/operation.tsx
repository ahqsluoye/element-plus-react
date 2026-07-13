import React, { FC } from 'react';
import Button from '../Button/Button';

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
        {!oneWay && (
            <Button type="primary" disabled={disabled || !leftActive} onClick={moveToLeft} icon={'angle-left'}>
                {leftArrowText}
            </Button>
        )}
        <Button type="primary" disabled={disabled || !rightActive} onClick={moveToRight} icon={'angle-right'} style={{ marginBottom: 4 }}>
            {rightArrowText}
        </Button>
    </div>
);

export default Operation;
