// Element Plus 时间选择面板工具类
import filter from 'lodash/filter';
import { Compare, DisabledHours, DisabledMinutes, DisabledSeconds, RoleType } from './typings';

const makeList = (total: number, method: DisabledHours | DisabledMinutes | DisabledSeconds, methodFunc: () => number[]): boolean[] => {
    const arr = [];
    const disabledArr = method && methodFunc();
    for (let i = 0; i < total; i++) {
        arr[i] = disabledArr ? disabledArr.includes(i) : false;
    }
    return arr;
};

const makeAvailableArr = (list: boolean[]): number[] => {
    const res = list.map((_, index) => (!_ ? index : _));
    // @ts-ignore
    return filter(res, _ => _ !== true);
};

export const getTimeLists = (disabledHours: DisabledHours, disabledMinutes: DisabledMinutes, disabledSeconds: DisabledSeconds) => {
    const getHoursList = (role: RoleType, compare?: Compare): boolean[] => {
        return makeList(24, disabledHours, () => disabledHours(role, compare));
    };

    const getMinutesList = (hour, role: RoleType, compare?: Compare) => {
        return makeList(60, disabledMinutes, () => disabledMinutes(hour, role, compare));
    };

    const getSecondsList = (hour, minute, role: RoleType, compare?: Compare) => {
        return makeList(60, disabledSeconds, () => disabledSeconds(hour, minute, role, compare));
    };

    return {
        getHoursList,
        getMinutesList,
        getSecondsList,
    };
};

export const getAvailableArrs = (disabledHours: DisabledHours, disabledMinutes: DisabledMinutes, disabledSeconds: DisabledSeconds) => {
    const { getHoursList, getMinutesList, getSecondsList } = getTimeLists(disabledHours, disabledMinutes, disabledSeconds);

    const getAvailableHours = (role: RoleType, compare?: Compare) => {
        return makeAvailableArr(getHoursList(role, compare));
    };

    const getAvailableMinutes = (hour: number, role: RoleType, compare?: Compare) => {
        return makeAvailableArr(getMinutesList(hour, role, compare));
    };

    const getAvailableSeconds = (hour: number, minute: number, role: RoleType, compare?: Compare) => {
        return makeAvailableArr(getSecondsList(hour, minute, role, compare));
    };

    return {
        getAvailableHours,
        getAvailableMinutes,
        getAvailableSeconds,
    };
};

// export const useOldValue = (props: { parsedValue?: string | Dayjs | Dayjs[]; visible: boolean }) => {
//     const oldValue = ref(props.parsedValue);

//     watch(
//         () => props.visible,
//         val => {
//             if (!val) {
//                 oldValue.value = props.parsedValue;
//             }
//         },
//     );

//     return oldValue;
// };
