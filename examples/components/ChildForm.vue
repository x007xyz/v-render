<template>
  <div>
    <normal-switch
      v-model="textModel"
      active-text="文本模式"
      inactive-text="表单模式"
    ></normal-switch>
    <RenderForm
      ref="form"
      :fields="fields"
      :textModel="textModel"
      :watcher="watcher"
    >
      <template #submit>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </template>
    </RenderForm>
  </div>
</template>
<script>
export default {
  name: "ChildForm",
  data() {
    return {
      textModel: false,
      watcher: {
        group(value, data) {
          // 子表单只能监听整个表单的数据变化，更精确的变化可以直接对比前后的顺序
          data.name = `子表单长度：${value.length}`;
        },
        "group.$.key01"(value, data) {
          data.key02 = value.length;
        },
      },
      fields: [
        {
          label: "子表单组件",
          children: [
            {
              key: "name",
              label: "普通的输入框",
            },
            {
              type: "form",
              key: "group",
              label: "子表单",
              headerLabel: "子表单",
              fields: [
                {
                  key: "key01",
                  label: "子表单的输入框",
                  rules: [{ required: true, message: "必填项" }],
                },
                {
                  key: "key02",
                  label: "输入框的字符长度",
                },
              ],
            },
            {
              name: "submit",
              type: "slot",
              label: "",
            },
          ],
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate().then((valid) => {
        console.log("valid", valid);
      });
    },
  },
};
</script>
<style lang="css" scoped></style>
