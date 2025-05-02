import { ElOption, ElOptionGroup, ElSelect } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElSelect filterable style={{ width: 300 }}>
            <ElOptionGroup label="热门城市">
                <ElOption key="Beijing" value="Beijing" label="北京" />
                <ElOption key="Shanghai" value="Shanghai" label="上海" />
            </ElOptionGroup>
            <ElOptionGroup label="其他城市">
                <ElOption key="Nanjing" value="Nanjing" label="南京">
                    <span style={{ float: 'left' }}>南京</span>
                    <span style={{ float: 'right', color: '#8492a6', fontSize: 13 }}>Nanjing</span>
                </ElOption>
                <ElOption key="Chengdu" value="Chengdu" label="成都">
                    <span style={{ float: 'left' }}>成都</span>
                    <span style={{ float: 'right', color: '#8492a6', fontSize: 13 }}>Chengdu</span>
                </ElOption>
                <ElOption key="Shenzhen" value="Shenzhen" label="深圳">
                    <span style={{ float: 'left' }}>深圳</span>
                    <span style={{ float: 'right', color: '#8492a6', fontSize: 13 }}>Shenzhen</span>
                </ElOption>
                <ElOption key="Guangzhou" value="Guangzhou" label="广州">
                    <span style={{ float: 'left' }}>广州</span>
                    <span style={{ float: 'right', color: '#8492a6', fontSize: 13 }}>Guangzhou</span>
                </ElOption>
            </ElOptionGroup>
        </ElSelect>
    );
};

export default App;
