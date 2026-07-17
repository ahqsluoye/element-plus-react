import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import ElText from '@qsxy/element-plus-react/Text/Text';
import React from 'react';
import type Node from './model/node';
import { RenderContentFunction } from './typings';

interface Props {
    node: Node;
    renderContent: RenderContentFunction;
}

const TreeNodeContent = (props: Props) => {
    // props = mergeDefaultProps({ node: {} as Node }, props);
    const { node = {} as Node } = props;
    const { be } = useClassNames('tree');
    const { data, store } = node;
    return props.renderContent ? (
        props.renderContent({ _self: null, node, data, store })
    ) : (
        <ElText className={be('node', 'label')} truncated>
            {node.label}
        </ElText>
    );
};

export default TreeNodeContent;
