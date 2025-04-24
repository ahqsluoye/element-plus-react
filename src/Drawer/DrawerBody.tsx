import classNames from 'classnames';
import debounce from 'lodash/debounce';
import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import Scrollbar from '../Scrollbar/Scrollbar';
import { ScrollbarRef } from '../Scrollbar/typings';
import { useClassNames } from '../hooks';
import { DrawerBodyProps } from './typings';

const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>((props, ref) => {
    const { classPrefix = 'drawer-body' } = props;
    const { b } = useClassNames(classPrefix);

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
        <Scrollbar ref={scrollbarInstance}>
            <div className={classNames(b(), props.className)} ref={ref} style={props.style}>
                {props.children}
            </div>
        </Scrollbar>
    );
});

DrawerBody.displayName = 'ElDrawerBody';

export default DrawerBody;
