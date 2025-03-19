import classNames from 'classnames';
import React, { forwardRef, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useClassNames } from '../hooks';
import { TabsContext } from './TabsContext';
import { TabPaneProps } from './typings';

const TabPane = forwardRef<HTMLDivElement, TabPaneProps>((props, ref) => {
    const { name, classPrefix = 'tab-pane', lazy, onTabShow, onTabClose } = props;
    const { b } = useClassNames(classPrefix);

    const { activeName } = useContext(TabsContext);

    // 懒加载模式下，记录是否加载过
    // const hasLoad = useRef(activeName === name);
    const [hasLoad, setHasLoad] = useState(activeName === name);
    const isActive = useRef(false);

    // 懒加载模式下，记录是否加载过
    useEffect(() => {
        if (hasLoad === false) {
            setHasLoad(activeName === name);
        }
    }, [activeName, hasLoad, name]);

    useEffect(() => {
        if (isActive.current === false && activeName === name) {
            isActive.current = true;
            onTabShow?.();
        } else if (isActive.current === true && activeName !== name) {
            isActive.current = false;
            onTabClose?.();
        }
    }, [activeName, name, onTabClose, onTabShow]);

    const main = useMemo(
        () => (
            <div className={classNames(b(), props.className)} style={{ display: activeName === name ? '' : 'none', ...props.style }} ref={ref}>
                {props.children}
            </div>
        ),
        [activeName, b, name, props.children, props.className, props.style, ref],
    );

    if (lazy) {
        if (hasLoad) {
            return main;
        }
    } else {
        return main;
    }
});

TabPane.displayName = 'TabPane';

export default TabPane;
