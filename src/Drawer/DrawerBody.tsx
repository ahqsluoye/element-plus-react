import classNames from 'classnames';
import debounce from 'lodash/debounce';
import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import Scrollbar from '../Scrollbar/Scrollbar';
import { ScrollbarRef } from '../Scrollbar/typings';
import { useClassNames } from '../hooks';
import { DrawerBodyProps } from './typings';

const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>((props, ref) => {
    const { classPrefix = 'drawer-body', padding = '0 20px' } = props;
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
        <div className={classNames(b(), props.className)} ref={ref} style={props.style}>
            <Scrollbar ref={scrollbarInstance}>
                <div style={{ padding }}>{props.children}</div>
            </Scrollbar>
        </div>
    );
});

DrawerBody.displayName = 'DrawerBody';

export default DrawerBody;
