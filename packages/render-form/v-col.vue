<template>
  <div class="v-col" :class="className" @click="$emit('click')">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "v-col",
  props: {
    column: {
      type: Number,
      default: 1,
    },
    span: {
      type: Number,
      default: null,
    },
  },
  computed: {
    className() {
      return `v-col-${this.span || 24 / this.column}`;
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.v-col {
  position: relative;
  max-width: 100%;
  min-height: 1px;
}
.v-col::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.v-col:hover::after {
  border: 1px dashed #409eff;
}
$grid-columns: 24;

@for $i from 1 through $grid-columns {
  .v-col-#{$i} {
    display: block;
    flex: 0 0 percentage($i / $grid-columns);
    max-width: percentage($i / $grid-columns);
  }
}
</style>
