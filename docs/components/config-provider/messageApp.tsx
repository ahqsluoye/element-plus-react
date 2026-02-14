import { ElButton } from '@qsxy/element-plus-react';
import { useConfigProvider } from '@qsxy/element-plus-react/hooks';
import React from 'react';

const Message = () => {
    const { ElMessage } = useConfigProvider();

    const open = () => {
        ElMessage.success('This is a message.');
    };

    return <ElButton onClick={open}>OPEN</ElButton>;
};

export default Message;
