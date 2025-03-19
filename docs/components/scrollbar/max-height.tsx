import { ElButton, ElScrollbar, ScrollbarRef } from '@parker/element-plus-react';
import React, { useCallback, useRef, useState } from 'react';

const App = () => {
    const [count, setCount] = useState(3);
    const scrollbarRef = useRef<ScrollbarRef>();

    const add = useCallback(() => {
        setCount(count + 1);
    }, [count]);

    const onDelete = useCallback(() => {
        if (count > 0) {
            setCount(count - 1);
        }
    }, [count]);
    return (
        <>
            <div style={{ marginBottom: 10 }}>
                <ElButton onClick={add}>Add Item</ElButton>
                <ElButton onClick={onDelete}>Delete Item</ElButton>
            </div>

            <ElScrollbar maxHeight={400} ref={scrollbarRef} viewStyle={{ padding: '0 15px' }}>
                {new Array(count).fill(0).map((_, item) => {
                    return (
                        <p key={item} className="scrollbar-demo-item">
                            {item}
                        </p>
                    );
                })}
            </ElScrollbar>
        </>
    );
};

export default App;
