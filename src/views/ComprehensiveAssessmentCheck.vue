<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:50:19
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-11-20 22:27:28
 * @FilePath: \collegeApplication\src\views\StudentComprehensiveAssessment.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="show-container">
    <div class="text">综合测评表公示</div>
    <hr />
    <h1>{{ myclass }}班级综合测评表</h1>
    <div style="height: 40px">
      <el-button style="float: right"
        ><el-icon><Download /></el-icon>&nbsp; 导出</el-button
      >
    </div>
    <el-table :data="assessments" style="width: 100%">
      <el-table-column prop="id" label="学号" width="120" />
      <el-table-column prop="name" label="姓名" width="150" />
      <el-table-column label="德育">
        <el-table-column prop="add1" label="加分明细" width="120" />
        <el-table-column prop="sub1" label="减分明细" width="120" />
        <el-table-column prop="point1" label="得分" width="60" />
      </el-table-column>
      <el-table-column label="智育">
        <el-table-column prop="add2" label="加分明细" width="120" />
        <el-table-column prop="sub2" label="减分明细" width="120" />
        <el-table-column prop="point2" label="得分" width="60" />
      </el-table-column>
      <el-table-column label="体育">
        <el-table-column prop="add3" label="加分明细" width="120" />
        <el-table-column prop="sub3" label="减分明细" width="120" />
        <el-table-column prop="point3" label="得分" width="60" />
      </el-table-column>
      <el-table-column label="美育">
        <el-table-column prop="add4" label="加分明细" width="120" />
        <el-table-column prop="sub4" label="减分明细" width="120" />
        <el-table-column prop="point4" label="得分" width="60" />
      </el-table-column>
      <el-table-column label="劳动">
        <el-table-column prop="add5" label="加分明细" width="120" />
        <el-table-column prop="sub5" label="减分明细" width="120" />
        <el-table-column prop="point5" label="得分" width="60" />
      </el-table-column>
      <el-table-column label="当月综合测评得分" fixed="right">
        <el-table-column prop="add_total" label="月加分" width="80" />
        <el-table-column prop="sub_total" label="月减分" width="80" />
        <el-table-column prop="pre_total" label="上月得分" width="80" />
        <el-table-column prop="point_total" label="当月总分" width="80" />
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
let myclass = "2023级1班";
const assessments = [
  {
    id: "20222113001",
    name: "吾尔肯·塞里克",
    add1: "帮助老师批改作业2分",
    sub1: "旷课1分",
    point1: 1,
    add2: "绩点8分",
    sub2: "挂科1门2分",
    point2: 6,
    add3: "铅球比赛一等奖5分1km二等奖4分",
    sub3: "无",
    point3: 9,
    add4: "捐献书法画1分",
    sub4: "破环草坪1分",
    point4: 0,
    add5: "值日2次4分",
    sub5: "无",
    point5: 4,
    add_total: 24,
    sub_total: 4,
    pre_total: 18,
    point_total: 20,
  },
  {
    id: "20222113002",
    name: "玉苏普·吐荪江",
    add1: "帮助老师批改作业2分",
    sub1: "旷课1分",
    point1: 1,
    add2: "绩点8分",
    sub2: "挂科1门2分",
    point2: 6,
    add3: "铅球比赛一等奖5分1km二等奖4分",
    sub3: "无",
    point3: 9,
    add4: "捐献书法画1分",
    sub4: "破环草坪1分",
    point4: 0,
    add5: "值日2次4分",
    sub5: "无",
    point5: 4,
    add_total: 24,
    sub_total: 4,
    pre_total: 18,
    point_total: 20,
  },
  {
    id: "20222113003",
    name: "沙亚拉·江阿努尔",
    add1: "帮助老师批改作业2分",
    sub1: "旷课1分",
    point1: 1,
    add2: "绩点8分",
    sub2: "挂科1门2分",
    point2: 6,
    add3: "铅球比赛一等奖5分1km二等奖4分",
    sub3: "无",
    point3: 9,
    add4: "捐献书法画1分",
    sub4: "破环草坪1分",
    point4: 0,
    add5: "值日2次4分",
    sub5: "无",
    point5: 4,
    add_total: 24,
    sub_total: 4,
    pre_total: 18,
    point_total: 20,
  },
  {
    id: "20222113004",
    name: "吐尔逊娜衣·托呼提",
    add1: "帮助老师批改作业2分",
    sub1: "旷课1分",
    point1: 1,
    add2: "绩点8分",
    sub2: "挂科1门2分",
    point2: 6,
    add3: "铅球比赛一等奖5分1km二等奖4分",
    sub3: "无",
    point3: 9,
    add4: "捐献书法画1分",
    sub4: "破环草坪1分",
    point4: 0,
    add5: "值日2次4分",
    sub5: "无",
    point5: 4,
    add_total: 24,
    sub_total: 4,
    pre_total: 18,
    point_total: 20,
  },
  {
    id: "20222112006",
    name: "阿合叶尔克·胡瓦提",
    add1: "帮助老师批改作业2分",
    sub1: "旷课1分",
    point1: 1,
    add2: "绩点8分",
    sub2: "挂科1门2分",
    point2: 6,
    add3: "铅球比赛一等奖5分1km二等奖4分",
    sub3: "无",
    point3: 9,
    add4: "捐献书法画1分",
    sub4: "破环草坪1分",
    point4: 0,
    add5: "值日2次4分",
    sub5: "无",
    point5: 4,
    add_total: 24,
    sub_total: 4,
    pre_total: 18,
    point_total: 20,
  },
  {
    id: "20222112005",
    name: "米热古丽·吾斯曼",
    add1: "帮助老师批改作业2分",
    sub1: "旷课1分",
    point1: 1,
    add2: "绩点8分",
    sub2: "挂科1门2分",
    point2: 6,
    add3: "铅球比赛一等奖5分1km二等奖4分",
    sub3: "无",
    point3: 9,
    add4: "捐献书法画1分",
    sub4: "破环草坪1分",
    point4: 0,
    add5: "值日2次4分",
    sub5: "无",
    point5: 4,
    add_total: 24,
    sub_total: 4,
    pre_total: 18,
    point_total: 20,
  },
  {
    id: "20222112004",
    name: "地娜拉·居帕尔",
    add1: "帮助老师批改作业2分",
    sub1: "旷课1分",
    point1: 1,
    add2: "绩点8分",
    sub2: "挂科1门2分",
    point2: 6,
    add3: "铅球比赛一等奖5分1km二等奖4分",
    sub3: "无",
    point3: 9,
    add4: "捐献书法画1分",
    sub4: "破环草坪1分",
    point4: 0,
    add5: "值日2次4分",
    sub5: "无",
    point5: 4,
    add_total: 24,
    sub_total: 4,
    pre_total: 18,
    point_total: 20,
  },
  {
    id: "20222112003",
    name: "沙尔恩高阿·吾日克塔",
    add1: "帮助老师批改作业2分",
    sub1: "旷课1分",
    point1: 1,
    add2: "绩点8分",
    sub2: "挂科1门2分",
    point2: 6,
    add3: "铅球比赛一等奖5分1km二等奖4分",
    sub3: "无",
    point3: 9,
    add4: "捐献书法画1分",
    sub4: "破环草坪1分",
    point4: 0,
    add5: "值日2次4分",
    sub5: "无",
    point5: 4,
    add_total: 24,
    sub_total: 4,
    pre_total: 18,
    point_total: 20,
  },
];
</script>
<style src="@/assets/css/show-container.css" scoped></style>

<style lang="scss" scoped>
hr {
  border-color: #ebf3ff4d;
}
h1 {
  margin-top: 40px;
  text-align: center;
}
</style>
  