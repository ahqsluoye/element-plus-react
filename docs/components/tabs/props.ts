export const tabsProps = [
    ['activeName', '绑定值，选中选项卡的 `name`（可控）', 'string', '—', '第一个选项卡的 `name`'],
    ['defaultActiveName', '默认选中选项卡的 `name`', 'string', '—', '—'],
    ['type', '风格类型', 'string', 'card | border-card', '—'],
    ['closable', '标签是否可关闭', 'boolean', '—', 'false'],
    ['addable', '标签是否可增加', 'boolean', '—', 'false'],
    ['editable', '标签是否同时可增加和关闭', 'boolean', '—', 'false'],
    ['tabPosition', '选项卡所在位置', 'string', 'top | right | bottom | left', 'top'],
    ['stretch', '标签的宽度是否自撑开', 'boolean', '-', 'false'],
    ['beforeLeave', '切换标签之前的钩子，若返回 `false` 或者返回 `Promise` 且被 `reject`，则阻止切换。', 'Function(activeName, oldActiveName)', '—', '—'],
];

export const tabsEvents = [['onTabClick', '`tab` 被选中时触发', '被选中的标签 `tab` 实例']];

export const tabPaneProps = [
    ['label', '选项卡标题', 'string', '—', '—'],
    ['disabled', '是否禁用', 'boolean', '—', 'false'],
    ['name', '与选项卡绑定值 value 对应的标识符，表示选项卡别名', 'string / number', '—', '该选项卡在选项卡列表中的序数值，第一个选项卡为 0'],
    ['closable', '标签是否可关闭', 'boolean', '—', 'false'],
    ['lazy', '标签是否延迟渲染', 'boolean', '—', 'false'],
];

export const tabPaneEvents = [
    ['onTabShow', '激活标签时触发', '—'],
    ['onTabClose', '关闭标签页时触发', '—'],
];
