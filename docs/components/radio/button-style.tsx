import { ElRadio, ElRadioGroup } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElRadioGroup defaultValue="New York" size="large">
                <ElRadio.Button value="New York">New York</ElRadio.Button>
                <ElRadio.Button value="Washington">Washington</ElRadio.Button>
                <ElRadio.Button value="Los Angeles">Los Angeles</ElRadio.Button>
                <ElRadio.Button value="Chicago">Chicago</ElRadio.Button>
            </ElRadioGroup>

            <div style={{ marginTop: 20 }}>
                <ElRadioGroup defaultValue="Washington">
                    <ElRadio.Button value="New York">New York</ElRadio.Button>
                    <ElRadio.Button value="Washington" disabled>
                        Washington
                    </ElRadio.Button>
                    <ElRadio.Button value="Los Angeles">Los Angeles</ElRadio.Button>
                    <ElRadio.Button value="Chicago">Chicago</ElRadio.Button>
                </ElRadioGroup>
            </div>

            <div style={{ marginTop: 20 }}>
                <ElRadioGroup defaultValue="Washington" size="small">
                    <ElRadio.Button value="New York">New York</ElRadio.Button>
                    <ElRadio.Button value="Washington" disabled>
                        Washington
                    </ElRadio.Button>
                    <ElRadio.Button value="Los Angeles">Los Angeles</ElRadio.Button>
                    <ElRadio.Button value="Chicago">Chicago</ElRadio.Button>
                </ElRadioGroup>
            </div>
        </div>
    );
};

export default App;
