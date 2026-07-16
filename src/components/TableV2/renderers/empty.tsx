import ElEmpty from '@qsxy/element-plus-react/Empty/Empty';
import { BaseProps, NativeProps } from '@qsxy/element-plus-react/types/common';
import React from 'react';

const Footer = (props: NativeProps & BaseProps) => {
    return (
        <div className={props.className} style={props.style}>
            {props.children ?? <ElEmpty />}
        </div>
    );
};

Footer.displayName = 'ElTableV2Empty';

export default Footer;
