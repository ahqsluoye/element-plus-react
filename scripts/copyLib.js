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

copyFiles('./src/components/', './dist/');
