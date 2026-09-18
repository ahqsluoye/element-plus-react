/**
 * headingIdRewriter 编译期 rehype 插件（构建阶段生效）
 *
 * dumi 的 markdown 编译管线中，本插件在 dumi 内置 rehypeSlug 之后执行：
 * - 重写 h1-h6 的 id 属性（与运行期 DOM 重写共用同一套 core 规则）
 * - 同步更新 vfile.data.toc 中对应条目的 id，保证 TOC / 锚点与标题 id 一致
 * - 同步更新树内指向旧 id 的锚点链接（如 rehype-autolink-headings 生成的自链接）
 *
 * 因此 React 渲染的标题 id、TOC 链接 href、SSG 静态 HTML 三者天然一致，
 * 运行期插件仅作为动态内容的兜底。
 */

import { HEADING_ID_PLUGIN_NAME, HeadingIdRewriterOptions, createIdComputer, dedupeId, tryDecode } from './core';

interface HastNode {
    type?: string;
    tagName?: string;
    value?: unknown;
    properties?: Record<string, unknown> | null;
    children?: HastNode[] | null;
}

interface TocEntry {
    id: string;
    depth: number;
    title: string;
}

/** 遍历 hast 树（不依赖 unist-util-visit，避免引用 dumi 传递依赖） */
function visitElements(node: unknown, visit: (element: HastNode) => void): void {
    if (!node || typeof node !== 'object') {
        return;
    }
    if (Array.isArray(node)) {
        node.forEach(child => visitElements(child, visit));
        return;
    }
    const el = node as HastNode;
    if (el.type !== 'element') {
        return;
    }
    visit(el);
    (el.children || []).forEach(child => visitElements(child, visit));
}

/** 提取标题可见文本（与 dumi rehypeSlug 一致：忽略 Badge 内文本） */
function extractText(node: HastNode): string {
    const children = node.children || [];
    return children
        .map(child => {
            if (!child || typeof child !== 'object') {
                return '';
            }
            if (child.type === 'text') {
                return typeof child.value === 'string' ? child.value : '';
            }
            if (child.type === 'element') {
                if (child.tagName === 'Badge') {
                    return '';
                }
                return extractText(child);
            }
            return '';
        })
        .join('');
}

/**
 * rehype 插件工厂。dumi 通过 `processor.use(fn, options)` 调用，
 * 以 [rehypeHeadingIdRewriter, options] 元组形式注入 extraRehypePlugins。
 */
export function rehypeHeadingIdRewriter(options: HeadingIdRewriterOptions) {
    return function transformer(tree: unknown, vFile: { data?: Record<string, unknown> } & Record<string, unknown>) {
        try {
            const compute = createIdComputer(options, options.transform);
            const used = new Set<string>();
            const idMap = new Map<string, string>();
            const toc = (vFile?.data?.toc as TocEntry[] | undefined) || [];
            const tocById = new Map(toc.map(entry => [entry.id, entry]));
            let index = 0;

            visitElements(tree, element => {
                const level = /^h([1-6])$/.exec(element.tagName || '')?.[1];
                if (!level) {
                    return;
                }
                if (!options.levels.includes(Number(level))) {
                    return;
                }

                const properties = (element.properties ??= {});
                const oldId = properties.id;
                // 只处理已有 id 的标题（即 dumi 识别的文档标题）
                if (typeof oldId !== 'string' || !oldId) {
                    return;
                }

                const text = tocById.get(oldId)?.title ?? extractText(element).trim();
                const newId = dedupeId(compute(oldId, text, Number(level), index), used);
                index += 1;

                if (newId !== oldId) {
                    properties.id = newId;
                    idMap.set(oldId, newId);
                }
                // 打上已处理标记：运行期插件据此跳过编译期已重写的标题，保证幂等
                properties['data-heading-id-rewritten'] = 'true';
            });

            // 同步 toc 条目 id（demo 等虚拟条目无对应标题，保持原值即可）
            if (idMap.size) {
                toc.forEach(entry => {
                    const next = idMap.get(entry.id);
                    if (next) {
                        entry.id = next;
                    }
                });

                // 同步树内锚点链接（autolink 自链接、正文中 #锚点 链接）
                visitElements(tree, element => {
                    if (element.tagName !== 'a') {
                        return;
                    }
                    const href = element.properties?.href;
                    if (typeof href !== 'string' || !href.startsWith('#')) {
                        return;
                    }
                    const raw = href.slice(1);
                    const next = idMap.get(raw) ?? idMap.get(tryDecode(raw));
                    if (next) {
                        element.properties!.href = `#${next}`;
                    }
                });
            }
        } catch (error) {
            const file = (vFile?.data?.fileAbsPath as string) || (vFile as { history?: string[] })?.history?.[0] || '未知文件';
            const message = error instanceof Error ? error.message : String(error);
            console.error(`[${HEADING_ID_PLUGIN_NAME}] 编译期重写文档标题 id 失败（${file}），已保留原始 id。原因：${message}`);
        }
    };
}
