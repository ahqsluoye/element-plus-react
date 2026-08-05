const fs = require('fs');
const path = require('path');

// ===== 配置 =====
const COMPONENTS_DIR = 'd:\\JavaScript\\private_projects\\element-plus-react\\dist';
const PACKAGE_ALIAS = '@qsxy/element-plus-react';
const LOG_DIR = 'd:\\JavaScript\\private_projects\\element-plus-react\\scripts';
const SUPPORTED_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

// ===== 工具函数 =====

/**
 * 递归扫描目录下所有支持的文件
 */
function findFiles(dir) {
    const results = [];
    try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                results.push(...findFiles(fullPath));
            } else if (entry.isFile() && SUPPORTED_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
                results.push(fullPath);
            }
        }
    } catch (err) {
        console.error(`  [错误] 读取目录失败: ${dir}`, err.message);
    }
    return results;
}

/**
 * 计算从文件所在目录到基础目录的相对路径
 * 例如: file=src/components/Alert/Alert.tsx, base=src/components/ → ..
 *        file=src/components/Form/utils/NameMap.ts, base=src/components/ → ../..
 */
function calculateRelativePath(filePath, baseDir) {
    const fileDir = path.dirname(filePath);
    let relative = path.relative(fileDir, baseDir);
    // 统一为 POSIX 路径分隔符
    relative = relative.replace(/\\/g, '/');
    // 确保相对路径以 ./ 或 ../ 开头
    if (!relative.startsWith('.')) {
        relative = './' + relative;
    }
    // 去除末尾的斜杠
    relative = relative.replace(/\/$/, '');
    return relative;
}

/**
 * 检查文件内容是否包含别名引用
 */
function containsAlias(content) {
    const regex = new RegExp(escapeRegex(PACKAGE_ALIAS));
    return regex.test(content);
}

/**
 * 转义正则表达式中的特殊字符
 */
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 从内容中提取指定行的文本
 */
function getLineFromContent(content, lineNumber) {
    const lines = content.split('\n');
    if (lineNumber >= 1 && lineNumber <= lines.length) {
        return lines[lineNumber - 1].trim();
    }
    return '';
}

/**
 * 获取文件中所有需要替换的导入信息
 *
 * 匹配引号内的 @qsxy/element-plus-react/xxx 路径，如:
 *   from '@qsxy/element-plus-react/hooks/useClassNames'
 *   from "@qsxy/element-plus-react/hooks/useClassNames"
 *   import('@qsxy/element-plus-react/hooks/useClassNames')
 *   require('@qsxy/element-plus-react/hooks/useClassNames')
 *   export { X } from '@qsxy/element-plus-react/hooks/useClassNames'
 *
 * 正则匹配: 捕获引号字符和子路径，完整匹配包含引号
 * 例如: '@qsxy/element-plus-react/hooks/useClassNames' 匹配为:
 *   group1 = ' (引号)
 *   group2 = /hooks/useClassNames (子路径)
 *   完整匹配 = '@qsxy/element-plus-react/hooks/useClassNames'
 */
function getReplacements(content, relativePath) {
    const replacements = [];
    // 匹配单引号或双引号内的 @qsxy/element-plus-react 路径
    // 分组1: 引号字符，分组2: 子路径（以 / 开头）
    const regex = new RegExp(`(['"])${escapeRegex(PACKAGE_ALIAS)}(\\/[^'"]*)?\\1`, 'g');

    let match;
    while ((match = regex.exec(content)) !== null) {
        const quote = match[1];
        const subPath = match[2] || '';
        const oldPath = `${PACKAGE_ALIAS}${subPath}`;
        const newPath = `${relativePath}${subPath}`;
        // 完整匹配包含引号: '@qsxy/...'
        const startPos = match.index;
        const endPos = match.index + match[0].length;
        const lineNumber = content.substring(0, startPos).split('\n').length;

        replacements.push({
            oldPath,
            newPath,
            quote,
            startPos,
            endPos,
            lineNumber,
        });
    }

    return replacements;
}

// ===== 主流程 =====

