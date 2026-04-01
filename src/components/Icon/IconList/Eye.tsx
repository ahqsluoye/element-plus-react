import classNames from 'classnames';
import React, { FC } from 'react';
import { useClassNames } from '../../hooks';
import { SvgIconProps } from '../typings';

export const Eye: FC<SvgIconProps> = props => {
    const { className, style } = props;
    const { b } = useClassNames('icon');

    return (
        <div className={classNames(b(), className)} style={style}>
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fa-solid"
                data-icon="eye"
                className="svg-inline--fa fa-eye fa-w-18"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
            >
                <path
                    d="M573 239C518 116 411 32 288 32S58 116 3 239C2 243 0 251 0 256C0 261 2 269 3 273C58 396 165 480 288 480S518 396 573 273C574 269 576 261 576 256C576 251 574 243 573 239ZM432 256C432 336 368 400 288 400H288C209 400 144 335 144 256S209 112 288 112S432 177 432 256V256ZM288 160H288C285 160 282 160 280 161C285 170 288 181 288 192C288 227 259 256 224 256C213 256 202 253 193 247C192 250 192 254 192 256C192 309 235 352 288 352S384 309 384 256S341 160 288 160Z"
                    fill="currentColor"
                />
            </svg>
        </div>
    );
};
Eye.displayName = 'Icon.Eye';
