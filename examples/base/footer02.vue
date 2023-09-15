<template>
  <RenderForm :schema="schema" :footer="footer"></RenderForm>
</template>
<script>
export default {
  name: "footer01",
  data() {
    return {
      footer: {
        submit: {
          title: "提交",
        },
        reset: {
          title: "清空",
        },
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
