import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { addUnit, mergeDefaultProps } from '../Util';
import { useClassNames } from '../hooks';
import { FooterProps } from './typings';

const Footer = forwardRef<HTMLDivElement, FooterProps>((props, ref) => {
    props = mergeDefaultProps({ height: '60px' }, props);

    const { b } = useClassNames('footer');
    return (
        <footer className={classNames(b(), props.className)} ref={ref} style={{ '--el-footer-height': addUnit(props.height), ...props.style }}>
            {props.children}
        </footer>
    );
});

Footer.displayName = 'ElFooter';
export default Footer;
