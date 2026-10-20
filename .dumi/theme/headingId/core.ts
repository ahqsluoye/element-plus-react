/**
 * headingIdRewriter 共享核心逻辑
 *
 * 同时被以下场景使用（保持各阶段行为一致）：
 * - rehype.ts     编译期（Node，markdown 管线内重写标题 id 并同步 toc）
 * - runtime.ts    运行期（浏览器，DOM 层重写标题 id 并同步锚点）
 *
 * 注意：本模块禁止引入 DOM / Node 专有 API，保持纯函数。
 */

export type HeadingIdFormat = 'github' | 'kebab' | 'snake' | 'camel' | 'pascal' | 'lower' | 'upper';

export interface HeadingIdContext {
    /** 标题级别 1-6 */
    level: number;
    /** 标题文本（编译期为 toc 标题，运行期为 textContent，均为最佳努力） */
    text: string;
    /** 重写前的原始 id */
    oldId: string;
    /** 本次处理中该标题的序号（从 0 开始） */
    index: number;
}

export type HeadingIdTransform = (id: string, ctx: HeadingIdContext) => string | null | undefined | void;

export interface HeadingIdRewriterOptions {
    /** 是否启用插件 */
    enabled: boolean;
    /** 处理的标题级别，默认 1-6 级全部处理 */
    levels: number[];
    /** id 生成格式（作用于原 id），github 表示保持 dumi 原生 slug */
    format: HeadingIdFormat;
    /** 统一前缀 */
    prefix: string;
    /** 统一后缀 */
    suffix: string;
    /** 自定义生成规则（编译期直接调用；运行期由 transformSource 还原） */
    transform: HeadingIdTransform | null;
    /** transform 函数源码（仅运行期用于还原函数） */
    transformSource: string | null;
    /** 固定映射：key 为原始 id（或标题文本），value 为固定 id，优先级最高 */
    map: Record<string, string>;
    /** 全局固定 id 值（优先级低于 map；多标题重复时会自动追加 -2、-3 后缀） */
    fixedId: string;
    /** 运行期作用域容器选择器 */
    container: string;
    /** 运行期自定义标题选择器（覆盖 levels 生成的默认选择器） */
    selector: string;
    /** 编译期重写 markdown 源（关闭后仅运行期重写 DOM） */
    rewriteSource: boolean;
    /** 运行期同步锚点链接与 URL hash */
    rewriteAnchors: boolean;
    /** 调试日志 */
    debug: boolean;
    /** 构建期错误信息（由插件写入，运行期据此给出友好提示并停用） */
    __buildError?: string;
}

export const HEADING_ID_PLUGIN_NAME = 'HeadingIdRewriter';

export const DEFAULT_HEADING_ID_OPTIONS: HeadingIdRewriterOptions = {
    enabled: true,
    levels: [1, 2, 3, 4, 5, 6],
    format: 'github',
    prefix: '',
    suffix: '',
    transform: null,
    transformSource: null,
    map: {},
    fixedId: '',
    container: 'body',
    selector: '',
    rewriteSource: true,
    rewriteAnchors: true,
    debug: false,
};

const FORMATS: HeadingIdFormat[] = ['github', 'kebab', 'snake', 'camel', 'pascal', 'lower', 'upper'];

/** 合并用户配置与默认值，并做基础归一化（永不抛错） */
export function mergeOptions(raw?: Partial<HeadingIdRewriterOptions> | null): HeadingIdRewriterOptions {
    const user = raw && typeof raw === 'object' ? raw : {};
    const levels = Array.isArray(user.levels) ? user.levels.filter(n => Number.isInteger(n) && n >= 1 && n <= 6) : [];
    const format = FORMATS.includes(user.format as HeadingIdFormat) ? (user.format as HeadingIdFormat) : DEFAULT_HEADING_ID_OPTIONS.format;
    const map =
        user.map && typeof user.map === 'object' && !Array.isArray(user.map)
            ? (Object.fromEntries(Object.entries(user.map).filter((entry): entry is [string, string] => typeof entry[1] === 'string')) as Record<string, string>)
            : {};

    return {
        ...DEFAULT_HEADING_ID_OPTIONS,
        ...user,
        levels: levels.length ? [...new Set(levels)].sort((a, b) => a - b) : [...DEFAULT_HEADING_ID_OPTIONS.levels],
        format,
        prefix: typeof user.prefix === 'string' ? user.prefix : '',
        suffix: typeof user.suffix === 'string' ? user.suffix : '',
        transform: typeof user.transform === 'function' ? user.transform : null,
        transformSource: typeof user.transformSource === 'string' ? user.transformSource : null,
        map,
        fixedId: typeof user.fixedId === 'string' ? user.fixedId : '',
        container: typeof user.container === 'string' && user.container ? user.container : DEFAULT_HEADING_ID_OPTIONS.container,
        selector: typeof user.selector === 'string' ? user.selector : '',
    };
}

