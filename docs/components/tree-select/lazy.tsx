import { ElDivider, ElTreeSelect } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const cacheData = [{ value: 5, label: 'lazy load node5' }];

    const props = {
        label: 'label',
        children: 'children',
        isLeaf: 'isLeaf',
    };

    let id = 0;

    const load = (node, resolve) => {
        if (node.isLeaf) {
            return resolve([]);
        }

        setTimeout(() => {
            resolve([
                {
                    value: ++id,
                    label: `lazy load node${id}`,
                },
                {
                    value: ++id,
                    label: `lazy load node${id}`,
                    isLeaf: true,
                },
            ]);
        }, 400);
    };
    return (
        <>
            <ElTreeSelect lazy load={load} props={props} style={{ width: 240 }} />
            <ElDivider />
            show lazy load label：
            <ElTreeSelect cacheData={cacheData} defaultValue={5} lazy load={load} props={props} style={{ width: 240 }} />
        </>
    );
};

export default App;
