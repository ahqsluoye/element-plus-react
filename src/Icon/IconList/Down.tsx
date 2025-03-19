import classNames from 'classnames';
import React, { FC } from 'react';
import { useClassNames } from '../../hooks';
import { SvgIconProps } from '../typings';

export const Down: FC<SvgIconProps> = props => {
    const { className, style } = props;
    const { b } = useClassNames('icon');

    return (
        <div className={classNames(b(), className)} style={style}>
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fa-regular"
                data-icon="angle-down"
                className="svg-inline--fa fa-angle-down fa-w-12"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
            >
                <path
                    d="M361 217L209 361C204 366 198 368 192 368S180 366 175 361L23 217C14 208 13 193 23 184C32 174 47 174 57 183L192 311L327 183C337 174 352 174 361 184C371 193 370 208 361 217Z"
                    fill="currentColor"
                />
            </svg>
        </div>
    );
};
Down.displayName = 'Icon.Down';
