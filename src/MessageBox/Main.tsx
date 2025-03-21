import React, { createRef, RefObject } from 'react';
import { createRoot } from 'react-dom/client';
import MessageBox from './MessageBox';
import { MessageBoxRef, MessageState } from './typings';

export class Main {
    ref: RefObject<MessageBoxRef> = createRef();
    constructor(props: MessageState) {
        this.render(props);
    }

    render({ options, ...other }: MessageState) {
        const renderDom = document.createDocumentFragment();
        const root = createRoot(renderDom);
        root.render(
            <MessageBox
                options={{
                    ...options,
                    afterLeave: () => {
                        setTimeout(() => {
                            root.unmount();
                        }, 200);
                    },
                }}
                {...other}
                ref={this.ref}
            />,
        );
    }
}

export default Main;
