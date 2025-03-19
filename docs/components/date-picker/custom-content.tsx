import { ElDatePicker } from '@qsxy/element-plus-react';
import classNames from 'classnames';
import React from 'react';
import './custom-content.scss';
import { holidays } from './holidays';

const App = () => {
    return (
        <ElDatePicker
            formatter={(value, text) => {
                const isHoliday = holidays[value.format('YYYY-MM-DD')];
                return (
                    <div className={classNames('el-date-table-cell', { 'is-holiday': isHoliday?.holiday === true, 'is-workday': isHoliday?.holiday === false })}>
                        <span className={'el-date-table-cell__text'}>{text}</span>
                        {isHoliday?.holiday && <span className="holiday">{isHoliday.name}</span>}
                    </div>
                );
            }}
            style={{ width: 200 }}
        />
    );
};

export default App;
