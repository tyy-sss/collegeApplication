/*
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-27 20:45:21
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-12-02 19:35:24
 * @FilePath: \collegeApplication\src\assets\js\excel\history\comprehensive-data.js
 * @Description: 当月综合评测导出格式
 */
import { reactive } from "vue";

// 本班当月综测信息
const comprehensiveAssessmentHeader = reactive({
  multiHeader: [
    [
      "姓名",
      "学号",
      "德育",
      "",
      "",
      "智育",
      "",
      "",
      "体育",
      "",
      "",
      "美育",
      "",
      "",
      "劳动",
      "",
      "",
      "当月综合测评得分",
    ],
  ], // 第一行
  header: ["", "", "加分明细", "减分明细", "得分", "加分明细", "减分明细", "得分", "加分明细", "减分明细", "得分",
   "加分明细", "减分明细", "得分", "加分明细", "减分明细", "得分", "月加分", "月减法", "上月得分","当月总分"], //最后一行的表头数据
  filterVal: [
    "name",
    "id",
    "add1",
    "sub1",
    "point1",
    "add2",
    "sub2",
    "point2",
    "add3",
    "sub3",
    "point3",
    "add4",
    "sub4",
    "point4",
    "add5",
    "sub5",
    "point5",
    "add_total",
    "sub_total",
    "pre_total",
    "point_total",
  ], // 从左到右每一个属性名
  merges: [
    "A1:A2",
    "B1:B2",
    "C1:E1",
    "F1:H1",
    "I1:K1",
    "L1:N1",
    "O1:Q1",
    "R1:U1",
  ],
});
export { comprehensiveAssessmentHeader };
