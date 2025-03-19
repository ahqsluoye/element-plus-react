import { ElButton, ElInput, ElTag } from '@parker/element-plus-react';
import cloneDeep from 'lodash/cloneDeep';
import filter from 'lodash/filter';
import React, { useCallback, useState } from 'react';

const App = () => {
    const [add, setAdd] = useState(false);
    const [dynamicTags, setDynamicTags] = useState(['标签一', '标签二', '标签三']);
    const onClose = useCallback(
        item => {
            setDynamicTags(filter(cloneDeep(dynamicTags), item1 => item1 !== item));
        },
        [dynamicTags],
    );

    return (
        <>
            {dynamicTags.map(item => {
                return (
                    <ElTag key={item} closable disableTransitions onClose={() => onClose(item)} style={{ marginRight: 20 }}>
                        {item}
                    </ElTag>
                );
            })}
            {add ? (
                <ElInput
                    style={{ width: 130 }}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                            // @ts-ignore
                            setDynamicTags([...dynamicTags, e.target.value]);
                            setAdd(false);
                        }
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) => {
                        // @ts-ignore
                        setDynamicTags([...dynamicTags, e.target.value]);
                        setAdd(false);
                    }}
                />
            ) : (
                <ElButton type="primary" icon="plus" onClick={() => setAdd(true)}>
                    新建标签
                </ElButton>
            )}
        </>
    );
};

export default App;
