import { ElBacktop } from '@qsxy/element-plus-react';
import React, { useRef } from 'react';

const App = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    return (
        <>
            Scroll down to see the bottom-right button.
            <ElBacktop right={100} bottom={100} ref={containerRef} />
        </>
    );
};

export default App;
