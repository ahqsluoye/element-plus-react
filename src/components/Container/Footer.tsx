import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { addUnit, mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import React from 'react';
import { FooterProps } from './typings';

const Footer = ({ ref, ...props }: FooterProps & { ref?: React.Ref<HTMLDivElement | null> }) => {
    props = mergeDefaultProps({ height: '60px' }, props);

    const { b } = useClassNames('footer');
    return (
        <footer className={classNames(b(), props.className)} ref={ref} style={{ '--el-footer-height': addUnit(props.height), ...props.style }}>
            {props.children}
        </footer>
    );
};

Footer.displayName = 'ElFooter';
export default Footer;
