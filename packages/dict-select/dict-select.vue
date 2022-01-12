<template>
  <NormalSelect :value="value" v-bind="attrs" v-on="listeners"></NormalSelect>
</template>
<script>
import { getCache, setCache } from './index.js'
/**
 * dict 必填，可以是一个元素为{ value, label }的数组，或者是一个返回数组的函数
 * dictName : 默认为空，String类型，字典名，用来设置和获取缓存字典数据
 * cache： 默认为空，Object类型，缓存配置，cache.type设置缓存类型为local或session，分别对应localStroage、sessionStroage，cache.expire设置缓存时间，单位为秒，设置为空时不缓存
 */
export default {
  name: 'dict-select',
  inheritAttrs: false,
  components: { NormalSelect: () => import('../normal-select/normal-select.vue') },
  props: {
    value: [String, Number],
    dict: {
      type: Function,
      default () {
        return () => Promise.resolve([])
      }
    },
    dictName: String,
    cache: {
      type: Object
    }
  },
  data () {
    return {
      options: []
    }
  },
  computed: {
    attrs () {
      return {
        ...this.$attrs,
        options: this.options
      }
    },
    listeners () {
      return {
        ...this.$listeners,
        input: this.onInput
      }
    }
  },
  methods: {
    onInput (value) {
      this.$emit('input', value)
    }
  },
  created () {
    if (this.dictName) {
      // 先查询缓存是否有数据
      const data = getCache(this.dictName)
      if (data) {
        this.options = data
        return
      }
    }
    this.dict().then(data => {
      this.options = data
      // data不为空数组，dictName存在，并且设置了缓存时，对获取的数据进行缓存
      if (data.length && this.dictName && this.cache) {
        setCache(this.dictName, data, this.cache)
      }
    })
  }
}
</script>
<style lang="css" scoped>
</style>
