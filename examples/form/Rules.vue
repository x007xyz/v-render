<template>
  <div id="app">
    <RenderForm ref="form" :fields="fields" :formItemCol="12">
      <template #submit>
        <el-button type="primary" @click="validate">校验数据</el-button>
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
              rules: [
                { required: true, message: "请输入活动名称", trigger: "blur" },
                {
                  min: 3,
                  max: 5,
                  message: "长度在 3 到 5 个字符",
                  trigger: "blur",
                },
              ],
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
              rules: [
                {
                  required: true,
                  message: "请选择活动区域",
                  trigger: "change",
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
              rules: [
                {
                  type: "date",
                  required: true,
                  message: "请选择日期",
                  trigger: "change",
                },
              ],
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
              rules: [
                {
                  type: "array",
                  required: true,
                  message: "请至少选择一个活动性质",
                  trigger: "change",
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
              rules: [
                {
                  required: true,
                  message: "请选择活动资源",
                  trigger: "change",
                },
              ],
            },
            {
              label: "活动形式",
              key: "desc",
              type: "input",
              props: {
                type: "textarea",
              },
              rules: [
                { required: true, message: "请填写活动形式", trigger: "blur" },
              ],
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
    validate() {
      this.$refs.form.validate().then((valid) => {
        console.log(valid);
      });
    },
  },
};
</script>
