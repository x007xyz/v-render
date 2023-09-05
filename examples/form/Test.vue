<template>
  <div id="app">
    <RenderForm ref="form" :fields="fields" :schema="schema">
      <template #submit>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </template>
    </RenderForm>
  </div>
</template>
<script>
export default {
  data() {
    return {
      schema: {
        type: "object",
        displayType: "row",
        properties: {
          void1: {
            title: "常用组件",
            type: "void",
            widget: "voidTitle",
          },
          input1: {
            title: "输入框",
            type: "string",
            widget: "normal-input",
          },
          number1: {
            title: "数字输入框",
            type: "number",
            widget: "inputNumber",
          },
          select1: {
            title: "下拉单选",
            type: "string",
            widget: "select",
            props: {
              options: [
                { label: "早", value: "a" },
                { label: "中", value: "b" },
                { label: "晚", value: "c" },
              ],
            },
          },
          multiSelect1: {
            title: "多选",
            type: "array",
            widget: "multiSelect",
            description: "下拉多选",
            props: {
              options: [
                { label: "杭州", value: "a" },
                { label: "武汉", value: "b" },
                { label: "湖州", value: "c" },
                { label: "贵阳", value: "d" },
              ],
            },
          },
          radio1: {
            title: "点击单选",
            type: "string",
            widget: "radio",
            props: {
              options: [
                { label: "早", value: "a" },
                { label: "中", value: "b" },
                { label: "晚", value: "c" },
              ],
            },
          },
          checkboxes1: {
            title: "点击多选",
            type: "array",
            widget: "checkboxes",
            props: {
              options: [
                { label: "杭州", value: "a" },
                { label: "武汉", value: "b" },
                { label: "湖州", value: "c" },
                { label: "贵阳", value: "d" },
              ],
            },
          },
          textarea1: {
            title: "长文本",
            type: "string",
            widget: "textArea",
          },
          date1: {
            title: "日期选择",
            type: "string",
            widget: "datePicker",
          },
          dateRange1: {
            title: "日期范围",
            type: "range",
            widget: "dateRange",
          },
          time1: {
            title: "时间选择",
            type: "string",
            widget: "timePicker",
          },
          timeRange1: {
            title: "时间范围",
            type: "range",
            widget: "timeRange",
          },
          void2: {
            title: "其他组件",
            type: "void",
            widget: "voidTitle",
          },
          html1: {
            title: "HTML",
            type: "string",
            widget: "html",
          },
          switch1: {
            title: "开关",
            type: "boolean",
            widget: "switch",
          },
          checkbox1: {
            title: "是否选择",
            type: "boolean",
            widget: "checkbox",
          },
          slider1: {
            title: "带滑动条",
            type: "number",
            widget: "slider",
          },
          image1: {
            title: "图片展示",
            type: "string",
            widget: "imageInput",
          },
          color1: {
            title: "颜色选择",
            type: "string",
            widget: "color",
          },
          url1: {
            title: "链接",
            type: "string",
            widget: "urlInput",
          },
          obj: {
            type: "object",
            title: "卡片主题",
            description: "这是一个对象类型",
            widget: "collapse",
            column: 3,
            properties: {
              input1: {
                title: "输入框 A",
                type: "string",
              },
              input2: {
                title: "输入框 B",
                type: "string",
              },
              input3: {
                title: "输入框 C",
                type: "string",
              },
              input4: {
                title: "输入框 D",
                type: "string",
              },
            },
          },
          list: {
            title: "活动模版",
            type: "array",
            widget: "simpleList",
            items: {
              type: "object",
              properties: {
                input1: {
                  title: "输入框 A",
                  type: "string",
                },
                input2: {
                  title: "输入框 B",
                  type: "string",
                },
                input3: {
                  title: "输入框 C",
                  type: "string",
                },
              },
            },
          },
        },
      },
      fields: [
        {
          label: "基础用法",
          children: [
            {
              key: "id",
              label: "id",
              hidden: true,
            },
            {
              label: "活动名称",
              type: "input",
              key: "name",
            },
            {
              label: "活动区域",
              type: "normal-select",
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
  methods: {
    onSubmit() {
      this.$alert(JSON.stringify(this.$refs.form.getData(), null, 2));
    },
  },
};
</script>
