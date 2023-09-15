<template>
  <RenderForm :schema="schema" :footer="footer"></RenderForm>
</template>
<script>
export default {
  name: "footer01",
  data() {
    return {
      footer: () => {
        return <el-button>自定义按钮</el-button>;
      },
      schema: {
        type: "object",
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
