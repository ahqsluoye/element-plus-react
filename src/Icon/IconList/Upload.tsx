import classNames from 'classnames';
import React, { FC } from 'react';
import { useClassNames } from '../../hooks';
import { SvgIconProps } from '../typings';

export const Upload: FC<SvgIconProps> = props => {
    const { className, style } = props;
    const { b } = useClassNames('icon');

    return (
        <div className={classNames(b(), className)} style={style}>
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fa-light"
                data-icon="cloud-arrow-up"
                className="svg-inline--fa fa-cloud-arrow-up fa-w-20"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
            >
                <path
                    d="M572 239C574 229 576 219 576 208C576 146 526 96 464 96C447 96 431 100 416 107C384 62 332 32 272 32C178 32 100 106 96 200C39 220 0 274 0 336C0 416 64 480 144 480H512C583 480 640 423 640 352C640 305 614 261 572 239ZM508 448H149C91 448 39 406 33 348C27 291 63 242 114 228C123 226 128 218 128 209C128 209 128 208 128 208C128 147 165 91 223 72C294 48 362 79 395 133C401 143 413 145 423 139C440 129 461 125 483 130C510 136 533 157 540 184C546 203 545 222 538 239C534 249 540 260 550 264C587 280 612 319 607 363C602 412 557 448 508 448ZM251 267L304 215V384C304 393 311 400 320 400S336 393 336 384V215L389 267C395 274 405 274 411 267S418 251 411 245L331 165C328 162 324 160 320 160S312 162 309 165L229 245C222 251 222 261 229 267S245 274 251 267Z"
                    fill="currentColor"
                />
            </svg>
        </div>
    );
};
Upload.displayName = 'Icon.Upload';
