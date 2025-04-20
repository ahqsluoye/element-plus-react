import React, { createRef } from 'react';
import { createRoot } from 'react-dom/client';
import Message from './Message';
import { MessageProps, MessageRef } from './typings';

export class Main {
    ref = createRef<MessageRef>();
    constructor(props: MessageProps) {
        this.render(props);
    }

    render(props: MessageProps) {
        const renderDom = document.createDocumentFragment();
        const root = createRoot(renderDom);
        root.render(
            <Message
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
