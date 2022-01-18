<template>
  <RenderForm :fields="fields"></RenderForm>
</template>
<script>
export default {
  name: "Switch",
  data() {
    return {
      fields: [
        {
          label: "开关",
          children: [
            {
              label: "开关",
              key: "key1",
              type: "switch",
            },
            {
              label: "默认值",
              key: "key2",
              type: "switch",
              defaultValue: true,
            },
            {
              label: "文字描述",
              key: "key3",
              type: "switch",
              "active-text": "按月付费",
              "inactive-text": "按年付费",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style lang="css" scoped></style>
