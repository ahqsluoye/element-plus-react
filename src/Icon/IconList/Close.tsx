import classNames from 'classnames';
import React, { FC } from 'react';
import { useClassNames } from '../../hooks';
import { SvgIconProps } from '../typings';

export const Close: FC<SvgIconProps> = props => {
    const { className, style } = props;
    const { b } = useClassNames('icon');

    return (
        <div className={classNames(b(), className)} style={style}>
            <svg aria-hidden="true" focusable="false" className="svg-inline--fa fa-xmark fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                    d="M347 411C341 418 331 418 325 411L192 279L59 411C53 418 43 418 37 411C30 405 30 395 37 389L169 256L37 123C30 117 30 107 37 101C43 94 53 94 59 101L192 233L325 101C331 94 341 94 347 101C354 107 354 117 347 123L215 256L347 389C354 395 354 405 347 411Z"
                    fill="currentColor"
                />
            </svg>
        </div>
    );
};
Close.displayName = 'Icon.Close';
