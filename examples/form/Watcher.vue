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
          ],
        },
      ],
      watcher: {
        key1(value, data) {
          data.key2 = "字段1的值是：" + value;
        },
      },
    };
  },
};
</script>
<style lang="css" scoped></style>
