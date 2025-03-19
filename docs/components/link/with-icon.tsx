import { ElIcon, ElLink } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElLink icon="edit" style={{ marginRight: 8 }}>
                Edit
            </ElLink>
            <ElLink>
                Check
                <ElIcon className="el-icon--right" name="check" />
            </ElLink>
        </div>
    );
};

export default App;
