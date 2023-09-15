<template>
  <div class="container">
    <RenderForm ref="newForm" :schema="schema" footer @submit="onSubmit01">
    </RenderForm>
    <p>点击新增数据按钮，数据会在编辑表单中显示</p>
    <RenderForm ref="editForm" :schema="schema" footer @submit="onSubmit02">
    </RenderForm>
    <p>点击保存数据按钮，数据会在表单详情中显示</p>
    <RenderForm ref="detailForm" :schema="schema" footer readonly> </RenderForm>
  </div>
</template>
<script>
export default {
  data() {
    return {
      schema: {
        type: "object",
        column: 2,
        properties: {
          name: {
            title: "活动名称2",
            type: "string",
            widget: "Input",
          },
          region: {
            title: "活动区域",
            type: "array",
            key: "region",
            widget: "Select",
            props: {
              multiple: true,
              options: [
                {
                  label: "区域1",
                  value: "beijing",
                },
                {
                  label: "区域2",
                  value: "shanghai",
                },
              ],
            },
          },
          date: {
            title: "活动时间",
            type: "date",
            key: "date",
            widget: "datePicker",
            props: {
              type: "datetime",
            },
          },
          delivery: {
            title: "即时配送",
            widget: "switch",
            key: "delivery",
            defaultValue: true,
          },
          type: {
            title: "活动性质",
            type: "array",
            widget: "checkbox",
            key: "type",
            options: [
              {
                label: "美食/餐厅线上活动",
                value: 1,
              },
              {
                label: "地推活动",
                value: 2,
              },
              {
                label: "线下主题活动",
                value: 3,
              },
              {
                label: "单纯品牌曝光",
                value: 4,
              },
            ],
          },
          resource: {
            title: "特殊资源",
            key: "resource",
            type: "radio",
            widget: "radio",
            options: [
              {
                label: "线上品牌商赞助",
                value: 1,
              },
              {
                label: "线下场地免费",
                value: 2,
              },
            ],
            default: 1,
          },
          desc: {
            title: "活动形式",
            key: "desc",
            widget: "input",
            type: "string",
            props: {
              type: "textarea",
            },
          },
        },
      },
    };
  },
  methods: {
    onSubmit01(data) {
      window.alert("提交的内容为：" + JSON.stringify(data, null, 2));
      this.$refs.editForm.setValues(this.$refs.newForm.getValues());
    },
    onSubmit02(data) {
      window.alert("提交的内容为：" + JSON.stringify(data, null, 2));
      this.$refs.detailForm.setValues(this.$refs.editForm.getValues());
    },
  },
};
</script>
<style lang="css" scoped></style>
