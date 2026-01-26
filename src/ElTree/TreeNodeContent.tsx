import React from 'react';
import { mergeDefaultProps } from '../Util';
import { useClassNames } from '../hooks';
import type Node from './model/node';
import { RenderContentFunction } from './typings';

interface Props {
    node: Node;
    renderContent: RenderContentFunction;
}

const TreeNodeContent = (props: Props) => {
    props = mergeDefaultProps({ node: {} }, props);
    const { node } = props;
    const { be } = useClassNames('tree');
    const { data, store } = node;
    return props.renderContent ? props.renderContent({ _self: null, node, data, store }) : <span className={be('node', 'label')}>{node.label}</span>;
};

export default TreeNodeContent;
