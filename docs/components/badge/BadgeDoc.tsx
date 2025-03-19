import { h, Fragment } from 'preact';
import PageContainer from '@/Layout/PageContainer';
import DemoBlock from '@/Layout/DemoBlock';
import RightNav from '@/Layout/RightNav';
import { PropsTable } from '@/Layout/Table';
import Basic, { html as basic_html } from './basic';
import Max, { html as max_html } from './max';
import Customize, { html as customize_html } from './customize';
import Dot, { html as dot_html } from './dot';

const BadgeDoc = () => {
    return (
        <>
            <PageContainer>
                <section class="content element-doc content">
                    <h2>Badge 徽章</h2>
                    <p>按钮和图标上的数字或状态标记。</p>

                    <DemoBlock title="基础用法" content={'可以用来展示新消息的数量。数量值可接受 Number 或 String。'} source={<Basic />} highlight={basic_html} />

                    <DemoBlock
                        title="最大值"
                        content={
                            '你还可以自定义最大值<br/><br/>\
                        demo 由 max 属性定义，接受 Number 值。 请注意，仅在值也是 Number 时起作用。'
                        }
                        source={<Max />}
                        highlight={max_html}
                    />

                    <DemoBlock
                        title="自定义显示内容"
                        content={
                            '你也可以展示除数字以外你想要展示的任何值。<br/><br/>\
                        当 value 是 String 时，可以显示自定义文字。'
                        }
                        source={<Customize />}
                        highlight={customize_html}
                    />

                    <DemoBlock
                        title="小红点"
                        content={
                            '通过一个小红点标记来告知用户有新内容。<br/><br/>\
                        使用 `isDot` 属性。 是个布尔值。'
                        }
                        source={<Dot />}
                        highlight={dot_html}
                    />

                    <h3>Breadcrumb 属性</h3>
                    <PropsTable data={[['separator', '分隔符，图标分隔符的组件或组件名', 'string/Component', '—', '/']]} />

                    <h3>Breadcrumb-Item 属性</h3>
                    <PropsTable data={[['to', '路由跳转目标，同 `react-router@6+` 的 `path`属性', 'string | object', '—', '—']]} />

                    <RightNav />
                </section>
            </PageContainer>
        </>
    );
};

export default BadgeDoc;
