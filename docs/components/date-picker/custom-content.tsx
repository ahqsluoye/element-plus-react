import { ElDatePicker, ElSpace } from '@qsxy/element-plus-react';
import classNames from 'classnames';
import React from 'react';
import './custom-content.scss';
import { holidays } from './holidays';

const App = () => {
    return (
        <ElSpace>
            <ElDatePicker
                defaultValue={'2023-01-01'}
                formatter={(value, text) => {
                    const isHoliday = holidays[value.format('YYYY-MM-DD')];
                    return (
                        <div className={classNames('el-date-table-cell', { 'is-holiday': isHoliday?.holiday === true, 'is-workday': isHoliday?.holiday === false })}>
                            <span className={'el-date-table-cell__text'}>{text}</span>
                            {isHoliday?.holiday && <span className="holiday">{isHoliday.name}</span>}
                        </div>
                    );
                }}
            />

            <ElDatePicker
                type="month"
                formatter={(value, text) => {
                    return <span>{text + 1}期</span>;
                }}
            />

            <ElDatePicker
                type="year"
                formatter={(value, text) => {
                    return <span>{text}y</span>;
                }}
            />

            <ElDatePicker
                type="quarter"
                formatter={(value, text) => {
                    return <span>season{text}</span>;
                }}
            />
        </ElSpace>
    );
};

export default App;
