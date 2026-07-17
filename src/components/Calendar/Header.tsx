import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import ElIcon from '@qsxy/element-plus-react/Icon/Icon';
import ElLink from '@qsxy/element-plus-react/Link/Link';
import classNames from 'classnames';
import React, { FC, useMemo } from 'react';
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
                    <ElLink disabled={disabledBackwards} underline="never" className={classNames(iconClass, 'd-arrow-left')} onClick={onMoveBackwards}>
                        <ElIcon name="angles-left" />
                    </ElLink>
                    {showMonth && (
                        <ElLink disabled={disabledBackward} underline="never" className={classNames(iconClass, 'arrow-left')} onClick={onMoveBackward}>
                            <ElIcon name="angle-left" />
                        </ElLink>
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
                        <ElLink disabled={disabledForward} underline="never" className={classNames(iconClass, 'arrow-right')} onClick={onMoveForward}>
                            <ElIcon name="angle-right" />
                        </ElLink>
                    )}
                    <ElLink disabled={disabledForwards} underline="never" className={classNames(iconClass, 'd-arrow-right')} onClick={onMoveForwards}>
                        <ElIcon name="angles-right" />
                    </ElLink>
                </div>
            )}

            {plain && <div>{showMonth ? `${year}  ${month}` : year}</div>}
        </div>
    );
};

Header.displayName = 'Calendar.Header';

export default Header;
