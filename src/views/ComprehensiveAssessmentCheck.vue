<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:50:19
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-31 16:28:39
 * @FilePath: \collegeApplication\src\views\ComprehensiveAssessmentCheck.vue
 * @Description:班主任查看综合测评情况页
-->
<template>
  <div class="show-container">
    <div class="title"><div class="text">综合测评表情况</div></div>
    <hr />
    <!-- 月份选择，标题 -->
    <div class="checkMonth">
      <el-select
        v-model="data.curMonth"
        :disabled="data.loadOk"
        placeholder="请选择要查询的综测月份"
        class="select"
        @change="reSearch"
      >
        <el-option
          v-for="item in data.monthes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <h1>{{ data.myclass }}班级综合测评表</h1>
    </div>
    <br />
    <!-- 操作行 -->
    <div>
      <div class="mt-4">
        <el-input
          v-model="data.search"
          placeholder="请输入查询关键字"
          class="input-with-select input-style"
        >
          <template #append>
            <el-button @click="reSearch" :disabled="data.loadOk"
              ><el-icon><Search /></el-icon
            ></el-button>
          </template>
        </el-input>
      </div>
      <el-button class="right" @click="handleExcelExport"
        ><el-icon><Download /></el-icon>&nbsp; 导出</el-button
      >
    </div>
    <br />
    <!-- 综合测评表情况 -->
    <el-table
      v-loading.lock="data.loading"
      :data="data.assessments"
      style="width: 100%"
      @cell-mouse-enter="handleCellEnter"
      @cell-mouse-leave="handleCellLeave"
    >
      <el-table-column prop="userNumber" label="学号" min-width="120" />
      <el-table-column prop="username" fixed label="姓名" min-width="150" />
      <el-table-column label="德育">
        <el-table-column prop="add1" label="加分明细" min-width="120" />
        <el-table-column prop="sub1" label="减分明细" min-width="120" />
        <el-table-column prop="point1" label="得分" min-width="60" />
      </el-table-column>
      <el-table-column label="智育">
        <el-table-column prop="add2" label="加分明细" min-width="120" />
        <el-table-column prop="sub2" label="减分明细" min-width="120" />
        <el-table-column prop="point2" label="得分" min-width="60" />
      </el-table-column>
      <el-table-column label="体育">
        <el-table-column prop="add3" label="加分明细" min-width="120" />
        <el-table-column prop="sub3" label="减分明细" min-width="120" />
        <el-table-column prop="point3" label="得分" min-width="60" />
      </el-table-column>
      <el-table-column label="美育">
        <el-table-column prop="add4" label="加分明细" min-width="120" />
        <el-table-column prop="sub4" label="减分明细" min-width="120" />
        <el-table-column prop="point4" label="得分" min-width="60" />
      </el-table-column>
      <el-table-column label="劳动">
        <el-table-column prop="add5" label="加分明细" min-width="120" />
        <el-table-column prop="sub5" label="减分明细" min-width="120" />
        <el-table-column prop="point5" label="得分" min-width="60" />
      </el-table-column>
      <el-table-column label="当月综合测评得分" fixed="right">
        <el-table-column prop="add_total" label="月加分" min-width="50" />
        <el-table-column prop="sub_total" label="月减分" min-width="50" />
        <el-table-column prop="pre_total" label="上月得分" min-width="50" />
        <el-table-column prop="point_total" label="当月总分" min-width="50" />
        <el-table-column label="签名" min-width="60">
          <template #default="scope">
            <span v-show="!scope.row.signature">未签</span>
            <el-popover trigger="click" placement="left" :width="400">
              <template #reference>
                <span v-show="scope.row.signature" class="checked">已签</span>
              </template>
              <h4>{{ scope.row.username }}签名详细</h4>
              <div class="sign-box">
                <el-image
                  class="sign"
                  :src="scope.row.signature"
                  fit="contain"
                />
              </div>
            </el-popover>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination-box">
      <el-pagination
        layout="total,sizes,prev,pager,next"
        :page-size="data.page.pageSize"
        :page-sizes="[15, 20, 40, 100]"
        :pager-count="10"
        :total="data.page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="pagination"
      />
    </div>
    <hr />
    <!-- 综测进度详细 -->
    <div class="process">
      <div>
        <span>综测进度 ：</span>
        <span v-show="!data.signature">🟢进行中</span>
        <span v-show="data.signature">⚫已归档</span>
      </div>
      <br />
      <div>
        <div class="stack-line">
          <div>
            <div class="gk-rank">
              <div class="item">
                <span>综测小组确认情况 ：</span>
                <el-popover trigger="hover" placement="right" :width="400">
                  <template #reference>
                    <span v-show="data.assessSignature">已确认</span>
                  </template>
                  <h4>综测小组签字</h4>
                  <div class="sign-box">
                    <el-image
                      class="sign"
                      :src="data.assessSignature"
                      fit="contain"
                    />
                  </div>
                </el-popover>
                <span v-show="!data.assessSignature">待确认</span>
                <span class="sign-ditail">
                  (综测小组确认后班主任方可签名归档本月综测情况)</span
                >
              </div>
              <div class="item">
                <span>班主任签名 ：</span>
                <el-popover trigger="hover" placement="right" :width="400">
                  <template #reference>
                    <span v-show="data.signature">已确认</span>
                  </template>
                  <h4>班主任签字</h4>
                  <div class="sign-box">
                    <el-image
                      class="sign"
                      :src="data.signature"
                      fit="contain"
                    />
                  </div>
                </el-popover>
                <span v-show="data.signature == null">待确认</span>
                <el-button
                  type="primary"
                  class="sign-button"
                  @click="data.dialogVisible = true"
                  :disabled="
                    data.assessSignature == null || data.signature !== null
                  "
                  >前往电子签名</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 电子签名对话框 -->
  <el-dialog v-model="data.dialogVisible" title="电子签名" width="50%">
    <div class="tip">
      当全班成员进行电子签名后，您可以在本页进行签字确认班级综测已编辑核对完成，签字之后无法修改综测内容，请仔细核对后签字。
    </div>
    <br />
    <div>
      <signatures @finish="finish"></signatures>
    </div>
  </el-dialog>
