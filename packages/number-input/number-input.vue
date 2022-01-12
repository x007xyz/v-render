<template>
  <el-input :value="showValue" v-bind="attrs" v-on="listeners" @keydown.native="onKeyDown">
    <RenderItem slot="prepend" v-if="prefix" :render="prefix"></RenderItem>
    <RenderItem slot="append" v-if="suffix" :render="suffix"></RenderItem>
  </el-input>
</template>
<script>
import RenderItem from '../render-item/render-item.vue'
const toThousands = (num) => {
  if (num === '') {
    return ''
  }
  const n = String(num)
  const res = n.toString().replace(/\d+/, (n) => {
    return n.replace(/(\d)(?=(\d{3})+$)/g, ($1) => {
      return $1 + ','
    })
  })
  return res
}
const padZore = (num, zeroPadding) => {
  if (!zeroPadding || zeroPadding <= 0) {
    return num
  }
  let newVal = num
  const l = String(newVal).split('.')
  // 如果没有小数点（说明只有整数位），自动补零
  if (l.length === 1) {
    // 判断 l[0].length 是否为 0，为 0 则说明没填，啥事都不做
    if (l[0].length === 0) {
      newVal = ''
    } else {
      // 自动补零
      newVal += '.' + '0'.padEnd(zeroPadding, '0')
    }
  } else {
    // 此时说明有小数点，那么小数位数多，则去掉多余的。位数小，则补零
    const currentLength = l[1].length
    // 小数位数少，则补零
    if (currentLength < zeroPadding) {
      newVal = l[0] + '.' + l[1].padEnd(zeroPadding, '0')
    }
    // 如果大于
    if (currentLength > zeroPadding) {
      newVal = String(l[0]) + '.' + l[1].slice(0, zeroPadding)
    }
  }
  return newVal
}
/**
 * zeroPadding: 默认为空，Number类型，自动补零到指定位数；
 * decimal: 默认为2，Number类型，最大小数点位数，为0时，不允许输入.
 * max: 默认为Number.MAX_SAFE_INTEGER，Number、String类型，最大值
 * min: 默认为Number.MIN_SAFE_INTEGER，Number、String类型，最小值，大于0时，不允许输入-
 * prefix: 默认为空，String、Function类型，前置符号
 * suffix: 默认为空，String、Function类型，后置符号
 */
export default {
  name: 'number-input',
  components: { RenderItem },
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number]
    },
    zeroPadding: Number,
    decimal: {
      type: Number,
      default: 2
    },
    max: {
      type: [String, Number],
      default: Number.MAX_SAFE_INTEGER
    },
    min: {
      type: [String, Number],
      default: Number.MIN_SAFE_INTEGER
    },
    prefix: [String, Function],
    suffix: [String, Function]
  },
  data () {
    return {
      isFocus: false
    }
  },
  computed: {
    showValue () {
      return this.isFocus ? this.value : toThousands(padZore(this.value, this.zeroPadding))
    },
    attrs () {
      return {
        ...this.$attrs
      }
    },
    listeners () {
      return {
        ...this.$listeners,
        input: this.onInput,
        blur: this.onBlur,
        focus: this.onFocus
      }
    }
  },
  methods: {
    onBlur () {
      this.isFocus = false
    },
    onFocus () {
      this.isFocus = true
    },
    onKeyDown (e) {
      // 如果min大于等于0，则禁止输入-
      if (this.min >= 0) {
        if (e.key === '-' || e.key === 'Minus') {
          e.preventDefault()
          return
        }
      }
      // 如果decimal等于0，则禁止输入.
      if (this.decimal === 0) {
        if (e.key === '.' || e.code === 'Period') {
          e.preventDefault()
        }
      }
    },
    onInput (value) {
      const reg = new RegExp(`^-?(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,${this.decimal}})?$`)
      const isReg = reg.test(value) && Number(this.max) >= Number(value) && Number(value) >= Number(this.min)
      if (isReg || ['', '-'].includes(value)) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
<style lang="css" scoped>
</style>
