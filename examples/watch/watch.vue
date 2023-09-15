<template>
  <RenderForm :schema="schema"></RenderForm>
</template>
<script>
export default {
  name: "label-width",
  data() {
    return {
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
            disabled: "{{ formData.switch1 === true }}",
          },
          list: {
            title: "活动模版",
            type: "array",
            widget: "simpleList",
            items: {
              type: "object",
              properties: {
                switch1: {
                  title: "隐藏输入框",
                  type: "boolean",
                  widget: "Switch",
                },
                input1: {
                  title: "输入框",
                  type: "String",
                  widget: "Input",
                  hidden: "{{ rootValue.switch1 === true }}",
                },
              },
            },
          },
        },
      },
    };
  },
};
</script>
<style lang="css" scoped></style>
