# 基本功能
## 表单布局

* `label-position` 表单域标签的位置
* `label-width` 标签固定宽度
* `field-width` 表单项宽度
* `column` 表单一行能展示的表单项个数
* `span` 自定义宽度
* `footer` 内置按钮

### label-position

表单标签的位置，可以为top/left/right；如果值为 left 或者 right 时，则需要设置`label-width`

:::demo
<<< @/examples/base/label-position.vue
:::

### label-width

设置表单标签的宽度，在`label-position`为 left 或者 right 时，有效；默认值为80px；支持数字，px和百分比。

:::demo
<<< @/examples/base/label-width.vue
:::

### column

一行可以展示多少个表单项，默认值: 1

:::demo
<<< @/examples/base/column.vue
:::

### span

设置表单项列宽度，表单布局会被切割成 24 等份，可以通过设置 span 来自定义表单项所占的宽度

:::demo
<<< @/examples/base/span.vue
:::

### footer

* `footer`：true，显示默认配置

:::demo
<<< @/examples/base/footer01.vue
:::

* 按钮属性配置

:::demo
<<< @/examples/base/footer02.vue
:::

* 通过slot进行自定义

:::demo
<<< @/examples/base/footer03.vue
:::

* 通过渲染方法进行自定义

:::demo
<<< @/examples/base/footer04.vue
:::

我们可以通过设置表单的全局属性设置整体的表单布局，也可以通过单独为元素设置布局宽度，在特殊需求下，还支持表单元素特殊的换行设置。
通过`formItemCol`可以设置元素的默认宽度，为元素单独设置`span`可以覆盖默认的元素宽度设置。`nextRowFirst`设置当前元素为第一个元素，`currentRowLast`设置当前元素为最后一个元素。
:::demo
<<< @/examples/form/Layout.vue
:::

## 表单校验
我们可以通过表单分块的功能将表单按一定规律拆分为多个模块，方便用户输入信息。
:::demo
<<< @/examples/form/Block.vue
:::

## 常用交互
通过设置`borderForm`可以控制表单模块是否展示边框
:::demo
<<< @/examples/form/Border.vue
:::

## 数据转换
通过设置`showFoldBtn`属性为`true`，我们可以显示每个表单模块的展开/收起按钮，另外也可以调用内部方法`foldAllBlock`，一次性展开/收起所有模块。
:::demo
<<< @/examples/form/Expand.vue
:::

## 路径机制
`render-form`内置两种浏览模式：`normal`和`single`；`normal`是默认的浏览模式，`single`将表单模块拆分为不同的tab切换显示。`single`模式下，展开收起按钮不会显示。
:::demo
<<< @/examples/form/ScanType.vue
:::