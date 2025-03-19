import DemoBlock from '@/Layout/DemoBlock';
import PageContainer from '@/Layout/PageContainer';
import RightNav from '@/Layout/RightNav';
import { EventsTable, PropsTable } from '@/Layout/Table';
import Basic, { html as basic_html } from './basic';
import BorderCard, { html as border_card_html } from './border-card';
import CardStyle, { html as card_style_html } from './card-style';
import TabPosition, { html as tab_position_html } from './tab-position';
// import CustomTab, { html as custom_tab_html } from './custom-tab';
import DynamicTabs, { html as dynamic_tabs_html } from './dynamic-tabs';
// import CustomizedTrigger, { html as customized_trigger_html } from './customized-trigger';
import { tabPaneEvents, tabPaneProps, tabsEvents, tabsProps } from './props';

const TabsDoc = () => {
    return (
        <>
            <PageContainer>
                <section class="content element-doc content">
                    <h2>Tabs 标签页</h2>
                    <p>分隔内容上有关联但属于不同类别的数据集合。</p>

                    <DemoBlock
                        title="基础用法"
                        content={
                            '基础的、简洁的标签页。\
                        Tabs 组件提供了选项卡功能， 默认选中第一个标签页，你也可以通过 `activeName` 属性来指定当前选中的标签页。'
                        }
                        source={<Basic />}
                        highlight={basic_html}
                    />

                    <DemoBlock
                        title="卡片风格的标签"
                        content={
                            '你可以设置具有卡片风格的标签。\
                        只需要设置 `type` 属性为 `card` 就可以使选项卡改变为标签风格。'
                        }
                        source={<CardStyle />}
                        highlight={card_style_html}
                    />

                    <DemoBlock
                        title="带有边框的卡片风格"
                        content={
                            '你可以设置具有卡片风格的标签。\
                        只需要设置 `type` 属性为 `borderCard` 就可以使选项卡改变为带有边框的卡片风格。'
                        }
                        source={<BorderCard />}
                        highlight={border_card_html}
                    />

                    <DemoBlock
                        title="标签位置的设置"
                        content={
                            '可以通过 `tabPosition` 设置标签的位置\
                        标签一共有四个方向的设置 `tabPosition="left|right|top|bottom"`'
                        }
                        source={<TabPosition />}
                        highlight={tab_position_html}
                    />

                    <DemoBlock title="动态增减标签页" source={<DynamicTabs />} highlight={dynamic_tabs_html} />

                    <h3>Tabs 属性</h3>
                    <PropsTable data={tabsProps} />

                    <h3>Tabs 事件</h3>
                    <EventsTable data={tabsEvents} />

                    <h3>Tab-pane 属性</h3>
                    <PropsTable data={tabPaneProps} />

                    <h3>Tab-pane 事件</h3>
                    <EventsTable data={tabPaneEvents} />

                    <RightNav />
                </section>
            </PageContainer>
        </>
    );
};

export default TabsDoc;
