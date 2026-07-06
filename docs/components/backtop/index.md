---
title: Backtop 回到顶部
lang: zh-CN
---

<Meta></Meta>

# Backtop 回到顶部

返回页面顶部的操作按钮。

## 基础用法

通过滑动来查看容器右下角的按钮。

<code src="./basic.tsx"></code>

## 自定义内容

显示区域被固定为 40px \* 40px 的区域，其中的内容可支持自定义。

<code src="./custom.tsx"></code>

## API

### 属性

| 名称             | 说明                             | 类型     | 默认值 |
| ---------------- | -------------------------------- | -------- | ------ |
| target           | 触发滚动的对象                   | `string` | —      |
| visibilityHeight | 滚动高度达到此参数值才出现       | `number` | 200    |
| right            | 控制其显示位置，距离页面右边距   | `number` | 40     |
| bottom           | 控制其显示位置，距离页面底部距离 | `number` | 40     |

### 事件

| 名称    | 说明               | 回调参数                                               |
| ------- | ------------------ | ------------------------------------------------------ |
| onClick | 点击按钮触发的事件 | <Enum type="Function">(evt: MouseEvent) => void</Enum> |
