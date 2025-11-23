import { ElCol, ElOption, ElRow, ElSelect } from '@qsxy/element-plus-react';
import React, { useState } from 'react';
import './custom-loading.scss';
import { dataList } from './remote-search';

const App = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<{ value: string; label: string }[]>([]);

    const remoteMethod = (query: string) => {
        if (query) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setData(
                    dataList
                        .filter(item => {
                            return item.toLowerCase().includes(query.toLowerCase());
                        })
                        .map(item => ({ value: item, label: item })),
                );
            }, 3000);
        } else {
            setData([]);
        }
    };

    return (
        <ElRow gutter={15}>
            <ElCol span={8}>
                <div style={{ marginBottom: 10 }}>loading icon1</div>
                <ElSelect
                    loading={loading}
                    filterable
                    remote
                    remoteMethod={remoteMethod}
                    multiple
                    loadingIcon={
                        <svg className="circular" viewBox="0 0 50 50">
                            <circle className="path" cx="25" cy="25" r="20" fill="none" />
                        </svg>
                    }
                    style={{ width: 240, marginRight: 20 }}
                >
                    {data.map(item => {
                        return <ElOption value={item.value} label={`label:${item.label}`} key={item.value} />;
                    })}
                </ElSelect>
            </ElCol>
            <ElCol span={8}>
                <div style={{ marginBottom: 10 }}>loading icon2</div>
                <ElSelect
                    loading={loading}
                    filterable
                    remote
                    remoteMethod={remoteMethod}
                    loadingIcon={
                        <div className="el-icon is-loading">
                            <svg className="circular" viewBox="0 0 20 20">
                                <g className="path2 loading-path" stroke-width="0" style={{ animation: 'none', stroke: 'none' }}>
                                    <circle r="3.375" className="dot1" rx="0" ry="0" />
                                    <circle r="3.375" className="dot2" rx="0" ry="0" />
                                    <circle r="3.375" className="dot4" rx="0" ry="0" />
                                    <circle r="3.375" className="dot3" rx="0" ry="0" />
                                </g>
                            </svg>
                        </div>
                    }
                    multiple
                    style={{ width: 240, marginRight: 20 }}
                >
                    {data.map(item => {
                        return <ElOption value={item.value} label={`label:${item.label}`} key={item.value} />;
                    })}
                </ElSelect>
            </ElCol>
        </ElRow>
    );
};

export default App;
