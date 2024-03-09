<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-06 22:50:19
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-03-03 16:13:37
 * @FilePath: \collegeApplication\src\views\ComprehensiveAssessmentCheck.vue
 * @Description:综合测评表公示页面
-->
<template>
  <div class="show-container">
    <div class="title"><div class="text">综合测评表公示</div></div>

    <hr />
    <h1>{{ data.myclass }}班级综合测评表</h1>
    <br />
    <div style="height: 40px">
      <span style="float: left">学生姓名: &nbsp;</span>
      <el-input
        style="float: left; width: 20%"
        v-model="data.search"
        size="small"
        placeholder="输入学生姓名关键字"
      />
      <el-button style="float: right" @click="handleExcelExport"
        ><el-icon><Download /></el-icon>&nbsp; 导出</el-button
      >
    </div>
    <el-table
      v-loading.lock="data.loading"
      :data="filterTableData"
      style="width: 100%"
      @cell-mouse-enter="handleCellEnter"
      @cell-mouse-leave="handleCellLeave"
    >
      <el-table-column prop="userNumber" label="学号" min-width="120" />
      <el-table-column prop="username" fixed label="姓名" min-width="150" />
      <el-table-column label="德育">
        <el-table-column prop="content.add1" label="加分明细" min-width="120" />
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
        <el-table-column prop="add_total" label="月加分" min-width="80" />
        <el-table-column prop="sub_total" label="月减分" min-width="80" />
        <el-table-column prop="pre_total" label="上月得分" min-width="90" />
        <el-table-column
          prop="point_total"
          label="当月总分"
          sortable
          min-width="110"
        />
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        :page-size="data.page.pageSize"
        :pager-count="10"
        layout="prev, pager, next"
        :total="data.page.total"
        @current-change="handleCurrentChange"
        style="margin-left: auto"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { comprehensiveAssessmentHeader } from "@/assets/js/excel/format/comprehensive-assessment-style";
import { adaptiveColumnWidthFun } from "@/assets/js/utils/adaptive-column-width";
import { export_json_to_excel } from "@/assets/js/excel/excel-export-multi";
import teacherFun from "@/api/teacher";
const data = reactive({
  myclass: "2023级1班",
  search: "",
  assessments: [
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
      point_total: 21,
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
      point_total: 22,
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
      point_total: 25,
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
      point_total: 27,
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
      point_total: 29,
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
      point_total: 10,
    },
  ],
  page: {
    total: 200, // 总条数
    currentPage: 1, // 当前页
    pageSize: 8, //一页的数据量
  },
  loading:false,
});

onMounted(() => {
  init();
});
function init() {
  data.loading=true;
  getAssessmentDetails(1); //获取综测信息
}
function getAssessmentDetails(currentPage) {
  //这里是老师身份请求本月学生综测信息
  teacherFun.assessment
    .getAssessments({
      name: "",
      userNumber: "",
      month: 0,
      identity: 1,
      current: currentPage,
      size: 15,
    })
    .then((res) => {
      console.log("获取综测信息结果：", res);
      data.assessments = [];
      data.page.currentPage = res.current;
      data.page.pageSize = res.size;
      data.page.total = res.total;
      res.records.forEach((item) => {
        data.assessments.push({
          username: item.username,
          userNumber: item.userNumber,
          pre_total: item.lastScore,
          content: item.content,
        });
      });
      console.log("XXX", data.assessments);
      data.loading=false;
    });
}

const filterTableData = computed(() =>
  data.assessments.filter(
    (d) => !data.search || data.name.includes(data.search)
  )
);
//改变分页页数
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`);
  getAssessmentDetails(val);
};
// 数据excel导出
const handleExcelExport = () => {
  export_json_to_excel(
    comprehensiveAssessmentHeader,
    data.assessments,
    `${data.myclass}班级综合测评表`
  );
};
const { getColumnWidth } = adaptiveColumnWidthFun(data.assessments);
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style lang="scss" scoped>
h1 {
  margin-top: 30px;
  text-align: center;
}
.pagination {
  display: flex;
}
</style>
  