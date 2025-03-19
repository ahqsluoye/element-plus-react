import { ElCascader } from '@qsxy/element-plus-react';
import React, { useMemo } from 'react';

let id = 0;

const App = () => {
    const props = useMemo(() => {
        return {
            lazy: true,
            lazyLoad(node, resolve, reject) {
                const { level } = node;
                setTimeout(() => {
                    if (level <= 2) {
                        if (id >= 5) {
                            resolve({ nodes: [] });
                        } else {
                            const nodes = Array.from({ length: level + 1 }).map(() => ({
                                value: ++id,
                                label: `Option - ${id}`,
                                leaf: level >= 2,
                            }));
                            resolve({ nodes });
                        }
                    } else {
                        reject();
                    }
                }, 500);
            },
        };
    }, []);

    return <ElCascader props={props} style={{ width: 400 }} />;
};

export default App;
