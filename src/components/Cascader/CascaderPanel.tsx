import React, { memo } from 'react';
import ElCascader from './Cascader';
import { CascaderPanelProps, CascaderRef } from './typings';

const CascaderPanel = memo(({ ref, ...props }: CascaderPanelProps & { ref?: React.Ref<CascaderRef | null> }) => {
    return <ElCascader {...props} ref={ref} panel />;
});

CascaderPanel.displayName = 'ElCascaderPanel';
export default CascaderPanel;
