# v-render

v-render是基于`vue2.0`的中后台解决方案，支持通过json生成表单、详情、表格，内置封装大量常用组件和基本功能，开箱即用，同时也支持自定义扩展，还提供可视化编辑器快速生成页面。

# TODO

- [] 明确的路径机制，rootPath,parentPath,path
- [] 不限层级的嵌套
- [] 更多类型的组件
- [] 组件联动方案
- [] 支持可视化编辑

不直接使用组件的form和form-item组件，存在限制，不满足需求
element的form需要先生成数据
表单数据应该是根据json的配置项生成的

form集中管理数据

fieldStore

form provide this as root

form-item inject root 向fieldStore添加信息

如何获取Input控件？


节点类型分为
Root
FieldItem
FieldObject
FieldArray
都应该为Wrapper > Widget 的结构

FieldItem节点最简单，Wrapper层负责getValue和setValue，Widget为具体展示

FieldObject,Wrapper层负责getValueByPath和setValueByPath,Widget负责排版展示等

FieldArray,Wrapper层负责数据交互及增删

flattern schema 是否有必要

好处：可以更快的通过path找到schema

坏处：需要处理schema

核心嵌套逻辑：
Root
  RenderField
    FieldItem
    FieldObject
      FieldItem
    FieldList
      FieldItem

完整嵌套逻辑：
Root>Wrapper
  RenderField
    FieldItem>Wrapper>Widget
    FieldObject>Wrapper
      RenderField
    FieldList>Wrapper
      RenderField

[] FieldItem的Widget支持
[] FieldObject/FieldList的Widget支持

[] 表单布局

需要将Col>Field抽象为Wrapper组件

Field应该放到FieldItem中，还是RenderField
FieldObject是否需要嵌套Field

## 待实现组件

### 基础组件
输入框
数字输入框
文本域
计数器
单选
多选
下拉（单选）
下拉（多选）
日期选择
日期范围
时间选择
时间范围
开关
图片展示
颜色选择
链接

Html
Title
### 对象组件

### 列表组件

### 扩展组件
金额输入框
图片上传（拖拽上传、改变顺序、更好的支持oss）



组件的展示影响到Wrapper，如标题、肯定是独占一行的；
在设置schema时，配置属性，不被Field包裹：no-field
## 布局

构建基于flex的布局

## 表单联动

{{ }} 函数表达式，实现简单联动
watch watch 监听，实现复杂联动
dependencies 依赖字段设置，当依赖项数据发生变化时，触发更新
  dependencies 的核心场景是 被动触发校验


# TODO

-[Y] 构建基于flex的布局，并且丰富布局属性
-[] 表单功能，数据校验等
-[] 表单联动，实现dependencies
-[] 组件扩展
-[] 替换为vite
  -[] 文档优化
  -[] 英文文档
-[] 可视化编辑
  -[] 拖拽：如果使用vuedraggable需要将数据修改为数组（原本也希望是数组）
    - [Y] 将schema转换为数组；兼容schema为对象的情况
    - [Y] 初步使用vuedraggable实现拖拽
    - [Y] v-row和v-col组件应该根据不同的场景，做不同的展示：在编辑场景，支持拖拽，展示操作；在应用场景只支持布局。
  -[] 编辑器布局
  -[] 使用https://github.com/cameronhimself/vue-drag-drop自定义实现
-[] 对接swagger生成工具，直接根据接口生成