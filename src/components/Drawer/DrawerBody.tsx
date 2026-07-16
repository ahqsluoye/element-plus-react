import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { ScrollbarRef } from '@qsxy/element-plus-react/Scrollbar/typings';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import { DrawerBodyProps } from './typings';

const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>((props, ref) => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classNames(e`body`, props.className)} ref={ref} style={props.style}>
            {props.children}
        </div>
    );
});

DrawerBody.displayName = 'ElDrawerBody';

export default DrawerBody;
