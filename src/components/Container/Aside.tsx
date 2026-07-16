import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { addUnit, mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import React, { forwardRef } from 'react';
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
