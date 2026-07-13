import { ElEmpty, ElTransfer } from '@qsxy/element-plus-react';
import React, { useMemo } from 'react';

const App = () => {
    const mockData = useMemo(
        () =>
            new Array(20).fill(0).map((_, i) => {
                return {
                    key: i,
                    label: `content${i + 1}`,
                    description: `description of content${i + 1}`,
                };
            }),
        [],
    );

    return <ElTransfer data={mockData} leftEmpty={<ElEmpty imageSize={60} description="No data" />} rightEmpty={<ElEmpty imageSize={60} description="No data" />} />;
};

export default App;
