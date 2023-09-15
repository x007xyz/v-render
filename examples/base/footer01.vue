<template>
  <RenderForm :schema="schema" footer></RenderForm>
</template>
<script>
export default {
  name: "footer01",
  data() {
    return {
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
