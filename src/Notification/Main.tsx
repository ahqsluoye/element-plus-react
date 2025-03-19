import React, { createRef, RefObject } from 'react';
import { createRoot } from 'react-dom/client';
import Notification from './Notification';
import { NotificationProps, NotificationRef } from './typings';

/**
 * @author	Parker
 * @CreateTime	2022/3/10 12:45:48
 * @LastEditor	Parker
 * @ModifyTime	2022/5/3 12:24:58
 * @Description
 */
export class Main {
    ref: RefObject<NotificationRef> = createRef();
    constructor(props: NotificationProps) {
        this.render(props);
    }

    render(props: NotificationProps) {
        const renderDom = document.createDocumentFragment();
        const root = createRoot(renderDom);
        root.render(
            <Notification
                {...props}
                afterLeave={() => {
                    setTimeout(() => {
                        root.unmount();
                    }, 200);
                }}
                key={props.id}
                ref={this.ref}
            />,
        );
    }
}

export default Main;
