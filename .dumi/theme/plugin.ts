import { IApi } from 'dumi';
import fs from 'fs';
import path from 'path';
import { DEFAULT_HEADING_ID_OPTIONS, HEADING_ID_PLUGIN_NAME, HeadingIdRewriterOptions, mergeOptions } from './headingId/core';
import { rehypeHeadingIdRewriter } from './headingId/rehype';

const winPath = (p: string) => p.replace(/\\/g, '/');
const RUNTIME_MODULE = '.dumi/theme/headingId/runtime.ts';

/** 将配置序列化为运行时可用的模块内容：普通值走 JSON，transform 函数保存源码供运行期还原 */
function generateConfigModule(options: HeadingIdRewriterOptions): string {
    const transformSource = typeof options.transform === 'function' ? options.transform.toString() : (options.transformSource ?? null);
    const plainEntries = Object.entries({ ...options, transform: undefined, transformSource: undefined })
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => `    ${key}: ${JSON.stringify(value)},`);
    const transformEntry = transformSource ? `    transformSource: ${JSON.stringify(transformSource)},\n` : '';

    return `// @ts-nocheck
// 该文件由 headingIdRewriter 插件自动生成，请勿手动修改
export default {
${plainEntries.join('\n')}
${transformEntry}};\n`;
}

export default (api: IApi) => {
    // api.modifyHTML(($, { path }) => {
    //     console.log(path);
    //     $('h2').addClass('welcome');
    //     return $;
    // });
    // api.describe({
    //     key: 'changeFavicon',
    //     config: {
    //         schema(joi) {
    //             return joi.string();
    //         },
    //     },
    //     enableBy: api.EnableBy.config,
    // });

    // ===== headingIdRewriter：文档标题 id 重写插件 =====

    // 1. 声明插件配置（.dumirc.ts 中的 headingIdRewriter 键），提供校验与友好的配置错误提示
    api.describe({
        key: 'headingIdRewriter',
        config: {
            schema(Joi) {
                return Joi.object({
                    enabled: Joi.boolean(),
                    levels: Joi.array().items(Joi.number().integer().min(1).max(6)),
                    format: Joi.string().valid('github', 'kebab', 'snake', 'camel', 'pascal', 'lower', 'upper'),
                    prefix: Joi.string().allow(''),
                    suffix: Joi.string().allow(''),
                    transform: Joi.func(),
                    map: Joi.object().pattern(Joi.string(), Joi.string()),
                    fixedId: Joi.string().allow(''),
                    container: Joi.string(),
                    selector: Joi.string().allow(''),
                    rewriteSource: Joi.boolean(),
                    rewriteAnchors: Joi.boolean(),
                    debug: Joi.boolean(),
                }).unknown(true);
            },
        },
    });

    // 2. 构建阶段：向 markdown 编译管线注入 rehype 插件，
    //    在 dumi 内置 rehypeSlug 之后重写标题 id 并同步 toc，保证 TOC / SSG HTML 与新 id 一致
    api.modifyConfig(memo => {
        const options = mergeOptions(memo.headingIdRewriter);
        if (!options.enabled || !options.rewriteSource) {
            return memo;
        }
        const rehypePlugins = memo.extraRehypePlugins ?? (memo.extraRehypePlugins = []);
        const exists = rehypePlugins.some(plugin => Array.isArray(plugin) && plugin[0] === rehypeHeadingIdRewriter);
        if (!exists) {
            rehypePlugins.push([rehypeHeadingIdRewriter, options]);
        }
        return memo;
    });

    // 3. 生成运行期配置模块（@@/headingIdRewriter/config），序列化失败时降级并给出友好提示
    api.onGenerateFiles(() => {
        let content: string;
        try {
            content = generateConfigModule(mergeOptions(api.config.headingIdRewriter));
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            api.logger.error(`[${HEADING_ID_PLUGIN_NAME}] 运行期配置生成失败，插件将在运行时降级停用。请检查 .dumirc.ts 中 headingIdRewriter 配置。原因：${message}`);
            content = generateConfigModule({
                ...DEFAULT_HEADING_ID_OPTIONS,
                enabled: false,
                __buildError: message,
            });
        }
        api.writeTmpFile({
            noPluginDir: true,
            path: 'headingIdRewriter/config.ts',
            content,
        });
    });

    // 4. 注册运行时插件（运行阶段生效：DOM 重写标题 id、同步锚点与 hash）
    api.addRuntimePlugin(memo => {
        const runtimePath = path.join(api.cwd, RUNTIME_MODULE);
        if (!fs.existsSync(runtimePath)) {
            api.logger.error(`[${HEADING_ID_PLUGIN_NAME}] 未找到运行时模块（${winPath(runtimePath)}），文档标题 id 重写功能未生效。`);
            return memo;
        }
        return [...(memo ?? []), winPath(runtimePath)];
    });

    api.modifyExportHTMLFiles(files => {
        const nextFiles = files
            // exclude dynamic route path, to avoid deploy failed by `:id` directory
            .filter(f => !f.path.includes(':'))
            .map(file => {
                let globalStyles = '';
                // Debug for file content: uncomment this if need check raw out
                // const tmpFileName = `_${file.path.replace(/\//g, '-')}`;
                // const tmpFilePath = path.join(api.paths.absOutputPath, tmpFileName);
                // fs.writeFileSync(tmpFilePath, file.content, 'utf8');

                // extract all emotion style tags from body
                file.content = file.content.replace(/<style (data-emotion|data-sandpack)[\S\s]+?<\/style>/g, s => {
                    globalStyles += s;

                    return '';
                });

                // insert emotion style tags to head
                file.content = file.content.replace('</head>', `${globalStyles}</head>`);

                //   // 1. 提取 emotion 样式
                //   const styles = extractEmotionStyle(file.content);

                //   // 2. 提取每个样式到独立 css 文件
                //   styles.forEach((result) => {
                //     const cssFile = writeCSSFile(result.key, result.ids.join(''), result.css);
                //     file.content = addLinkStyle(file.content, cssFile);
                //   });

                //   // Insert antd style to head
                //   const matchRegex = /<style data-type="antd-cssinjs">(.*?)<\/style>/;
                //   const matchList = file.content.match(matchRegex) || [];

                //   let antdStyle = '';

                //   matchList.forEach((text) => {
                //     file.content = file.content.replace(text, '');
                //     antdStyle += text.replace(matchRegex, '$1');
                //   });

                //   const cssFile = writeCSSFile('antd', antdStyle, antdStyle);
                //   file.content = addLinkStyle(file.content, cssFile, true);

                return file;
            });

        return nextFiles;
    });
};
