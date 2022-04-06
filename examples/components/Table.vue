<template>
  <div>
    <normal-switch
      v-model="textModel"
      active-text="文本模式"
      inactive-text="表单模式"
    ></normal-switch>
    <RenderForm :fields="fields" :textModel="textModel"></RenderForm>
  </div>
</template>
<script>
const list = [
  {
    id: 1044,
    name: "123334",
    note: "333333",
    type: "manual",
    num: 0,
    edate: "2022-01-06T08:10:00Z",
  },
  {
    id: 1043,
    name: "业主黑名单",
    note: "专门屏蔽XXX类业主",
    type: "manual",
    num: 0,
    edate: "2022-01-06T08:07:48Z",
  },
  {
    id: 1042,
    name: "哈哈哈",
    note: "222",
    type: "manual",
    num: 1,
    edate: "2022-01-06T08:03:00Z",
  },
  {
    id: 1041,
    name: "哈哈哈哈哈",
    note: "哈哈哈哈",
    type: "manual",
    num: 3,
    edate: "2021-12-28T07:46:42Z",
  },
  {
    id: 1029,
    name: "测试62152109",
    note: "组备注",
    type: "manual",
    num: 5,
    edate: "2021-11-11T11:33:37Z",
  },
  {
    id: 1028,
    name: "测试16610391",
    note: "组备注",
    type: "manual",
    num: 1,
    edate: "2021-11-11T11:32:57Z",
  },
  {
    id: 1027,
    name: "测试03281310",
    note: "组备注",
    type: "manual",
    num: 1,
    edate: "2021-11-11T11:23:00Z",
  },
  {
    id: 1026,
    name: "测试61772045",
    note: "组备注",
    type: "manual",
    num: 0,
    edate: "2021-11-11T11:14:36Z",
  },
  {
    id: 1025,
    name: "测试",
    note: "11111111111111111111",
    type: "manual",
    num: 853,
    edate: "2021-11-02T06:12:49Z",
  },
];
const fetchData = (params) => {
  console.log("访问fetchData接口，参数是", params);
  const { page, rows } = params;
  return Promise.resolve({
    list: list.slice((page - 1) * rows, page * rows),
    total: list.length,
  });
};
const getItems = (ids) => {
  console.log("访问getItems接口，参数是", ids);
  return Promise.resolve(list.filter((item) => ids.includes(item.id)));
};
export default {
  name: "Table",
  data() {
    return {
      textModel: false,
      fields: [
        {
          label: "表格",
          children: [
            {
              label: "普通输入框",
              key: "input",
              type: "input",
            },
            {
              label: "表格选择框",
              key: "group",
              type: "table",
              title: "选择分组",
              defaultValue: [1026, 1025],
              fetchData,
              getItems,
              searchField: [
                {
                  key: "name",
                  label: "分组名称",
                },
              ],
              columns: [
                {
                  key: "name",
                  label: "分组名称",
                },
                {
                  key: "num",
                  label: "成员人数",
                },
              ],
            },
          ],
        },
      ],
    };
  },
};
</script>
<style lang="css" scoped></style>
