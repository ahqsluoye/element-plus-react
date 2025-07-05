import SourceCode from 'dumi/theme-default/builtins/SourceCode';
import React from 'react';

import { ElTabPane, ElTabs } from '@qsxy/element-plus-react';
import NpmLogo from './npm';
import PnpmLogo from './pnpm';
import './style.scss';
import YarnLogo from './yarn';

interface InstallProps {
    npm?: string;
    yarn?: string;
    pnpm?: string;
    bun?: string;
}

const InstallDependencies: React.FC<InstallProps> = props => {
    const { npm, yarn, pnpm, bun } = props;
    const items = [
        {
            key: 'npm',
            label: 'npm',
            children: npm ? <SourceCode lang="bash">{npm}</SourceCode> : null,
            icon: <NpmLogo />,
        },
        {
            key: 'yarn',
            label: 'yarn',
            children: yarn ? <SourceCode lang="bash">{yarn}</SourceCode> : null,
            icon: <YarnLogo />,
        },
        {
            key: 'pnpm',
            label: 'pnpm',
            children: pnpm ? <SourceCode lang="bash">{pnpm}</SourceCode> : null,
            icon: <PnpmLogo />,
        },
    ].filter(item => item.children);

    return (
        <ElTabs className="markdown" defaultActiveName="npm" style={{ '--el-tabs-header-margin-bottom': '0px' }}>
            {items.map(item => (
                <ElTabPane
                    key={item.key}
                    name={item.key}
                    title={
                        <>
                            {item.icon}
                            {item.label}
                        </>
                    }
                >
                    {item.children}
                </ElTabPane>
            ))}
        </ElTabs>
    );
};

export default InstallDependencies;
