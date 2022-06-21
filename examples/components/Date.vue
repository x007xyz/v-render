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
  name: "Date",
  data() {
    return {
      textModel: false,
      fields: [
        {
          label: "日期组件",
          children: [
            {
              type: "date",
              key: "key1",
              label: "日期",
              props: {
                format: "yyyy年MM月dd日",
              },
            },
            {
              type: "date",
              key: "key2",
              label: "日期范围",
              props: {
                "range-separator": "至",
                type: "daterange",
              },
            },
            {
              type: "date",
              key: "key3",
              label: "日期时间",
              props: {
                type: "datetime",
              },
            },
            {
              type: "date",
              key: "key4",
              label: "日期时间范围",
              props: {
                type: "datetimerange",
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
