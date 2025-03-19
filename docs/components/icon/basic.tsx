import { ElIcon } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div className="fa-2x">
            <ElIcon prefix="fas" name="calendar-days" style={{ marginRight: 20 }} />
            <ElIcon prefix="fas" name="edit" style={{ marginRight: 20 }} />
            <ElIcon prefix="fas" name="trash-alt" />
        </div>
    );
};

export default App;
