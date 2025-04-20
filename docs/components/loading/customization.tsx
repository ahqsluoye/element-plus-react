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

    const svg = (
        <path
            className="path"
            d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        "
            style={{ strokeWidth: 4, fill: 'rgba(0, 0, 0, 0)' }}
        />
    );
    return (
        <>
            <ElLoading visible background="var(--el-mask-color)" text="正在加载中..." svg={svg} svgViewBox="-10, -10, 50, 50">
                <ElTable data={tableData} style={{ width: '100%' }}>
                    <ElTableColumn prop="date" label="Date" width={180} />
                    <ElTableColumn prop="name" label="Name" width={180} />
                    <ElTableColumn prop="address" label="Address" align="center" showOverflowTooltip />
                </ElTable>
            </ElLoading>
            <ElDivider />
            <ElLoading visible svg={svg} svgViewBox="-10, -10, 50, 50">
                <div style={{ height: 300, padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span>{lorem.generateParagraphs(5)}</span>
                </div>
            </ElLoading>
        </>
    );
};

export default App;
