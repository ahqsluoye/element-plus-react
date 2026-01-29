import { ElTree, LoadFunction } from '@qsxy/element-plus-react';
import React from 'react';

interface Tree {
    name: string;
}

const App = () => {
    let count = 1;
    const props = {
        label: 'name',
        children: 'zones',
    };

    const handleCheckChange = (data: Tree, checked: boolean, indeterminate: boolean) => {
        console.log(data, checked, indeterminate);
    };

    const loadNode: LoadFunction = (node, resolve) => {
        if (node.level === 0) {
            return resolve([{ name: 'Root1' }, { name: 'Root2' }]);
        }
        if (node.level > 3) return resolve([]);

        let hasChild = false;
        if (node.data.name === 'region1') {
            hasChild = true;
        } else if (node.data.name === 'region2') {
            hasChild = false;
        } else {
            hasChild = Math.random() > 0.5;
        }

        setTimeout(() => {
            let data: Tree[] = [];
            if (hasChild) {
                data = [
                    {
                        name: `zone${count++}`,
                    },
                    {
                        name: `zone${count++}`,
                    },
                ];
            } else {
                data = [];
            }

            resolve(data);
        }, 500);
    };

    return <ElTree props={props} showCheckbox lazy load={loadNode} style={{ maxWidth: 600 }} onCheckChange={handleCheckChange} />;
};

export default App;
