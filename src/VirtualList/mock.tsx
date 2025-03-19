import React, { forwardRef, Ref } from 'react';
import { ListProps, ListRef, RawList } from './VirtualList';

const List = forwardRef((props: ListProps<any>, ref: Ref<ListRef>) => RawList({ ...props, virtual: false }, ref)) as <Item = any>(
    props: ListProps<Item> & { ref?: Ref<ListRef> },
) => React.ReactElement;

(List as any).displayName = 'List';

export default List;
