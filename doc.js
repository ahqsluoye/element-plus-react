"use strict";
exports.__esModule = true;
var fs = require("fs");
var lodash_1 = require("lodash");
var srcPath = 'D:/JavaScript/Project/element-plus-react/src/';
var destPath = 'D:/JavaScript/Project/element-plus-react/src/theme-chalk/';
var files = fs.readdirSync(srcPath);
files.forEach(function (item) {
    if (fs.existsSync(srcPath + item + '/styles')) {
        // console.log(srcPath + item + '/styles', destPath + `${kebabCase(item)}`);
        fs.rename(srcPath + item + '/styles', destPath + "".concat((0, lodash_1.kebabCase)(item)), function (err) { return console.log(err); });
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
