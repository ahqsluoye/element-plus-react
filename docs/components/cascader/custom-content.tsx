import { ElCascader } from '@qsxy/element-plus-react';
import React from 'react';
import { options1 } from './data';

const App = () => {
    return (
        <ElCascader
            options={options1}
            nodeFormatter={({ node, data }) => (
                <>
                    <span>{data.label}</span>
                    {!node.__leaf && <span> ({node.children.length}) </span>}
                </>
            )}
            style={{ width: 300 }}
        />
    );
};

export default App;
