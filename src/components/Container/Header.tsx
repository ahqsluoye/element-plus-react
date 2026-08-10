import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { addUnit, mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import React from 'react';
import { HeaderProps } from './typings';

const Header = ({ ref, ...props }: HeaderProps & { ref?: React.Ref<HTMLDivElement | null> }) => {
    props = mergeDefaultProps({ height: '60px' }, props);

    const { b } = useClassNames('header');
    return (
        <header className={classNames(b(), props.className)} ref={ref} style={{ '--el-header-height': addUnit(props.height), ...props.style }}>
            {props.children}
        </header>
    );
};

Header.displayName = 'ElHeader';
export default Header;
