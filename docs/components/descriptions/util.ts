export const props = [
    ['border', '是否带有边框', 'boolean', '—', 'false'],
    ['column', '一行 Descriptions Item 的数量', 'number', '—', '3'],
    ['direction', '排列的方向', 'string', 'vertical / horizontal', 'horizontal'],
    ['size', '列表的尺寸', 'string', 'large / small / null', 'null'],
    ['title', '标题文本，显示在左上方', 'string / React.ReactElement&lt;any>', '—', '—'],
    ['extra', '操作区文本，显示在右上方', 'string / React.ReactElement&lt;any>', '—', '—'],
];

export const itemProps = [
    ['label', '标签文本', 'string / React.ReactElement&lt;any>', '—', '—'],
    ['span', '列的数量', 'number', '—', '1'],
    ['width', '列的宽度，不同行相同列的宽度按最大值设定（如无 border ，宽度包含标签与内容）', 'string / number', '—', '—'],
    ['minWidth', '列的最小宽度，与 width 的区别是 width 是固定的，minWidth 会把剩余宽度按比例分配给设置了 minWidth 的列（如无 border，宽度包含标签与内容）', 'string / number', '—', '—'],
    ['align', '列的内容对齐方式（如无 border，对标签和内容均生效）', 'string', 'left / center / right', 'left'],
    ['labelAlign', '列的标签对齐方式，若不设置该项，则使用内容的对齐方式（如无 border，请使用 align 参数）', 'string', 'left / center / right', '—'],
    ['className', '列的内容自定义类名', 'string', '—', '—'],
    ['labelClassName', 'column label custom class name', 'string', '—', '—'],
];
