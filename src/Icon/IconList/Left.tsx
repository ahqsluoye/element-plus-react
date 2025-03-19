import classNames from 'classnames';
import React, { FC } from 'react';
import { useClassNames } from '../../hooks';
import { SvgIconProps } from '../typings';

export const Left: FC<SvgIconProps> = props => {
    const { className, style } = props;
    const { b } = useClassNames('icon');

    return (
        <div className={classNames(b(), className)} style={style}>
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fa-light"
                data-icon="angle-left"
                className="svg-inline--fa fa-angle-left fa-w-8"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 512"
            >
                <path
                    d="M204 405C210 412 209 422 203 428C196 434 186 433 180 427L36 267C31 261 31 251 36 245L180 85C186 79 196 78 203 84C210 90 209 100 204 107L70 256L204 405Z"
                    fill="currentColor"
                />
            </svg>
        </div>
    );
};
Left.displayName = 'Icon.Left';
