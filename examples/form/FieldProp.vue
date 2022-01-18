<template>
  <RenderForm :fields="fields" :watcher="watcher" ref="form"></RenderForm>
</template>
<script>
export default {
  name: "Watcher",
  data() {
    return {
      fields: [
        {
          label: "数值联动",
          children: [
            {
              key: "key1",
              label: "后一个元素的disabled",
              type: "radio",
              options: [
                {
                  value: true,
                  label: "true",
                },
                {
                  value: false,
                  label: "false",
                },
              ],
            },
            {
              key: "key2",
              label: "显示字段1的值",
            },
          ],
        },
      ],
      watcher: {
        key1(value, data, updateField) {
          updateField("key2", { disabled: value });
        },
      },
    };
  },
};
</script>
<style lang="css" scoped></style>
