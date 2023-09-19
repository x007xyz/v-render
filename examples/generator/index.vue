<template>
  <div class="container">
    <Generator></Generator>
  </div>
</template>
<script>
import Generator from "../../packages/generator";
export default {
  name: "index",
  components: {
    Generator,
  },
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
};
</script>
<style lang="css" scoped></style>
