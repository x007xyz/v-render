<template>
  <RenderForm :fields="fields"></RenderForm>
</template>
<script>
export default {
  name: "Checkbox",
  data() {
    return {
      fields: [
        {
          label: "多选框",
          children: [
            {
              label: "多选框",
              type: "checkbox",
              key: "key1",
              options: [
                {
                  value: 1,
                  label: "选项1",
                },
                {
                  value: 2,
                  label: "选项2",
                },
              ],
            },
            {
              label: "设置默认值",
              type: "checkbox",
              key: "key2",
              defaultValue: [2],
              options: [
                {
                  value: 1,
                  label: "选项1",
                },
                {
                  value: 2,
                  label: "选项2",
                },
              ],
            },
            {
              label: "禁用选项",
              type: "checkbox",
              key: "key3",
              options: [
                {
                  value: 1,
                  label: "选项1",
                  disabled: true,
                },
                {
                  value: 2,
                  label: "选项2",
                },
              ],
            },
            {
              label: "render渲染",
              type: "checkbox",
              key: "key4",
              options: [
                {
                  value: 1,
                  label: "选项1",
                  render(h, option) {
                    return <span style="color: red">{option.label}</span>;
                  },
                },
                {
                  value: 2,
                  label: "选项2",
                  render(h, option) {
                    return <span style="color: blue">{option.label}</span>;
                  },
                },
              ],
            },
          ],
        },
      ],
    };
  },
};
</script>
<style lang="css" scoped></style>
