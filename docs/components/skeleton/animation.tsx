import { ElSkeleton } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return <ElSkeleton.Paragraph rows={5} graph="image" active />;
};

export default App;
