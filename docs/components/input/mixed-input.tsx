import { ElIcon, ElInput, ElSelect } from '@qsxy/element-plus-react';
import React from 'react';
import './style.scss';

const App = () => {
    return (
        <div>
            <ElInput prepend="Http://" placeholder="请输入内容" style={{ width: 600 }} />
            <div className="mt-4">
                <ElInput append=".com" placeholder="请输入内容" style={{ width: 600 }} />
            </div>
            <div className="mt-4">
                <ElInput
                    append={<ElIcon name="search" />}
                    prepend={
                        <ElSelect v-model="select" placeholder="Select" style={{ width: 110 }}>
                            <ElSelect.Option label="Restaurant" value="1" />
                            <ElSelect.Option label="Order No." value="2" />
                            <ElSelect.Option label="Tel" value="3" />
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
                        <ElSelect v-model="select" placeholder="Select" style={{ width: 110 }}>
                            <ElSelect.Option label="Restaurant" value="1" />
                            <ElSelect.Option label="Order No." value="2" />
                            <ElSelect.Option label="Tel" value="3" />
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