/** 按 url 片段惯例清洗 id：去首部 #、空白折叠为 - */
export function sanitizeId(input: unknown): string {
    if (typeof input !== 'string') {
        return '';
    }
    return input.trim().replace(/^#/, '').replace(/\s+/g, '-');
}

/** 尽力解码 URI 片段（中文锚点可能被编码） */
export function tryDecode(value: string): string {
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
}

function toCamelParts(id: string): string[] {
    return id
        .split(/[-_\s]+/)
        .filter(Boolean)
        .map((part, index) => {
            const lower = part.toLowerCase();
            return index === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
        });
}

/** 对既有 id 应用目标格式 */
export function applyFormat(id: string, format: HeadingIdFormat): string {
    switch (format) {
        case 'github':
            // dumi 原生 id 即 github-slugger 风格，保持不变
            return id;
        case 'lower':
            return id.toLowerCase();
        case 'upper':
            return id.toUpperCase();
        case 'kebab':
            return id
                .trim()
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/-{2,}/g, '-')
                .replace(/^-+|-+$/g, '');
        case 'snake':
            return id
                .trim()
                .toLowerCase()
                .replace(/[-\s]+/g, '_');
        case 'camel': {
            const parts = toCamelParts(id);
            return parts[0] ? parts[0] + parts.slice(1).join('') : '';
        }
        case 'pascal': {
            const parts = toCamelParts(id).map(part => part.charAt(0).toUpperCase() + part.slice(1));
            return parts.join('');
        }
        default:
            return id;
    }
}

/** 去重：与已占用 id 冲突时追加 -2、-3… 后缀 */
export function dedupeId(id: string, used: Set<string>): string {
    let candidate = id;
    let index = 2;
    while (used.has(candidate)) {
        candidate = `${id}-${index}`;
        index += 1;
    }
    used.add(candidate);
    return candidate;
}

/**
 * 计算标题新 id，优先级：map > fixedId > format/prefix/suffix > transform（最终覆盖）
 * 返回空结果时回退为原 id。
 */
export function computeNewId(oldId: string, text: string, level: number, index: number, options: HeadingIdRewriterOptions, transform: HeadingIdTransform | null): string {
    const map = options.map || {};
    const decodedId = tryDecode(oldId);
    const fixed = map[oldId] ?? (decodedId !== oldId ? map[decodedId] : undefined) ?? (text ? map[text] : undefined);

    if (typeof fixed === 'string' && fixed.trim()) {
        return sanitizeId(fixed) || oldId;
    }

    if (options.fixedId && options.fixedId.trim()) {
        return sanitizeId(options.fixedId) || oldId;
    }

    const title = text.replace(/\d{1,3}\.\d{1,3}\.\d{1,3}/g, '');
    const version = text.replace(title, '');
    if (version.trim()) {
        oldId = oldId.replace(version.replace(/\./g, ''), '');
    }

    let next = `${options.prefix}${applyFormat(oldId, options.format)}${options.suffix}`;

    if (typeof transform === 'function') {
        // transform 由调用方包裹 try/catch（见 createIdComputer），此处允许抛错
        const custom = transform(next, { level, text, oldId, index });
        if (typeof custom === 'string' && custom.trim()) {
            next = custom;
        }
    }

    return sanitizeId(next) || oldId;
}

/**
 * 创建带 transform 异常兜底的 id 计算器：
 * 自定义 transform 执行失败时仅告警一次，并回退到默认规则，不中断整个流程。
 */
export function createIdComputer(options: HeadingIdRewriterOptions, transform: HeadingIdTransform | null): (oldId: string, text: string, level: number, index: number) => string {
    let transformFailed = false;
    return (oldId, text, level, index) => {
        try {
            return computeNewId(oldId, text, level, index, options, transformFailed ? null : transform);
        } catch (error) {
            transformFailed = true;
            const message = error instanceof Error ? error.message : String(error);
            console.error(`[${HEADING_ID_PLUGIN_NAME}] 自定义 transform 函数执行失败，已忽略自定义规则并回退到默认规则。原因：${message}`);
            return computeNewId(oldId, text, level, index, options, null);
        }
    };
}

/** 生成运行期标题选择器（供 runtime 使用，rehype 不需要） */
export function buildHeadingSelector(options: HeadingIdRewriterOptions): string {
    if (options.selector) {
        return options.selector;
    }
    return options.levels.map(level => `h${level}[id]`).join(',');
}
