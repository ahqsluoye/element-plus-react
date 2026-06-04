const generateTip = Component => {
    console.log(`请参考位于路径"#${Component.toLowerCase()}"
中的Vue版本${Component.toLowerCase()}组件实现，开发一个功能完全等效的React版本${Component} 组件。
新组件应保存至路径"#${Component}"目录下，采用TypeScript进行开发以确保类型安全。
该React组件必须保持与原Vue组件完全一致的API设计，包括但不限于所有props参数的名称、类型、默认值，
事件处理函数的命名规范与参数传递方式，内部状态管理逻辑及整体功能表现。开发过程中需严格遵循以下要求：
1) 实现完全一致的响应式设计，确保在不同屏幕尺寸下的布局表现与原组件一致；
2) 保证所有交互体验（包括但不限于引导步骤切换、动画效果、焦点状态）与参考组件完全一致；
3) 视觉效果需精确还原，包括颜色、间距、阴影、边框等样式细节；
4) 代码结构需符合React最佳实践，包含合理的组件拆分、hooks使用及状态管理；
5) 参考 #${Component.toLowerCase()}提供详细的API文档，说明组件的使用方法、参数说明及事件回调，组件名从“@qsxy/element-plus-react”获取，以El开头示例写入到 #${Component.toLowerCase()};
6)并给字段和方法提供jdoc注释`);
};

generateTip('Backtop');
