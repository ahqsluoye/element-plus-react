import { ElButton, ElSelect } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<{ value: string; label: string }[]>([]);

    return (
        <div>
            <ElSelect loading={loading} style={{ width: 300, marginRight: 20 }}>
                {data.map(item => {
                    return <ElSelect.Option value={item.value} label={item.label} key={item.value} />;
                })}
            </ElSelect>
            <ElButton
                type="primary"
                onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        setData([
                            {
                                value: '选项1',
                                label: '黄金糕',
                            },
                            {
                                value: '选项2',
                                label: '双皮奶',
                            },
                            {
                                value: '选项3',
                                label: '蚵仔煎',
                            },
                            {
                                value: '选项4',
                                label: '龙须面',
                            },
                            {
                                value: '选项5',
                                label: '北京烤鸭',
                            },
                        ]);
                    }, 3000);
                }}
            >
                加载数据
            </ElButton>
        </div>
    );
};

export default App;
