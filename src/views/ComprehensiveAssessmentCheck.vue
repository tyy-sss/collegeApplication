<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:50:19
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-28 14:14:21
 * @FilePath: \collegeApplication\src\views\ComprehensiveAssessmentCheck.vue
 * @Description:班主任查看综合测评情况页
-->
<template>
  <div class="show-container">
    <div class="title"><div class="text">综合测评表情况</div></div>
    <hr />
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
    <br />
    <div>
      <div class="mt-4">
        <el-input
          v-model="data.search"
          style="max-width: 300px; margin-bottom: -50px; margin-right: 1rem"
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
      <el-button style="float: right" @click="handleExcelExport"
        ><el-icon><Download /></el-icon>&nbsp; 导出</el-button
      >
    </div>
    <br />
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
              <div style="width: 330px; height: 100px; border: 1px solid black">
                <el-image
                  style="width: 100%; height: 100%"
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
    <hr />
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
                  <div
                    style="width: 380px; height: 100px; border: 1px solid black"
                  >
                    <el-image
                      style="width: 100%; height: 100%"
                      :src="data.assessSignature"
                      fit="contain"
                    />
                  </div>
                </el-popover>
                <span v-show="!data.assessSignature">待确认</span>
                <span style="color: rgb(167, 167, 167); margin-left: 15px">
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
                <span v-show="data.signature == null">待确认</span>
                <el-button
                  type="primary"
                  style="margin-left: 1rem"
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
    <div style="margin-left: 2rem">
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
  myclass: "2023级1班",
  search: "",
  dialogVisible: false,
  assessments: [
    {
      userNumber: "20222113001",
      username: "吾尔肯·塞里克",
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
      userNumber: "20222113002",
      username: "玉苏普·吐荪江",
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
      point_total: 21,
    },
    {
      userNumber: "20222113003",
      username: "沙亚拉·江阿努尔",
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
      point_total: 22,
    },
    {
      userNumber: "20222113004",
      username: "吐尔逊娜衣·托呼提",
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
      point_total: 25,
    },
    {
      userNumber: "20222112006",
      username: "阿合叶尔克·胡瓦提",
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
      point_total: 27,
    },
    {
      userNumber: "20222112005",
      username: "米热古丽·吾斯曼",
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
      point_total: 29,
    },
    {
      userNumber: "20222112004",
      username: "地娜拉·居帕尔",
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
      point_total: 10,
    },
  ],
  page: {
    total: 200, // 总条数
    currentPage: 1, // 当前页
    pageSize: 15, //一页的数据量
  },
  curMonth: 0,
  monthes: [
    // {
    //   value: "1",
    //   label: "一月",
    // },
    // {
    //   value: "2",
    //   label: "二月",
    // },
    // {
    //   value: "3",
    //   label: "三月",
    // },
    // {
    //   value: "4",
    //   label: "四月",
    // },
  ],
  loading: false,
  loadOk: true,
  signature: "xx", //班主任签名
  assessSignature: "xx", //测评小组签名
});
onMounted(() => {
  init();
});
function init() {
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
<style lang="scss" scoped>
.checkMonth {
  margin-top: 30px;
  text-align: center;
  transform: translateX(-7%);
}
h1 {
  margin-left: 1rem;
  display: inline-block;
}
.pagination {
  margin-top: 1rem;
  display: flex;
}
.checked {
  color: rgb(148, 178, 243);
  border-bottom: 1px solid;
}
.process {
  width: 100%;
  padding: 2rem;
}
.stack-line {
  background: #f2f7ff;
  padding: 1.2rem;
  line-height: 1.2rem;
  margin-bottom: 1rem;
  span {
    font-size: 17px;
    color: rgb(98, 97, 97);
    margin-right: 10px;
  }
  .gk-score {
    margin-bottom: 1rem;
  }
  .gk-rank {
    margin: 1rem 0;
  }
  .item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1rem;
  }
}
</style>
  