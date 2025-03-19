import { ElSelect } from '@qsxy/element-plus-react';
import React from 'react';
import { options } from './data';

const AutoWidth = () => {
    return (
        <ElSelect defaultValue="861000000/SH4000/20110120/20310120" style={{ width: 300 }}>
            {options.map(item => (
                <ElSelect.Option key={item.value} value={item.value} label={item.label} />
            ))}
        </ElSelect>
    );
};

export default AutoWidth;
