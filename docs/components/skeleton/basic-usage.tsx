import { ElDivider, ElSkeleton } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <p>Default:</p>
            <ElSkeleton.Paragraph style={{ marginTop: 30 }} />
            <ElDivider />
            <p>You can also add a round or square icon to the left:</p>
            <ElSkeleton.Paragraph style={{ marginTop: 30 }} graph="circle" />
            <ElSkeleton.Paragraph style={{ marginTop: 30 }} graph="square" />
            <ElSkeleton.Paragraph style={{ marginTop: 30 }} graph="image" />
        </>
    );
};

export default App;
