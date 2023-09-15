<template>
  <div>
    <el-form>
      <el-form-item label="column：每行展示多少项">
        <el-radio-group v-model="column">
          <el-radio-button :label="1">1</el-radio-button>
          <el-radio-button :label="2">2</el-radio-button>
          <el-radio-button :label="4">4</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <RenderForm :schema="schema"></RenderForm>
  </div>
</template>
<script>
export default {
  name: "label-width",
  data() {
    return {
      column: 1,
    };
  },
  computed: {
    schema() {
      return {
        type: "object",
        column: this.column,
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
          input3: {
            title: "input3",
            type: "string",
            widget: "Input",
          },
          input4: {
            title: "input4",
            type: "string",
            widget: "Input",
          },
        },
      };
    },
  },
};
</script>
<style lang="css" scoped></style>
