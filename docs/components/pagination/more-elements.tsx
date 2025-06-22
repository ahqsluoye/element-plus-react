import { ElCol, ElPagination, ElRadio, ElRadioGroup, ElRow, ElSwitch, TypeAttributes } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [size, setSize] = useState<TypeAttributes.Size>('default');
    const [value, setValue] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const [pageSize2, setPageSize2] = useState(100);
    const [pageSize3, setPageSize3] = useState(100);
    const [pageSize4, setPageSize4] = useState(100);

    const handleSizeChange2 = (current: number, pageSize: number) => {
        console.log(`${pageSize} items per page`);
        setPageSize2(pageSize);
    };

    const handleSizeChange4 = (current: number, pageSize: number) => {
        console.log(`${pageSize} items per page`);
        setPageSize4(pageSize);
    };

    return (
        <ElRow>
            <ElCol span={24}>
                <div className="flex items-center mb-4">
                    <ElRadioGroup value={size} onChange={(value: TypeAttributes.Size) => setSize(value)}>
                        <ElRadio.Button value={'default'}>default</ElRadio.Button>
                        <ElRadio.Button value="large">large</ElRadio.Button>
                        <ElRadio.Button value="small">small</ElRadio.Button>
                    </ElRadioGroup>
                    <div style={{ marginLeft: 20 }}>
                        background: <ElSwitch value={value} onChange={(_, checked: boolean) => setValue(checked)} />
                    </div>
                    <span style={{ marginLeft: 20 }}>
                        disabled：
                        <ElSwitch value={disabled} onChange={(_, checked: boolean) => setDisabled(checked)} />
                    </span>
                </div>
            </ElCol>

            <ElCol span={24} style={{ marginBottom: 20 }}>
                <div style={{ marginBottom: 16 }}>Total item count</div>
                <ElPagination pageSize={100} size={size} disabled={disabled} background={value} layout="total, prev, pager, next" total={1000} />
            </ElCol>

            <ElCol span={24} style={{ marginBottom: 20 }}>
                <div style={{ marginBottom: 16 }}>Change page size</div>
                <ElPagination
                    pageSize={pageSize2}
                    size={size}
                    disabled={disabled}
                    background={value}
                    layout="sizes, prev, pager, next"
                    total={1000}
                    onSizeChange={handleSizeChange2}
                />
            </ElCol>

            <ElCol span={24} style={{ marginBottom: 20 }}>
                <div style={{ marginBottom: 16 }}>Jump to</div>
                <ElPagination pageSize={100} size={size} disabled={disabled} background={value} layout="prev, pager, next, jumper" total={1000} />
            </ElCol>

            <ElCol span={24} style={{ marginBottom: 20 }}>
                <div style={{ marginBottom: 16 }}>All combined</div>
                <ElPagination
                    pageSize={pageSize4}
                    size={size}
                    disabled={disabled}
                    background={value}
                    layout="total, sizes, prev, pager, next, jumper"
                    total={1000}
                    onSizeChange={handleSizeChange4}
                />
            </ElCol>

            <ElCol span={24} style={{ marginBottom: 20 }}>
                <div style={{ marginBottom: 16 }}>simple pagination</div>
                <ElPagination pageSize={10} size={size} disabled={disabled} background={value} simple total={100} />
            </ElCol>
        </ElRow>
    );
};

export default App;
