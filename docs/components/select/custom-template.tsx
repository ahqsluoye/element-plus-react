import { ElSelect } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElSelect style={{ width: 300 }}>
            <ElSelect.Option key="Beijing" value="Beijing" label="北京">
                <span style={{ float: 'left' }}>北京</span>
                <span style={{ float: 'right', color: '#8492a6', fontSize: 13 }}>Beijing</span>
            </ElSelect.Option>
            <ElSelect.Option key="Shanghai" value="Shanghai" label="上海">
                <span style={{ float: 'left' }}>上海</span>
                <span style={{ float: 'right', color: '#8492a6', fontSize: 13 }}>Shanghai</span>
            </ElSelect.Option>
            <ElSelect.Option key="Nanjing" value="Nanjing" label="南京">
                <span style={{ float: 'left' }}>南京</span>
                <span style={{ float: 'right', color: '#8492a6', fontSize: 13 }}>Nanjing</span>
            </ElSelect.Option>
            <ElSelect.Option key="Chengdu" value="Chengdu" label="成都">
                <span style={{ float: 'left' }}>成都</span>
                <span style={{ float: 'right', color: '#8492a6', fontSize: 13 }}>Chengdu</span>
            </ElSelect.Option>
            <ElSelect.Option key="Shenzhen" value="Shenzhen" label="深圳">
                <span style={{ float: 'left' }}>深圳</span>
                <span style={{ float: 'right', color: '#8492a6', fontSize: 13 }}>Shenzhen</span>
            </ElSelect.Option>
            <ElSelect.Option key="Guangzhou" value="Guangzhou" label="广州">
                <span style={{ float: 'left' }}>广州</span>
                <span style={{ float: 'right', color: '#8492a6', fontSize: 13 }}>Guangzhou</span>
            </ElSelect.Option>
        </ElSelect>
    );
};

export default App;
