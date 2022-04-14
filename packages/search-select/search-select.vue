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
  render() {
    if (this.textModel) {
      return <div className="text-model">{this.showValue}</div>;
    }
    return (
      <el-select
        {...{ props: this.attrs, on: this.listeners }}
        value={this.value}
      >
        {this.options.map(({ value, label }) => {
          return (
            <el-option key={value} value={value} label={label}></el-option>
          );
        })}
      </el-select>
    );
  },
};
</script>
<style lang="css" scoped></style>
