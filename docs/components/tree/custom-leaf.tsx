import { ElTree, LoadFunction } from '@qsxy/element-plus-react';
import React from 'react';

interface Tree {
    name: string;
    leaf?: boolean;
}

const App = () => {
    const props = {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf',
    };

    const loadNode: LoadFunction = (node, resolve) => {
        if (node.level === 0) {
            return resolve([{ name: 'region' }]);
        }
        if (node.level > 1) return resolve([]);

        setTimeout(() => {
            const data: Tree[] = [
                {
                    name: 'leaf',
                    leaf: true,
                },
                {
                    name: 'zone',
                },
            ];

            resolve(data);
        }, 500);
    };

    return <ElTree props={props} showCheckbox lazy load={loadNode} style={{ maxWidth: 600 }} />;
};

export default App;