</template>
<script setup>
import { reactive, onMounted } from "vue";
import { comprehensiveAssessmentHeader } from "@/assets/js/excel/format/comprehensive-assessment-style";
import { export_json_to_excel } from "@/assets/js/excel/excel-export-multi";
import { ElMessage } from "element-plus";
import { getMonthName } from "@/assets/js/utils/month";
import teacherFun from "@/api/teacher";
import apiFun from "@/api/user";
import Signatures from "@/components/utils/Signatures.vue";
const data = reactive({
  myclass: "- 级- 班",
  search: "",
  dialogVisible: false,
  assessments: [],
  page: {
    total: 200, // 总条数
    currentPage: 1, // 当前页
    pageSize: 15, //一页的数据量
  },
  curMonth: 0,
  monthes: [],
  loading: false,
  loadOk: true,
  signature: "xx", //班主任签名
  assessSignature: "xx", //测评小组签名
});
onMounted(() => {
  init();
});
function init() {
  getClassDetials(); //获取班级信息
  getAssessmentMonth(); //获取可选月份方法
  getAssessmentDetails(); //获取综测信息
}
//获取可选月份方法
function getAssessmentMonth() {
  apiFun.user.getAssessmentsMonth().then((res) => {
    console.log("获取可选月份方法:", res);
    res.forEach((item) => {
      console.log(item);
      data.monthes.push({
        value: item,
        label: getMonthName(item),
      });
    });
  });
}
//获取班级信息
function getClassDetials() {
  teacherFun.user.getInformation().then((res) => {
    console.log(res);
    data.myclass = res.className;
  });
}
//获取综测信息
function getAssessmentDetails() {
  data.loading = true;
  data.loadOk = true;
  //这里是老师身份请求本月学生综测信息
  teacherFun.assessment
    .getAssessments({
      keyword: data.search,
      month: data.curMonth,
      rank: 0,
      current: data.page.currentPage,
      size: data.page.pageSize,
    })
    .then((res) => {
      data.assessments = [];
      data.page.currentPage = res.current;
      data.page.pageSize = res.size;
      data.page.total = res.total;
      res.records.forEach((item) => {
        data.assessments.push({ ...item.content, signature: item.signature });
      });
      if (data.curMonth == 0) {
        data.curMonth = res.records[0].month;
      }
      data.signature = res.teacherSignature;
      data.assessSignature = res.signature;
      data.loading = false;
      data.loadOk = false;
    });
}
//重新查询
function reSearch() {
  data.page.currentPage = 1;
  getAssessmentDetails();
}
//班主任电子签名
function finish(file) {
  const formData = new FormData();
  formData.append("file", file);
  teacherFun.sign.confirmSign(data.curMonth, formData).then((res) => {
    data.teacherSignature = "xx"; //不为空即可
    data.dialogVisible = false;
    ElMessage({
      message: "确认本月综测情况成功",
      type: "success",
    });
  });
}
//改变分页页数
const handleCurrentChange = (val) => {
  data.page.currentPage = val;
  getAssessmentDetails();
};
//改变单页数
const handleSizeChange = (val) => {
  data.page.pageSize = val;
  getAssessmentDetails();
};
// 数据excel导出
const handleExcelExport = () => {
  export_json_to_excel(
    comprehensiveAssessmentHeader,
    data.assessments,
    `${data.myclass}班级综合测评表`
  );
};
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style lang="scss" src="@/assets/css/assessment/comprehensiveAssessmentCheck.scss" scoped />