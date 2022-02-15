<template>
  <div class="container">
    {{ obj }}
  </div>
</template>
<script>
const parseObj2Fields = (obj) => {
  console.log(obj);
  const fields = [];
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      console.log("object");
    } else {
      fields.push({ key, value: obj[key] });
    }
  });
  return fields;
};
export default {
  name: "index",
  data() {
    return {
      obj: {
        icon: "图片链接",
        title: "标题",
        layout: "类型:list 列表 grid 网格",
        param: "",
        method: "suggestion  推荐,item 商品,shop商家",
        // RouterInfo: {
        //   linkType: "",
        //   linkUrl: "",
        //   condition: "条件，login 登录 real 实名",
        //   visible: "是否显示",
        //   status:
        //     "test 测试状态，只有白名单用户可见，prod 正式状态，所有用户可见",
        //   whiteList: "白名单列表（用户手机号）",
        // },
      },
    };
  },
  beforeMount() {
    console.log(parseObj2Fields(this.obj));
  },
};
</script>
<style lang="css" scoped></style>
