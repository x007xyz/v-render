<template>
  <NormalSelect :value="value" v-bind="attrs" v-on="listeners"></NormalSelect>
</template>
<script>
import { getDictData } from "./utils.js";
/**
 * dict 必填，可以是一个元素为{ value, label }的数组，或者是一个返回数组的函数
 * dictName : 默认为空，String类型，字典名，用来设置和获取缓存字典数据
 * cache： 默认为空，Object类型，缓存配置，cache.type设置缓存类型为local或session，分别对应localStroage、sessionStroage，cache.expire设置缓存时间，单位为秒，设置为空时不缓存
 */
export default {
  name: "dict-select",
  inheritAttrs: false,
  components: {
    NormalSelect: () => import("../normal-select"),
  },
  props: {
    value: [String, Number, Array],
    dict: {
      type: Function,
      default() {
        return () => Promise.resolve([]);
      },
    },
    dictName: String,
    cache: {
      type: Object,
    },
  },
  data() {
    return {
      options: [],
    };
  },
  computed: {
    attrs() {
      return {
        ...this.$attrs,
        options: this.options,
      };
    },
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
      };
    },
  },
  methods: {
    onInput(value) {
      this.$emit("input", value);
    },
  },
  created() {
    getDictData(this.dictName, this.dict, this.cache).then((data) => {
      this.options = data;
    });
  },
};
</script>
<style lang="css" scoped></style>
