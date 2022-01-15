<template>
  <RenderForm :fields="fields" :borderForm="false"></RenderForm>
</template>
<script>
export default {
  name: "Border",
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
};
</script>
<style lang="css" scoped></style>
