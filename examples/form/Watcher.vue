<template>
  <RenderForm :fields="fields" :watcher="watcher"></RenderForm>
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
              label: "字段1",
            },
            {
              key: "key2",
              label: "显示字段1的值",
            },
            {
              key: "key3",
              label: "字段2",
            },
            {
              key: "key4",
              type: "switch",
              label: "控制字段2的disabled属性",
            },
          ],
        },
      ],
      watcher: {
        key1({ value, updateValue }) {
          updateValue("key2", "字段1的值是：" + value);
        },
        key4({ value, updateField }) {
          updateField("key3", {
            props: {
              disabled: value,
            },
          });
        },
      },
    };
  },
};
</script>
<style lang="css" scoped></style>
