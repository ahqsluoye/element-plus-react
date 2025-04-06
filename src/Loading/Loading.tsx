import classNames from 'classnames';
import { addClass } from 'dom-lib';
import React, { FC, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Icon from '../Icon/Icon';
import Transition from '../Transition/Transition';
import { PopupManager } from '../Util';
import { useClassNames } from '../hooks';
import { LoadingProps, LoadingService } from './typings';

const Main: FC<LoadingProps> = props => {
    const { visible, text, fullscreen = true, spinner, background } = props;
    const { b, is, bm } = useClassNames('loading');

    const nodeRef = useRef(null);

    useEffect(() => {
        if (nodeRef.current?.parentNode) {
            addClass(nodeRef.current.parentNode, bm('parent', 'relative'));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Transition nodeRef={nodeRef} name="loading-fade" visible={visible}>
            <div ref={nodeRef} className={classNames(b`mask`, is({ fullscreen }), props.className)} style={{ ...props.style, background, zIndex: PopupManager.nextZIndex() }}>
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
    const renderDom = document.createDocumentFragment();
    const root = createRoot(renderDom);
    root.render(createPortal(<Main {...props} visible />, target.current));
    return {
        close: () => {
            setTimeout(() => {
                root.unmount();
            }, 200);
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

Loading.service = service;
Loading.displayName = 'ElLoading';

export default Loading;
