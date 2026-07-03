import { ElRadioButton, ElRadioGroup } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElRadioGroup defaultValue="New York" size="large">
                <ElRadioButton value="New York">New York</ElRadioButton>
                <ElRadioButton value="Washington">Washington</ElRadioButton>
                <ElRadioButton value="Los Angeles">Los Angeles</ElRadioButton>
                <ElRadioButton value="Chicago">Chicago</ElRadioButton>
            </ElRadioGroup>

            <div style={{ marginTop: 20 }}>
                <ElRadioGroup defaultValue="Washington">
                    <ElRadioButton value="New York">New York</ElRadioButton>
                    <ElRadioButton value="Washington" disabled>
                        Washington
                    </ElRadioButton>
                    <ElRadioButton value="Los Angeles">Los Angeles</ElRadioButton>
                    <ElRadioButton value="Chicago">Chicago</ElRadioButton>
                </ElRadioGroup>
            </div>

            <div style={{ marginTop: 20 }}>
                <ElRadioGroup defaultValue="Washington" size="small">
                    <ElRadioButton value="New York">New York</ElRadioButton>
                    <ElRadioButton value="Washington" disabled>
                        Washington
                    </ElRadioButton>
                    <ElRadioButton value="Los Angeles">Los Angeles</ElRadioButton>
                    <ElRadioButton value="Chicago">Chicago</ElRadioButton>
                </ElRadioGroup>
            </div>
        </div>
    );
};

export default App;
