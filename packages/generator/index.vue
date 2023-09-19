<template>
  <div class="container">
    <div class="left-side">
      <draggable
        v-model="components"
        :group="{ name: 'g1', pull: 'clone', put: false }"
        :clone="onDragComponent"
      >
        <div v-for="component in components" :key="component.widget">
          {{ component.label }}
        </div>
      </draggable>
    </div>
    <div class="board">
      <RenderForm :schema="schema" @select-field="onClick"></RenderForm>
    </div>
    <div class="right-side">
      {{ selectedPath }}
      {{ schemaOptions && JSON.stringify(schemaOptions, null, 2) }}
    </div>
  </div>
</template>
<script>
import RenderForm from "../render-form";
import draggable from "vuedraggable";
export default {
  name: "index",
  components: {
    RenderForm,
    draggable,
  },
  data() {
    return {
      schemaOptions: null,
      selectedPath: null,
      components: [
        {
          label: "输入框",
          widget: "input",
        },
        {
          label: "数字输入框",
          widget: "Title",
        },
      ],
      schema: {
        type: "object",
        displayType: "row",
        column: 2,
        props: {
          inline: true,
        },
        properties: {
          void1: {
            title: "常用组件",
            type: "string",
            widget: "Title",
            span: 24,
            noField: true,
          },
          input1: {
            title: "输入框",
            type: "string",
            widget: "Input",
          },
          number1: {
            title: "数字输入框",
            type: "number",
            widget: "NumberInput",
          },
          select1: {
            title: "下拉单选",
            type: "string",
            widget: "Select",
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
            widget: "Select",
            description: "下拉多选",
            props: {
              multiple: true,
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
            widget: "Checkbox",
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
            widget: "Input",
            props: {
              type: "textarea",
            },
          },
          date1: {
            title: "日期选择",
            type: "string",
            widget: "datePicker",
            props: {
              type: "date",
            },
          },
          dateRange1: {
            title: "日期范围",
            type: "range",
            widget: "datePicker",
            props: {
              type: "daterange",
            },
          },
          time1: {
            title: "时间选择",
            type: "string",
            widget: "TimePicker",
            props: {
              pickerOptions: {
                selectableRange: "18:30:00 - 20:30:00",
              },
            },
          },
          timeRange1: {
            title: "时间范围",
            type: "range",
            widget: "TimePicker",
            props: {
              isRange: true,
            },
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
            widget: "Switch",
          },
          checkbox1: {
            title: "是否选择",
            type: "boolean",
            widget: "Switch",
            disabled: "{{ formData.switch1 === true }}",
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
            widget: "Card",
            column: 3,
            span: 24,
            width: "90%",
            properties: {
              input1: {
                title: "输入框 A",
                type: "string",
                widget: "Input",
              },
              input2: {
                title: "输入框 B",
                type: "string",
                widget: "Input",
              },
              input3: {
                title: "输入框 C",
                type: "string",
                widget: "Input",
              },
              input4: {
                title: "输入框 D",
                type: "string",
                widget: "Input",
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
                  widget: "Input",
                },
                input2: {
                  title: "输入框 B",
                  type: "string",
                  widget: "Input",
                },
                input3: {
                  title: "输入框 C",
                  type: "string",
                  widget: "Input",
                },
              },
            },
          },
        },
      },
    };
  },
  methods: {
    onClick(res) {
      console.log("🚀 ~ file: index.vue:262 ~ onClick ~ res:", res);
      this.schemaOptions = res.schema;
      this.selectedPath = res.path;
    },
    onDragComponent(component) {
      console.log(component);
      return {
        title: `输入框${Math.floor(Math.random() * 100)}`,
        type: "string",
        key: `input${Math.floor(Math.random() * 100)}`,
        widget: "Input",
      };
    },
  },
};
</script>
<style lang="css" scoped>
.container {
  display: flex;
  flex-flow: row nowrap;
  height: 100vh;
  overflow: hidden;
}
.board {
  width: 800px;
  overflow-y: auto;
}
.left-side {
  flex: 1;
}
.right-side {
  flex: 1;
}
</style>
