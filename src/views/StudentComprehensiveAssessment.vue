<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:50:19
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-28 17:09:13
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
      <div style="color: rgb(167, 167, 167)">
        <span>请注意检查综测情况，如有错误请及时向测评小组进行申诉。</span
        ><br />
        <span>请在对本月最终的整体综测情况确认无误后再进行电子签名。</span>
      </div>
      <br />
      <el-button type="primary" @click="data.dialogVisible3 = true"
        >申诉历史</el-button
      >
      <el-button type="danger" @click="data.dialogVisible2 = true"
        >申报错误</el-button
      >
      <br />
      <br />
      <div>
        <span>请选择查询月份：</span>
        <el-select
          v-model="data.month"
          :disabled="data.loadOk"
          placeholder="请选择查询月份"
          style="width: 200px"
          @change="getAssessmentDetails"
        >
          <el-option
            v-for="item in data.monthes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <br />
      <el-form-item label="该月确认情况 ：">
        <span v-show="data.signature">已确认</span>
        <span v-show="data.signature == null">待确认</span>
        <span style="color: rgb(167, 167, 167); margin-left: 15px">
          (已确认/待确认)</span
        >
      </el-form-item>
    </div>
    <div>
      <div>
        <h4>该月综测情况确认</h4>
        <br />
        <el-table
          :data="data.assessment"
          v-loading.lock="data.loading"
          style="width: 100%"
          default="暂无数据"
        >
          <el-table-column prop="userNumber" label="学号" width="120" />
          <el-table-column prop="username" label="姓名" width="150" />
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
            <el-table-column prop="add_total" label="月加分" width="50" />
            <el-table-column prop="sub_total" label="月减分" width="50" />
            <el-table-column prop="pre_total" label="上月得分" width="50" />
            <el-table-column prop="point_total" label="当月总分" width="50" />
          </el-table-column>
        </el-table>
        <br />
      </div>
      <el-button
        type="primary"
        @click="data.dialogVisible = true"
        :disabled="!(data.signature == null)"
        >前往电子签名</el-button
      >
      <br />
    </div>
  </div>
  <!-- 电子签名对话框 -->
  <el-dialog v-model="data.dialogVisible" title="电子签名" width="50%">
    <div>
      <div style="margin-left: 1rem; margin-bottom: 1rem">
        该电子签名为确保综测信息经过本人确认后无误
      </div>
      <signatures @finish="finish"></signatures>
    </div>
  </el-dialog>
  <!-- 申报错误对话框 -->
  <el-dialog v-model="data.dialogVisible2" title="申报错误" width="30%">
    <div>
      <el-form-item label="申诉问题类型：">
        <el-select
          v-model="data.type"
          class="m-2"
          placeholder="请选择申报问题类型"
        >
          <el-option
            v-for="item in data.types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="错误申报内容：">
        <el-input
          v-model="data.content"
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
  <el-dialog v-model="data.dialogVisible3" title="💬 待申述处理" width="60%">
    <div>
      <el-table :data="data.complaintData" style="width: 100%">
        <el-table-column type="index" />
        <el-table-column label="申诉问题类型" min-width="120">
          <template #default="scope">
            <span v-if="scope.row.type == false">综测问题</span>
            <span v-if="scope.row.type == true">信息/志愿问题</span>
          </template>
        </el-table-column>
        <el-table-column label="申诉内容" prop="content" min-width="300" />
        <el-table-column label="申诉时间" prop="created" min-width="200" />
        <el-table-column
          label="申诉状态"
          width="100"
          :filters="[
            { text: '处理中', value: '0' },
            { text: '已处理', value: '1' },
            { text: '已撤销', value: '2' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag
              :type="
                scope.row.state === 0
                  ? ''
                  : scope.row.state === 1
                  ? 'success'
                  : 'info'
              "
              disable-transitions
            >
              <span v-if="scope.row.state == 0">处理中</span>
              <span v-if="scope.row.state == 1">已处理</span>
              <span v-if="scope.row.state == 2">已撤销</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template #default="scope">
            <el-button
              v-if="scope.row.state == 1 || scope.row.state == 2"
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              v-if="scope.row.state == 0"
              size="small"
              @click="handleRevoke(scope.$index, scope.row)"
              >撤销</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>
<script setup>
import signatures from "@/components/utils/Signatures.vue";
import { reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import studentFun from "@/api/student";
import { getMonthName } from "@/assets/js/utils/month";
const data = reactive({
  assessment: [
    // {
    //   userNumber: "2021401449",
    //   username: "付小小",
    //   add1: "帮助老师批改作业2分",
    //   sub1: "旷课1分",
    //   point1: 1,
    //   add2: "绩点8分",
    //   sub2: "挂科1门2分",
    //   point2: 6,
    //   add3: "铅球比赛一等奖5分1km二等奖4分",
    //   sub3: "无",
    //   point3: 9,
    //   add4: "捐献书法画1分",
    //   sub4: "破环草坪1分",
    //   point4: 0,
    //   add5: "值日2次4分",
    //   sub5: "无",
    //   point5: 4,
    //   add_total: 24,
    //   sub_total: 4,
    //   pre_total: 18,
    //   point_total: 20,
    // },
  ],
  //目前综测合计
  // total: [
  //   {
  //     class1: 0,
  //     class2: 0,
  //     class3: 0,
  //     class4: 0,
  //     class5: 0,
  //     add: 0,
  //     sup: 0,
  //     all: 0,
  //   },
  // ],
  state: null,
  month: null, //当前确认综测的月份
  score: null, //目前总分
  signature: null, //签名
  isEnd: null,
  types: [
    {
      value: false,
      label: "综测问题",
    },
    {
      value: true,
      label: "信息/志愿问题",
    },
  ],
  type: "", //申诉类型
  content: "", //申诉内容
  // 申诉列表
  complaintData: [
    {
      state: 0,
      created: "2023-05-07",
      userNumber: "2022100030",
      type: "综测问题",
      content: "个人信息性别错误，需要更改为男",
    },
    {
      state: 1,
      created: "2023-05-17",
      userNumber: "2022100030",
      type: "其他问题",
      content: "个人信息性别错误，需要更改为男",
    },
    {
      state: 2,
      created: "2023-05-12",
      userNumber: "2022100030",
      type: "其他问题",
      content: "个人信息性别错误，需要更改为男",
    },
  ],
  monthes: [],
  loading: false,
  loadOk:true,
  dialogVisible: false,
  dialogVisible2: false,
  dialogVisible3: false,
});
onMounted(() => {
  init();
});
//初始化
function init() {
  getAssessmentThisMonth();
  getAssessmentMonth();
  getComplaintHistory();
}
//获取本月综测情况
function getAssessmentThisMonth() {
  data.loading = true;
  data.loadOk=true;
  studentFun.assess.getAssessmentThisMonth().then((res) => {
    data.isEnd = res.isEnd;
    data.month = res.month;
    data.score = res.score;
    data.signature = res.signature;
    data.assessment = [res.content];
    data.loading = false;
    data.loadOk=false;
  });
}
//按月份获取综测情况
function getAssessmentDetails() {
  data.loading = true;
  studentFun.assess
    .getAssessmentByMonth({
      month: data.month,
    })
    .then((res) => {
      data.isEnd = res.isEnd;
      data.month = res.month;
      data.score = res.score;
      data.signature = res.signature;
      data.assessment = [res.content];
      data.loading = false;
    });
}
//获取可选月份方法
function getAssessmentMonth() {
  studentFun.assess.studentGetMonthes().then((res) => {
    res.forEach((item) => {
      data.monthes.push({
        value: item,
        label: getMonthName(item),
      });
    });
  });
}
//获取申诉历史
function getComplaintHistory() {
  studentFun.complaint
    .getComplaints({
      state: "",
      current: 1,
      size: 1000,
    })
    .then((res) => {
      data.complaintData = res.reverse();
    });
}
//提交申报
function commit() {
  if (data.type === "" || data.content === "") {
    ElMessage({
      message: "请选择申诉类型或填写申诉内容",
      type: "error",
    });
  } else {
    studentFun.complaint
      .submitComplaint({
        content: data.content,
        type: data.type,
      })
      .then((res) => {
        data.dialogVisible2 = false;
        getComplaintHistory();
        data.content = "";
        data.type = "";
        ElMessage({
          message: "已申报错误，请耐心等待处理",
          type: "success",
        });
      });
  }
}
//筛选器
const filterTag = (value, row) => {
  return row.state == value;
};
//删除（处理中/已取消）申诉项
const handleDelete = (index, row) => {
  studentFun.complaint.deleteComplaint([row.appealId]).then((res) => {
    data.complaintData.splice(index, 1);
    ElMessage.success(res);
  });
};
//撤销处理中的申诉项
const handleRevoke = (index, row) => {
  studentFun.complaint.revokeComplaint(row.appealId).then((res) => {
    row.state = 2;
    ElMessage.success(res);
  });
};
//签名后提交数据和电子签名
function finish(file) {
  const formData = new FormData();
  formData.append("file", file);
  studentFun.sign.studentConfirmSign(data.month, formData).then((res) => {
    data.signature = "ABC"; //不为空即可
    data.dialogVisible = false;
    ElMessage({
      message: "确认本月综测情况成功",
      type: "success",
    });
  });
}
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style src="@/assets/css/student/studentComprehensiveAssessment.scss" lang="scss" scoped/>