<template>
  <div>
    <normal-switch
      v-model="textModel"
      active-text="文本模式"
      inactive-text="表单模式"
    ></normal-switch>
    <RenderForm :fields="fields" :textModel="textModel"></RenderForm>
  </div>
</template>
<script>
export default {
  name: "Time",
  data() {
    return {
      textModel: false,
      fields: [
        {
          label: "时间组件",
          children: [
            {
              type: "time",
              key: "key1",
              label: "时间",
            },
            {
              type: "time",
              key: "key2",
              label: "日期范围",
              props: {
                "range-separator": "至",
                type: "timerange",
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
