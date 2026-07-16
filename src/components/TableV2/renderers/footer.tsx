import { BaseProps, NativeProps } from '@qsxy/element-plus-react/types/common';
import React from 'react';

const Footer = (props: NativeProps & BaseProps) => {
    return (
        <div className={props.className} style={props.style}>
            {props.children}
        </div>
    );
};

Footer.displayName = 'ElTableV2Footer';

export default Footer;
