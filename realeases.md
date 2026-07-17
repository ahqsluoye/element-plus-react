## v2.0.2

2026-07-17

### Bug fixes

-   **useLockscreen** 修复锁屏钩子在 `withoutHiddenClass` 时的 padding 恢复逻辑
-   **Input** 修复一键清除图标位置有偏移的问题

### Refactor

-   **组件导入** 统一替换组件内相对路径导入为包别名导入（`@qsxy/element-plus-react/`）
-   **组件导出** 适配按需加载，调整所有组件的导入路径为带具体文件的精准路径，重构全局组件导出列表

### Docs

-   **组件文档** 优化组件文档展示效果并修复文字描述
-   **README** 更新 README 的徽章和说明文本
-   **变更日志** 更新各组件变更日志并调整展示顺序

### Chore

-   **脚本工具** 添加组件导入重命名脚本
-   **清理** 删除所有组件的出口索引文件

---

## v2.0.1

2026-07-14

### Features

-   **useCommonProps** 新增 `useClearable` 和 `useAutosize` 钩子，完善 `useDisabled` 逻辑

### Bug fixes

-   **Dialog** 修复弹窗组件在隐藏时仍占用高 z-index 的问题
-   **Dialog** 修复点击弹窗组件里的选择器类组件后，弹窗自动关闭的问题
-   **Dialog** 修复弹窗组件内的 InputNumber 组件增减按钮无法触发事件的问题
-   **TimePicker** 移除默认的 `disabled` 默认值并修复时间选择器的选择状态

### Refactor

-   **Dialog** 重构弹窗点击遮罩逻辑并修复命名问题
-   **Drawer** 重构抽屉组件的点击遮罩逻辑与钩子命名
-   **useLockscreen** 优化锁屏滚动锁定逻辑
-   **Input** 调整 TextArea 和类型定义的逻辑
-   **Config Provider** 优化组件默认配置与清空逻辑

### Style

-   **Theme-Chalk** 将 Transfer 组件硬编码色值替换为 CSS 变量

### Breaking

无

---

## v2.0.0

2026-07-03

### Features

-   **Affix** 新增 Affix 固钉组件
-   **Anchor** 新增 Anchor 锚点组件
-   **Backtop** 新增 Backtop 回到顶部组件
-   **PageHeader** 新增 PageHeader 页头组件
-   **Steps** 新增 Steps 步骤条组件
-   **Segmented** 新增 Segmented 分段控制器组件
-   **Tour** 新增 Tour 漫游式引导组件
-   **VirtualizedTable** 新增 VirtualizedTable 虚拟化表格组件
-   **Cascader** 新增级联面板组件，优化级联选择器代码结构
-   **Cascader** 新增多选折叠标签、清空按钮与样式变量优化
-   **Cascader** 新增 `suggestionItemFormatter` 属性，支持自定义下拉建议项
-   **Cascader** 新增 `nodeFormatter` 属性，支持自定义节点内容
-   **Cascader** 新增 `maxCollapseTagsTooltipHeight` 属性并优化相关逻辑
-   **Cascader** 实现任意层级选择功能
-   **Form** 为表单项添加帮助图标功能并优化样式
-   **Form** 实现自动计算标签宽度功能，优化表单样式与文档
-   **Form** 新增 `statusIcon` 属性，支持表单校验状态图标显示
-   **Select** 新增 resize observer，在容器大小变化时更新 popper 位置
-   **Select** 新增通过 `props` 和 `options` 属性自定义选项配置的功能
-   **Select** 为 Select 组件添加表单校验状态图标支持
-   **Input (TextArea)** 新增一键清空功能，提升输入体验
-   **InputNumber** 实现长按增减按钮快速调整数值的功能
-   **Radio / Checkbox** 新增 `options` 属性支持，快速生成单选/多选组
-   **CheckboxGroup** 新增通过 `options` 属性快速生成多选组的功能
-   **Transition** 新增 `showDuration` 属性，支持动画显示时长配置
-   **Dialog / Drawer** 新增 `destroyOnClose` 属性，支持关闭时销毁组件
-   **Dialog** 新增拖拽弹窗功能、自定义动画与遮罩样式优化
-   **Backtop** 新增回到顶部组件
-   **Collapse** 完整实现折叠面板组件功能
-   **useLockscreen** 新增锁屏滚动的自定义 Hooks，提供滚动锁定能力
-   **Theme** 新增移动端侧边栏抽屉组件和优化的移动端头部布局
-   **Tooltip / Dropdown** 新增 `hideOnClick` 属性，控制点击时自动隐藏

### Bug fixes

-   **Dialog** 修复弹窗打开时页面抖动的问题
-   **InputNumber** 修复失焦时未正确触发用户输入状态重置的问题
-   **DateTimePicker / Calendar** 修复日期选择器关闭时未重置空值的问题
-   **TreeSelect** 修复类型定义中重复继承 `SelectProps` 的问题
-   **Tooltip** 修复右键菜单显示逻辑切换异常
-   **Tooltip / Dropdown** 修复下拉菜单点击切换和链接下划线问题
-   **Picker** 修复弹窗打开时浮层位置未及时更新的问题
-   **Input** 注释掉冗余的 `error` 属性
-   **TimePickerRange** 移除相关冗余 props

### Refactor

-   **Form** 统一表单组件命名为 `El` 前缀并重构导出结构
-   **Form** 重构表单上下文与类型定义，统一使用 `useStatusIcon` 钩子
-   **Dialog** 重构组件，统一关闭回调 API 并优化属性，简化子组件使用方式
-   **Drawer** 重构组件，更新 API 与样式，优化点击遮罩逻辑
-   **Input** 重构输入框组件，优化清空、校验和后缀展示逻辑，拆分 TextArea 为独立组件
-   **Button** 重构组件实现方式，导出 `ButtonGroup` 组件
-   **RadioGroup** 提取别名配置简化属性访问逻辑
-   **Cascader** 重构类型命名与 API 参数调整，新增多项交互功能
-   **Transfer** 重构组件并完善文档
-   **util** 统一工具函数写法并新增 `isPromise` 判断
-   **lodash** 将 lodash 导入改为按需引入以优化打包体积
-   **typings** 为各组件 Props 添加自定义 CSS 变量类型支持

### Breaking

-   **Button** 使用新的 ElButtonGroup 组件替代 ElButton.Group
-   **Drawer** 移除 ElDrawer.body 和 Drawer.footer 子组件，改用 footer 属性和直接传入子元素
-   **Dialog** 移除 ElDialog.body 和 ElDialog.footer 子组件，改为通过 props 直接传递内容
-   **Form** 表单组件命名统一改为 `El` 前缀，需更新相关导入语句
-   **Form** 移除表单组件冗余的 `error` 和 `warning` 属性，建议使用 `statusIcon` 替代
-   **Input** 移除 ElInput.TextArea 组件，改为使用 ElTextArea
-   **Input** 移除 `error` 属性，校验状态通过表单上下文统一管理
-   **Radio** 废弃 ElRadio.Button 写法，统一使用 ElRadioButton
-   **TimePickerRange** 移除部分冗余 props，简化 API 接口
-   **Form** 废弃 ElFormItem、ElForm.List 组件，统一导出为 ElFormItem、ElFormList 等带 El 前缀的组件名
-   **Form** 废弃 ElForm.useForm、ElForm.useWatch，统一为 useForm 和 useWatch
