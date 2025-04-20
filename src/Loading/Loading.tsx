import classNames from 'classnames';
import { addClass, removeClass } from 'dom-lib';
import React, { FC, RefObject, createRef, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import Icon from '../Icon/Icon';
import Transition from '../Transition/Transition';
import { PopupManager } from '../Util';
import { useClassNames } from '../hooks';
import { LoadingProps, LoadingService } from './typings';

const LoadingMain = forwardRef<any, LoadingProps>((props, ref) => {
    const { visible, text, fullscreen, spinner, background, svg, svgViewBox } = props;
    const { b, is, bm } = useClassNames('loading');

    const nodeRef = useRef(null);

    const onEnter = useCallback(() => {
        if (!props.children && nodeRef.current?.parentNode) {
            addClass(nodeRef.current.parentNode, bm('parent', 'relative'));
            addClass(nodeRef.current.parentNode, bm('parent', 'hidden'));
        }
    }, [bm, props.children]);

    const onDestory = useCallback(() => {
        if (!props.children && nodeRef.current?.parentNode) {
            removeClass(nodeRef.current.parentNode, bm('parent', 'relative'));
            removeClass(nodeRef.current.parentNode, bm('parent', 'hidden'));
        }
    }, [bm, props.children]);

    useEffect(() => {
        if (!visible) {
            onDestory();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    useImperativeHandle(ref, () => ({
        onDestory,
    }));

    const content = useMemo(
        () => (
            <Transition nodeRef={nodeRef} name="loading-fade" transitionAppear unmountOnExit visible={visible} onEnter={onEnter}>
                <div ref={nodeRef} className={classNames(b`mask`, is({ fullscreen }), props.className)} style={{ ...props.style, background, zIndex: PopupManager.nextZIndex() }}>
                    <div className={b`spinner`}>
                        {spinner ? (
                            <Icon name={spinner} spin />
                        ) : (
                            <svg className="circular" viewBox={svgViewBox ?? '25 25 50 50'}>
                                {svg ? svg : <circle className="path" cx="50" cy="50" r="20" fill="none" />}
                            </svg>
                        )}

                        {text && <p className={b`text`}>{text}</p>}
                    </div>
                </div>
            </Transition>
        ),
        [b, background, fullscreen, is, onEnter, props.className, props.style, spinner, svg, svgViewBox, text, visible],
    );

    return props.children ? (
        <div className={classNames(bm('parent', 'relative'), bm('parent', 'hidden'))}>
            {content}
            {props.children}
        </div>
    ) : (
        content
    );
});

export class Main {
    ref: RefObject<any>;
    root: any;
    constructor(props: LoadingProps) {
        this.ref = createRef();
        this.render(props);
    }

    render(props: LoadingProps) {
        const { target = { current: document.body } } = props;
        const renderDom = document.createDocumentFragment();
        this.root = createRoot(renderDom);
        this.root.render(createPortal(<LoadingMain {...props} visible ref={this.ref} />, target.current));
    }
}

const service = (props: LoadingProps = {}) => {
    const instance = new Main({ fullscreen: true, ...props });
    const { ref, root } = instance;
    return {
        close: () => {
            ref.current?.onDestory();
            setTimeout(() => {
                root.unmount();
            }, 200);
        },
    };
};

const Loading: CompInterface = (props?: LoadingProps) => {
    const { target, visible, fullscreen } = props;
    if (target?.current || fullscreen) {
        return createPortal(<LoadingMain {...props} visible={visible} />, fullscreen ? document.body : target.current);
    }
    return <LoadingMain {...props} visible={visible} />;
};

interface CompInterface extends FC<LoadingProps> {
    displayName?: string;
    service: LoadingService;
}

Loading.service = service;
Loading.displayName = 'ElLoading';

export default Loading;
