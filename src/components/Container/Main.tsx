import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { MainProps } from './typings';

const Main = forwardRef<HTMLDivElement, MainProps>((props, ref) => {
    const { b } = useClassNames('main');
    return (
        <main className={classNames(b(), props.className)} ref={ref} style={props.style}>
            {props.children}
        </main>
    );
});

Main.displayName = 'ElMain';

export default Main;
