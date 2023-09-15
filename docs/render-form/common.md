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


## 表单联动

表单联动是开发中常见的交互，我们提供以下几种方式来满足不同的交互场景

`{{ }}`函数表达式，实现简单联动
`watch`监听，实现复杂联动

### 函数表达式

函数表达式为字符串格式，并以双花括号`{{}}`为语法特征，用一种简洁的配置方式来支持联动。例如：控制表单项禁用、隐藏等交互。

```json
{
  "disabled": "{{ formData.switch1 === true }}",
  "hidden": "{{ rootValue.input1 }}"
}
```
`formData`: 整个表单的值
`rootValue`: 用于 List 场景使用，表示 List.Item 的值

#### 示例

:::demo
<<< @/examples/watch/watch.vue
:::

### watch监听

`watch`本质上就是使用`$watch`方法去监听`formData`数据，所以语法和`$watch`基本一致。在对引用类型做监听时，如果只是变更数据，旧值将与新值相同，因为它们的引用指向同一个地址。

```js
watch: {
  "list.input1": (val, oldVal) => {
    console.log(val, oldVal);
  },
  "#": {
    handler(val, oldVal) {
      console.log(val, oldVal);
    },
    deep: true,
  },
},
```
:::demo
<<< @/examples/watch/watch02.vue
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