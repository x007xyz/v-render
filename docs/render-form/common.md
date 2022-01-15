# 基本配置

## 典型表单
包含基础组件在表单中的配置和基本的表单提交功能，点击提交按钮查看提交数据

:::demo
<<< @/examples/form/Base.vue
:::

## 布局配置
我们可以通过设置表单的全局属性设置整体的表单布局，也可以通过单独为元素设置布局宽度，在特殊需求下，还支持表单元素特殊的换行设置。
通过`formItemCol`可以设置元素的默认宽度，为元素单独设置`span`可以覆盖默认的元素宽度设置。`nextRowFirst`设置当前元素为第一个元素，`currentRowLast`设置当前元素为最后一个元素。
:::demo
<<< @/examples/form/Layout.vue
:::

## 表单分块
我们可以通过表单分块的功能将表单按一定规律拆分为多个模块，方便用户输入信息。
:::demo
<<< @/examples/form/Block.vue
:::

## 表单边框
通过设置`borderForm`可以控制表单模块是否展示边框
:::demo
<<< @/examples/form/Border.vue
:::

## 展开收起
通过设置`showFoldBtn`属性为`true`，我们可以显示每个表单模块的展开/收起按钮，另外也可以调用内部方法`foldAllBlock`，一次性展开/收起所有模块。
:::demo
<<< @/examples/form/Expand.vue
:::

## 浏览模式
`render-form`内置两种浏览模式：`normal`和`single`；`normal`是默认的浏览模式，`single`将表单模块拆分为不同的tab切换显示。`single`模式下，展开收起按钮不会显示。
:::demo
<<< @/examples/form/ScanType.vue
:::