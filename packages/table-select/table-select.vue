<template>
  <div class="table-select-wrapper">
    <el-button type="text" size="default" @click="openTable">{{title}}</el-button>
      <TableData
        ref="table"
        :fetchData="list"
        :defaultRows="5"
        defaultLayout="total, prev, pager, next"
        :columns="columns"
      >
        <template v-slot:operations="{ row }">
          <el-link type="danger" :underline="false" @click="delItem(row)">移除</el-link>
        </template>
      </TableData>
      <TableDialog ref="dialog" :title="title" :fetchData="fetchData" :columns="columns" @onConfirm="onConfirm"></TableDialog>
  </div>
</template>
<script>
/**
 * 查询数据的方法fetchData
 * 已有数据value
 * getItems通过已有数据查询显示数据，没有详细数据要使用ids获取详细数据和分页
 * 表格内容 columns
 */
export default {
  name: 'table-select',
  components: {
    TableData: () => import('../table-data/table-data.vue'),
    TableDialog: () => import('./table-dialog.vue')
  },
  props: {
    value: {
      required: true
    },
    title: String,
    fetchData: Function,
    getItems: Function,
    elementType: {
      type: String,
      default () {
        // object 表示返回值时对象数组，unique表示返回值对象时唯一值数组
        return 'unique'
      }
    },
    columns: {
      type: Array,
      required: true
    }
  },
  watch: {
    value (val) {
      if (this.elementType === 'unique') {
        this.getItems(val).then(data => {
          this.list = data
        })
      } else {
        this.list = val
      }
    }
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    onConfirm (list) {
      if (this.elementType === 'unique') {
        this.$emit('input', list.map(item => {
          return item.id
        }))
      } else {
        this.$emit('input', list)
      }
    },
    openTable () {
      this.$refs.dialog.show(this.list)
    },
    delItem (row) {
      if (this.elementType === 'unique') {
        this.$emit('input', this.value.filter(item => {
          return item !== row.id
        }))
      } else {
        this.$emit('input', this.value.filter(item => {
          return item.id !== row.id
        }))
      }
    }
  }
}
</script>
<style lang="css" scoped>
</style>
