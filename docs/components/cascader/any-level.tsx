import { ElCascader } from '@qsxy/element-plus-react';
import React from 'react';
import { options1 } from './data';

const App = () => {
    return (
        <>
            <div className="m-4">
                <p>Select any level of options (Single selection)</p>
                <ElCascader
                    options={options1}
                    props={{ checkStrictly: true }}
                    style={{ width: 300 }}
                    onChange={(value, l, label, nodes) => {
                        console.log(value, l, label, nodes);
                    }}
                />
            </div>
            <div className="m-4">
                <p>Select any level of options (Multiple selection)</p>
                <ElCascader
                    options={options1}
                    props={{ multiple: true, checkStrictly: true }}
                    style={{ width: 300 }}
                    onChange={(value, l, label, nodes) => {
                        console.log(value, l, label, nodes);
                    }}
                />
            </div>
        </>
    );
};

export default App;
