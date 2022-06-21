<template>
  <div class="table-select-wrapper">
    <el-button
      v-if="!textModel"
      type="text"
      size="default"
      @click="openTable"
      >{{ title }}</el-button
    >
    <RenderTable
      ref="table"
      :fetchData="list"
      :defaultRows="5"
      defaultLayout="total, prev, pager, next"
      :columns="showTableColumns"
    >
      <template #handle="{ row }">
        <el-link
          v-if="!textModel"
          type="danger"
          :underline="false"
          @click="delItem(row)"
          >移除</el-link
        >
      </template>
    </RenderTable>
    <TableDialog
      ref="dialog"
      :title="title"
      :fetchData="fetchData"
      :columns="columns"
      :searchField="searchField"
      @onConfirm="onConfirm"
    ></TableDialog>
  </div>
</template>
<script>
/**
 * 查询数据的方法fetchData
 * 已有数据value
 * getItems通过已有数据查询显示数据，没有详细数据要使用ids获取详细数据和分页
 * 表格内容 columns
 */
import TableDialog from "./table-dialog.vue";
export default {
  name: "table-select",
  components: {
    TableDialog,
  },
  props: {
    value: {
      required: true,
    },
    title: String,
    fetchData: Function,
    getItems: Function,
    searchField: Array,
    elementType: {
      type: String,
      default() {
        // object 表示返回值时对象数组，unique表示返回值对象时唯一值数组
        return "unique";
      },
    },
    columns: {
      type: Array,
      required: true,
    },
    textModel: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value: {
      handler(val) {
        if (this.elementType === "unique") {
          this.getItems(val).then((data) => {
            this.list = data;
          });
        } else {
          this.list = val;
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      list: [],
    };
  },
  computed: {
    showTableColumns() {
      // 显示表格的配置
      if (!this.textModel) {
        return this.columns.concat({
          label: "操作",
          slotName: "handle",
        });
      }
      return this.columns;
    },
  },
  methods: {
    onConfirm(list) {
      if (this.elementType === "unique") {
        this.$emit(
          "input",
          list.map((item) => {
            return item.id;
          })
        );
      } else {
        this.$emit("input", list);
      }
    },
    openTable() {
      console.log("openTable");
      this.$refs.dialog.show(this.list);
    },
    delItem(row) {
      if (this.elementType === "unique") {
        this.$emit(
          "input",
          this.value.filter((item) => {
            return item !== row.id;
          })
        );
      } else {
        this.$emit(
          "input",
          this.value.filter((item) => {
            return item.id !== row.id;
          })
        );
      }
    },
  },
};
</script>
<style lang="css" scoped></style>
