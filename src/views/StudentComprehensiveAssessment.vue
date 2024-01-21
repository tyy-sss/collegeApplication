<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:50:19
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-01-21 17:42:16
 * @FilePath: \collegeApplication\src\views\StudentComprehensiveAssessment.vue
 * @Description: 学生个人综测查看页面
-->
<template>
  <div class="show-container">
    <div class="title">
      <div class="text">个人综测查看</div>
    </div>
    <hr />
    <br />
    <div>
      <el-form-item label="本月确认情况 ：">
        {{ data.state }}
        <span style="color: rgb(167, 167, 167); margin-left: 15px">
          (已确认/待确认/未到确认时间)</span
        >
      </el-form-item>
      <el-button type="primary" @click="data.dialogVisible3 = true"
        >申诉历史</el-button
      >
      <el-button type="danger" @click="data.dialogVisible2 = true"
        >申报错误</el-button
      >
    </div>
    <br />
    <div>
      <div>
        <h4>本月综测情况确认</h4>
        <br />
        <el-table :data="data.assessment" style="width: 100%">
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
            <el-table-column prop="add_total" label="月加分" width="70" />
            <el-table-column prop="sub_total" label="月减分" width="70" />
            <el-table-column prop="pre_total" label="上月得分" width="85" />
            <el-table-column prop="point_total" label="当月总分" width="85" />
          </el-table-column>
        </el-table>
        <br />
      </div>
      <el-button type="primary" @click="data.dialogVisible = true"
        >前往电子签名</el-button
      >
      <br />
      <span style="color: rgb(167, 167, 167)"
        >⊙综合素质测评成绩 = 德育 x 20% + 智育 x 20% + 体育 x 20% + 美育　x 20%
        +劳动 x 20%</span
      >
      <br /><br />
      <div>
        <h4>本学期总体综测情况</h4>
        <br />
        <el-table :data="data.assessment">
          <el-table-column prop="id" label="学号" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="point1" label="德育得分" />
          <el-table-column prop="point2" label="智育得分" />
          <el-table-column prop="point3" label="体育得分" />
          <el-table-column prop="point4" label="美育得分" />
          <el-table-column prop="point5" label="劳动得分" />
          <el-table-column label="综合测评得分" fixed="right">
            <el-table-column prop="add_total" label="加分" />
            <el-table-column prop="sub_total" label="减分" />
            <el-table-column prop="point_total" label="综测总分" />
          </el-table-column>
        </el-table>
        <br />
      </div>
    </div>
  </div>
  <!-- 电子签名对话框 -->
  <el-dialog v-model="data.dialogVisible" title="电子签名" width="50%">
    <div>
      <signatures></signatures>
    </div>
  </el-dialog>
  <!-- 申报错误对话框 -->
  <el-dialog v-model="data.dialogVisible2" title="申报错误" width="30%">
    <div>
      <el-form-item label="申诉问题类型：">
        <el-select
          v-model="data.target"
          class="m-2"
          placeholder="请选择申报问题类型"
        >
          <el-option
            v-for="item in data.targets"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="错误申报内容：">
        <el-input
          v-model="data.textarea"
          :autosize="{ minRows: 6, maxRows: 10 }"
          type="textarea"
          placeholder="请输入错误申报内容"
        />
      </el-form-item>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="commit"> 提交申报 </el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 申诉历史对话框 -->
  <el-dialog v-model="data.dialogVisible3" title="💬 待申述处理" width="50%">
    <div>
      <el-table :data="data.complaintData" style="width: 100%">
        <el-table-column type="index" />
        <el-table-column label="申诉接收对象" prop="name" min-width="120" />
        <el-table-column label="申诉内容" prop="content" min-width="300" />
        <el-table-column label="申诉时间" prop="date" min-width="100" />
        <el-table-column label="操作" min-width="150">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >已处理</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>
<script setup>
import signatures from "@/components/utils/Signatures.vue";
import { ref, reactive, computed, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import studentFun from "@/api/student";
import { adaptiveColumnWidthFun } from "@/assets/js/utils/adaptive-column-width";

const data = reactive({
  state: "未到确认时间",
  assessment: [
    {
      id: "2021401449",
      name: "付小小",
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
  ],
  dialogVisible: false,
  dialogVisible2: false,
  dialogVisible3: false,
  target: "",
  targets: [
    {
      value: "1",
      label: "综测问题",
    },
    {
      value: "2",
      label: "其他问题",
    },
  ],
  textarea: "",
  // 申诉列表
  complaintData: [
    {
      date: "2023-05-07",
      id: "2022100030",
      name: "测评小组",
      content: "个人信息性别错误，需要更改为男",
    },
    {
      date: "2023-05-11",
      name: "测评小组",
      id: "2022100030",
      content: "综测1月加分计算错误，少加了1分英语竞赛二等奖分",
    },
    {
      date: "2023-05-24",
      name: "测评小组",
      id: "2022100031",
      content: "个人信息民族错误，需要更改为土家族",
    },
    {
      date: "2023-05-11",
      name: "班主任",
      id: "2022100032",
      content: "综测1月加分计算错误，少加了3分软件杯全国二等奖分",
    },
    {
      date: "2023-05-12",
      name: "班主任",
      id: "2022100040",
      content: "个人信息目标学校错误，需要修改为‘长沙学院’",
    },
  ],
});
onMounted(() => {
  init();
});
function init() {
  // getComplaintHistory();
  studentFun.assess
    .getAssessment({
      month: 1,
    })
    .then((res) => {
      console.log("个人综测", res);
    });
}
function getComplaintHistory() {
  studentFun.complaint
    .getComplaints({
      state: "",
      current: 1,
      size: 1000,
    })
    .then((res) => {
      console.log(res);
    });
}
//提交申报
function commit() {
  studentFun.complaint
    .submitComplaint({
      content: "",
      type: "",
    })
    .then((res) => {
      data.dialogVisible2 = false;
      ElMessage({
        message: "已申报错误，请耐心等待处理",
        type: "success",
      });
    });
}
const { getColumnWidth } = adaptiveColumnWidthFun(data.assessment);
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style scoped>
el-table el-table-column th {
  font-size: 1.2rem; /* 1.2rem相当于根元素的字体大小 */
  color: red !important;
}

el-table el-table-column td {
  font-size: 1rem; /* 1rem相当于根元素的字体大小 */
}
.cell {
  font-size: 4rem !important;
}
</style>
  