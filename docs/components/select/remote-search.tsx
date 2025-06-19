import { ElOption, ElSelect } from '@qsxy/element-plus-react';
import { useState } from 'react';
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
            }, 200);
        } else {
            setData([]);
        }
    };

    return (
        <div>
            <ElSelect loading={loading} filterable remote remoteMethod={remoteMethod} multiple style={{ width: 300, marginRight: 20 }}>
                {data.map(item => {
                    return <ElOption value={item.value} label={item.label} key={item.value} />;
                })}
            </ElSelect>
        </div>
    );
};

export default App;
