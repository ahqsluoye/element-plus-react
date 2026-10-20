/**
 * headingIdRewriter 运行时插件（运行阶段生效）
 *
 * 以 umi/dumi 运行时插件形式注册（onRouteChange）：
 * - 路由切换后重写文档区域内 h1-h6 的 id 属性（与编译期共用同一套 core 规则）
 * - 同步页面内指向旧 id 的锚点链接、TOC 链接，以及 URL hash
 * - 通过 MutationObserver 兜底处理异步渲染的内容（演示组件、Tabs 等）
 * - 任何异常均自动停用并输出友好错误提示，不影响文档站正常使用
 */

import {
    DEFAULT_HEADING_ID_OPTIONS,
    HEADING_ID_PLUGIN_NAME,
    HeadingIdRewriterOptions,
    HeadingIdTransform,
    buildHeadingSelector,
    createIdComputer,
    dedupeId,
    mergeOptions,
    tryDecode,
} from './core';
// 该模块由插件在构建期自动生成（.dumi/tmp/headingIdRewriter/config.ts）
import rawConfig from '@@/headingIdRewriter/config';

declare global {
    interface Window {
        __EPR_HEADING_ID_REWRITER__?: { observer?: MutationObserver | null };
    }
}

interface RuntimeState {
    options: HeadingIdRewriterOptions;
    compute: (oldId: string, text: string, level: number, index: number) => string;
    observer: MutationObserver | null;
    scheduled: boolean;
    failed: boolean;
}

let state: RuntimeState | null = null;

/** 还原/校验运行期配置，失败时给出友好提示 */
function normalizeRuntimeConfig(raw: unknown): HeadingIdRewriterOptions {
    const user = (raw && typeof raw === 'object' ? raw : {}) as Partial<HeadingIdRewriterOptions> & {
        __buildError?: string;
        transformSource?: string | null;
    };

    if (user.__buildError) {
        console.error(`[${HEADING_ID_PLUGIN_NAME}] 构建期配置生成失败，插件已停用。请检查 .dumirc.ts 中 headingIdRewriter 配置。原因：${user.__buildError}`);
        return { ...DEFAULT_HEADING_ID_OPTIONS, enabled: false };
    }

    const options = mergeOptions(user);

    // transform 函数无法跨构建序列化，构建期将函数源码写入 transformSource，此处还原
    let transform: HeadingIdTransform | null = options.transform;
    if (!transform && user.transformSource) {
        try {
            transform = new Function(`return (${user.transformSource})`)() as HeadingIdTransform;
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error(`[${HEADING_ID_PLUGIN_NAME}] 自定义 transform 函数还原失败，已忽略自定义规则。请确保其为独立函数（不依赖外部闭包变量）。原因：${message}`);
            transform = null;
        }
    }
    options.transform = transform;
    return options;
}

function reportFailure(error: unknown): void {
    if (!state || state.failed) {
        return;
    }
    state.failed = true;
    try {
        state.observer?.disconnect();
    } catch {
        /* ignore */
    }
    state.observer = null;
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[${HEADING_ID_PLUGIN_NAME}] 运行时处理文档标题 id 时发生错误，插件已自动停用，不影响文档站其余功能。原因：${message}`);
}

function scheduleApply(): void {
    if (!state || state.failed || state.scheduled) {
        return;
    }
    state.scheduled = true;
    const run = () => {
        if (!state) {
            return;
        }
        state.scheduled = false;
        applyRewrite();
    };
    if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(run);
    } else {
        setTimeout(run, 16);
    }
}

function setupObserver(): void {
    if (!state || state.observer) {
        return;
    }
    // 兼容 dev 环境模块热更新：复用/清理全局 observer，避免重复处理
    const previous = window.__EPR_HEADING_ID_REWRITER__?.observer;
    if (previous) {
        previous.disconnect();
        window.__EPR_HEADING_ID_REWRITER__.observer = null;
    }

    const scope = document.querySelector(state.options.container) || document.body;
    const observer = new MutationObserver(() => scheduleApply());
    // 只监听子树变化与 id 属性变化；锚点 href 变更由本插件产生但不监听，天然避免循环
    observer.observe(scope, { childList: true, subtree: true, attributeFilter: ['id'] });
    state.observer = observer;
    window.__EPR_HEADING_ID_REWRITER__ = { observer };
}

/** 重写容器内标题 id，并返回旧 id -> 新 id 的映射 */
function rewriteHeadings(scope: HTMLElement): Map<string, string> {
    const { options, compute } = state!;
    const headings = Array.from(scope.querySelectorAll<HTMLElement>(buildHeadingSelector(options)));
    const used = new Set<string>();
    const idMap = new Map<string, string>();
    let index = 0;

    for (const element of headings) {
        const oldId = element.id;
        if (!oldId) {
            continue;
        }
        // 编译期已重写的标题（带标记）跳过，仅占用其 id 以参与去重，保证幂等
        if (element.hasAttribute('data-heading-id-rewritten')) {
            used.add(oldId);
            continue;
        }
        const level = /^h([1-6])$/.test(element.tagName) ? Number(element.tagName.slice(1)) : 0;
        const text = (element.textContent || '').trim();
        const newId = dedupeId(compute(oldId, text, level, index), used);
        index += 1;
        // 无论 id 是否变化都打上标记，避免后续观察器触发的重放再次计算
        element.setAttribute('data-heading-id-rewritten', 'true');
        if (newId !== oldId) {
            // 仅在 id 变化时写入，避免多余 DOM 操作影响布局与渲染
            element.id = newId;
            idMap.set(oldId, newId);
        }
    }
    return idMap;
}

/** 同步页面内指向旧 id 的锚点链接（TOC、正文内链等） */
function rewriteAnchorHrefs(idMap: Map<string, string>): void {
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
        const raw = (anchor.getAttribute('href') || '').slice(1);
        if (!raw) {
            return;
        }
        const next = idMap.get(raw) ?? idMap.get(tryDecode(raw));
        if (next) {
            anchor.setAttribute('href', `#${next}`);
        }
    });
}

