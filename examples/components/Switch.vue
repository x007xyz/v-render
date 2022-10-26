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
  name: "Switch",
  data() {
    return {
      textModel: false,
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
              activeText: "按月付费",
              inactiveText: "按年付费",
              activeValue: "Y",
              inactiveValue: "N",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style lang="css" scoped></style>
