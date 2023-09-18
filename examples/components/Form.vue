<template>
  <div id="app">
    <RenderForm ref="form" :schema="schema"></RenderForm>
  </div>
</template>
<script>
export default {
  data() {
    return {
      schema: {
        type: "object",
        displayType: "row",
        column: 2,
        props: {
          inline: true,
        },
        properties: {
          void1: {
            title: "父表单",
            type: "string",
            widget: "Title",
            span: 24,
            noField: true,
          },
          input1: {
            title: "输入框",
            type: "string",
            widget: "Input",
          },
          obj: {
            type: "object",
            title: "卡片主题",
            description: "这是一个对象类型",
            widget: "Card",
            column: 3,
            span: 24,
            width: "90%",
            properties: {
              input1: {
                title: "输入框 A",
                type: "string",
                widget: "Input",
              },
              input2: {
                title: "输入框 B",
                type: "string",
                widget: "Input",
              },
              input3: {
                title: "输入框 C",
                type: "string",
                widget: "Input",
              },
              input4: {
                title: "输入框 D",
                type: "string",
                widget: "Input",
              },
            },
          },
        },
      },
    };
  },
};
</script>
