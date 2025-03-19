import { ElCheckbox, ElCheckboxGroup } from '@qsxy/element-plus-react';
import React, { useCallback, useMemo, useState } from 'react';

const App = () => {
    const [checkAll, setCheckAll] = useState(false);
    const [isIndeterminate, setIsIndeterminate] = useState(true);
    const [checkedCities, setCheckedCities] = useState(['Shanghai', 'Beijing']);
    const cities = useMemo(() => ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen'], []);

    const handleCheckAllChange = useCallback(
        (val: boolean) => {
            setCheckAll(val);
            setCheckedCities(val ? cities : []);
            setIsIndeterminate(false);
        },
        [cities],
    );

    const handleCheckedCitiesChange = useCallback(
        (value: string[]) => {
            setCheckedCities(value);
            const checkedCount = value.length;
            setCheckAll(checkedCount === cities.length);
            setIsIndeterminate(checkedCount > 0 && checkedCount < cities.length);
        },
        [cities.length],
    );

    return (
        <div>
            <ElCheckbox checked={checkAll} indeterminate={isIndeterminate} onChange={checked => handleCheckAllChange(checked)}>
                Check all
            </ElCheckbox>

            <ElCheckboxGroup value={checkedCities} onChange={handleCheckedCitiesChange}>
                {cities.map(item => {
                    return (
                        <ElCheckbox key={item} value={item}>
                            {item}
                        </ElCheckbox>
                    );
                })}
            </ElCheckboxGroup>
        </div>
    );
};

export default App;
