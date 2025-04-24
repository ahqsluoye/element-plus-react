import { ElDivider, ElSkeleton } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <p>Default:</p>
            <ElSkeleton style={{ marginTop: 30 }} />
            <ElDivider />
            <p>You can also add a round or rect icon to the left:</p>
            <ElSkeleton style={{ marginTop: 30 }} variant="circle" rows={2} />
            <ElSkeleton style={{ marginTop: 30 }} variant="rect" rows={2} />
            <ElSkeleton style={{ marginTop: 30 }} variant="image" rows={6} />
        </>
    );
};

export default App;
