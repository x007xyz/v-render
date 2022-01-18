<template>
  <RenderForm :fields="fields"></RenderForm>
</template>
<script>
export default {
  name: "Input",
  data() {
    return {
      fields: [
        {
          label: "输入框",
          children: [
            {
              label: "输入框",
              key: "key1",
            },
            {
              label: "Textarea",
              key: "key2",
              props: {
                type: "textarea",
              },
            },
          ],
        },
      ],
    };
  },
};
</script>
<style lang="css" scoped></style>
