<template>
  <RenderForm :fields="fields"></RenderForm>
</template>
<script>
export default {
  name: "Block",
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
        {
          label: "Block 03",
          children: [
            {
              label: "元素03",
              key: "elem03",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style lang="css" scoped></style>
