import classNames from 'classnames';
import debounce from 'lodash/debounce';
import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import { Scrollbar, ScrollbarRef } from '../Scrollbar';
import { useClassNames } from '../hooks';
import { DrawerBodyProps } from './typings';

const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>((props, ref) => {
    const { classPrefix = 'drawer-body', padding } = props;
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
DrawerBody.defaultProps = {
    padding: '0 20px',
};

export default DrawerBody;
