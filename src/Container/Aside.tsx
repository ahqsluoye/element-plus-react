import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { addUnit, mergeDefaultProps } from '../Util';
import { useClassNames } from '../hooks';
import { AsideProps } from './typings';

const Aside = forwardRef<HTMLDivElement, AsideProps>((props, ref) => {
    props = mergeDefaultProps({ width: '300px' }, props);

    const { b } = useClassNames('aside');
    return (
        <aside className={classNames(b(), props.className)} ref={ref} style={{ '--el-aside-width': addUnit(props.width), ...props.style }}>
            {props.children}
        </aside>
    );
});

Aside.displayName = 'ElAside';
export default Aside;
