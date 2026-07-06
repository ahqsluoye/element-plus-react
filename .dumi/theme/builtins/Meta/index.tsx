import { ElButton, ElButtonGroup, ElDrawer, ElLink, ElTag, ElTimeLine, ElTimeLineItem, TimeLineItemProps } from '@qsxy/element-plus-react';
import { useMount } from 'ahooks';
import { useLocation } from 'dumi';
import React from 'react';
import './style.scss';

export interface ChangelogEntry {
    type: 'feature' | 'bugfix' | 'refactor' | 'breaking';
    description: string;
    pr?: string;
    author?: string;
}

export interface VersionChangelog {
    version: string;
    date: string;
    entries: ChangelogEntry[];
}

const TYPE_ICONS: Record<string, string> = {
    feature: '✨',
    bugfix: '🐛',
    refactor: '🔨',
    breaking: '⚠️',
};

const getTypeIcon = (type: string) => {
    return TYPE_ICONS[type] || TYPE_ICONS['refactor'];
};

const getTimelineItemType = (entries: VersionChangelog['entries']): TimeLineItemProps['type'] => {
    if (entries.some(e => e.type === 'breaking')) return 'danger';
    if (entries.some(e => e.type === 'feature')) return 'success';
    if (entries.some(e => e.type === 'bugfix')) return 'primary';
    return 'info';
};

const Meta = props => {
    const location = useLocation();

    const [visible, setVisible] = React.useState('');

    const [loadingChangeLog, setLoadingChangeLog] = React.useState(true);
    const [loadingIssues, setLoadingIssues] = React.useState(true);
    const [changeLog, setChangeLog] = React.useState([]);
    const [issues, setIssues] = React.useState([]);

    const todoCount = issues.length || 0;

    useMount(() => {
        import(`@/../docs/${location.pathname.substring(1)}/changeLog.ts`).then(res => {
            if (res.default) {
                setLoadingChangeLog(false);
                setChangeLog(res.default);
            }
        });

        import(`@/../docs/${location.pathname.substring(1)}/issues.ts`).then(res => {
            if (res.default) {
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
            <ElDrawer title="待解决问题" visible={visible === 'issues'} size={500} close={() => setVisible('')}>
                <div>
                    <ElTimeLine>
                        {issues.map((item, index) => {
                            return (
                                <ElTimeLineItem key={index} timestamp={item.timestamp}>
                                    {item.content.split('\n').map(line => (
                                        <p key={line}>{line}</p>
                                    ))}
                                </ElTimeLineItem>
                            );
                        })}
                    </ElTimeLine>
                </div>
            </ElDrawer>
            <ElDrawer
                title={
                    <div className="changelog-drawer-header">
                        <span className="changelog-drawer-title">更新日志</span>
                    </div>
                }
                visible={visible === 'changeLog'}
                className="changelog-drawer"
                size={500}
                close={() => setVisible('')}
            >
                <div>
                    <ElTimeLine className="changelog-timeline">
                        {changeLog.map((item, index) => {
                            return (
                                <ElTimeLineItem key={index} hollow size="large" type={getTimelineItemType(item.entries)}>
                                    <div className="changelog-version-header">
                                        <span className="changelog-version">{item.version}</span>
                                        <ElTag size="small" round effect="plain">
                                            {item.date}
                                        </ElTag>
                                    </div>
                                    <ul className="changelog-entries">
                                        {item.entries.map((entry, idx) => (
                                            <li key={idx} className="changelog-entry">
                                                <span className="changelog-entry-icon">{getTypeIcon(entry.type)}</span>
                                                <span className="changelog-entry-desc">{entry.description}</span>
                                                {/* <ElLink
                                                v-if="pr"
                                                type="primary"
                                                href={`https://github.com/element-plus/element-plus/pull/${pr}`}
                                                underline="always"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                #{{ pr }}
                                            </ElLink> */}
                                                <ElLink href={`https://github.com/${entry.author}`} underline="always" target="_blank" rel="noopener noreferrer">
                                                    @{entry.author}
                                                </ElLink>
                                            </li>
                                        ))}
                                    </ul>
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
