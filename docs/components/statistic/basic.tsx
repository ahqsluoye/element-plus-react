import { ElCol, ElIcon, ElRow, ElStatistic } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElRow gutter={16}>
            <ElCol xs={24} sm={12} md={6} className="text-center mb-4">
                <ElStatistic title="Daily active users" value={268500} />
            </ElCol>
            <ElCol xs={24} sm={12} md={6} className="text-center mb-4">
                <ElStatistic
                    value={138}
                    title={
                        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                            Ratio of men to women
                            <ElIcon name="male" style={{ marginLeft: '4px', fontSize: '12px' }}></ElIcon>
                        </div>
                    }
                    suffix="/100"
                ></ElStatistic>
            </ElCol>
            <ElCol xs={24} sm={12} md={6} className="text-center mb-4">
                <ElStatistic title="Total Transactions" value={123456} />
            </ElCol>
            <ElCol xs={24} sm={12} md={6} className="text-center mb-4">
                <ElStatistic title="Feedback number" value={562} suffix={<ElIcon name="comment-dots" style={{ verticalAlign: '-0.125em' }}></ElIcon>}></ElStatistic>
            </ElCol>
        </ElRow>
    );
};

export default App;
