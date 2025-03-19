import { ElMessage, ElSwitch } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const beforeChange1 = (): Promise<boolean> => {
        setLoading1(true);
        return new Promise(resolve => {
            setTimeout(() => {
                setLoading1(false);
                ElMessage.success('切换成功！');
                return resolve(true);
            }, 1000);
        });
    };

    const beforeChange2 = (): Promise<boolean> => {
        setLoading2(true);
        return new Promise((_, reject) => {
            setTimeout(() => {
                setLoading2(false);
                ElMessage.error('切换失败！');
                return reject(new Error('Error'));
            }, 1000);
        });
    };

    return (
        <div>
            <ElSwitch loading={loading1} beforeChange={beforeChange1} style={{ marginRight: 20 }} />
            <ElSwitch defaultValue={true} loading={loading2} beforeChange={beforeChange2} />
        </div>
    );
};

export default App;
