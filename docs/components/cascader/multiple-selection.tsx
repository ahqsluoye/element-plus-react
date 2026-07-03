import { ElCascader } from '@qsxy/element-plus-react';
import React from 'react';
import { options1 } from './data';

const App = () => {
    return (
        <>
            <div className="m-4">
                <p>Display all tags (default)</p>
                <ElCascader options={options1} props={{ multiple: true }} style={{ width: 500 }} />
            </div>
            <div className="m-4">
                <p>Collapse tags</p>
                <ElCascader
                    filterable
                    options={options1}
                    props={{ multiple: true }}
                    style={{ width: 500 }}
                    clearable
                    collapseTags
                    defaultValue={[
                        ['guide', 'disciplines', 'consistency'],
                        ['guide', 'disciplines', 'feedback'],
                        ['guide', 'disciplines', 'efficiency'],
                        ['component', 'navigation', 'side nav'],
                        ['component', 'navigation', 'top nav'],
                    ]}
                    onChange={(value, l, label) => {
                        console.log(value, l, label);
                    }}
                />
            </div>
            <div className="m-4">
                <p>Collapse tags</p>
                <ElCascader
                    filterable
                    options={options1}
                    props={{ multiple: true }}
                    style={{ width: 500 }}
                    clearable
                    collapseTags
                    collapseTagsTooltip
                    maxCollapseTagsTooltipHeight={500}
                    onChange={(value, l, label) => {
                        console.log(value, l, label);
                    }}
                />
            </div>
            <div className="m-4">
                <p>Max Collapse Tags</p>
                <ElCascader
                    filterable
                    options={options1}
                    props={{ multiple: true }}
                    style={{ width: 500 }}
                    clearable
                    collapseTags
                    collapseTagsTooltip
                    maxCollapseTags={3}
                    maxCollapseTagsTooltipHeight={500}
                    collapseTips={num => `鼠标悬浮查看更多（+${num}）`}
                    onChange={(value, l, label) => {
                        console.log(value, l, label);
                    }}
                />
            </div>
        </>
    );
};

export default App;
