import { ElRow, ElText } from '@qsxy/element-plus-react';
import React from 'react';
import './style.scss';

const App = () => {
    return (
        <>
            <ElText className="w-150px mb-2" truncated>
                Self element set width 100px
            </ElText>
            <ElRow className="w-150px mb-2">
                <ElText truncated>Squeezed by parent element</ElText>
            </ElRow>
            <ElText lineClamp={2}>
                The -webkit-line-clamp CSS property
                <br />
                allows limiting of the contents of
                <br />a block to the specified number of lines.
            </ElText>
        </>
    );
};

export default App;
