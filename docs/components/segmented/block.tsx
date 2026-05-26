import { ElSegmented } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const options = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sunday long long long long long long long'];
    return <ElSegmented defaultValue={'Mon'} options={options} block />;
};

export default App;
