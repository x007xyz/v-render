<template>
  <RenderForm :fields="fields"></RenderForm>
</template>
<script>
export default {
  name: "Date",
  data() {
    return {
      fields: [
        {
          label: "日期组件",
          children: [
            {
              type: "date",
              key: "key1",
              label: "日期",
            },
            {
              type: "date",
              key: "key2",
              label: "日期范围",
              props: {
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
