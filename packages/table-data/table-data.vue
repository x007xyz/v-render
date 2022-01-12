<template>
  <div class="table-data">
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
        <template v-if="column.render" v-slot="scope">
          <TableItem :scope="scope" :render="column.render"></TableItem>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        v-bind="operationAttr"
        v-if="isSlotOperations || operations"
      >
        <template slot-scope="scope">
          <slot name="operations" v-bind="scope"></slot>
          <template v-if="!isSlotOperations">
            <template v-for="(operation, index) in operations">
              <el-button
                v-if="!(operation.hidden && operation.hidden(scope.row))"
                :key="index"
                type="text"
                size="small"
                @click="operation.handle(scope.row)"
                >{{ operation.label }}</el-button
              >
            </template>
          </template>
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
import { getColumnAttr } from './utils'
export default {
  name: 'table-data',
  components: { TableItem: () => import('../render-item/render-item.vue') },
  props: {
    operationAttr: Object,
    columns: Array,
    operations: Array,
    fetchData: {
      type: [Function, Array],
      required: true
    },
    setStyle: Function,
    selection: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Object,
      default () {
        return {}
      }
    },
    defaultRows: {
      type: Number,
      default: 10
    },
    defaultLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    }
  },
  data () {
    return {
      list: [],
      total: 0,
      rows: this.defaultRows,
      sortFields: 'cdate desc',
      page: 1
    }
  },
  watch: {
    fetchData (val) {
      // 只有在fetchData为数组时，监听fetchData，然后改变数据
      if (Array.isArray(val)) {
        this.list = this.fetchData.slice((this.page - 1) * this.rows, this.page * this.rows)
        this.total = this.fetchData.length
      }
    }
  },
  computed: {
    isSlotExpand () {
      return !!this.$slots.expand || !!this.$scopedSlots.expand
    },
    isSlotOperations () {
      return !!this.$slots.operations || !!this.$scopedSlots.operations
    }
  },
  methods: {
    getColumnAttr,
    onSelectionChange (val) {
      this.$emit('selection-change', val)
    },
    onExpandChange (row, expand) {
      this.$emit('expand-change', row, expand)
    },
    sortChange (column) {
      const map = { descending: 'desc', ascending: 'asc' }
      this.sortFields = `${column.prop} ${map[column.order]}`
      this.search()
    },
    handleSizeChange (rows) {
      this.rows = rows
      this.search(1)
    },
    search (page) {
      if (page) {
        this.page = page
      }
      // 判断fetchData的类型
      if (Array.isArray(this.fetchData)) {
        this.list = this.fetchData.slice((page - 1) * this.rows, page * this.rows)
        this.total = this.fetchData.length
        return Promise.resolve({ total: this.total, list: this.list })
      }
      return this.fetchData({
        ...this.filter, // 过滤字段
        sortFields: this.sortFields, // 排序
        page: this.page,
        rows: this.rows
      }).then(data => {
        this.list = data.list
        this.total = data.total
        return data
      })
    }
  },
  beforeMount () {
    this.search(1)
  }
}
</script>
<style lang="css" scoped>
/* .table-data { */
/* margin-top: 20px; */
/* } */
.footBtn {
  margin-top: 20px;
}
</style>
