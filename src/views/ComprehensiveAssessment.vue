<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-27 20:45:21
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-28 16:53:37
 * @FilePath: \collegeApplication\src\views\ComprehensiveAssessment.vue
 * @Description: 测评小组综合测评表编辑页面
-->
<template>
  <div class="show-container">
    <div class="title">
      <div class="text">综合测评表编辑</div>
    </div>
    <hr />
    <!-- 可选月份标题 -->
    <div class="checkMonth">
      <el-select
        v-model="data.curMonth"
        :disabled="data.loadOk"
        placeholder="请选择要查询的综测月份"
        style="width: 100px; margin-top: -10px"
        @change="getAssessmentDetails"
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
    <!-- 顶部，查询按钮，导出按钮 -->
    <div>
      <div class="mt-4">
        <el-input
          v-model="data.search"
          style="max-width: 300px; margin-bottom: -50px"
          placeholder="请输入查询关键字"
          class="input-with-select"
        >
          <template #append>
            <el-button @click="getAssessmentDetails" :disabled="data.loadOk"
              ><el-icon><Search /></el-icon
            ></el-button>
          </template>
        </el-input>
      </div>
      <el-button
        type="warning"
        style="float: right; margin-left: 1rem"
        @click="data.dialogVisible2 = true"
        ><el-icon><Memo /></el-icon>&nbsp; 错误申报</el-button
      >
      <el-button style="float: right" @click="handleExcelExport"
        ><el-icon><Download /></el-icon>&nbsp; 导出</el-button
      >
    </div>
    <br />
    <!-- 编辑测评表 -->
    <el-table
      v-loading.lock="data.loading"
      :data="data.assessments"
      style="width: 100%"
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
        <el-table-column
          prop="point_total"
          label="当月总分"
          sortable
          min-width="50"
        />
        <el-table-column label="签名" min-width="60">
          <template #default="scope">
            <span v-show="!scope.row.signature">未签</span>
            <div v-if="scope.row.signature">
              <el-popover :width="400" placement="left" trigger="click">
                <template #reference>
                  <span class="checked">已签</span>
                </template>
                <div>
                  <h4>{{ scope.row.username }}签名详细</h4>
                  <div
                    style="width: 330px; height: 100px; border: 1px solid black"
                  >
                    <el-image
                      style="width: 100%; height: 100%"
                      :src="scope.row.signature"
                      fit="contain"
                    />
                  </div>
                  <div v-if="data.teacherSignature == null">
                    <br />
                    <el-button
                      type="danger"
                      @click="deleteStudentSign(scope.$index, scope.row)"
                      >抹除签名</el-button
                    ><br />
                    <span
                      >抹除签名后，您可以对改成员综测进行修改，改学生需要重新签名确认</span
                    >
                  </div>
                </div>
              </el-popover>
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <!-- 如果老师已签字说明本月综测已归档，不能再编辑 -->
      <el-table-column
        label="操作"
        fixed="right"
        v-if="data.teacherSignature == null"
      >
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            :disabled="scope.row.signature"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        layout="total,sizes,prev,pager,next"
        :page-size="data.page.pageSize"
        :page-sizes="[15, 20, 40, 100]"
        :pager-count="10"
        :total="data.page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin-left: auto"
      />
    </div>
    <!-- 提交按钮 -->
    <hr />
    <div class="process">
      <div>
        <span>综测进度 ：</span>
        <span v-show="!data.teacherSignature">🟢进行中</span>
        <span v-show="data.teacherSignature">⚫已归档</span>
      </div>
      <br />
      <div>
        <div class="stack-line">
          <div>
            <div class="gk-rank">
              <div class="item">
                <span>本月确认情况 ：</span>
                <el-popover trigger="hover" placement="right" :width="400">
                  <template #reference>
                    <span v-show="data.signature">已确认</span>
                  </template>
                  <h4>综测小组签字</h4>
                  <div
                    style="width: 380px; height: 100px; border: 1px solid black"
                  >
                    <el-image
                      style="width: 100%; height: 100%"
                      :src="data.signature"
                      fit="contain"
                    />
                  </div>
                </el-popover>
                <span v-show="!data.signature">待确认</span>
                <span style="color: rgb(167, 167, 167); margin-left: 15px">
                  (已确认/待确认)</span
                ><el-button
                  type="primary"
                  style="margin-left: 1rem"
                  @click="signConfirmAssessment"
                  :disabled="data.signature"
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
    <div style="margin-left: 2rem">
      当全班成员进行电子签名后，您可以在本页进行签字确认班级综测已编辑核对完成，签字之后无法修改综测内容，请仔细核对后签字。
    </div>
    <br />
    <div>
      <signatures @finish="finish"></signatures>
    </div>
  </el-dialog>
  <!-- 申诉列表对话框 -->
  <el-dialog v-model="data.dialogVisible2" title="💬 待申述处理" width="60%">
    <div>
      <el-table :data="data.complaintData">
        <el-table-column type="index" />
        <el-table-column label="申诉学生姓名" prop="username" min-width="120" />
        <el-table-column label="学号" prop="userNumber" min-width="100" />
        <el-table-column label="申诉内容" prop="content" min-width="300" />
        <el-table-column
          label="申诉时间"
          prop="created"
          min-width="200"
          sortable
        />
        <el-table-column
          label="申诉状态"
          width="100"
          :filters="[
            { text: '待处理', value: '0' },
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
              <span v-if="scope.row.state == 0">待处理</span>
              <span v-if="scope.row.state == 1">已处理</span>
              <span v-if="scope.row.state == 2">已撤销</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              v-if="scope.row.state == 1 || scope.row.state == 2"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              size="small"
              type="success"
              v-if="scope.row.state == 0"
              @click="handleDeal(scope.$index, scope.row)"
              >完成</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
  <!-- 编辑综测对话框 -->
  <el-dialog
    v-loading.lock="data.loading"
    v-model="data.dialogVisible3"
    :title="data.curTitle"
    width="500"
    lock-scroll
  >
    <el-form :model="data.form">
      <el-form-item label="编辑部分" :label-width="formLabelWidth">
        <el-select
          v-model="data.curType"
          placeholder="请选择需要修改的综测部分"
        >
          <el-option label="德育" value="1" />
          <el-option label="智育" value="2" />
          <el-option label="体育" value="3" />
          <el-option label="美育" value="4" />
          <el-option label="劳动" value="5" />
        </el-select>
      </el-form-item>
      <hr style="border-color: rgba(231, 229, 226, 0.459)" />
      <div v-show="data.curType == 1">
        <el-form-item label="德育" :label-width="formLabelWidth"></el-form-item>
        <el-form-item label="加分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="data.form.add1"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item label="减分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="data.form.sub1"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="德育得分" :label-width="formLabelWidth">
          <el-input-number
            style="width: 100px"
            class="item__input"
            v-model="data.form.point1"
            :min="-100"
            :max="100"
            size="small"
          />
        </el-form-item>
      </div>
      <div v-show="data.curType == 2">
        <el-form-item label="智育" :label-width="formLabelWidth"></el-form-item>
        <el-form-item label="加分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="data.form.add2"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="减分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="data.form.sub2"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="智育得分" :label-width="formLabelWidth">
          <el-input-number
            style="width: 100px"
            class="item__input"
            v-model="data.form.point2"
            :min="-100"
            :max="100"
            size="small"
          />
        </el-form-item>
      </div>
      <div v-show="data.curType == 3">
        <el-form-item label="体育" :label-width="formLabelWidth"></el-form-item>
        <el-form-item label="加分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="data.form.add3"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="减分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="data.form.sub3"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="体育得分" :label-width="formLabelWidth">
          <el-input-number
            style="width: 100px"
            class="item__input"
            v-model="data.form.point3"
            :min="-100"
            :max="100"
            size="small"
          />
        </el-form-item>
      </div>
      <div v-show="data.curType == 4">
        <el-form-item label="美育" :label-width="formLabelWidth"></el-form-item>
        <el-form-item label="加分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="data.form.add4"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="减分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="data.form.sub4"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="美育得分" :label-width="formLabelWidth">
          <el-input-number
            style="width: 100px"
            class="item__input"
            v-model="data.form.point4"
            :min="-100"
            :max="100"
            size="small"
          />
        </el-form-item>
      </div>
      <div v-show="data.curType == 5">
        <el-form-item label="劳动" :label-width="formLabelWidth"></el-form-item>
        <el-form-item label="加分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="data.form.add5"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="减分明细" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            style="width: 215px"
            v-model="data.form.sub5"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="劳动得分" :label-width="formLabelWidth">
          <el-input-number
            style="width: 100px"
            class="item__input"
            v-model="data.form.point5"
            :min="-100"
            :max="100"
            size="small"
          />
        </el-form-item>
      </div>
      <div class="tip">请注意手动修改单项得分和总加减分,否则可能出现错误</div>
      <hr style="border-color: rgba(231, 229, 226, 0.459)" />
      <br />
      <el-form-item label="总体情况" :label-width="formLabelWidth">
        <span v-show="data.form.isTrue">
          <el-icon color="red" style="margin-left: 0 5px"
            ><WarningFilled
          /></el-icon>
          总加分与减分之和与总得分不匹配。
        </span>
      </el-form-item>
      <el-form-item label="总加分" :label-width="formLabelWidth">
        <el-input-number
          style="width: 100px"
          class="item__input"
          v-model="data.form.add_total"
          :min="0"
          :max="100"
          size="small"
        />
      </el-form-item>
      <el-form-item label="总减分" :label-width="formLabelWidth">
        <el-input-number
          style="width: 100px"
          class="item__input"
          v-model="data.form.sub_total"
          :min="-100"
          :max="0"
          size="small"
        />
      </el-form-item>
      <el-form-item
        label="总得分"
        prop="data.form.point_total"
        :label-width="formLabelWidth"
      >
        <span>{{ data.form.point_total }}</span>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="data.dialogVisible3 = false">取消</el-button>
        <el-button type="primary" @click="confirmEdit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { reactive, onMounted, computed } from "vue";
