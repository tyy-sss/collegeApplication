import { reactive } from "vue";

// 导出复杂的头部
// 历史综测信息
const historyComprehensiveYearHeader = reactive({
  multiHeader: [
    [
      "学号",
      "姓名",
      "班级",
      "德育得分",
      "智育得分",
      "体育得分",
      "美育得分",
      "劳动得分",
      "综合测评得分",
    ],
  ], // 第一行
  header: ["", "", "", "", "", "", "", "", "加分", "减法", "综测总分"], //最后一行的表头数据
  filterVal: [
    "id",
    "name",
    "class",
    "point1",
    "point2",
    "point3",
    "point4",
    "point5",
    "add_total",
    "sub_total",
    "point_total",
  ], // 从左到右每一个属性名
  merges: [
    "A1:A2",
    "B1:B2",
    "C1:C2",
    "D1:D2",
    "E1:E2",
    "F1:F2",
    "G1:G2",
    "H1:H2",
    "I1:K1",
  ],
});
export { historyComprehensiveYearHeader };
