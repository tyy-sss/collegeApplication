<template>
  <div class="comprehenisve-year">
    <div class="top">
      <div class="search-item">
        <div class="text">选择时间：</div>
        <el-date-picker
          v-model="data.searchData.date"
          type="month"
          placeholder="请选择时间"
          @change="onSearchYear"
        />
      </div>
    </div>
    <div class="top">
      <div class="search">
        <div class="left">
          <div class="search-item">
            <div class="text">选择班级：</div>
            <el-select
              v-model="data.searchData.class"
              class="m-2"
              @change="onSearch"
            >
              <el-option
                v-for="item in data.searchData.list"
                :key="item.classId"
                :label="item.className"
                :value="item.classId"
              />
            </el-select>
          </div>
          <div class="search-item">
            <div class="text">选择学生：</div>
            <el-input
              v-model="data.searchData.student"
              placeholder="请输入学生学号或者姓名"
              @change="onSearchStudent"
            />
          </div>
        </div>
        <div class="right">
          <el-button type="primary" @click="handleExcelExport"
            >按班级导出
            <el-icon :size="18"><Download /></el-icon>
          </el-button>
        </div>
      </div>
    </div>
    <div class="middle">
      <div class="table">
        <el-table :data="data.assessment" style="width: 100%">
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
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="bottom">
      <div class="pager">
        <el-pagination
          :page-size="data.pager.size"
          :current-page="data.pager.current"
          layout="prev, pager, next"
          :total="data.pager.total"
          @current-change="handleChangePage"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
// 导出数据
import { comprehensiveAssessmentHeader } from "@/assets/js/excel/format/comprehensive-assessment-style";
import { export_json_to_excel } from "@/assets/js/excel/excel-export-multi";
import { getAllTimeNews } from "@/constants/date";
import managerFun from "@/api/manager";
import historyFun from "@/api/history";
import { ElMessage } from "element-plus";
const data = reactive({
  searchData: {
    date: "",
    year: "",
    month: "",
    class: "",
    student: "",
    list: [],
  },
  assessment: [],
  pager: {
    current: 1,
    size: 10,
    total: 0,
  },
});
// 搜索年份获得当年的班级信息
const onSearchYear = (val) => {
  data.searchData.date = getAllTimeNews(val);
  data.searchData.year = data.searchData.date.slice(0, 4);
  data.searchData.month = data.searchData.date.slice(5, 7);
  data.searchData.class = "";
  data.searchData.student = "";
  data.assessment = [];
  getClassList();
};
// 搜索学生
const onSearchStudent = (val) => {
  if (data.searchData.date == "") {
    ElMessage.error("请选择时间和班级");
  } else {
    data.searchData.student = val;
    data.pager.current = 1;
    getComprehensiveNews();
  }
};
// 搜索
const onSearch = () => {
  data.searchData.student = "";
  data.pager.current = 1;
  getComprehensiveNews();
};
// 手动修改页码数
const handleChangePage = (val) => {
  data.pager.current = val;
  getComprehensiveNews();
};
// 数据excel导出
const handleExcelExport = () => {
  if (data.searchData.class && data.searchData.month) {
    getComprehensiveNewsByClass();
  } else {
    ElMessage.error("请选择正确的信息");
  }
};
// 获取班级的信息
const getClassList = () => {
  data.searchData.list = [];
  managerFun.class.getAllClass(data.searchData.year).then((res) => {
    res.forEach((element) => {
      data.searchData.list.push({
        className: element.className,
        classId: element.classId,
      });
    });
  });
};
// 分页获取综测的信息
const getComprehensiveNews = () => {
  historyFun.manager
    .appraisal({
      year: data.searchData.year,
      month: data.searchData.month,
      classId: data.searchData.class,
      keyword: data.searchData.student,
      current: data.pager.current,
      size: data.pager.size,
    })
    .then((res) => {
      data.assessment = [];
      res.records.forEach((element) => {
        data.assessment.push(element.content);
      });
      data.pager = {
        current: res.current,
        size: res.size,
        total: res.total,
      };
    })
    .catch(() => {});
};
// 获得一个班的综测成绩
const getComprehensiveNewsByClass = () => {
  historyFun.manager
    .appraisalByClass({
      classId: data.searchData.class,
      year: data.searchData.year,
      month: data.searchData.month,
    })
    .then((res) => {
      let allData = [];
      res.forEach((element) => {
        allData.push(element.content);
      });
      let className = data.searchData.list.filter((element) => {
        return element.classId === data.searchData.class;
      })[0].className;
      let excelName =
        data.searchData.year +
        "年" +
        data.searchData.month +
        "月-" +
        className +
        "-" +
        "历史综合测评信息表";
      export_json_to_excel(comprehensiveAssessmentHeader, allData, excelName);
    });
};
</script>
<style src="@/assets/css/search-top-left-right.css" scoped />
<style src="@/assets/css/utils/table-empty.css" scoped />
<style scoped>
.comprehenisve-year > div:not(:last-child) {
  margin-bottom: 1rem;
}
.pager {
  display: flex;
  justify-content: flex-end;
}
</style>
