import { ElCascader } from '@parker/element-plus-react';
import React, { Key, useMemo, useState } from 'react';
import { options3 } from './data';

let id = 0;

const App = () => {
    const treeProps = useMemo(() => {
        return {
            lazy: true,
            lazyLoad(node, resolve, reject) {
                const { level } = node;
                setTimeout(() => {
                    if (level === 0) {
                        resolve({ nodes: options3, isTree: true });
                    } else if (level === 1) {
                        if (!node.treeChildren) {
                            const nodes = Array.from({ length: level + 1 }).map(() => ({
                                value: `Option - ${++id}`,
                                label: `Option - ${id}`,
                                leaf: true,
                            }));
                            resolve({ nodes });
                        } else {
                            reject();
                        }
                    } else {
                        reject();
                    }
                }, 500);
            },
        };
    }, []);

    const [value, setValue] = useState<Key[]>(['IN_EAST_GWXXB', 'Option - 2']);

    return (
        <ElCascader
            value={value}
            filterable
            // showAllLevels={false}
            props={treeProps}
            style={{ width: 300 }}
            shouldSelect={node => {
                // @ts-ignore
                return !node.treeChildren;
            }}
            onChange={(val: string[]) => setValue(val)}
        />
    );
};

export default App;
