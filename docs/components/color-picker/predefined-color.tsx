import { ElColorPicker } from '@qsxy/element-plus-react';
import React, { useMemo } from 'react';

const App = () => {
    const predefineColors = useMemo(
        () => [
            '#ff4500',
            '#ff8c00',
            '#ffd700',
            '#90ee90',
            '#00ced1',
            '#1e90ff',
            '#c71585',
            'rgba(255, 69, 0, 0.68)',
            'rgb(255, 120, 0)',
            'hsv(51, 100, 98)',
            'hsva(120, 40, 94, 0.5)',
            'hsl(181, 100%, 37%)',
            'hsla(209, 100%, 56%, 0.73)',
            '#c7158577',
        ],
        [],
    );

    return <ElColorPicker defaultValue="rgba(255, 69, 0, 0.68)" showAlpha predefine={predefineColors} />;
};

export default App;
