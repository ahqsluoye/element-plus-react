import { ElDirectoryTree, ElSwitch } from '@qsxy/element-plus-react';
import React, { useState } from 'react';
import { Demo1 } from './treeData';

const App = () => {
    const [showLine, setShowLine] = useState<boolean | { showLeafIcon: boolean }>(true);
    const [showIcon, setShowIcon] = useState<boolean>(false);
    const [showLeafIcon, setShowLeafIcon] = useState<boolean>(true);

    const onSetLeafIcon = (checked: boolean) => {
        setShowLeafIcon(checked);
        setShowLine({ showLeafIcon: checked });
    };

    const onSetShowLine = (checked: boolean) => {
        setShowLine(checked ? { showLeafIcon } : false);
    };

    return (
        <>
            <ElSwitch value={!!showLine} activeText="showLine" onChange={(_, checked) => onSetShowLine(checked)} style={{ paddingRight: 20 }} />
            <ElSwitch value={showIcon} activeText="showIcon" onChange={(_, checked) => setShowIcon(checked)} style={{ paddingRight: 20 }} />
            <ElSwitch value={showLeafIcon} activeText="showLeafIcon" onChange={(_, checked) => onSetLeafIcon(checked)} style={{ paddingRight: 20 }} />
            <ElDirectoryTree treeData={Demo1} showLine={showLine} showIcon={showIcon} />
        </>
    );
};

export default App;
