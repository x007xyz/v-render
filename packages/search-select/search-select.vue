<template>
  <div>
    <div class="text-model" v-if="textModel">{{ showValue }}</div>
    <el-select v-else :value="value" v-bind="attrs" v-on="listeners">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script>
/**
 * canEmpty 查询条件为空时，是否进行查询
 * searchFn 搜索方法
 * getOption 通过value查询{ value, label }的方法，解决选项在默认值时，显示value的问题
 */
export default {
  name: "search-select",
  inheritAttrs: false,
  props: {
    textModel: {
      type: Boolean,
      default: false,
    },
    value: [String, Number],
    canEmpty: {
      type: Boolean,
      default: false,
    },
    searchFn: {
      type: Function,
      required: true,
    },
    getOption: Function,
  },
  data() {
    return {
      loading: false,
      options: [],
    };
  },
  watch: {
    value: {
      handler(val) {
        // 监听值变化，如果options没有对应的value，则查询添加到options
        if (val && !this.options.some((item) => item.value === val)) {
          this.getOption &&
            this.getOption(val).then((data) => {
              this.options = this.options.concat(data);
            });
        }
      },
      immediate: true,
    },
  },
  computed: {
    attrs() {
      return {
        ...this.$attrs,
        filterable: true,
        remote: true,
        loading: this.loading,
        "remote-method": this.remoteMethod,
      };
    },
    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
        focus: this.onFocus,
      };
    },
    showValue() {
      const selItem = this.options.find((item) => item.value === this.value);
      if (!selItem) {
        return "-";
      }
      return selItem.label;
    },
  },
  methods: {
    onInput(value) {
      this.$emit("input", value);
    },
    onFocus() {
      if (this.canEmpty && this.value === "") {
        // 允许查询条件为空，则在用户focus时，查询
        this.remoteMethod("");
      }
    },
    remoteMethod(query) {
      query = query.trim();
      if (this.canEmpty || query !== "") {
        this.loading = true;
        this.searchFn(query)
          .then((data) => {
            this.options = data;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>
<style lang="css" scoped></style>
