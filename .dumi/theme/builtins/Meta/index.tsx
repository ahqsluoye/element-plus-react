import { ElButton, ElButtonGroup, ElDrawer, ElTimeLine, ElTimeLineItem } from '@qsxy/element-plus-react';
import { useMount } from 'ahooks';
import { useLocation } from 'dumi';
import React from 'react';

const Meta = props => {
    const location = useLocation();

    const [visible, setVisible] = React.useState('');

    const [loadingChangeLog, setLoadingChangeLog] = React.useState(true);
    const [loadingIssues, setLoadingIssues] = React.useState(true);
    const [changeLog, setChangeLog] = React.useState([]);
    const [issues, setIssues] = React.useState({ title: '', list: [] });

    const todoCount = issues.list.length || 0;

    useMount(() => {
        import(`@/../docs/${location.pathname.substring(1)}/changeLog.js`).then(res => {
            if (res.default) {
                console.log(res.default);
                setLoadingChangeLog(false);
                setChangeLog(res.default);
            }
        });

        import(`@/../docs/${location.pathname.substring(1)}/issues.js`).then(res => {
            if (res.default) {
                console.log(res.default);
                setLoadingIssues(false);
                setIssues(res.default);
            }
        });
    });

    return (
        <>
            <ElButtonGroup size="small">
                {changeLog.length > 0 && (
                    <ElButton size="small" icon="clock" loading={loadingChangeLog} onClick={() => setVisible('changeLog')}>
                        更新日志
                    </ElButton>
                )}
                {todoCount > 0 && (
                    <ElButton size="small" icon="exclamation-circle" loading={loadingIssues} onClick={() => setVisible('issues')}>
                        待解决 {todoCount}
                    </ElButton>
                )}
            </ElButtonGroup>
            {props.children}
            <ElDrawer title={issues.title} visible={visible === 'issues'} size={500} close={() => setVisible('')}>
                <div>
                    <ElTimeLine>
                        {issues.list.map((item, index) => {
                            return (
                                <ElTimeLineItem key={index} timestamp={item.timestamp}>
                                    {item.content}
                                </ElTimeLineItem>
                            );
                        })}
                    </ElTimeLine>
                </div>
            </ElDrawer>
            <ElDrawer title="更新日志" visible={visible === 'changeLog'} size={500} close={() => setVisible('')}>
                <div>
                    <ElTimeLine>
                        {changeLog.map((item, index) => {
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

export default Meta;
