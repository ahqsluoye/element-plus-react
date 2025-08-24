import classNames from 'classnames';
import React, { FC, useMemo } from 'react';
import Icon from '../Icon/Icon';
import Link from '../Link/Link';
import { useClassNames } from '../hooks';
import { HeaderProps } from './typings';

const Header: FC<HeaderProps> = props => {
    const {
        prefix,
        showBackward = true,
        showForward = true,
        showMonth = true,
        plain,
        postion,
        year,
        month,
        disabledForward,
        disabledBackward,
        disabledForwards,
        disabledBackwards,
        onMoveBackward,
        onMoveBackwards,
        onMoveForward,
        onMoveForwards,
        onToggleView,
        border,
    } = props;
    const { e, be, em } = useClassNames(prefix ?? 'date-picker');
    const iconClass = useMemo(() => be('picker-panel', 'icon-btn', false), [be]);

    return (
        <div className={classNames(e`header`, { [em('header', 'bordered')]: border })}>
            {showBackward && (
                <div className={e`prev-btn`}>
                    <Link disabled={disabledBackwards} underline="never" className={classNames(iconClass, 'd-arrow-left')} onClick={onMoveBackwards}>
                        <Icon name="angles-left" />
                    </Link>
                    {showMonth && (
                        <Link disabled={disabledBackward} underline="never" className={classNames(iconClass, 'arrow-left')} onClick={onMoveBackward}>
                            <Icon name="angle-left" />
                        </Link>
                    )}
                </div>
            )}

            {!plain && (
                <span className={e`header-label`} onClick={() => onToggleView('year', postion)}>
                    {year}
                </span>
            )}

            {!plain && showMonth && (
                <span className={e`header-label`} onClick={() => onToggleView('month', postion)}>
                    {month}
                </span>
            )}

            {showForward && (
                <div className={e`next-btn`}>
                    {showMonth && (
                        <Link disabled={disabledForward} underline="never" className={classNames(iconClass, 'arrow-right')} onClick={onMoveForward}>
                            <Icon name="angle-right" />
                        </Link>
                    )}
                    <Link disabled={disabledForwards} underline="never" className={classNames(iconClass, 'd-arrow-right')} onClick={onMoveForwards}>
                        <Icon name="angles-right" />
                    </Link>
                </div>
            )}

            {plain && <div>{showMonth ? `${year}  ${month}` : year}</div>}
        </div>
    );
};

Header.displayName = 'Calendar.Header';

export default Header;
