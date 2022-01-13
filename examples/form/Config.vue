<template>
  <div id="app">
    <RenderForm :fields="fields" :formItemCol="12">
      <template #submit>
        <el-button type="primary">提交</el-button>
      </template>
    </RenderForm>
  </div>
</template>
<script>
export default {
  components: {
    RenderForm: () => import("@v-render/render-form"),
  },
  data() {
    return {
      fields: [
        {
          label: "典型表单",
          children: [
            {
              label: "活动名称",
              type: "input",
              key: "name",
              defaultValue: "新年活动",
            },
            {
              label: "活动区域",
              type: "select",
              key: "region",
              options: [
                {
                  label: "区域1",
                  value: "beijing",
                  disabled: true,
                },
                {
                  label: "区域2",
                  value: "shanghai",
                },
              ],
            },
            {
              label: "活动时间",
              type: "date",
              key: "date",
              props: {
                type: "datetime",
              },
            },
            {
              label: "即时配送",
              type: "switch",
              key: "delivery",
              defaultValue: true,
              hidden: true,
            },
            {
              label: "活动性质",
              type: "checkbox",
              key: "type",
              options: [
                {
                  label: "美食/餐厅线上活动",
                  value: 1,
                },
                {
                  label: "地推活动",
                  value: 2,
                  disabled: true,
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
            {
              label: "特殊资源",
              key: "resource",
              type: "radio",
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
              defaultValue: 1,
            },
            {
              label: "活动形式",
              key: "desc",
              type: "input",
              props: {
                type: "textarea",
              },
            },
            {
              name: "submit",
              type: "slot",
              label: "",
              nextRowFirst: true,
            },
          ],
        },
      ],
    };
  },
};
</script>
