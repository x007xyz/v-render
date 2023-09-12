<script>
export default {
  name: "index",
  props: {
    schema: Object,
    value: [String, Number, Boolean, Array, Object],
    options: Array,
  },
  functional: true,
  render(h, context) {
    const { schema, value, options } = context.props;

    let __html = "-";

    if (schema.type === "boolean") {
      __html = value === true ? "✔" : "✘";
    } else if (options?.length > 0) {
      if (["string", "number"].indexOf(typeof value) > -1) {
        const item = options.find((item) => item.value === value);
        __html = item?.label || "-";
      } else if (Array.isArray(value)) {
        let idxStr = "-";
        value.forEach((v) => {
          const item = options.find((item) => item.value === v);
          const name = item.label;
          if (name) {
            idxStr += "," + name;
          }
        });
        __html = idxStr.replace("-,", "");
      }
    } else if (typeof value === "number") {
      __html = String(value);
    } else if (typeof value === "string") {
      __html = value;
    } else if (
      schema.type === "range" &&
      Array.isArray(value) &&
      value[0] &&
      value[1]
    ) {
      __html = `${value[0]} - ${value[1]}`;
    } else if (value && ["number", "string"].indexOf(value) === -1) {
      __html = JSON.stringify(value);
    }

    if (schema.format === "image") {
      return <Image height={56} src={value} {...schema.imageProps} />;
    }

    return h("div", {
      domProps: {
        innerHTML: __html,
      },
    });
  },
};
</script>
<style lang="css" scoped></style>
