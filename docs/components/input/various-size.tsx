import { ElInput, IconSearch } from '@parker/element-plus-react';
import React from 'react';
import './style.scss';

const App = () => {
    return (
        <>
            <div className="mb-4">
                <ElInput size="large" />
                <ElInput />
                <ElInput size="small" />
            </div>

            <div className="mb-4">
                <ElInput size="large" prefix={<IconSearch />} />
                <ElInput prefix={<IconSearch />} />
                <ElInput size="small" prefix={<IconSearch />} />
            </div>
        </>
    );
};

export default App;
