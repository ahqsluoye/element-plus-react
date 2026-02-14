import { ElButton, ElConfigProvider, ElPagination, ElTable } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [language, setLanguage] = useState<'zh-cn' | 'en'>('zh-cn');

    const toggle = () => {
        setLanguage(language === 'zh-cn' ? 'en' : 'zh-cn');
    };

    return (
        <>
            <ElButton onClick={toggle}>Switch Language</ElButton>

            <ElConfigProvider locale={language}>
                <ElTable data={[]} style={{ marginBottom: 10 }}></ElTable>
                <ElPagination total={100}></ElPagination>
            </ElConfigProvider>
        </>
    );
};

export default App;
