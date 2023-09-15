<template>
  <div>
    <RenderForm :schema="schema"></RenderForm>
  </div>
</template>
<script>
export default {
  name: "label-width",
  data() {
    return {
      schema: {
        type: "object",
        properties: {
          input1: {
            title: "span24",
            type: "string",
            span: 24,
            widget: "Input",
          },
          input2: {
            title: "span12",
            span: 12,
            type: "string",
            widget: "Input",
          },
          input3: {
            title: "span6",
            type: "string",
            span: 6,
            widget: "Input",
          },
          input4: {
            title: "span6",
            type: "string",
            span: 6,
            widget: "Input",
          },
        },
      },
    };
  },
};
</script>
<style lang="css" scoped></style>
