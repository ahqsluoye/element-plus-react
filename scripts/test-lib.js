const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ===== 配置 =====
// 目标目录变量：可通过命令行参数传入，也可直接修改此处默认值
const TARGET_DIR = process.argv[2];
if (!TARGET_DIR) {
    fail('请提供目标目录参数');
    process.exit(1);
}

// 路径常量
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(PROJECT_ROOT, 'dist');
const TARGET_DIST_DIR = path.join(TARGET_DIR, 'node_modules', '@qsxy', 'element-plus-react', 'dist');
const REPLACE_ALIASES_LOG = path.join(PROJECT_ROOT, 'scripts', 'replace-aliases-log.json');

// ===== 日志工具 =====

function header(msg) {
    console.log('');
    console.log('═'.repeat(64));
    console.log(`  ${msg}`);
    console.log('═'.repeat(64));
}

function step(num, msg) {
    console.log('');
    console.log('─'.repeat(64));
    console.log(`  步骤 ${num}: ${msg}`);
    console.log('─'.repeat(64));
}

function ok(msg) {
    console.log(`    ✓ ${msg}`);
}

function fail(msg) {
    console.error(`    ✗ ${msg}`);
}

function info(msg) {
    console.log(`    ℹ ${msg}`);
}

// ===== 验证函数 =====

function validatePaths() {
    header('验证路径配置');

    // 验证项目根目录
    if (!fs.existsSync(PROJECT_ROOT)) {
        fail(`项目根目录不存在: ${PROJECT_ROOT}`);
        process.exit(1);
    }
    ok(`项目根目录: ${PROJECT_ROOT}`);

    // 验证 copyLib.js
    const copyLibScript = path.join(PROJECT_ROOT, 'scripts', 'copyLib.js');
    if (!fs.existsSync(copyLibScript)) {
        fail(`copyLib.js 不存在: ${copyLibScript}`);
        process.exit(1);
    }
    ok(`copyLib.js 存在`);

    // 验证 replace-aliases.js
    const replaceScript = path.join(PROJECT_ROOT, 'scripts', 'replace-aliases.js');
    if (!fs.existsSync(replaceScript)) {
        fail(`replace-aliases.js 不存在: ${replaceScript}`);
        process.exit(1);
    }
    ok(`replace-aliases.js 存在`);

    // 验证目标目录
    if (!fs.existsSync(TARGET_DIR)) {
        fail(`目标目录不存在: ${TARGET_DIR}`);
        process.exit(1);
    }
    ok(`目标目录: ${TARGET_DIR}`);

    // 验证目标 dist 目录
    if (!fs.existsSync(TARGET_DIST_DIR)) {
        fail(`目标 dist 目录不存在: ${TARGET_DIST_DIR}`);
        fail(`路径: ${TARGET_DIST_DIR}`);
        fail('请先在目标项目中安装 @qsxy/element-plus-react 包');
        process.exit(1);
    }
    ok(`目标 dist 目录: ${TARGET_DIST_DIR}`);

    // 解析真实路径（处理 pnpm 符号链接）
    try {
        const realPath = fs.realpathSync(TARGET_DIST_DIR);
        if (realPath !== TARGET_DIST_DIR) {
            info(`pnpm 符号链接解析: ${TARGET_DIST_DIR}`);
            info(`  → 实际路径: ${realPath}`);
        }
    } catch (err) {
        info(`无法解析真实路径: ${err.message}`);
    }

    // 验证目标 dist 中存在 index.d.ts
    const indexDtPath = path.join(TARGET_DIST_DIR, 'index.d.ts');
    if (!fs.existsSync(indexDtPath)) {
        fail(`目标 dist 中不存在 index.d.ts: ${indexDtPath}`);
        process.exit(1);
    }
    ok(`index.d.ts 存在，将保留此文件`);
    // 验证目标 dist 中存在 index.css
    const indexCssPath = path.join(TARGET_DIST_DIR, 'index.css');
    if (!fs.existsSync(indexCssPath)) {
        fail(`目标 dist 中不存在 index.css: ${indexCssPath}`);
        process.exit(1);
    }
    ok(`index.css 存在，将保留此文件`);
    // 验证目标 dist 中存在 display.css
    const displayCssPath = path.join(TARGET_DIST_DIR, 'display.css');
    if (!fs.existsSync(displayCssPath)) {
        fail(`目标 dist 中不存在 display.css: ${displayCssPath}`);
        process.exit(1);
    }
    ok(`display.css 存在，将保留此文件`);
}

// ===== 步骤实现 =====

