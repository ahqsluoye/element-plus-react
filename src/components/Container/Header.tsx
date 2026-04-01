import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { addUnit, mergeDefaultProps } from '../Util';
import { useClassNames } from '../hooks';
import { HeaderProps } from './typings';

const Header = forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {
    props = mergeDefaultProps({ height: '60px' }, props);

    const { b } = useClassNames('header');
    return (
        <header className={classNames(b(), props.className)} ref={ref} style={{ '--el-header-height': addUnit(props.height), ...props.style }}>
            {props.children}
        </header>
    );
});

Header.displayName = 'ElHeader';
export default Header;
