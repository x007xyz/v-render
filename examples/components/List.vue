<template>
  <div id="app">
    <RenderForm ref="form" :fields="fields" :schema="schema" :watch="watch">
      <template #submit>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </template>
    </RenderForm>
  </div>
</template>
<script>
export default {
  data() {
    return {
      watch: {
        "obj.input1": (val, oldVal) => {
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
        displayType: "row",
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
          list: {
            title: "活动模版",
            type: "array",
            widget: "simpleList",
            items: {
              type: "object",
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
              },
            },
          },
        },
      },
    };
  },
};
</script>
