import { ElDivider } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <div>
                <span>What language is thine, O sea?</span>
                <ElDivider borderStyle="dashed" />
                <span>The language of eternal question.</span>
            </div>
            <ElDivider borderStyle="dotted" />
            <span>What language is thy answer, O sky?</span>
            <ElDivider borderStyle="double" />
            <span>The language of eternal silence.</span>
        </>
    );
};

export default App;
