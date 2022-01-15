<template>
  <div>
    <el-radio-group v-model="scanType">
      <el-radio-button label="single">Tab模式</el-radio-button>
      <el-radio-button label="normal">普通模式</el-radio-button>
    </el-radio-group>
    <br />
    <RenderForm
      ref="form"
      :fields="fields"
      showFoldBtn
      :scanType="scanType"
    ></RenderForm>
  </div>
</template>
<script>
export default {
  name: "ScanType",
  data() {
    return {
      scanType: "single",
      fields: [
        {
          label: "Block 01",
          children: [
            {
              label: "元素01",
              key: "elem01",
            },
          ],
        },
        {
          label: "Block 02",
          children: [
            {
              label: "元素02",
              key: "elem02",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style lang="css" scoped></style>
