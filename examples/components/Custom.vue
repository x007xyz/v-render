<template>
  <RenderForm :fields="fields" :watcher="watcher"></RenderForm>
</template>
<script>
export default {
  name: "Custom",
  data() {
    return {
      fields: [
        {
          label: "自定义组件",
          children: [
            {
              key: "price",
              label: "价格",
              type: "custom-input",
            },
            {
              key: "show",
              label: "实际的值",
              textModel: true,
            },
          ],
        },
      ],
      watcher: {
        price(value, data) {
          data.show = value;
        },
      },
    };
  },
};
</script>
<style lang="css" scoped></style>
