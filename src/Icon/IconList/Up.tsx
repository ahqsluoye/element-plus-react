import classNames from 'classnames';
import React, { FC } from 'react';
import { useClassNames } from '../../hooks';
import { SvgIconProps } from '../typings';

export const Up: FC<SvgIconProps> = props => {
    const { className, style } = props;
    const { b } = useClassNames('icon');

    return (
        <div className={classNames(b(), className)} style={style}>
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fa-regular"
                data-icon="angle-up"
                className="svg-inline--fa fa-angle-up fa-w-12"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
            >
                <path
                    d="M23 295L175 151C180 146 186 144 192 144S204 146 209 151L361 295C370 304 371 319 361 328C352 338 337 338 327 329L192 201L57 329C47 338 32 338 23 328C13 319 14 304 23 295Z"
                    fill="currentColor"
                />
            </svg>
        </div>
    );
};
Up.displayName = 'Icon.Up';
