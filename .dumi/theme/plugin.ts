import { IApi } from 'dumi';

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
    api.modifyExportHTMLFiles(files => {
        const nextFiles = files
            // exclude dynamic route path, to avoid deploy failed by `:id` directory
            .filter(f => !f.path.includes(':'))
            .map(file => {
                let globalStyles = '';
                console.log(file.content);
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