/** 当前 URL hash 指向旧 id 时，静默替换为新 id（不触发滚动） */
function syncHash(idMap: Map<string, string>): void {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) {
        return;
    }
    const raw = hash.slice(1);
    const next = idMap.get(raw) ?? idMap.get(tryDecode(raw));
    if (next) {
        window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}#${next}`);
    }
}

/** 点击兜底：旧 id 锚点被点击时映射到新 id 后平滑滚动（编译期已重写时本逻辑不会触发） */
function setupClickFallback(): void {
    document.addEventListener(
        'click',
        event => {
            if (!state || state.failed || !state.options.rewriteAnchors) {
                return;
            }
            const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]');
            if (!anchor) {
                return;
            }
            const raw = (anchor.getAttribute('href') || '').slice(1);
            if (!raw) {
                return;
            }
            const next = idMapForClick.get(raw) ?? idMapForClick.get(tryDecode(raw));
            if (!next) {
                return;
            }
            const target = document.getElementById(next);
            // 旧 id 已不存在而新 id 存在时才接管，避免与正常锚点行为冲突
            if (target && !document.getElementById(raw)) {
                event.preventDefault();
                window.history.replaceState(window.history.state, '', `${window.location.pathname}${window.location.search}#${next}`);
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        },
        true,
    );
}

// 最近一次重写的映射，供点击兜底使用（路由切换后由 applyRewrite 刷新）
let idMapForClick: Map<string, string> = new Map();

function applyRewrite(): void {
    if (!state || state.failed) {
        return;
    }
    try {
        const scope = document.querySelector(state.options.container) as HTMLElement | null;
        if (!scope) {
            return;
        }
        const idMap = rewriteHeadings(scope);
        if (!idMap.size) {
            return;
        }
        idMapForClick = idMap;
        if (state.options.rewriteAnchors) {
            rewriteAnchorHrefs(idMap);
            syncHash(idMap);
        }
        if (state.options.debug) {
            console.warn(`[${HEADING_ID_PLUGIN_NAME}] 本次重写 ${idMap.size} 个标题 id：`, Object.fromEntries(idMap));
        }
    } catch (error) {
        reportFailure(error);
    }
}

// 模块级懒初始化：umi 运行时插件要求以命名导出形式提供 hook，
// 初始化逻辑在首个路由事件触发时执行，任何异常仅输出友好提示并停用插件
let initialized = false;

function ensureInit(): void {
    // if (initialized) {
    //     return;
    // }
    initialized = true;

    // SSG 预渲染 / Node 环境直接跳过（静态 HTML 的 id 已由编译期插件重写）
    if (typeof document === 'undefined' || typeof window === 'undefined') {
        state = { options: { ...DEFAULT_HEADING_ID_OPTIONS, enabled: false }, compute: () => '', observer: null, scheduled: false, failed: true };
        return;
    }

    try {
        const options = normalizeRuntimeConfig(rawConfig);
        if (!options.enabled) {
            state = { options, compute: () => '', observer: null, scheduled: false, failed: true };
            return;
        }

        state = {
            options,
            compute: createIdComputer(options, options.transform),
            observer: null,
            scheduled: false,
            failed: false,
        };

        setupClickFallback();
        if (options.debug) {
            console.warn(`[${HEADING_ID_PLUGIN_NAME}] 运行时插件已启用：`, {
                format: options.format,
                prefix: options.prefix,
                suffix: options.suffix,
                levels: options.levels,
                rewriteSource: options.rewriteSource,
                rewriteAnchors: options.rewriteAnchors,
            });
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`[${HEADING_ID_PLUGIN_NAME}] 运行时插件初始化失败，文档标题 id 重写功能已停用。原因：${message}`);
        state = { options: { ...DEFAULT_HEADING_ID_OPTIONS, enabled: false }, compute: () => '', observer: null, scheduled: false, failed: true };
    }
}

export function onRouteChange(): void {
    ensureInit();
    if (!state || state.failed) {
        return;
    }
    try {
        setupObserver();
    } catch (error) {
        reportFailure(error);
        return;
    }
    scheduleApply();
}
