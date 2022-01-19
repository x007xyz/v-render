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
const fetchCategory = () => {
  console.log("访问fetchCategory接口");
  return Promise.resolve([
    { value: 1, label: "美食" },
    { value: 2, label: "地推活动" },
    { value: 3, label: "线下主题活动" },
    { value: 4, label: "单纯品牌曝光" },
  ]);
};
export default {
  name: "DictSelect",
  data() {
    return {
      textModel: false,
      fields: [
        {
          label: "字典下拉",
          children: [
            {
              type: "dict",
              key: "key01",
              dict: fetchCategory,
              dictName: "category",
              cache: {
                type: "session",
                expire: 60,
              },
            },
            {
              type: "dict",
              key: "key02",
              dict: fetchCategory,
              dictName: "category",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style lang="css" scoped></style>
