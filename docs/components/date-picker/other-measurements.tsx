import { ElDatePicker } from '@qsxy/element-plus-react';
import React from 'react';
import './style.scss';

const App = () => {
    return (
        <>
            <div className="demo-date-picker">
                <div className="container">
                    <div className="block">
                        <span className="demonstration">Week</span>
                        <ElDatePicker type="week" valueFormat="YYYY ww" format="[Week] ww" defaultValue="2024 22" style={{ width: 200 }} />
                    </div>
                    <div className="block">
                        <span className="demonstration">Dates</span>
                        <ElDatePicker type="dates" style={{ width: 200 }} />
                    </div>
                </div>
                <div className="container">
                    <div className="block">
                        <span className="demonstration">Year</span>
                        <ElDatePicker type="year" style={{ width: 200 }} />
                    </div>
                    <div className="block">
                        <span className="demonstration">Years</span>
                        <ElDatePicker type="years" style={{ width: 200 }} />
                    </div>
                </div>
                <div className="container">
                    <div className="block">
                        <span className="demonstration">Month</span>
                        <ElDatePicker type="month" style={{ width: 200 }} />
                    </div>
                    <div className="block">
                        <span className="demonstration">Months</span>
                        <ElDatePicker type="months" style={{ width: 200 }} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
