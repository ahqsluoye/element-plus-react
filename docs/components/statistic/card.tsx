import { ElCol, ElIcon, ElRow, ElStatistic, ElTooltip } from '@qsxy/element-plus-react';
import React from 'react';
import './card.scss';

const App = () => {
    return (
        <>
            <ElRow gutter={16}>
                <ElCol xs={24} sm={12} md={8} className="mb-4">
                    <div className="statistic-card">
                        <ElStatistic
                            value={98500}
                            title={
                                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    Daily active users
                                    <ElTooltip effect="dark" content="Number of users who logged into the product in one day" placement="top">
                                        <ElIcon name="circle-exclamation" style={{ marginLeft: 4, fontSize: 12 }}></ElIcon>
                                    </ElTooltip>
                                </div>
                            }
                        ></ElStatistic>
                        <div className="statistic-footer">
                            <div className="footer-item">
                                <span>than yesterday</span>
                                <span className="green">
                                    24%
                                    <ElIcon name="caret-up" prefix="fas"></ElIcon>
                                </span>
                            </div>
                        </div>
                    </div>
                </ElCol>
                <ElCol xs={24} sm={12} md={8} className="mb-4">
                    <div className="statistic-card">
                        <ElStatistic
                            value={693700}
                            title={
                                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    Monthly Active Users
                                    <ElTooltip effect="dark" content="Number of users who logged into the product in one month" placement="top">
                                        <ElIcon name="circle-exclamation" style={{ marginLeft: 4, fontSize: 12 }}></ElIcon>
                                    </ElTooltip>
                                </div>
                            }
                        ></ElStatistic>
                        <div className="statistic-footer">
                            <div className="footer-item">
                                <span>month on month</span>
                                <span className="red">
                                    12%
                                    <ElIcon name="caret-down" prefix="fas"></ElIcon>
                                </span>
                            </div>
                        </div>
                    </div>
                </ElCol>
                <ElCol xs={24} sm={12} md={8} className="mb-4">
                    <div className="statistic-card">
                        <ElStatistic
                            value={72000}
                            title={
                                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                    New transactions today
                                    <ElTooltip effect="dark" content="Number of new transactions made by users today" placement="top">
                                        <ElIcon name="circle-exclamation" style={{ marginLeft: 4, fontSize: 12 }}></ElIcon>
                                    </ElTooltip>
                                </div>
                            }
                        ></ElStatistic>
                        <div className="statistic-footer">
                            <div className="footer-item">
                                <span>than yesterday</span>
                                <span className="green">
                                    16%
                                    <ElIcon name="caret-up" prefix="fas"></ElIcon>
                                </span>
                            </div>
                            <div className="footer-item">
                                <ElIcon name="angle-right"></ElIcon>
                            </div>
                        </div>
                    </div>
                </ElCol>
            </ElRow>
        </>
    );
};

export default App;
