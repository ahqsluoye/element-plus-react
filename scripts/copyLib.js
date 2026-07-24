const fs = require('fs');

function copyFiles(srcPath, destPath) {
    if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath);
    }
    const files = fs.readdirSync(srcPath);
    files.forEach(item => {
        const stat = fs.statSync(srcPath + item);
        if (stat.isDirectory()) {
            //递归读取文件
            copyFiles(srcPath + item + '/', destPath + item + '/');
        } else {
            // console.log(srcPath + item, destPath + item);
            fs.copyFile(srcPath + item, destPath + item, function (err) {
                if (err) {
                    console.log('something wrong was happened');
                }
            });
        }
    });
}

copyFiles(
    './packages/',
    'D:\\JavaScript\\private_projects\\Demo\\node_modules\\.pnpm\\@qsxy+element-plus-react@2._8f10580ce31deee004368360dd14ec81\\node_modules\\@qsxy\\element-plus-react\\',
);
copyFiles(
    './packages/',
    'D:\\JavaScript\\private_projects\\evaluate-app-react\\node_modules\\.pnpm\\@qsxy+element-plus-react@2._8f10580ce31deee004368360dd14ec81\\node_modules\\@qsxy\\element-plus-react\\',
);
// copyFiles('./packages/ib/', 'D:/JavaScript/Project/krm-libs/index-pre-process/node_modules/@krm/report-platform/lib/');
// copyFiles('./packages/ib/', 'D:/JavaScript/Project/krm-libs/portal/node_modules/@krm/report-platform/lib/');
// copyFiles('./packages/ib/', 'D:/JavaScript/Project/krm-libs/bi-preact/node_modules/@krm/report-platform/lib/');
// copyFiles('./packages/ib/', 'D:/JavaScript/Project/krm-libs/krm-report/node_modules/@krm/report-platform/lib/');
// copyFiles('./packages/ib/', 'D:/JavaScript/Project/krm-libs/index-pre-process/node_modules/@krm/report-platform/lib/');
// copyFiles('./packages/ib/', 'D:/JavaScript/Project/krm-libs/index-process-react/node_modules/@krm/report-platform/lib/');
// copyFiles('./packages/ib/', 'D:/JavaScript/Project/krm-libs/krmOm/client/node_modules/@krm/report-platform/lib/');
// copyFiles('./packages/ib/', 'D:/JavaScript/Project/csdata-ui/node_modules/@krm/report-platform/lib/');
