<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:50:19
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-31 15:56:24
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
    <!-- 提示和选项组 -->
    <div>
      <div class="tip">
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
      <!-- 选择框,标题 -->
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
      <!-- 该月情况详细 -->
      <el-form-item label="该月确认情况 ：">
        <span v-show="data.signature">已确认</span>
        <span v-show="data.signature == null">待确认</span>
        <span class="tip2">(已确认/待确认)</span>
      </el-form-item>
    </div>
    <!-- 综测情况详细 -->
    <div>
      <div>
        <h4>该月综测情况确认</h4>
        <br />
        <!-- 手机端显示 -->
        <div class="phone">
          <el-form>
            <div>
              <el-form-item label="姓名:" label-width="80px">{{
                data.myAssessment.username || "暂无数据"
              }}</el-form-item>
              <el-form-item label="学号:" label-width="80px">{{
                data.myAssessment.userNumber || "暂无数据"
              }}</el-form-item>
              <el-form-item label="德育明细:" label-width="80px"></el-form-item>
              <div class="detail">
                <el-form-item label="加分明细" label-width="140px">
                  {{ data.myAssessment.add1 || "暂无数据" }}
                </el-form-item>
                <el-form-item label="减分明细" label-width="140px">
                  {{ data.myAssessment.sub1 || "暂无数据" }}
                </el-form-item>
                <el-form-item label="德育得分" label-width="140px">
                  {{ data.myAssessment.point1 || "暂无数据" }}
                </el-form-item>
              </div>
            </div>
            <div>
              <el-form-item label="智育明细:" label-width="80px"></el-form-item>
              <div class="detail">
                <el-form-item label="加分明细" label-width="140px">
                  {{ data.myAssessment.add2 || "暂无数据" }}
                </el-form-item>
                <el-form-item label="减分明细" label-width="140px">
                  {{ data.myAssessment.sub2 || "暂无数据" }}
                </el-form-item>
                <el-form-item label="智育得分" label-width="140px">
                  {{ data.myAssessment.point2 || "暂无数据" }}
                </el-form-item>
              </div>
            </div>
            <div>
              <el-form-item label="体育明细:" label-width="80px"></el-form-item>
              <div class="detail">
                <el-form-item label="加分明细" label-width="140px">
                  {{ data.myAssessment.add3 || "暂无数据" }}
                </el-form-item>
                <el-form-item label="减分明细" label-width="140px">
                  {{ data.myAssessment.sub3 || "暂无数据" }}
                </el-form-item>
                <el-form-item label="智育得分" label-width="140px">
                  {{ data.myAssessment.point3 || "暂无数据" }}
                </el-form-item>
              </div>
            </div>
            <div>
              <el-form-item label="美育明细:" label-width="80px"></el-form-item>
              <div class="detail">
                <el-form-item label="加分明细" label-width="140px">
                  {{ data.myAssessment.add4 || "暂无数据" }}
                </el-form-item>
                <el-form-item label="减分明细" label-width="140px">
                  {{ data.myAssessment.sub4 || "暂无数据" }}
                </el-form-item>
                <el-form-item label="智育得分" label-width="140px">
                  {{ data.myAssessment.point4 || "暂无数据" }}
                </el-form-item>
              </div>
            </div>
            <div>
              <el-form-item label="劳动明细:" label-width="80px"></el-form-item>
              <div class="detail">
                <el-form-item label="加分明细" label-width="140px">
                  {{ data.myAssessment.add5 || "暂无数据" }}
                </el-form-item>
                <el-form-item label="减分明细" label-width="140px">
                  {{ data.myAssessment.sub5 || "暂无数据" }}
                </el-form-item>
                <el-form-item label="智育得分" label-width="140px">
                  {{ data.myAssessment.point5 || "暂无数据" }}
                </el-form-item>
              </div>
            </div>
            <br />
            <el-form-item label="总体情况" label-width="80px"> </el-form-item>
            <div class="detail">
              <el-form-item label="总加分" label-width="140px">
                {{ data.myAssessment.add_total || "暂无数据" }}
              </el-form-item>
              <el-form-item label="总减分" label-width="140px">
                {{ data.myAssessment.sub_total || "暂无数据" }}
              </el-form-item>
              <el-form-item label="总得分" label-width="140px">
                {{ data.myAssessment.point_total || "暂无数据" }}
              </el-form-item>
            </div>
          </el-form>
        </div>
        <!-- pc端显示 -->
        <el-table
          :data="data.assessment"
          v-loading.lock="data.loading"
          style="width: 100%"
          class="pc"
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
  <el-dialog v-model="data.dialogVisible" title="电子签名" :width="data.width1">
    <div>
      <div class="tip3">
        该电子签名为确保综测信息经过本人确认后无误
      </div>
      <signatures @finish="finish"></signatures>
    </div>
  </el-dialog>
  <!-- 申报错误对话框 -->
  <el-dialog
    v-model="data.dialogVisible2"
    title="申报错误"
    :width="data.width2"
  >
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
  <el-dialog
    v-model="data.dialogVisible3"
    title="💬 待申述处理"
    :width="data.width3"
  >
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
  width1: "80%",
  width2: "50%",
  width3: "60%",
  myAssessment: {
    userNumber: "",
    username: "",
    add1: "",
    sub1: "",
    point1: 0,
    add2: "",
    sub2: "",
    point2: 0,
    add3: "",
    sub3: "无",
    point3: 0,
    add4: "",
    sub4: "",
    point4: 0,
    add5: "",
    sub5: "",
    point5: 0,
    add_total: 0,
    sub_total: 0,
    pre_total: 0,
    point_total: 0,
  },
  assessment: [],
  state: null,
  month: null, //当前确认综测的月份
  score: null, //目前总分
  signature: "xx", //签名
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
  complaintData: [], // 申诉列表
  monthes: [],
  loading: false,
  loadOk: true,
  dialogVisible: false,
  dialogVisible2: false,
  dialogVisible3: false,
});
onMounted(() => {
  init();
});
//初始化
function init() {
  // 添加 resize 事件监听器
  window.addEventListener("resize", watchWidth);
  watchWidth();
  getAssessmentThisMonth();
  getAssessmentMonth();
  getComplaintHistory();
}
//监听宽度
function watchWidth() {
  if (document.documentElement.clientWidth <= 1100) {
    data.width1 = "80%";
    data.width2 = "60%";
    data.width3 = "90%";
  } else {
    data.width1 = "50%";
    data.width2 = "30%";
    data.width3 = "60%";
  }
}
//获取本月综测情况
function getAssessmentThisMonth() {
  data.loading = true;
  data.loadOk = true;
  studentFun.assess.getAssessmentThisMonth().then((res) => {
    data.isEnd = res.isEnd;
    data.month = res.month;
    data.score = res.score;
    data.signature = res.signature;
    data.assessment = [res.content];
    data.myAssessment = res.content;
    data.loading = false;
    data.loadOk = false;
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
      data.myAssessment = res.content;
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