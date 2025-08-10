import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { addUnit } from '../Util';
import { useClassNames } from '../hooks';
import { FooterProps } from './typings';

const Footer = forwardRef<HTMLDivElement, FooterProps>((props, ref) => {
    const { b } = useClassNames('footer');
    return (
        <footer className={classNames(b(), props.className)} ref={ref} style={{ height: addUnit(props.height), ...props.style }}>
            {props.children}
        </footer>
    );
});

Footer.displayName = 'ElFooter';
export default Footer;
