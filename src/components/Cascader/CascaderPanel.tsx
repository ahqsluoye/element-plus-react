import React, { forwardRef, memo } from 'react';
import Cascader from './Cascader';
import { CascaderPanelProps, CascaderRef } from './typings';

const CascaderPanel = memo(
    forwardRef<CascaderRef, CascaderPanelProps>((props, ref) => {
        return <Cascader {...props} ref={ref} panel />;
    }),
);

CascaderPanel.displayName = 'ElCascaderPanel';
export default CascaderPanel;
