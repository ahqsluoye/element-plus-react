import { ElCard, ElEmpty, ElIcon, ElInput, ElLink, ElTag } from '@qsxy/element-plus-react';
import { useFullSidebarData } from 'dumi';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import overviewIcons from '../overview-icons';
import './index.scss';

const Overview = () => {
    const [query, setQuery] = React.useState('');
    const searchRef = React.useRef();
    const sidebars = useFullSidebarData();
    const navigation = useNavigate();

    const toPage = link => {
        navigation(link);
    };

    const filteredSidebars = useMemo(
        () =>
            sidebars['/components']
                .slice(1)
                .map(group => ({
                    ...group,
                    children: group.children.filter(item => {
                        const value = query.trim().toLowerCase();
                        return group.title.toLowerCase().includes(value) || item.title.toLowerCase().includes(value);
                    }),
                }))
                .filter(group => group.children.length),
        [query, sidebars],
    );

    const getIcon = (link: string) => {
        const name = link.split('/').pop();
        return name ? overviewIcons[name] : null;
    };

    return (
        <div className="overview-container">
            <div className="search-content">
                <ElInput ref={searchRef} value={query} onChange={(val: string) => setQuery(val)} prefix={<ElIcon name="search" />} size="large" placeholder="Search Components" />
            </div>

            <div className="main-content">
                {filteredSidebars.map((group, groupIndex) => (
                    <div key={groupIndex} className="component-group">
                        <p className="component-title">
                            {group.title}
                            <ElTag effect="dark" round size="small">
                                {group.children.length}
                            </ElTag>
                        </p>
                        <div className="card-content">
                            {group.children.map((item, index) => (
                                <ElCard
                                    key={item.link}
                                    shadow="hover"
                                    tabIndex={0}
                                    onClick={() => toPage(item.link)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter') {
                                            toPage(item.link);
                                        }
                                    }}
                                    style={{ cursor: 'pointer' }}
                                    header={<>{item.title /* <ElText truncated>{item.text}</ElText> */}</>}
                                >
                                    {getIcon(item.link) ? <OverviewCompt link={item.link} /> : <span>Todo</span>}
                                </ElCard>
                            ))}
                        </div>
                    </div>
                ))}

                {!filteredSidebars.length ? <ElEmpty description="哎呀！什么都没有~" /> : null}

                <p className="designed-by">
                    Icons designed by
                    <ElLink type="primary" underline="never" href="https://github.com/daodaozz08" target="_blank">
                        叨叨
                    </ElLink>
                    <ElLink type="primary" underline="never" href="https://github.com/zhiwendesign" target="_blank">
                        卡卡
                    </ElLink>
                </p>
            </div>
        </div>
    );
};

Overview.displayName = 'Overview';

const OverviewCompt = (props: { link: string }) => {
    const getIcon = (link: string) => {
        const name = link.split('/').pop();
        return name ? overviewIcons[name] : null;
    };

    const Icon = getIcon(props.link);

    return Icon ? <Icon /> : null;
};

export default Overview;
