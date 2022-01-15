<template>
  <div id="app">
    <el-radio-group v-model="formItemCol">
      <el-radio-button :label="24">Span24</el-radio-button>
      <el-radio-button :label="12">Span12</el-radio-button>
      <el-radio-button :label="6">Span6</el-radio-button>
    </el-radio-group>
    <RenderForm :fields="fields" :formItemCol="formItemCol">
      <template #submit>
        <el-button type="primary">提交</el-button>
      </template>
    </RenderForm>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formItemCol: 12,
      fields: [
        {
          label: "表单布局",
          children: [
            {
              label: "活动名称",
              type: "input",
              key: "name",
            },
            {
              label: "活动区域",
              type: "select",
              key: "region",
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
              span: 12,
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
