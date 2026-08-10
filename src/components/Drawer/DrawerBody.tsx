import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { ScrollbarRef } from '@qsxy/element-plus-react/Scrollbar/typings';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useRef } from 'react';
import { DrawerBodyProps } from './typings';

const DrawerBody = ({ ref, ...props }: DrawerBodyProps & { ref?: React.Ref<HTMLDivElement | null> }) => {
    const { classPrefix = 'drawer' } = props;
    const { e } = useClassNames(classPrefix);

    const scrollbarInstance = useRef<ScrollbarRef>(null);

    const resizeFn = debounce(
        useCallback(() => {
            scrollbarInstance.current?.update();
        }, []),
        200,
    );

    useEffect(() => {
        window.addEventListener('resize', resizeFn);

        return () => {
            window.removeEventListener('resize', resizeFn);
        };
    }, []);

    return (
        <div className={classNames(e`body`, props.className)} ref={ref} style={props.style}>
            {props.children}
        </div>
    );
};

DrawerBody.displayName = 'ElDrawerBody';

export default DrawerBody;
