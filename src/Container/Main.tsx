import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { useClassNames } from '../hooks';
import { MainProps } from './typings';

const Main = forwardRef<HTMLDivElement, MainProps>((props, ref) => {
    const { b } = useClassNames('main');
    return (
        <header className={classNames(b(), props.className)} ref={ref} style={props.style}>
            {props.children}
        </header>
    );
});

Main.displayName = 'ElMain';

export default Main;