import { ElMessage } from "element-plus";
import signatures from "@/components/utils/Signatures.vue";
import { comprehensiveAssessmentHeader } from "@/assets/js/excel/format/comprehensive-assessment-style";
import { export_json_to_excel } from "@/assets/js/excel/excel-export-multi";
import { getMonthName } from "@/assets/js/utils/month";
import studentFun from "@/api/student";

const data = reactive({
  myclass: "-级-班", //班级
  state: null,
  curMonth: 0,
  loadOk: true,
  monthes: [], //可选月份
  signature: "xx", //自己是否签名
  teacherSignature: "xx", //老师是否签名
  loading: false, //列表加载动画
  assessments: [], //综测信息
  dialogVisible: false, //电子签名对话框
  dialogVisible2: false, //申诉对话框
  dialogVisible3: false, //编辑综测
  complaintData: [
    {
      create: "2023-05-07",
      userNumber: "2022100030",
      username: "杨世博",
      content: "个人信息性别错误，需要更改为男",
      state: 1,
    },
    {
      create: "2023-05-11",
      username: "李珊",
      userNumber: "2022100030",
      content: "综测1月加分计算错误，少加了1分英语竞赛二等奖分",
      state: 0,
    },
    {
      create: "2023-05-24",
      username: "涂圆元",
      userNumber: "2022100031",
      content: "个人信息民族错误，需要更改为土家族",
      state: 1,
    },
    {
      create: "2023-05-11",
      username: "陈翔",
      userNumber: "2022100032",
      content: "综测1月加分计算错误，少加了3分软件杯全国二等奖分",
      state: 2,
    },
    {
      create: "2023-05-12",
      username: "刘橙晨",
      userNumber: "2022100040",
      content: "个人信息目标学校错误，需要修改为‘长沙学院’",
      state: 0,
    },
  ], // 申诉列表
  curTitle: "", //编辑弹窗标题（锁定学生）
  curType: "1", //修改项
  search: null, //搜索词
  form: {
    add1: null,
    sub1: null,
    point1: null,
    add2: null,
    sub2: null,
    point2: null,
    add3: null,
    sub3: null,
    point3: null,
    add4: null,
    sub4: null,
    point4: null,
    add5: null,
    sub5: null,
    point5: null,
    add_total: null,
    sub_total: null,
    pre_total: null,
    point_total: computed(() => {
      return (
        data.form.point1 +
        data.form.point2 +
        data.form.point3 +
        data.form.point4 +
        data.form.point5
      );
    }),
    isTrue: computed(() => {
      return (
        data.form.add_total + data.form.sub_total !== data.form.point_total
      );
    }),
  }, //修改表单
  page: {
    total: 200, // 总条数
    currentPage: 1, // 当前页
    pageSize: 15, //一页的数据量
  }, //分页
});
const formLabelWidth = "140px";
onMounted(() => {
  init();
});
//初始化
function init() {
  getClassDetials(); //获取班级信息
  getAssessmentMonth(); //获取可选月份
  getAssessmentDetails(); //获取综测信息
  getComplaintsDeatils(); //获取申诉列表数据
}
//获取班级信息
function getClassDetials() {
  studentFun.assess.getInformation().then((res) => {
    data.myclass = res.className;
  });
}
//获取综测信息
function getAssessmentDetails() {
  data.loading = true;
  data.loadOk = true;
  data.signature = "xx";
  data.teacherSignature = "xx";
  studentFun.assess
    .getAssessmentsByMonth({
      keyword: data.search,
      month: data.curMonth,
      rank: 0,
      current: data.page.currentPage,
      size: data.page.pageSize,
    })
    .then((res) => {
      data.page.currentPage = res.current;
      data.page.pageSize = res.size;
      data.page.total = res.total;
      data.assessments = [];
      res.records.forEach((item) => {
        data.assessments.push({ ...item.content, signature: item.signature });
      });
      if (data.curMonth == 0) {
        data.curMonth = res.records[0].month;
      }
      data.teacherSignature = res.teacherSignature;
      data.signature = res.signature;
      data.loading = false;
      data.loadOk = false;
    });
}
//获取申诉列表数据
function getComplaintsDeatils() {
  studentFun.assess
    .getComplaint({
      state: "",
    })
    .then((res) => {
      data.complaintData = res;
    });
}
//获取可选月份方法
function getAssessmentMonth() {
  studentFun.assess.getMonthes().then((res) => {
    res.forEach((item) => {
      data.monthes.push({
        value: item,
        label: getMonthName(item),
      });
    });
  });
}
//编辑综测
const handleEdit = (index, row) => {
  if (row) {
    data.curTitle = `编辑学生 ${row.username} 的综合测评`;
    // 遍历row对象的属性和值给form初值，且不影响computed属性
    for (let key in row) {
      if (row.hasOwnProperty(key)) {
        // 根据属性名给form对象赋值
        if (key !== "point_total" && key !== "signature") {
          data.form[key] = row[key];
        }
      }
    }
    data.curType = "1"; //启动时默认先展示德育项
    data.dialogVisible3 = true;
  }
};
//确认修改综测
function confirmEdit() {
  if (data.form.isTrue == false) {
    studentFun.assess.submitAssessments([data.form]).then((res) => {
      getAssessmentDetails(); //重新获取综测信息
    });
    data.dialogVisible3 = false;
  } else {
    ElMessage.error("请确保分数计算正确");
  }
}
//点击电子签名
function signConfirmAssessment() {
  //查询班级某月份已签名人数
  studentFun.sign
    .assessGetSignCnt({
      month: data.curMonth,
    })
    .then((res) => {
      if (res == data.page.total) {
        data.dialogVisible = true;
      } else {
        ElMessage.error("综测小组请确保全班都已完成签名确认再进行签名");
      }
    });
}
//签名后提交数据和电子签名
function finish(file) {
  const formData = new FormData();
  formData.append("file", file);
  studentFun.sign.assessConfirmSign(data.curMonth, formData).then((res) => {
    data.signature = "ABC"; //不为空即可
    data.dialogVisible = false;
    ElMessage({
      message: "提交本月综测情况成功",
      type: "success",
    });
  });
  //模拟提交
  // setTimeout(() => {
  //   data.dialogVisible = false;
  //   ElMessage({
  //     message: "提交本月综测情况成功",
  //     type: "success",
  //   });
  // }, 60);
}
//移除学生签名
function deleteStudentSign(index, row) {
  studentFun.sign
    .deleteStudentSign({
      month: data.curMonth,
      userNumber: row.userNumber,
    })
    .then((res) => {
      row.signature = null;
      data.signature = null;
      ElMessage.success(res);
    });
}
//删除申诉项
const handleDelete = (index, row) => {
  studentFun.assess.deleteComplaint([row.appealId]).then((res) => {
    data.complaintData.splice(index, 1);
    ElMessage.success(res);
  });
};
//处理申诉项
const handleDeal = (index, row) => {
  studentFun.assess.dealComplaint(row.appealId).then((res) => {
    row.state = 1;
    ElMessage.success(res);
  });
};
//筛选器
const filterTag = (value, row) => {
  return row.state == value;
};
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
<style src="@/assets/css/assessment/comprehensiveAssessment.scss" lang="scss" scoped />
  