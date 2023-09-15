<template>
  <div>
    <el-form>
      <el-form-item label="labelPosition：标签位置">
        <el-radio-group v-model="labelPosition">
          <el-radio-button label="top">top</el-radio-button>
          <el-radio-button label="left">left</el-radio-button>
          <el-radio-button label="right">right</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <RenderForm :schema="schema" :labelPosition="labelPosition"></RenderForm>
  </div>
</template>
<script>
export default {
  name: "label-position",
  data() {
    return {
      labelPosition: "top",
      schema: {
        type: "object",
        column: 2,
        properties: {
          input1: {
            title: "input1",
            type: "string",
            widget: "Input",
          },
          input2: {
            title: "input2",
            type: "string",
            widget: "Input",
          },
        },
      },
    };
  },
};
</script>
<style lang="css" scoped></style>
