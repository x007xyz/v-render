/**
 * Created by 王冬 on 2021/6/10.
 * QQ: 20004604
 * weChat: qq20004604
 * 功能说明：
 * 公共表单组件
 */
const superType = (data) => {
  const type = Object.prototype.toString.call(data).toLowerCase()
  return type.replace(/^\[object\s(\w+)\]$/, (...rest) => {
    return rest[1]
  })
}

export default {
  props: {
    // 全部表单元素禁用。通常用于提交时使用
    allDisabled: {
      type: Boolean,
      default: false
    },
    // 是否给表单显示border 外框，包含区块外侧有一个 boder，以及区块标题的灰色背景
    borderForm: {
      type: Boolean,
      default: true
    },
    // 文字模式。不显示表单组件，而是只显示纯文字内容
    // 同时，纯文本模式（即值为 true 的时候），会隐藏表单要素 label 左边的星号
    textModel: {
      type: Boolean,
      default: false
    },
    // 自定义表单每个要素的列。
    // 如果是 6 则为 一行 4 列，12 则为 1 行 2 列。
    // 优先级高于表单要素本身的设置
    // 如果为 0，则使用表单要素本身的设置
    formItemCol: {
      type: [ Number, String ],
      default: 0
    },
    // 左右模式或者上下模式。top 为上下，left/right 为左右（指左右时，label 是左对齐或右对齐）
    labelPosition: {
      type: String,
      default: 'top'
    },
    // 左右模式时，label 的宽度
    labelWidth: {
      type: String,
      default: '160px'
    }
  },
  methods: {
    // 获取区块的样式
    getBlockClass (blockItem) {
      const c = blockItem.class
      return Object.assign({}, c, {
        'block-item': this.borderForm,
        'block-hide': this.foldBlockList.indexOf(blockItem.label) > -1
      })
    },

    // 获取 label
    getFormItemLabel (formItem) {
      if (this.textModel &&
                (this.labelPosition === 'left' || this.labelPosition ===
                    'right')) {
        return formItem.label + '：'
      }
      return formItem.label
    },

    // 获取单个要素的列宽
    getColSize (item) {
      if (item.type === 'child-form' || item.type === 'slot-single' || item.type === 'table-readonly') {
        return 24
      }

      // 要素为其他类型时，优先全局 size，再次是要素本身 size，再次是默认值 12，半行
      return item.span || this.formItemCol || item.size || 12
    },
    deepCopy (origin) {
      const valueTypes = [ 'object', 'array' ] // 后面可以支持下 map、set 等
      if (!valueTypes.includes(superType(origin))) {
        return '必须传入对象' // 若不是对象则结束
      }
      const target = Array.isArray(origin) ? [] : {} // 判别是数组还是对象
      for (const k in origin) { // 循环拷贝
        if (origin.hasOwnProperty(k)) { // 判断属性是否在对象自身上（非原型链上的父级属性）
          if (valueTypes.includes(superType(origin[k]))) { // 复杂类型，递归
            target[k] = this.deepCopy(origin[k])
          } else {
            target[k] = origin[k]
          }
        }
      }
      return target
    }
  }
}