function step0_cleanDist() {
    step(0, '清理 dist 目录（清除旧文件）');

    try {
        if (fs.existsSync(DIST_DIR)) {
            fs.rmSync(DIST_DIR, { recursive: true, force: true });
            ok('已清除旧的 dist 目录');
        } else {
            info('dist 目录不存在，跳过清除');
        }
        fs.mkdirSync(DIST_DIR, { recursive: true });
        ok('已创建干净的 dist 目录');
    } catch (err) {
        fail(`清理 dist 目录失败: ${err.message}`);
        process.exit(1);
    }
}

function step1_copyLib() {
    step(1, '执行 node scripts/copyLib.js');

    try {
        execSync('node scripts/copyLib.js', {
            cwd: PROJECT_ROOT,
            stdio: 'pipe',
            timeout: 60000,
        });
        ok('copyLib.js 执行完成');
    } catch (err) {
        fail(`copyLib.js 执行失败 (退出码: ${err.status})`);
        if (err.stderr) console.error(err.stderr.toString());
        process.exit(1);
    }

    // 验证 dist 目录已生成
    if (!fs.existsSync(DIST_DIR)) {
        fail('dist 目录未生成，copyLib.js 可能未正确执行');
        process.exit(1);
    }

    // 统计 dist 文件数量
    let fileCount = 0;
    function countFiles(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const e of entries) {
            if (e.isFile()) fileCount++;
            else countFiles(path.join(dir, e.name));
        }
    }
    countFiles(DIST_DIR);

    if (fileCount === 0) {
        fail('dist 目录为空，copyLib.js 未复制任何文件');
        process.exit(1);
    }
    ok(`dist 目录已生成，包含 ${fileCount} 个文件`);
}

function step2_replaceAliases() {
    step(2, '执行 node scripts/replace-aliases.js execute');

    try {
        execSync('node scripts/replace-aliases.js execute', {
            cwd: PROJECT_ROOT,
            stdio: 'pipe',
            timeout: 300000,
        });
        ok('replace-aliases.js 执行完成');
    } catch (err) {
        fail(`replace-aliases.js 执行失败 (退出码: ${err.status})`);
        if (err.stderr) console.error(err.stderr.toString());
        process.exit(1);
    }

    // 解析日志文件验证替换结果
    if (fs.existsSync(REPLACE_ALIASES_LOG)) {
        try {
            const logData = JSON.parse(fs.readFileSync(REPLACE_ALIASES_LOG, 'utf-8'));
            if (logData.failCount > 0) {
                fail(`替换过程中有 ${logData.failCount} 个文件失败`);
                logData.results.filter(r => r.status === 'fail').forEach(r => fail(`  ${r.file}: ${r.error}`));
                process.exit(1);
            }
            ok(`替换成功: ${logData.successCount} 个文件，共 ${logData.totalReplacements} 处替换`);
        } catch (err) {
            info(`无法解析日志文件: ${err.message}`);
            info('继续执行后续步骤...');
        }
    } else {
        info('日志文件不存在，跳过结果验证');
    }
}

function step3_cleanTargetDist() {
    step(3, '清理目标 dist 目录（保留 index.d.ts）');

    // 保存 index.d.ts 到内存
    const indexDtPath = path.join(TARGET_DIST_DIR, 'index.d.ts');
    let indexDtBuffer;
    try {
        indexDtBuffer = fs.readFileSync(indexDtPath);
        ok(`已读取 index.d.ts (${indexDtBuffer.length} 字节)`);
    } catch (err) {
        fail(`读取 index.d.ts 失败: ${err.message}`);
        process.exit(1);
    }
    // 保存index.css
    const indexCssPath = path.join(TARGET_DIST_DIR, 'index.css');
    let indexCssBuffer;
    try {
        indexCssBuffer = fs.readFileSync(indexCssPath);
        ok(`已读取 index.css (${indexCssBuffer.length} 字节)`);
    } catch (err) {
        fail(`读取 index.css 失败: ${err.message}`);
        process.exit(1);
    }
    // 保存display.css
    const displayCssPath = path.join(TARGET_DIST_DIR, 'display.css');
    let displayCssBuffer;
    try {
        displayCssBuffer = fs.readFileSync(displayCssPath);
        ok(`已读取 display.css (${displayCssBuffer.length} 字节)`);
    } catch (err) {
        fail(`读取 display.css 失败: ${err.message}`);
        process.exit(1);
    }

    // 删除整个 dist 目录
    try {
        fs.rmSync(TARGET_DIST_DIR, { recursive: true, force: true });
        ok('已删除目标 dist 目录');
    } catch (err) {
        fail(`删除目标 dist 目录失败: ${err.message}`);
        process.exit(1);
    }

    // 重新创建 dist 目录
    try {
        fs.mkdirSync(TARGET_DIST_DIR, { recursive: true });
        ok('已重新创建目标 dist 目录');
    } catch (err) {
        fail(`创建目标 dist 目录失败: ${err.message}`);
        process.exit(1);
    }

    // 恢复 index.d.ts
    try {
        fs.writeFileSync(indexDtPath, indexDtBuffer);
        ok('已恢复 index.d.ts');
    } catch (err) {
        fail(`恢复 index.d.ts 失败: ${err.message}`);
        process.exit(1);
    }
    // 恢复 index.css
    try {
        fs.writeFileSync(indexCssPath, indexCssBuffer);
        ok('已恢复 index.css');
    } catch (err) {
        fail(`恢复 index.css 失败: ${err.message}`);
        process.exit(1);
    }
    // 恢复 display.css
    try {
        fs.writeFileSync(displayCssPath, displayCssBuffer);
        ok('已恢复 display.css');
    } catch (err) {
        fail(`恢复 display.css 失败: ${err.message}`);
        process.exit(1);
    }
}

