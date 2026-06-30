import todo from '@/../todo.json';
import { ElButton, ElDrawer, ElTimeLine, ElTimeLineItem } from '@qsxy/element-plus-react';
import { useLocation } from 'dumi';
import React from 'react';

const Todo = props => {
    const location = useLocation();

    const [visible, setVisible] = React.useState(false);

    const todoCount = todo[location.pathname].list.length;

    return (
        <>
            {todoCount > 0 && (
                <ElButton size="small" icon="exclamation-circle" onClick={() => setVisible(true)}>
                    待解决 {todoCount}
                </ElButton>
            )}
            {props.children}
            <ElDrawer title={todo[location.pathname].title} visible={visible} size={500} close={() => setVisible(false)}>
                <div>
                    <ElTimeLine>
                        {todo[location.pathname].list.map((item, index) => {
                            return (
                                <ElTimeLineItem key={index} timestamp={item.timestamp}>
                                    {item.content}
                                </ElTimeLineItem>
                            );
                        })}
                    </ElTimeLine>
                </div>
            </ElDrawer>
        </>
    );
};

export default Todo;
