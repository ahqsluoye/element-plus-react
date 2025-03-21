import classNames from 'classnames';
import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import { useClassNames } from '../hooks';
import { DialogBodyProps } from './typings';

const DialogBody: React.ForwardRefExoticComponent<DialogBodyProps & React.RefAttributes<HTMLDivElement>> = memo(
    forwardRef<HTMLDivElement, DialogBodyProps>((props, ref) => {
        const { classPrefix = 'dialog' } = props;
        const { e } = useClassNames(classPrefix);
        // const { overflow, mounted, haveFooter } = useContext(DialogContext);

        const contentRef = useRef<HTMLDivElement>();
        // const scrollbarInstance = useRef<ScrollbarRef>(null);

        // const resizeFn = useCallback(() => {
        //     if (contentRef.current) {
        //         const { top } = contentRef.current.getBoundingClientRect();
        //         const { height = 0 } = haveFooter && contentRef.current.nextElementSibling ? contentRef.current.nextElementSibling.getBoundingClientRect() : {};
        //         addStyle(contentRef.current, { [overflow ? 'height' : 'maxHeight']: `${document.body.clientHeight - top - height - 20 - 60}px` });
        //         scrollbarInstance.current?.update();
        //     }
        // }, [haveFooter, overflow]);

        // useEffect(() => {
        //     if (mounted) {
        //         resizeFn();
        //         window.addEventListener('resize', resizeFn);
        //     }

        //     return () => {
        //         window.removeEventListener('resize', resizeFn);
        //     };
        //     // eslint-disable-next-line react-hooks/exhaustive-deps
        // }, [mounted]);

        useImperativeHandle(ref, () => contentRef.current);

        return (
            <div
                className={classNames(e`body`, props.className)}
                ref={contentRef}
                style={{
                    ...props.style,
                    // overflow: overflow ? 'hidden' : 'auto',
                    // [overflow ? 'height' : 'maxHeight']: document.body.clientHeight - 150 - 20 - (haveFooter && 30),
                }}
            >
                {/* {overflow ? (
                    <Scrollbar ref={scrollbarInstance}>
                        <div style={{ padding }}>{props.children}</div>
                    </Scrollbar>
                ) : (
                )} */}
                {props.children}
            </div>
        );
    }),
);

DialogBody.displayName = 'ElDialogBody';

export default DialogBody;
