<template>
  <RenderTable
    :columns="columns"
    :searchField="fields"
    :fetchData="getListByPage"
  >
    <template #handle>
      <el-button type="text">预定</el-button>
    </template>
    <template #submit2>
      <el-button type="primary">新增</el-button>
    </template>
  </RenderTable>
</template>
<script>
const list = [
  {
    id: 1,
    number: 6689,
    address: "余杭区聚橙路和文昌路交叉口",
    title: "亲橙客栈",
    status: "success",
    labels: [{ name: "三星", color: "cyan" }],
    room: 40,
    money: 9999999,
    state: "open",
    created_at: "2020-05-26T09:42:56Z",
  },
  {
    id: 2,
    number: 6688,
    status: "error",
    address:
      "解放路32号 (城站地铁站A3出口),近杭州火车站及四季青服装批发市场,西湖,浙一医院,浙二医院,河坊街,南宋御街\t",
    title: "索特来文艺酒店（杭州四季青店）",
    labels: [{ name: "四星", color: "blue" }],
    money: 879136,
    state: "open",
    room: 50,
    locked: false,
    comments: 0,
    created_at: "2020-05-26T08:19:22Z",
  },
  {
    id: 3,
    number: 6688,
    status: "success",
    title: "三亚亚特兰蒂斯酒店",
    address: "海棠湾镇海棠北路36号\t",
    labels: [{ name: "五星", color: "purple" }],
    money: 123513,
    state: "open",
    room: 30,
    locked: false,
    comments: 0,
    created_at: "2020-05-26T08:19:22Z",
  },
  {
    id: 4,
    status: "success",
    number: 6688,
    room: 28,
    address: "肇嘉浜路7号打浦桥地区，近瑞金二路\t",
    title: "上海徐汇瑞峰酒店",
    labels: [{ name: "四星", color: "blue" }],
    state: "open",
    money: 327158,
    locked: false,
    comments: 0,
    created_at: "2020-05-26T08:19:22Z",
  },
  {
    id: 5,
    number: 6688,
    status: "success",
    room: 55,
    address:
      "万家丽中路99号万家丽国际购物广场南门，地铁2号线万家丽广场站2，3号出口处\t",
    title: "长沙万家丽世贸酒店",
    labels: [{ name: "二星", color: "gold" }],
    state: "open",
    locked: false,
    money: 132747,
    comments: 0,
    created_at: "2020-05-26T08:19:22Z",
  },
  {
    id: 6,
    number: 6688,
    status: "error",
    room: 40,
    address: "三亚湾路凤凰岛A座一楼大堂办理入住手续，入住C、D、E座\t",
    title: "三亚凤凰岛海洋之梦度假酒店",
    labels: [{ name: "二星", color: "gold" }],
    money: 489315,
    state: "closed",
    locked: false,
    comments: 0,
    created_at: "2020-05-26T08:19:22Z",
  },
];

const getListByPage = (params) => {
  const { page, rows = 5 } = params;
  console.log("访问getListByPage接口，查询参数为", params);
  return Promise.resolve({
    list: list.slice((page - 1) * rows, page * rows),
    total: list.length,
  });
};
export default {
  name: "index",
  data() {
    return {
      fields: [
        {
          key: "title",
          label: "酒店名",
        },
        {
          key: "status",
          label: "酒店状态",
          type: "select",
          options: [
            {
              value: "success",
              label: "营业中",
            },
            {
              value: "error",
              label: "打烊了",
            },
          ],
        },
        // 通过显示声明submit可以调整它的位置
        // 如果传入slot submit可以覆盖原本的submit
        {
          name: "submit",
          type: "slot",
        },
        {
          name: "submit2",
          type: "slot",
        },
      ],
      columns: [
        {
          prop: "title",
          label: "酒店名称",
        },
        {
          prop: "address",
          label: "酒店地址",
        },
        {
          key: "status",
          label: "酒店状态",
          formatter(row) {
            return { success: "营业中", error: "已打样" }[row.status];
          },
        },
        {
          prop: "labels",
          label: "酒店星级",
          render(h, { row }) {
            return row.labels.map(({ name, color }) => {
              return <el-tag color={color}>{name}</el-tag>;
            });
          },
        },
        {
          prop: "created_at",
          label: "成立时间",
          formatter: "formatDateTime",
        },
        {
          label: "操作",
          slotName: "handle",
        },
      ],
    };
  },
  methods: {
    getListByPage,
  },
};
</script>
<style lang="css" scoped></style>
