/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-27 20:45:21
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-12-02 19:54:25
 * @FilePath: \collegeApplication\src\assets\js\excel\history\comprehensive-data.js
 * @Description: 班级志愿填报情况导出格式
 */
import { reactive } from "vue";

// 本班当月综测信息
const volunteerHeader = reactive({
  multiHeader: [
    [
      "目标学校",
      "序号",
      "省份",
      "班级",
      "学号",
      "姓名",
      "性别",
      "科类",
      "选考科目",
      "分流成绩",
      "志愿情况",
    ],
  ], // 第一行
  header: ["", "", "", "", "", "", "", "", "", "", "一志愿", "二志愿", "三志愿"], //最后一行的表头数据
  filterVal: [
    "target",
    "num",
    "province",
    "class",
    "id",
    "name",
    "sex",
    "category",
    "selectSubjects",
    "grades",
    "voluntary1",
    "voluntary2",
    "voluntary3",
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
    "I1:I2",
    "J1:J2",
    "K1:M1",
  ],
});
export { volunteerHeader };
