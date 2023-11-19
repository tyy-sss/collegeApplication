<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:50:19
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2023-11-19 11:50:58
 * @FilePath: \collegeApplication\src\views\StudentComprehensiveAssessment.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="show-container">
    <div class="text">个人综测查看</div>
    <hr />
    <br />
    <div>
      <el-form-item label="本月确认情况 ：">
        {{ state }}
        <span style="color: rgb(167, 167, 167); margin-left: 15px">
          (已确认/正在申报/待确认/未到确认时间)</span
        >
      </el-form-item>
    </div>
    <br />
    <div>
      <div>
        <h4>本月综测情况确认</h4>
        <br />
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="学号" width="150" />
          <el-table-column prop="date" label="姓名" width="150" />
          <el-table-column label="德育">
            <el-table-column prop="name" label="加分明细" width="120" />
            <el-table-column prop="name" label="减分明细" width="120" />
            <el-table-column prop="name" label="得分" width="120" />
          </el-table-column>
          <el-table-column label="智育">
            <el-table-column prop="name" label="加分明细" width="120" />
            <el-table-column prop="name" label="减分明细" width="120" />
            <el-table-column prop="name" label="得分" width="120" />
          </el-table-column>
          <el-table-column label="体育">
            <el-table-column prop="name" label="加分明细" width="120" />
            <el-table-column prop="name" label="减分明细" width="120" />
            <el-table-column prop="name" label="得分" width="120" />
          </el-table-column>
          <el-table-column label="美育">
            <el-table-column prop="name" label="加分明细" width="120" />
            <el-table-column prop="name" label="减分明细" width="120" />
            <el-table-column prop="name" label="得分" width="120" />
          </el-table-column>
          <el-table-column label="劳动">
            <el-table-column prop="name" label="加分明细" width="120" />
            <el-table-column prop="name" label="减分明细" width="120" />
            <el-table-column prop="name" label="得分" width="120" />
          </el-table-column>
          <el-table-column label="当月综合测评得分" fixed="right">
            <el-table-column prop="name" label="月加分" width="120" />
            <el-table-column prop="name" label="月减分" width="120" />
            <el-table-column prop="name" label="上月得分" width="120" />
            <el-table-column prop="name" label="当月总分" width="120" />
          </el-table-column>
        </el-table>
        <br />
      </div>
      <el-button type="primary">前往电子签名</el-button>
      <el-button type="danger">申报错误</el-button>
      <br />
      <span style="color: rgb(167, 167, 167)"
        >⊙综合素质测评成绩 = 德育 x 20% + 智育 x 20% + 体育 x 20% + 美育　x 20%
        +劳动 x 20%</span
      >
      <br /><br />
      <div>
        <h4>总体综测情况</h4>
        <br />
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="学号" width="150" />
          <el-table-column prop="date" label="姓名" width="150" />
          <el-table-column label="德育">
            <el-table-column prop="name" label="加分明细" width="120" />
            <el-table-column prop="name" label="减分明细" width="120" />
            <el-table-column prop="name" label="得分" width="120" />
          </el-table-column>
          <el-table-column label="智育">
            <el-table-column prop="name" label="加分明细" width="120" />
            <el-table-column prop="name" label="减分明细" width="120" />
            <el-table-column prop="name" label="得分" width="120" />
          </el-table-column>
          <el-table-column label="体育">
            <el-table-column prop="name" label="加分明细" width="120" />
            <el-table-column prop="name" label="减分明细" width="120" />
            <el-table-column prop="name" label="得分" width="120" />
          </el-table-column>
          <el-table-column label="美育">
            <el-table-column prop="name" label="加分明细" width="120" />
            <el-table-column prop="name" label="减分明细" width="120" />
            <el-table-column prop="name" label="得分" width="120" />
          </el-table-column>
          <el-table-column label="劳动">
            <el-table-column prop="name" label="加分明细" width="120" />
            <el-table-column prop="name" label="减分明细" width="120" />
            <el-table-column prop="name" label="得分" width="120" />
          </el-table-column>
          <el-table-column label="当月综合测评得分" fixed="right">
            <el-table-column prop="name" label="月加分" width="120" />
            <el-table-column prop="name" label="月减分" width="120" />
            <el-table-column prop="name" label="上月得分" width="120" />
            <el-table-column prop="name" label="当月总分" width="120" />
          </el-table-column>
        </el-table>
        <br />
      </div>
    </div>
  </div>
</template>
<script setup>
const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
];
let state = "未到确认时间";
let student = {
  name: "付小小",
  id: "415567569789",
  card: "365124200103052214",
  sex: "女",
  class: "2023级预科1班",
  school: "湘南学院",
};
let object1 = null;
let object2 = null;
let object3 = null;
const options = [
  {
    value: "计算机科学与工程学院",
    label: "计算机科学与工程学院",
    children: [
      {
        value: "软件工程",
        label: "软件工程",
      },
      {
        value: "物联网工程",
        label: "物联网工程",
      },
      {
        value: "人工智能",
        label: "人工智能",
        disabled: true,
      },
      {
        value: "大数据网络",
        label: "大数据网络",
        disabled: true,
      },
    ],
  },
  {
    value: "美术学院",
    label: "美术学院",
    children: [
      {
        value: "服装设计",
        label: "服装设计",
      },
      {
        value: "视觉传达设计",
        label: "视觉传达设计",
      },
      {
        value: "漫画设计",
        label: "漫画设计",
      },
    ],
  },
  {
    value: "医学院",
    label: "医学院",
    children: [
      {
        value: "药物科学",
        label: "药物科学",
      },
      {
        value: "动物医学",
        label: "动物医学",
      },
      {
        value: "法医",
        label: "法医",
      },
    ],
  },
];
let num = "?";
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style scoped>
hr {
  border-color: #ebf3ff4d;
}
.box {
  width: 60%;
  height: 410px;
  margin: 0 auto;
  border-radius: 15px 15px 15px 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}
.left {
  width: 50%;
  padding: 100px;
  height: 410px;
  background-color: rgba(184, 198, 226, 0.041);
  border-radius: 15px 0 0 15px;
  float: left;
}
.right {
  width: 50%;
  padding: 100px;
  height: 410px;
  border-radius: 0 15px 15px 0;
  background-color: rgba(255, 192, 203, 0.144);
  float: left;
  text-align: center;
}
</style>
  