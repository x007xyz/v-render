<template>
  <div id="app">
    <RenderForm ref="form" :schema="schema"> </RenderForm>
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
    onSubmit() {
      this.$alert(JSON.stringify(this.$refs.form.getData(), null, 2));
    },
  },
};
</script>
