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
const list = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];
const searchList = (query) => {
  console.log("访问searchList接口");
  return Promise.resolve(
    list
      .map((item, index) => {
        return { value: index, label: item };
      })
      .filter((item) => {
        return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
      })
  );
};
const getOption = (value) => {
  return Promise.resolve({
    value,
    label: list[value],
  });
};
export default {
  name: "DictSelect",
  data() {
    return {
      textModel: false,
      fields: [
        {
          label: "搜索下拉",
          children: [
            {
              type: "search",
              label: "搜索下拉",
              key: "key01",
              searchFn: searchList,
              getOption,
            },
            {
              type: "search",
              label: "默认值",
              key: "key02",
              searchFn: searchList,
              defaultValue: 1,
              getOption,
            },
            {
              type: "search",
              label: "允许空值查询",
              key: "key03",
              searchFn: searchList,
              canEmpty: true,
              getOption,
            },
          ],
        },
      ],
    };
  },
};
</script>
<style lang="css" scoped></style>
