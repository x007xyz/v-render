<template>
  <RenderForm :fields="fields">
    <template #card>
      <el-card class="box-card">
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
    </template>
    <template #submit>
      <el-button type="primary">提交</el-button>
    </template>
  </RenderForm>
</template>
<script>
export default {
  name: "SlotComp",
  data() {
    return {
      fields: [
        {
          label: "Slot",
          children: [
            {
              label: "普通输入框",
              key: "input",
            },
            {
              label: "label标签无效",
              name: "card",
              type: "slot-single",
            },
            {
              label: "",
              type: "slot",
              name: "submit",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style lang="css" scoped>
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
</style>
