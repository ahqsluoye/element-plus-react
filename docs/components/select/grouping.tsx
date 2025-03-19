import { ElSelect } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElSelect filterable style={{ width: 300 }}>
            <ElSelect.OptionGroup label="热门城市">
                <ElSelect.Option key="Beijing" value="Beijing" label="北京" />
                <ElSelect.Option key="Shanghai" value="Shanghai" label="上海" />
            </ElSelect.OptionGroup>
            <ElSelect.OptionGroup label="其他城市">
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
            </ElSelect.OptionGroup>
        </ElSelect>
    );
};

export default App;
