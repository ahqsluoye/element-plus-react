import { ElIcon, ElTooltip } from '@qsxy/element-plus-react';
import React from 'react';
import './style.scss';

const Enum = props => {
    const { type = 'enum' } = props;
    return (
        <>
            <code>{type}</code>
            <ElTooltip effect="light" content={<code>{props.children}</code>} trigger="click">
                <ElIcon className="r-enum" name="circle-exclamation" prefix="far" />
            </ElTooltip>
        </>
    );
};

export default Enum;
