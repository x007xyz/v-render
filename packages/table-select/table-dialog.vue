<template>
  <el-dialog :title="title" :visible.sync="visible" append-to-body>
    <RenderTable
      ref="table"
      :fetchData="fetchData"
      :columns="tableColumns"
      :searchField="searchField"
      :searchOption="{ formItemCol: 12 }"
      :defaultRows="5"
      defaultLayout="total, prev, pager, next"
      @row-click="onChangeChecked"
    ></RenderTable>
    <div style="margin-top: 10px; display: flex; justify-content: flex-end">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="submitForm">确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: "table-dialog",
  components: {
    RenderTable: () => import("../render-table"),
  },
  props: {
    fetchData: [Function, Array],
    searchField: Array,
    columns: Array,
    title: String,
  },
  data() {
    return {
      visible: false,
      selectedList: [],
    };
  },
  computed: {
    tableColumns() {
      return [
        {
          label: "",
          width: "80px",
          render: (h, { row }) => {
            return (
              <div onClick={(event) => event.preventDefault()}>
                <el-checkbox
                  value={this.selectedList.some(({ id }) => id === row.id)}
                ></el-checkbox>
              </div>
            );
          },
        },
        ...this.columns,
      ];
    },
  },
  methods: {
    submitForm() {
      this.$emit("onConfirm", this.selectedList);
      this.visible = false;
    },
    onChangeChecked(item) {
      const index = this.selectedList.findIndex(({ id }) => item.id === id);
      if (index > -1) {
        this.selectedList.splice(index, 1);
      } else {
        this.selectedList.unshift(item);
      }
    },
    show(list = []) {
      this.selectedList = [...list];
      this.visible = true;
    },
    cancel() {
      this.visible = false;
    },
  },
};
</script>
<style lang="css" scoped></style>
