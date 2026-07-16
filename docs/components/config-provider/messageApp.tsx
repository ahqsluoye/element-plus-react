import { ElButton, useConfigProvider } from '@qsxy/element-plus-react';
import React from 'react';

const Message = () => {
    const { ElMessage } = useConfigProvider();

    const open = () => {
        ElMessage.success('This is a message.');
    };

    return <ElButton onClick={open}>OPEN</ElButton>;
};

export default Message;
