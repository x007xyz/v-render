<template>
  <draggable class="v-row" :list="list" :group="group">
    <slot></slot>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "v-row",
  components: {
    draggable,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    group: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="css" scoped>
.v-row {
  display: flex;
  flex-flow: row wrap;
  min-width: 0;
}
</style>
