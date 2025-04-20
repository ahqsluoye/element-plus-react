import React, { createRef, RefObject } from 'react';
import { createRoot } from 'react-dom/client';
import Notification from './Notification';
import { NotificationProps, NotificationRef } from './typings';

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
