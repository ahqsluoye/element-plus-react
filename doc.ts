import * as fs from 'fs';
import { kebabCase } from 'lodash';

const srcPath = 'D:/JavaScript/Project/element-plus-react/src/';
const destPath = 'D:/JavaScript/Project/element-plus-react/src/theme-chalk/';

const files = fs.readdirSync(srcPath);
files.forEach(item => {
    if (fs.existsSync(srcPath + item + '/styles')) {
        // console.log(srcPath + item + '/styles', destPath + `${kebabCase(item)}`);
        fs.rename(srcPath + item + '/styles', destPath + `${kebabCase(item)}`, err => console.log(err));
        // if (fs.existsSync(srcPath + item + '/demos/index.md')) {
        //     fs.rename(srcPath + item + '/demos/index.md', srcPath + item + `/demos/${kebabCase(item)}.md`, err => console.log(err));
        // }
        // if (fs.existsSync(srcPath + 'component/' + kebabCase(item) + '.md')) {
        //     fs.copyFile(srcPath + 'component/' + kebabCase(item) + '.md', srcPath + item + '/demos/index.md', function (err) {
        //         if (err) {
        //             console.log(srcPath + 'component/' + kebabCase(item) + '.md not exists');
        //         }
        //     });
        // }
    }
});
