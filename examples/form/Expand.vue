<template>
  <div>
    <RenderForm ref="form" :fields="fields" showFoldBtn></RenderForm>
    <el-button type="primary" @click="onToggle">展开/收起</el-button>
  </div>
</template>
<script>
export default {
  name: "Expand",
  data() {
    return {
      fields: [
        {
          label: "Block 01",
          children: [
            {
              label: "元素01",
              key: "elem01",
            },
          ],
        },
        {
          label: "Block 02",
          children: [
            {
              label: "元素02",
              key: "elem02",
            },
          ],
        },
      ],
    };
  },
  methods: {
    onToggle() {
      this.$refs.form.foldAllBlock();
    },
  },
};
</script>
<style lang="css" scoped></style>
