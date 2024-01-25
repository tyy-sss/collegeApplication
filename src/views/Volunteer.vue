<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-28 21:00:57
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-01-25 09:27:19
 * @FilePath: \collegeApplication\src\views\Volunteer.vue
 * @Description: 志愿填报情况页面
-->
<template>
  <div class="show-container">
    <div class="title"><div class="text">志愿填报情况</div></div>
    <hr />
    <h1>{{ data.myclass }}班级志愿填报情况</h1>
    <br />
    <div class="searchBox">
      <span>学生姓名: &nbsp;</span>
      <el-input
        v-model="data.search"
        size="small"
        placeholder="输入学生姓名关键字"
      />
      <!-- <el-button @click="handleExcelExport"
        ><el-icon><Download /></el-icon>&nbsp; 导出</el-button
      > -->
    </div>
    <!-- 志愿情况列表 -->
    <el-table
      :data="filterTableData"
      style="width: 100%; width: auto"
      @cell-mouse-enter="handleCellEnter"
      @cell-mouse-leave="handleCellLeave"
    >
      <el-table-column
        prop="name"
        label="目标学校"
        :min-width="getColumnWidth('name')"
      />
      <el-table-column
        prop="province"
        label="省份"
        :min-width="getColumnWidth('province')"
      />
      <!-- <el-table-column
        prop="class"
        label="班级"
        :min-width="getColumnWidth('class')"
      /> -->
      <el-table-column
        prop="userNumber"
        label="学号"
        :min-width="getColumnWidth('userNumber')"
      />
      <el-table-column
        prop="userName"
        label="姓名"
        :min-width="getColumnWidth('userName')"
      />
      <el-table-column
        prop="sex"
        label="性别"
        :min-width="getColumnWidth('sex')"
      />
      <!-- <el-table-column
        prop="selectSubjects"
        label="选考科目"
        :min-width="getColumnWidth('selectSubjects')"
      /> -->
      <el-table-column
        prop="score"
        label="分流成绩"
        :min-width="getColumnWidth('score')"
      />
      <el-table-column label="志愿情况" fixed="right">
        <el-table-column
          prop="firstName"
          label="一志愿"
          :min-width="getColumnWidth('firstName')"
        />
        <el-table-column
          prop="secondName"
          label="二志愿"
          :min-width="getColumnWidth('secondName')"
        />
        <el-table-column
          prop="thirdName"
          label="三志愿愿"
          :min-width="getColumnWidth('thirdName')"
        />
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        :page-size=data.page.pageSize
        :pager-count=10
        layout="prev, pager, next"
        :total=data.page.total
        @current-change="handleCurrentChange"
        style="margin-left: auto"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { volunteerHeader } from "@/assets/js/excel/format/volunteer-style";
import { export_json_to_excel } from "@/assets/js/excel/excel-export-multi";
import { adaptiveColumnWidthFun } from "@/assets/js/utils/adaptive-column-width";
import teacherFun from "@/api/teacher";

const data = reactive({
  myclass: "2023级1班",
  search: "",
  assessments: [
    {
      name: "吉首大学", //目标学校
      province: "贵州", //省份
      // class: "7", //班级
      userNumber: "20222113002", //学生学号
      userName: "玉苏普·吐荪江", //学生姓名
      sex: "男", //学生性别
      // selectSubjects: "生物+地理", //选考科目
      score: "78.233", //分流成绩
      firstName: "医学检验技术", //第一志愿
      secondName: "护理学", //第二志愿
      thirdName: "软件工程", //第三志愿
    },
  ],
  page: {
    total: 200, // 总条数
    currentPage: 1, // 当前页
    pageSize: 8, //一页的数据量
  },
});
onMounted(() => {
  init();
});
function init() {
  getClassWish(1);
}
//获取班级学生志愿情况（这里的timeId还没处理）
function getClassWish(currentPage) {
  teacherFun.wish
    .getClassWish({
      timeId: 20,
      current:currentPage,
      size:5,
    })
    .then((res) => {
      console.log("获取班级学生志愿情况：", res);
      data.assessments = res.records;
      data.page.currentPage=res.current;
      data.page.pageSize=res.size;
      data.page.total = res.total;
    });
}
//改变分页页数
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
  getClassWish(val);
}
const filterTableData = computed(() =>
  data.assessments.filter(
    (data) => !data.search || data.name.includes(data.search)
  )
);
const { getColumnWidth } = adaptiveColumnWidthFun(data.assessments);

// 数据excel导出
// const handleExcelExport = () => {
//   export_json_to_excel(
//     volunteerHeader,
//     assessments,
//     `${data.myclass}班级志愿填报情况表`
//   );
// };
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style lang="scss" scoped>
h1 {
  margin-top: 30px;
  text-align: center;
}
.searchBox {
  height: 40px;
  span {
    float: left;
  }
  .el-input {
    float: left;
    width: 20%;
  }
  .el-button {
    float: right;
  }
}
.pagination {
  display: flex;
}
</style>