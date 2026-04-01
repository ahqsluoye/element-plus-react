import is_empty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import noop from 'lodash/noop';

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
export const isFunction = val => typeof val === 'function';
export const isPropAbsent = (prop: unknown): prop is null | undefined => isNil(prop);
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

const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
function isNative(Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}
//  上面三行与核心代码关系不大，了解即可
//  noop 表示一个无操作空函数，用作函数默认值，防止传入 undefined 导致报错
//  handleError 错误处理函数
//  isIE, isIOS, isNative 环境判断函数，
//  isNative 判断某个属性或方法是否原生支持，如果不支持或通过第三方实现支持都会返回 false

export let isUsingMicroTask = false; // 标记 nextTick 最终是否以微任务执行

const callbacks = []; // 存放调用 nextTick 时传入的回调函数
let pending = false; // 标记是否已经向任务队列中添加了一个任务，如果已经添加了就不能再添加了
// 当向任务队列中添加了任务时，将 pending 置为 true，当任务被执行时将 pending 置为 false
//

// 声明 nextTick 函数，接收一个回调函数和一个执行上下文作为参数
// 回调的 this 自动绑定到调用它的实例上
export function nextTick(cb?: Function, ctx?: Object) {
    let _resolve;
    // 将传入的回调函数存放到数组中，后面会遍历执行其中的回调
    callbacks.push(() => {
        if (cb) {
            // 对传入的回调进行 try catch 错误捕获
            try {
                cb.call(ctx);
            } catch (e) {
                // 进行统一的错误处理
                // handleError(e, ctx, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(ctx);
        }
    });

    // 如果当前没有在 pending 的回调，
    // 就执行 timeFunc 函数选择当前环境优先支持的异步方法
    if (!pending) {
        pending = true;
        timerFunc();
    }

    // 如果没有传入回调，并且当前环境支持 promise，就返回一个 promise
    // 在返回的这个 promise.then 中 DOM 已经更新好了，
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(resolve => {
            _resolve = resolve;
        });
    }
}

// 判断当前环境优先支持的异步方法，优先选择微任务
// 优先级：Promise---> MutationObserver---> setImmediate---> setTimeout
// setTimeout 可能产生一个 4ms 的延迟，而 setImmediate 会在主线程执行完后立刻执行
// setImmediate 在 IE10 和 node 中支持

// 当在同一轮事件循环中多次调用 nextTick 时 ,timerFunc 只会执行一次

let timerFunc;
// 判断当前环境是否原生支持 promise
if (typeof Promise !== 'undefined' && isNative(Promise)) {
    // 支持 promise
    const p = Promise.resolve();
    timerFunc = () => {
        // 用 promise.then 把 flushCallbacks 函数包裹成一个异步微任务
        p.then(flushCallbacks);
        if (isIOS) {
            setTimeout(noop);
        }
        // 这里的 setTimeout 是用来强制刷新微任务队列的
        // 因为在 ios 下 promise.then 后面没有宏任务的话，微任务队列不会刷新
    };
    // 标记当前 nextTick 使用的微任务
    isUsingMicroTask = true;

    // 如果不支持 promise，就判断是否支持 MutationObserver
    // 不是IE环境，并且原生支持 MutationObserver，那也是一个微任务
} else if (typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || MutationObserver.toString() === '[object MutationObserverConstructor]')) {
    let counter = 1;
    // new 一个 MutationObserver 类
    const observer = new MutationObserver(flushCallbacks);
    // 创建一个文本节点
    const textNode = document.createTextNode(String(counter));
    // 监听这个文本节点，当数据发生变化就执行 flushCallbacks
    observer.observe(textNode, { characterData: true });
    timerFunc = () => {
        counter = (counter + 1) % 2;
        textNode.data = String(counter); // 数据更新
    };
    isUsingMicroTask = true; // 标记当前 nextTick 使用的微任务

    // 判断当前环境是否原生支持 setImmediate
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    timerFunc = () => {
        setImmediate(flushCallbacks);
    };
} else {
    // 以上三种都不支持就选择 setTimeout
    timerFunc = () => {
        setTimeout(flushCallbacks, 0);
    };
}

// 如果多次调用 nextTick，会依次执行上面的方法，将 nextTick 的回调放在 callbacks 数组中
// 最后通过 flushCallbacks 函数遍历 callbacks 数组的拷贝并执行其中的回调
function flushCallbacks() {
    pending = false;
    const copies = callbacks.slice(0); // 拷贝一份 callbacks
    callbacks.length = 0; // 清空 callbacks
    for (let i = 0; i < copies.length; i++) {
        // 遍历执行传入的回调
        copies[i]();
    }
}

// 为什么要拷贝一份 callbacks

// 用 callbacks.slice(0) 将 callbacks 拷贝出来一份，
// 是因为考虑到在 nextTick 回调中可能还会调用 nextTick 的情况,
// 如果在 nextTick 回调中又调用了一次 nextTick，则又会向 callbacks 中添加回调，
// 而 nextTick 回调中的 nextTick 应该放在下一轮执行，
// 否则就可能出现一直循环的情况，
// 所以需要将 callbacks 复制一份出来然后清空，再遍历备份列表执行回调

export const escapeStringRegexp = (string = '') => string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
