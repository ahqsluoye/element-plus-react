import { ElRadioButton, ElRadioGroup, ElTable, ElTableColumn } from '@qsxy/element-plus-react';
import React, { useState } from 'react';
import { tableData } from './data';

const App = () => {
    const [tableLayout, setTableLayout] = useState<'fixed' | 'auto'>('fixed');

    return (
        <>
            <ElRadioGroup value={tableLayout} onChange={(value: 'fixed' | 'auto') => setTableLayout(value)} style={{ marginBottom: 10 }}>
                <ElRadioButton value="fixed">fixed</ElRadioButton>
                <ElRadioButton value="auto">auto</ElRadioButton>
            </ElRadioGroup>
            <ElTable data={tableData} tableLayout={tableLayout}>
                <ElTableColumn prop="date" label="Date" />
                <ElTableColumn prop="name" label="Name" />
                <ElTableColumn prop="address" label="Address" />
            </ElTable>
        </>
    );
};

export default App;