function step4_copyDistToTarget() {
    step(4, '复制 dist 到目标目录');

    // 验证源 dist 存在
    if (!fs.existsSync(DIST_DIR)) {
        fail(`源 dist 目录不存在: ${DIST_DIR}`);
        process.exit(1);
    }

    // 验证目标 dist 存在
    if (!fs.existsSync(TARGET_DIST_DIR)) {
        fail(`目标 dist 目录不存在: ${TARGET_DIST_DIR}`);
        process.exit(1);
    }

    // 手动递归复制，排除 index.d.ts
    let copiedCount = 0;
    let skippedCount = 0;

    function copyDirExcludeIndexDt(src, dest) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }

        const entries = fs.readdirSync(src, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                copyDirExcludeIndexDt(srcPath, destPath);
            } else if (entry.isFile()) {
                // 跳过 index.d.ts，保留目标中原有的文件
                if (entry.name === 'index.d.ts') {
                    skippedCount++;
                    continue;
                }
                fs.copyFileSync(srcPath, destPath);
                copiedCount++;
            }
        }
    }

    try {
        copyDirExcludeIndexDt(DIST_DIR, TARGET_DIST_DIR);
        ok(`已复制 ${copiedCount} 个文件到目标目录`);
        if (skippedCount > 0) {
            info(`跳过 ${skippedCount} 个 index.d.ts 文件（保留原有）`);
        }
    } catch (err) {
        fail(`复制文件失败: ${err.message}`);
        process.exit(1);
    }

    // 验证 index.d.ts 仍存在
    const indexDtPath = path.join(TARGET_DIST_DIR, 'index.d.ts');
    if (!fs.existsSync(indexDtPath)) {
        fail('index.d.ts 在复制后丢失！');
        process.exit(1);
    }
    ok('index.d.ts 验证通过');
    // 验证 index.css 仍存在
    const indexCssPath = path.join(TARGET_DIST_DIR, 'index.css');
    if (!fs.existsSync(indexCssPath)) {
        fail('index.css 在复制后丢失！');
        process.exit(1);
    }
    ok('index.css 验证通过');
    // 验证 display.css 仍存在
    const displayCssPath = path.join(TARGET_DIST_DIR, 'display.css');
    if (!fs.existsSync(displayCssPath)) {
        fail('display.css 在复制后丢失！');
        process.exit(1);
    }
    ok('display.css 验证通过');
}

// ===== 主流程 =====

function main() {
    header('构建与部署脚本 (test-lib.js)');
    console.log(`  目标目录: ${TARGET_DIR}`);
    console.log(`  源 dist:  ${DIST_DIR}`);
    console.log(`  目标 dist:${TARGET_DIST_DIR}`);

    // 步骤前验证
    validatePaths();

    // 步骤 0: 清理 dist 目录
    step0_cleanDist();

    // 步骤 1: copyLib.js
    step1_copyLib();

    // 步骤 2: replace-aliases.js
    step2_replaceAliases();

    // 步骤 3: 清理目标 dist
    step3_cleanTargetDist();

    // 步骤 4: 复制 dist 到目标
    step4_copyDistToTarget();

    header('全部步骤执行完成');
    console.log(`  目标目录: ${TARGET_DIR}`);
    console.log(`  部署路径: ${TARGET_DIST_DIR}`);
    console.log('');
}

main();
