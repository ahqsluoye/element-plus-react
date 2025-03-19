import classNames from 'classnames';
import React, { FC } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Icon } from '../Icon';
import { Transition } from '../Transition';
import { PopupManager } from '../Util';
import { useClassNames } from '../hooks';
import { LoadingProps, LoadingService } from './typings';

const Main: FC<LoadingProps> = props => {
    const { visible, text, fullscreen, spinner, background } = props;
    const { b, is } = useClassNames('loading');

    // const mask = useMemo(
    //     () => (

    //     ),
    //     [visible, classNames, b, is, fullscreen, props.className, props.style, background, spinner, text],
    // );
    return (
        <Transition name="loading-fade" visible={visible}>
            <div className={classNames(b`mask`, is({ fullscreen }), props.className)} style={{ ...props.style, background, zIndex: PopupManager.nextZIndex() }}>
                <div className={b`spinner`}>
                    {spinner ? (
                        <Icon name={spinner} spin />
                    ) : (
                        <svg className="circular" viewBox="25 25 50 50">
                            <circle className="path" cx="50" cy="50" r="20" fill="none" />
                        </svg>
                    )}
                    {text && <p className={b`text`}>{text}</p>}
                </div>
            </div>
        </Transition>
    );
};

const service = (props: LoadingProps = {}) => {
    const { target = { current: document.body } } = props;
    const root = createRoot(document.body);
    root.render(createPortal(<Main {...props} visible />, target.current));
    return {
        close: () => {
            root.unmount();
        },
    };
};

const Loading: CompInterface = (props?: LoadingProps) => {
    const { target, visible } = props;
    // if (!target.current) {
    //     return;
    // }
    if (target?.current) {
        return createPortal(<Main {...props} visible={visible} />, target.current);
    }
    return <Main {...props} visible={visible} />;
};

interface CompInterface extends FC<LoadingProps> {
    displayName?: string;
    defaultProps?: Partial<LoadingProps>;
    service: LoadingService;
}

Loading.defaultProps = {
    fullscreen: true,
};

Loading.service = service;
Loading.displayName = 'Loading';

export default Loading;