function main() {
    const mode = process.argv[2] || 'preview';
    const isExecute = mode === 'execute' || mode === 'exec' || mode === 'run';

    console.log('='.repeat(80));
    console.log('  批量路径替换工具');
    console.log(`  模式: ${isExecute ? '执行替换' : '预览模式'}`);
    console.log(`  扫描目录: ${COMPONENTS_DIR}`);
    console.log(`  替换目标: ${PACKAGE_ALIAS} → 相对路径`);
    console.log('='.repeat(80));
    console.log('');

    // 1. 扫描文件
    console.log('正在扫描文件...');
    const allFiles = findFiles(COMPONENTS_DIR);
    console.log(`找到 ${allFiles.length} 个支持文件`);
    console.log('');

    // 2. 筛选包含别名引用的文件
    const targetFiles = [];
    for (const file of allFiles) {
        try {
            const content = fs.readFileSync(file, 'utf-8');
            if (containsAlias(content)) {
                targetFiles.push({ filePath: file, content });
            }
        } catch (err) {
            console.error(`  [错误] 读取文件失败: ${file}`, err.message);
        }
    }

    if (targetFiles.length === 0) {
        console.log('未找到包含别名引用的文件，无需处理。');
        return;
    }

    console.log(`发现 ${targetFiles.length} 个文件包含 "${PACKAGE_ALIAS}" 引用`);
    console.log('');

    // 3. 生成替换预览
    const previewData = [];
    let totalReplacements = 0;

    for (const { filePath, content } of targetFiles) {
        const relativePath = calculateRelativePath(filePath, COMPONENTS_DIR);
        const replacements = getReplacements(content, relativePath);

        if (replacements.length === 0) continue;

        const displayPath = path.relative(COMPONENTS_DIR, filePath);
        previewData.push({
            filePath,
            displayPath,
            relativePath,
            replacements,
        });
        totalReplacements += replacements.length;
    }

    // 4. 输出预览报告
    console.log('─'.repeat(80));
    console.log('  替换预览报告');
    console.log('─'.repeat(80));
    console.log('');

    for (const item of previewData) {
        console.log(`  [${item.displayPath}]`);
        console.log(`    相对路径前缀: ${item.relativePath}/`);

        // 按行号分组显示
        const lineGroups = {};
        for (const r of item.replacements) {
            if (!lineGroups[r.lineNumber]) {
                lineGroups[r.lineNumber] = [];
            }
            lineGroups[r.lineNumber].push(r);
        }

        for (const [lineNum, reps] of Object.entries(lineGroups)) {
            const lineContent = getLineFromContent(targetFiles.find(f => f.filePath === item.filePath)?.content || '', parseInt(lineNum));
            console.log(`    行 ${lineNum}: ${lineContent}`);
            for (const r of reps) {
                console.log(`      ${r.oldPath}  →  ${r.newPath}`);
            }
        }
        console.log('');
    }

    console.log('─'.repeat(80));
    console.log(`  总计: ${previewData.length} 个文件, ${totalReplacements} 处替换`);
    console.log('─'.repeat(80));
    console.log('');

    // 5. 如果是预览模式，保存报告并退出
    if (!isExecute) {
        console.log('提示: 执行替换请运行: node scripts/replace-aliases.js execute');
        console.log('');

        // 保存预览报告到文件
        const previewReportPath = path.join(LOG_DIR, 'replace-aliases-preview.json');
        const previewReport = previewData.map(item => ({
            file: item.displayPath,
            relativePrefix: item.relativePath,
            replacements: item.replacements.map(r => ({
                line: r.lineNumber,
                old: r.oldPath,
                new: r.newPath,
            })),
        }));
        fs.writeFileSync(previewReportPath, JSON.stringify(previewReport, null, 2), 'utf-8');
        console.log(`预览报告已保存至: ${previewReportPath}`);
        return;
    }

    // 6. 执行替换
    console.log('正在执行替换...');
    console.log('');

    const executionResults = [];
    let successCount = 0;
    let failCount = 0;

    for (const item of previewData) {
        try {
            const fileInfo = targetFiles.find(f => f.filePath === item.filePath);
            if (!fileInfo) continue;

            let newContent = fileInfo.content;
            // 从后往前替换，避免位置偏移
            const sorted = [...item.replacements].sort((a, b) => b.startPos - a.startPos);
            for (const r of sorted) {
                const before = newContent.substring(0, r.startPos);
                const after = newContent.substring(r.endPos);
                // 替换引号内的路径: 完整匹配包含引号，替换为 引号 + 新路径 + 引号
                newContent = before + r.quote + r.newPath + r.quote + after;
            }

            fs.writeFileSync(item.filePath, newContent, 'utf-8');

            executionResults.push({
                file: item.displayPath,
                status: 'success',
                replacements: item.replacements.length,
            });
            successCount++;
            console.log(`  [✓] ${item.displayPath} (${item.replacements} 处替换)`);
        } catch (err) {
            executionResults.push({
                file: item.displayPath,
                status: 'fail',
                error: err.message,
            });
            failCount++;
            console.log(`  [✗] ${item.displayPath} - ${err.message}`);
        }
    }

    // 7. 生成结果日志
    console.log('');
    console.log('─'.repeat(80));
    console.log('  替换完成');
    console.log('─'.repeat(80));
    console.log(`  成功: ${successCount} 个文件`);
    console.log(`  失败: ${failCount} 个文件`);
    console.log(`  总替换: ${totalReplacements} 处`);

    const logData = {
        timestamp: new Date().toISOString(),
        mode: 'execute',
        scanDirectory: COMPONENTS_DIR,
        packageAlias: PACKAGE_ALIAS,
        totalFilesScanned: allFiles.length,
        filesWithAlias: targetFiles.length,
        totalReplacements,
        successCount,
        failCount,
        results: executionResults,
    };

    const logPath = path.join(LOG_DIR, 'replace-aliases-log.json');
    fs.writeFileSync(logPath, JSON.stringify(logData, null, 2), 'utf-8');
    console.log('');
    console.log(`替换日志已保存至: ${logPath}`);

    // 同时生成可读的文本报告
    const txtReportPath = path.join(LOG_DIR, 'replace-aliases-report.txt');
    const reportLines = [
        '='.repeat(80),
        '  批量路径替换结果报告',
        '='.repeat(80),
        `  执行时间: ${logData.timestamp}`,
        `  扫描目录: ${logData.scanDirectory}`,
        `  替换目标: ${logData.packageAlias} → 相对路径`,
        '',
        `  扫描文件数: ${logData.totalFilesScanned}`,
        `  命中文件数: ${logData.filesWithAlias}`,
        `  总替换数: ${logData.totalReplacements}`,
        `  成功文件: ${logData.successCount}`,
        `  失败文件: ${logData.failCount}`,
        '',
        '─'.repeat(80),
        '  替换详情',
        '─'.repeat(80),
        '',
    ];

    for (const item of previewData) {
        reportLines.push(`  [${item.displayPath}]`);
        for (const r of item.replacements) {
            reportLines.push(`    行 ${r.lineNumber}: ${r.oldPath}  →  ${r.newPath}`);
        }
        reportLines.push('');
    }

    reportLines.push('='.repeat(80));
    reportLines.push('  报告结束');
    reportLines.push('='.repeat(80));

    fs.writeFileSync(txtReportPath, reportLines.join('\n'), 'utf-8');
    console.log(`文本报告已保存至: ${txtReportPath}`);
}

main();
