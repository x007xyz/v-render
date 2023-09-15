<template>
  <RenderForm :schema="schema" :watch="watch"></RenderForm>
</template>
<script>
export default {
  name: "label-width",
  data() {
    return {
      watch: {
        input1: (val, oldVal) => {
          console.log(val, oldVal);
        },
        "#": {
          handler(val, oldVal) {
            console.log(val, oldVal);
          },
          deep: true,
        },
      },
      schema: {
        type: "object",
        properties: {
          switch1: {
            title: "禁用输入框",
            type: "boolean",
            widget: "Switch",
          },
          input1: {
            title: "输入框",
            type: "String",
            widget: "Input",
          },
        },
      },
    };
  },
};
</script>
<style lang="css" scoped></style>
