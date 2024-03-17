import { reactive } from "vue";

// 导出录取信息表表头
const professionHeader = reactive({
  multiHeader: [
    [
      "目标学校",
      "姓名",
      "学号",
      "性别",
      "省份",
      "班级",
      "选考科目",
      "分流成绩",
      "志愿填报",
      "",
      "",
      "",
      "联系方式",
      "",
    ],
  ], // 第一行的表头数据
  header: [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "一志愿",
    "二志愿",
    "三志愿",
    "拟录专业",
    "电话号码",
    "父母电话",
  ], //第二行的表头数据
  filterVal: [
    "name",
    "userName",
    "userNumber",
    "sex",
    "province",
    "className",
    "subjects",
    "score",
    "firstName",
    "secondName",
    "thirdName",
    "majorName",
    "phone",
    "parentName",
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
    "I1:L1",
    "M1:N1",
  ], //合并单元格规则
});
export { professionHeader };
