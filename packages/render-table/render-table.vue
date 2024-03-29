<template>
  <div class="render-table">
    <div class="searchbar" v-if="fields">
      <RenderForm :fields="fields" v-bind="options" ref="search">
        <template #submit>
          <el-button type="primary" @click="onClickSearch">搜索</el-button>
          <el-button @click="onClickReset">重置</el-button>
        </template>
        <template v-for="slotName in fieldSlotNames" v-slot:[slotName]>
          <slot :name="slotName"></slot>
        </template>
      </RenderForm>
    </div>
    <div class="table-toolbar" v-if="visibleToolbar">
      <div class="tabs"></div>
      <div class="toolbar">
        <el-tooltip effect="dark" content="搜索">
          <i class="el-icon el-icon-refresh-right" @click="search(page)"></i>
        </el-tooltip>
      </div>
    </div>
    <el-table
      ref="table"
      :data="list"
      :cell-style="setStyle"
      @sort-change="sortChange"
      @selection-change="onSelectionChange"
      @expand-change="onExpandChange"
      @row-click="$emit('row-click', $event)"
    >
      <el-table-column
        v-if="selection"
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column v-if="isSlotExpand" type="expand">
        <template v-slot="props">
          <slot name="expand" v-bind="props"></slot>
        </template>
      </el-table-column>
      <!-- v-bind中不能够使用filter对数据进行处理 -->
      <el-table-column
        v-for="column in columns"
        :key="column.id"
        v-bind="getColumnAttr(column)"
      >
        <template v-if="column.render || column.slotName" v-slot="scope">
          <TableItem
            v-if="column.render"
            :scope="scope"
            :render="column.render"
          ></TableItem>
          <!-- 直接使用v-bind="scope"或者{{scope}}都会报错 -->
          <!-- 这里必须分开赋值，不能使用解构语法，不然会报错，应该是对象循环引用导致的 -->
          <slot
            v-else
            :name="column.slotName"
            v-bind="{
              row: scope.row,
              column: scope.column,
              $index: scope.$index,
            }"
          ></slot>
        </template>
      </el-table-column>
    </el-table>
    <div class="footBtn">
      <slot name="operationBtn"></slot>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="search"
        :current-page="page"
        :page-sizes="[5, 10, 20, 50, 100]"
        :page-size="rows"
        :layout="defaultLayout"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { getColumnAttr, filterEmpty } from "./utils";
