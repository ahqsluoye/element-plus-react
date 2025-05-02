import { ElIcon, ElInput, ElOption, ElSelect } from '@qsxy/element-plus-react';
import React from 'react';
import './mixed-input.scss';

const App = () => {
    return (
        <div className="mixed-input">
            <ElInput prepend="Http://" placeholder="请输入内容" style={{ width: 600 }} />
            <div className="mt-4">
                <ElInput append=".com" placeholder="请输入内容" style={{ width: 600 }} />
            </div>
            <div className="mt-4">
                <ElInput
                    append={<ElIcon name="search" />}
                    prepend={
                        <ElSelect placeholder="Select" style={{ width: 110 }}>
                            <ElOption label="Restaurant" value="1" />
                            <ElOption label="Order No." value="2" />
                            <ElOption label="Tel" value="3" />
                        </ElSelect>
                    }
                    placeholder="请输入内容"
                    style={{ width: 600 }}
                />
            </div>
            <div className="mt-4">
                <ElInput
                    prepend={<ElIcon name="search" />}
                    append={
                        <ElSelect placeholder="Select" style={{ width: 110 }}>
                            <ElOption label="Restaurant" value="1" />
                            <ElOption label="Order No." value="2" />
                            <ElOption label="Tel" value="3" />
                        </ElSelect>
                    }
                    placeholder="请输入内容"
                    style={{ width: 600 }}
                />
            </div>
        </div>
    );
};

export default App;
