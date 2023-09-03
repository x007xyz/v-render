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
