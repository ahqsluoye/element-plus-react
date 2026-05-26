/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');

function buildDoc(srcPath, destPath, overwrite = true) {
    if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath);
    }
    const prefix = path.basename(srcPath, '.md');
    fs.readFile(srcPath, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            const content = data.toString();
            const regex = new RegExp(/(:::)([\s\S\n]+)\1/, 'g');
            const res = content.match(regex);
            // const res = content.match(/container\/.*/g);
            const all = res[0]
                .split('\n')
                ?.filter(item => item.startsWith(prefix))
                .map(item => item.replace(prefix, '').replace('/', ''));

            if (overwrite) {
                all.map(item => item.replace(prefix, '').replace('/', '')).forEach(item => {
                    fs.writeFileSync(
                        destPath + '/' + item + '.tsx',
                        `import React from 'react';

const App = () => {
    return <></>;
};

export default App;`,
                    );
                });

                fs.writeFileSync(
                    destPath + '/index.md',
                    content
                        .replace(/:::(demo)?/g, '')
                        .replace(new RegExp('[a-z\\-0-9]+/([a-z\\-0-9]+)\\n', 'g'), '<code src="./$1.tsx"></code>\n')
                        .replace(new RegExp('\\^\\[([a-zA-Z]*)\\]`(.*)`', 'g'), '<Enum type="$1">$2</Enum>')
                        .replace(new RegExp('\\^\\[([a-zA-Z]+)\\]', 'g'), '`$1`')
                        .replace(new RegExp('\\^\\([\\d\\.]*\\)', 'g'), ''),
                );
            }
        }
    });
}

buildDoc('D:/JavaScript/Project/libs/element-plus/docs/zh-CN/component/slider.md', 'D:/JavaScript/private_projects/element-plus-react/docs/components/slider', true);
