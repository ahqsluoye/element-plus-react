import { ElOption, ElSelect } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const onChange = (value: string, data: any) => {
        console.log(value, data);
    };

    return (
        <ElSelect style={{ width: 300 }} onChange={onChange}>
            <ElOption
                value="1"
                label="黄金糕"
                data={{
                    date: '2016-05-03',
                    name: 'Tom',
                    address:
                        'No. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los Angeles',
                }}
            />
            <ElOption value="2" label="双皮奶" data={true} />
            <ElOption
                value="3"
                label="蚵仔煎"
                data={{
                    date: '2016-05-04',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                }}
            />
            <ElOption value="4" label="龙须面" data={[0, 1, 2, 3, 4]} />
            <ElOption value="5" label="北京烤鸭" data={'北京烤鸭'} />
        </ElSelect>
    );
};

export default App;
