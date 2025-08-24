import is_empty from 'lodash/isEmpty';

/**
 * 判断对象是否为空
 * @param {Object} val 被判断的对象
 * @returns {Boolean} 返回true或false
 */
export function isEmpty(val: any): boolean {
    if (val === null || typeof val === 'undefined') {
        return true;
    }
    if (typeof val === 'string') {
        return val.trim() === '';
    }
    if (typeof val === 'boolean') {
        return false;
    }
    if (val instanceof Function) {
        return false;
    }
    if (val instanceof Object) {
        if (val instanceof Date) {
            return false;
        }
        return is_empty(val);
    }
    if (val instanceof Array) {
        return val.length === 0;
    }
    return false;
}

/**
 * 判断对象是否不为空
 * @param {Object} val 被判断的对象
 * @returns  {Boolean} 返回true或false
 */
export function isNotEmpty(val: any): boolean {
    return !isEmpty(val);
}

/**
 * 随机序列，包含数字和字母
 * @param {Number} n 序列的个数
 * @returns {String} 返回序列
 */
export function randomCode(n: number): string {
    if (n > 0) {
        const data = [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z',
            'a',
            'b',
            'c',
            'd',
            'e',
            'f',
            'g',
            'h',
            'i',
            'j',
            'k',
            'l',
            'm',
            'n',
            'o',
            'p',
            'q',
            'r',
            's',
            't',
            'u',
            'v',
            'w',
            'x',
            'y',
            'z',
        ];
        let nums = '';
        for (let i = 0; i < n; i++) {
            const r = parseInt(String(Math.random() * 61));
            nums += data[r];
        }
        return nums;
    } else {
        return '';
    }
}

export function getScrollWidth(elem: HTMLElement) {
    let width = 0;
    if (elem) {
        width = elem.offsetWidth - elem.clientWidth;
    } else {
        elem = document.createElement('div');
        elem.style.width = '100px';
        elem.style.height = '100px';
        elem.style.overflowY = 'scroll';

        document.body.appendChild(elem);
        width = elem.offsetWidth - elem.clientWidth;
        document.body.removeChild(elem);
    }
    return width;
}

export function warning(valid: boolean, message: string) {
    // Support uglify
    if (!valid && console !== undefined && process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(`Warning: ${message}`);
    }
}

/**
 * 创建隐形表单下载方法
 * @param url 下载地址
 * @param params 参数列表
 * @param pther method：请求方式，target：是否新窗口
 */
export const download = (
    url: string,
    params: { name: string; value: string }[],
    { method, target }: { method?: 'post' | 'get'; target?: string } = { method: 'post', target: '_blank' },
) => {
    const $tempForm = document.createElement('form');
    $tempForm.style.display = 'none';
    $tempForm.action = url;
    $tempForm.method = method;
    $tempForm.target = target;

    params.forEach(item => {
        const child = document.createElement('input');
        child.type = 'hidden';
        child.value = item.value;
        child.name = item.name;
        $tempForm.appendChild(child);
    });
    document.body.appendChild($tempForm);
    $tempForm.submit();
    document.body.removeChild($tempForm);
};

export const isObject = (val: any) => val !== null && typeof val === 'object';
export const isUndefined = (val: any): val is undefined => val === undefined;
export const isBoolean = (val: any): val is boolean => typeof val === 'boolean';
export const isNumber = (val: any): val is number => typeof val === 'number';
export const isString = (val: any) => typeof val === 'string';
export const isStringNumber = (val: string): boolean => {
    if (!isString(val)) {
        return false;
    }
    return !Number.isNaN(Number(val));
};
export function addUnit(value?: string | number, defaultUnit = 'px') {
    if (!value) {
        return '';
    }
    if (isNumber(value) || isStringNumber(value)) {
        return `${value}${defaultUnit}`;
    } else if (isString(value)) {
        return value;
    }
}

export function mergeDefaultProps<T>(defaultProps: Partial<T> = {}, target: T): T {
    const props = { ...target };
    if (Object.prototype.toString.call(props) === '[object Object]' && Object.prototype.toString.call(defaultProps) === '[object Object]') {
        for (const item in defaultProps) {
            //target无值,都有取source
            if (isUndefined(props[item])) {
                Object.assign(props, { [item]: defaultProps[item] });
            } else {
                if (Object.prototype.toString.call(props[item]) === '[object Object]' && Object.prototype.toString.call(defaultProps[item]) === '[object Object]') {
                    //递归赋值
                    props[item] = mergeDefaultProps(defaultProps[item], props[item]);
                }
            }
        }
    }
    return props;
}
