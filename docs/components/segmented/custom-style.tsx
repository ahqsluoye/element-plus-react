import { ElSegmented } from '@qsxy/element-plus-react';
import React from 'react';
import './custom-style.scss';

const App = () => {
    const options = ['Delicacy', 'Desserts&Drinks', 'Fresh foods', 'Supermarket'];

    return (
        <div className="custom-style">
            <ElSegmented defaultValue={'Delicacy'} options={options} />
        </div>
    );
};

export default App;