export default {
  name: "render-table",
  components: {
    RenderForm: () => import("../render-form"),
    TableItem: () => import("../render-item/render-item.vue"),
  },
  props: {
    searchOption: {
      type: Object,
      default() {
        return {};
      },
    },
    // 搜索表单配置
    searchField: {
      type: Array,
      default() {
        return [];
      },
    },
    visibleToolbar: {
      type: Boolean,
      default: false,
    },
    columns: Array,
    fetchData: {
      type: [Function, Array],
      required: true,
    },
    setStyle: Function,
    selection: {
      type: Boolean,
      default: false,
    },
    defaultRows: {
      type: Number,
      default: 10,
    },
    defaultLayout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    uniqueKey: {
      type: String,
      default: "id",
    },
    selectedItems: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      list: [],
      total: 0,
      rows: this.defaultRows,
      sortFields: "cdate desc",
      page: 1,
      // 查询条件
      filter: {},
    };
  },
  watch: {
    // 监听表格数据改变，跟随改变选中值
    list() {
      this.updateChecked();
    },
    selectedItems() {
      this.updateChecked();
    },
    fetchData(val) {
      // 只有在fetchData为数组时，监听fetchData，然后改变数据
      if (Array.isArray(val)) {
        this.list = this.fetchData.slice(
          (this.page - 1) * this.rows,
          this.page * this.rows
        );
        this.total = this.fetchData.length;
      }
    },
  },
  computed: {
    // 搜索表单配置
    options() {
      return {
        borderForm: false,
        labelPosition: "left",
        labelWidth: "80px",
        formItemCol: 8,
        ...this.searchOption,
      };
    },
    // 完整的搜索表单字段
    fields() {
      if (!this.searchField || this.searchField.length === 0) {
        return null;
      }
      // slot submit 处理
      const isExistSlotSubmit = this.searchField.some((field) => {
        return field.name === "submit";
      });
      if (isExistSlotSubmit) {
        return [{ label: "", children: [...this.searchField] }];
      }
      // 不存在就追加到最后
      return [
        {
          label: "",
          children: [
            ...this.searchField,
            {
              name: "submit",
              type: "slot",
            },
          ],
        },
      ];
    },
    fieldSlotNames() {
      const slots = this.$scopedSlots;
      return this.searchField
        .filter((field) => field.type === "slot" && slots[field.name])
        .map((field) => field.name);
    },
    isSlotExpand() {
      return !!this.$slots.expand || !!this.$scopedSlots.expand;
    },
    isSlotOperations() {
      return !!this.$slots.operations || !!this.$scopedSlots.operations;
    },
  },
  methods: {
    updateChecked() {
      if (this.selection) {
        this.list.forEach((row) => {
          const checked = this.selectedItems.some((item) => {
            if (typeof item === "object") {
              return item[this.uniqueKey] === row[this.uniqueKey];
            }
            return item === row[this.uniqueKey];
          });
          this.$nextTick(() => {
            this.$refs.table.toggleRowSelection(row, checked);
          });
        });
      }
    },
    updateFilterProp(key, value) {
      this.filter[key] = value;
    },
    onClickReset() {
      this.$refs.search.initFormData();
      this.filter = { ...this.filter, ...this.$refs.search.getData() };
      this.search(1);
    },
    onClickSearch() {
      this.filter = { ...this.filter, ...this.$refs.search.getData() };
      this.search(1);
    },
    getColumnAttr,
    onSelectionChange(selectItems) {
      const selectSet = new Set();
      const selectMap = new Map();
      let itemType = "object";
      console.log("this.selectedItems", this.selectedItems, selectItems);
      this.selectedItems.forEach((item) => {
        itemType = typeof item;
        if (itemType === "object") {
          selectMap.set(item[this.uniqueKey], item);
        } else {
          selectMap.set(item, item);
        }
      });
      selectItems.forEach((item) => {
        selectSet.add(item[this.uniqueKey]);
        selectMap.set(item[this.uniqueKey], item);
      });
      this.list.forEach((item) => {
        if (!selectSet.has(item[this.uniqueKey])) {
          selectMap.delete(item[this.uniqueKey]);
        }
      });
      const selectedItems =
        itemType === "object" ? [...selectMap.values()] : [...selectMap.keys()];
      this.$emit("update:selectedItems", selectedItems);
      this.$emit("selection-change", selectItems, this.list, selectedItems);
    },
    onExpandChange(row, expand) {
      this.$emit("expand-change", row, expand);
    },
    sortChange(column) {
      const map = { descending: "desc", ascending: "asc" };
      this.sortFields = `${column.prop} ${map[column.order]}`;
      this.search();
    },
    handleSizeChange(rows) {
      this.rows = rows;
      this.search(1);
    },
    search(page) {
      if (page) {
        this.page = page;
      }
      // 判断fetchData的类型
      if (Array.isArray(this.fetchData)) {
        this.list = this.fetchData.slice(
          (page - 1) * this.rows,
          page * this.rows
        );
        this.total = this.fetchData.length;
        return Promise.resolve({ total: this.total, list: this.list });
      }
      return this.fetchData({
        ...filterEmpty(this.filter), // 过滤字段
        sortFields: this.sortFields, // 排序
        page: this.page,
        rows: this.rows,
      }).then((data) => {
        this.list = data.list;
        this.total = data.total;
        return data;
      });
    },
  },
  beforeMount() {
    this.search(1);
  },
};
</script>
<style lang="css" scoped>
.footBtn {
  margin-top: 20px;
}
.pagination {
  margin: 20px 0;
  text-align: right;
}
.table-toolbar {
  line-height: 36px;
  display: flex;
}
.table-toolbar .tabs {
  flex: 1;
}
.toolbar .el-icon {
  cursor: pointer;
  color: #333;
  font-size: 24px;
  margin-right: 12px;
}
</style>
<style lang="css">
.el-table th {
  background-color: #f5f7fa !important;
}
</style>
