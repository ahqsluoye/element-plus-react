import { ElCheckboxButton, ElCheckboxGroup } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'];

    return (
        <>
            <div>
                <ElCheckboxGroup defaultValue={['Shanghai']} size="large">
                    {cities.map(item => (
                        <ElCheckboxButton key={item} value={item}>
                            {item}
                        </ElCheckboxButton>
                    ))}
                </ElCheckboxGroup>
            </div>
            <div style={{ marginTop: 24 }}>
                <ElCheckboxGroup defaultValue={['Shanghai']}>
                    {cities.map(item => (
                        <ElCheckboxButton key={item} value={item}>
                            {item}
                        </ElCheckboxButton>
                    ))}
                </ElCheckboxGroup>
            </div>
            <div style={{ marginTop: 24 }}>
                <ElCheckboxGroup defaultValue={['Shanghai']} size="small">
                    {cities.map(item => (
                        <ElCheckboxButton key={item} value={item}>
                            {item}
                        </ElCheckboxButton>
                    ))}
                </ElCheckboxGroup>
            </div>
            <div style={{ marginTop: 24 }}>
                <ElCheckboxGroup defaultValue={['Shanghai']} size="small" disabled>
                    {cities.map(item => (
                        <ElCheckboxButton key={item} value={item}>
                            {item}
                        </ElCheckboxButton>
                    ))}
                </ElCheckboxGroup>
            </div>
        </>
    );
};

export default App;
