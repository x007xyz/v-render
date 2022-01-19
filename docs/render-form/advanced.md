## 高级组件
### 字典下拉框
字典下拉框是普通下拉框的进一步封装，支持直接传入获取数据的方法，支持缓存数据。(同时使用两个字典下拉框，即使设置了缓存，也可能会请求两次，这是因为二者同时生成，同时请求，没有明显的顺序)
:::demo 通过设置cache可以配置缓存，cache.type设置缓存类型为local或session，分别对应localStroage、sessionStroage，cache.expire设置缓存时间，单位为秒，设置为空时不缓存
<<< @/examples/components/DictSelect.vue
:::
### 搜索下拉框
### 表格选择框
### 子表单
### slot