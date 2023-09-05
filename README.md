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
      FieldItem>Wrapper>Widget
    FieldList>Wrapper
      FieldItem>Wrapper>Widget