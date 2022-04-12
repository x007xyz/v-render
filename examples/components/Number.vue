<template>
  <RenderForm :fields="fields"></RenderForm>
</template>
<script>
export default {
  name: "Input",
  data() {
    return {
      fields: [
        {
          label: "数字输入框",
          children: [
            {
              label: "数字输入框",
              key: "key1",
              type: "number",
            },
            {
              label: "设置小数位数",
              key: "key2",
              type: "number",
            },
            {
              label: "设置数字单位",
              key: "key3",
              type: "number",
              props: {
                decimal: 2,
                unit: 100,
              },
            },
          ],
        },
      ],
    };
  },
};
</script>
<style lang="css" scoped></style>
