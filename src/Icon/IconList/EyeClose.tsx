import classNames from 'classnames';
import React, { FC } from 'react';
import { useClassNames } from '../../hooks';
import { SvgIconProps } from '../typings';

export const EyeClose: FC<SvgIconProps> = props => {
    const { className, style } = props;
    const { b } = useClassNames('icon');

    return (
        <div className={classNames(b(), className)} style={style}>
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fa-solid"
                data-icon="eye-slash"
                className="svg-inline--fa fa-eye-slash fa-w-20"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
            >
                <path
                    d="M325 351L226 274C234 318 273 352 320 352C322 352 323 352 325 351ZM320 400H320C241 400 176 335 176 256C176 249 177 243 178 236L81 160C64 184 48 210 35 239C34 243 32 251 32 256C32 261 34 269 35 273C90 396 197 480 320 480C365 480 409 469 448 448L374 389C357 396 339 400 320 400ZM631 469L527 388C559 356 585 317 605 273C606 269 608 261 608 256C608 251 606 243 605 239C550 116 443 32 320 32C257 32 199 54 149 92L39 5C34 2 29 0 24 0C17 0 10 3 5 9C-3 20 -1 35 9 43L601 507C612 515 627 513 635 503C643 492 641 477 631 469ZM464 256C464 281 457 304 446 324L407 294C413 282 416 270 416 256C416 203 373 160 320 160H320C317 160 314 160 312 161C317 170 320 181 320 192C320 202 317 212 313 220L224 150C249 127 283 112 320 112C399 112 464 177 464 256V256Z"
                    fill="currentColor"
                />
            </svg>
        </div>
    );
};
EyeClose.displayName = 'Icon.EyeClose';
