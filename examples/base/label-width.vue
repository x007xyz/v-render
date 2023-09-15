<template>
  <div>
    <el-form>
      <el-form-item label="labelWidth：标签的宽度">
        <el-radio-group v-model="labelWidth">
          <el-radio-button :label="80">80</el-radio-button>
          <el-radio-button label="120px">120px</el-radio-button>
          <el-radio-button label="50%">50%</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <RenderForm
      :schema="schema"
      :labelWidth="labelWidth"
      labelPosition="left"
    ></RenderForm>
  </div>
</template>
<script>
export default {
  name: "label-width",
  data() {
    return {
      labelWidth: 80,
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
