import { ElDivider, ElLoading, ElTable, ElTableColumn } from '@qsxy/element-plus-react';
import { LoremIpsum } from 'lorem-ipsum';
import React, { useMemo } from 'react';
import { tableData } from '../table/data';

const App = () => {
    const lorem = useMemo(
        () =>
            new LoremIpsum({
                sentencesPerParagraph: {
                    max: 8,
                    min: 4,
                },
                wordsPerSentence: {
                    max: 16,
                    min: 4,
                },
            }),
        [],
    );
    return (
        <>
            <ElLoading visible background="var(--el-mask-color)" text="正在加载中...">
                <ElTable data={tableData} style={{ width: '100%' }}>
                    <ElTableColumn prop="date" label="Date" width={180} />
                    <ElTableColumn prop="name" label="Name" width={180} />
                    <ElTableColumn prop="address" label="Address" align="center" showOverflowTooltip />
                </ElTable>
            </ElLoading>
            <ElDivider />
            <ElLoading visible>
                <div style={{ height: 300, padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span>{lorem.generateParagraphs(5)}</span>
                </div>
            </ElLoading>
        </>
    );
};

export default App;
