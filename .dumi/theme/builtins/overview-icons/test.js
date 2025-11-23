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
            if (item.endsWith('.vue')) {
                // console.log(srcPath + item, destPath + item);
                fs.copyFile(srcPath + item, destPath + item.replace('vue', 'tsx'), function (err) {
                    if (err) {
                        console.log('something wrong was happened');
                    }
                });
                fs.readFile(srcPath + item, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        const content = data.toString();
                        let result = content.replace('<template>', '').replace('</template>', '');
                        result = result.replaceAll(/([a-zA-Z]+)-([a-zA-Z]{1})([a-zA-Z]+)=/g, function (match, p1, p2, p3) {
                            return `${p1}${p2.toUpperCase()}${p3}=`;
                        });

                        fs.writeFileSync(
                            destPath + item.replace('vue', 'tsx'),
                            `import React from 'react';
                            
    export default () => (
        ${result}
    );`,
                        );
                    }
                });
            }
        }
    });
}

copyFiles(
    'D:/JavaScript/Project/libs/element-plus/docs/.vitepress/vitepress/components/overview-icons/',
    'D:/JavaScript/Project/Parker-Libs/element-plus-react/.dumi/theme/builtins/overview-icons/',
    true,
);
