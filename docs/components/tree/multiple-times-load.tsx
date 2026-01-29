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

    let time = 0;
    const loadNode: LoadFunction = (node, resolve, reject) => {
        if (node.level === 0) {
            return resolve([{ name: 'region' }]);
        }
        time++;
        if (node.level >= 1) {
            setTimeout(() => {
                if (time > 3) {
                    return resolve([
                        { name: 'zone1', leaf: true },
                        { name: 'zone2', leaf: true },
                        { name: 'zone3', leaf: true },
                    ]);
                } else {
                    return reject();
                }
            }, 3000);
        }
    };

    return <ElTree props={props} lazy load={loadNode} style={{ maxWidth: 600 }} />;
};

export default App;
