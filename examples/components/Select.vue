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
          label: "选择框",
          children: [
            {
              label: "选择框",
              type: "select",
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
              type: "select",
              key: "key2",
              defaultValue: 2,
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
              type: "select",
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
          ],
        },
      ],
    };
  },
};
</script>
<style lang="css" scoped></style>
