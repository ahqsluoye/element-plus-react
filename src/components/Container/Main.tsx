import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import classNames from 'classnames';
import React from 'react';
import { MainProps } from './typings';

const Main = ({ ref, ...props }: MainProps & { ref?: React.Ref<HTMLDivElement | null> }) => {
    const { b } = useClassNames('main');
    return (
        <main className={classNames(b(), props.className)} ref={ref} style={props.style}>
            {props.children}
        </main>
    );
};

Main.displayName = 'ElMain';

export default Main;
