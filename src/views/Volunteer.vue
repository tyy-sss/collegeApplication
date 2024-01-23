<!--
 * @Author: STATICHIT 2394412110@qq.com
 * @Date: 2023-11-28 21:00:57
 * @LastEditors: STATICHIT 2394412110@qq.com
 * @LastEditTime: 2024-01-20 16:32:38
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
        prop="target"
        label="目标学校"
        :min-width="getColumnWidth('target')"
      />
      <el-table-column
        prop="province"
        label="省份"
        :min-width="getColumnWidth('province')"
      />
      <el-table-column
        prop="class"
        label="班级"
        :min-width="getColumnWidth('class')"
      />
      <el-table-column
        prop="id"
        label="学号"
        :min-width="getColumnWidth('id')"
      />
      <el-table-column
        prop="name"
        label="姓名"
        :min-width="getColumnWidth('name')"
      />
      <el-table-column
        prop="sex"
        label="性别"
        :min-width="getColumnWidth('sex')"
      />
      <el-table-column
        prop="selectSubjects"
        label="选考科目"
        :min-width="getColumnWidth('selectSubjects')"
      />
      <el-table-column
        prop="grades"
        label="分流成绩"
        :min-width="getColumnWidth('grades')"
      />
      <el-table-column label="志愿情况" fixed="right">
        <el-table-column
          prop="voluntary1"
          label="一志愿"
          :min-width="getColumnWidth('voluntary1')"
        />
        <el-table-column
          prop="voluntary2"
          label="二志愿"
          :min-width="getColumnWidth('voluntary2')"
        />
        <el-table-column
          prop="voluntary3"
          label="三志愿愿"
          :min-width="getColumnWidth('voluntary3')"
        />
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        :page-size="7"
        :pager-count="5"
        layout="prev, pager, next"
        :total="60"
        style="margin-left: auto"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import { volunteerHeader } from "@/assets/js/excel/format/volunteer-style";
import { export_json_to_excel } from "@/assets/js/excel/excel-export-multi";
import { adaptiveColumnWidthFun } from "@/assets/js/utils/adaptive-column-width";
import teacherFun from "@/api/teacher";

const data = reactive({
  myclass: "2023级1班",
  search: "",
  assessments: [
    {
      target: "吉首大学", //目标学校
      province: "贵州", //省份
      class: "7", //班级
      id: "20222113002", //学生学号
      name: "玉苏普·吐荪江", //学生姓名
      sex: "男", //学生性别
      selectSubjects: "生物+地理", //选考科目
      grades: "78.233", //分流成绩
      voluntary1: "医学检验技术", //第一志愿
      voluntary2: "护理学", //第二志愿
      voluntary3: "软件工程", //第三志愿
    },
    {
      target: "吉首大学",
      province: "贵州",
      class: "7",
      id: "20222113002",
      name: "玉苏普·吐荪江",
      sex: "男",
      selectSubjects: "生物+地理",
      grades: "78.233",
      voluntary1: "医学检验技术",
      voluntary2: "护理学",
      voluntary3: "软件工程",
    },
    {
      target: "吉首大学",
      province: "贵州",
      class: "7",
      id: "20222113002",
      name: "玉苏普·吐荪江",
      sex: "男",
      selectSubjects: "生物+地理",
      grades: "78.233",
      voluntary1: "医学检验技术",
      voluntary2: "护理学",
      voluntary3: "软件工程",
    },
    {
      target: "吉首大学",
      province: "贵州",
      class: "7",
      id: "20222113002",
      name: "玉苏普·吐荪江",
      sex: "男",
      selectSubjects: "生物+地理",
      grades: "78.233",
      voluntary1: "医学检验技术",
      voluntary2: "护理学",
      voluntary3: "软件工程",
    },
    {
      target: "吉首大学",
      province: "贵州",
      class: "7",
      id: "20222113002",
      name: "玉苏普·吐荪江",
      sex: "男",
      selectSubjects: "生物+地理",
      grades: "78.233",
      voluntary1: "医学检验技术",
      voluntary2: "护理学",
      voluntary3: "软件工程",
    },
    {
      target: "吉首大学",
      province: "贵州",
      class: "7",
      id: "20222113002",
      name: "玉苏普·吐荪江",
      sex: "男",
      selectSubjects: "生物+地理",
      grades: "78.233",
      voluntary1: "医学检验技术",
      voluntary2: "护理学",
      voluntary3: "软件工程",
    },
    {
      target: "吉首大学",
      province: "贵州",
      class: "7",
      id: "20222113002",
      name: "玉苏普·吐荪江",
      sex: "男",
      selectSubjects: "生物+地理",
      grades: "78.233",
      voluntary1: "医学检验技术",
      voluntary2: "护理学",
      voluntary3: "软件工程",
    },
    {
      target: "吉首大学",
      province: "贵州",
      class: "7",
      id: "20222113002",
      name: "玉苏普·吐荪江",
      sex: "男",
      selectSubjects: "生物+地理",
      grades: "78.233",
      voluntary1: "医学检验技术",
      voluntary2: "护理学",
      voluntary3: "软件工程",
    },
    {
      target: "吉首大学",
      province: "贵州",
      class: "7",
      id: "20222113002",
      name: "玉苏普·吐荪江",
      sex: "男",
      selectSubjects: "生物+地理",
      grades: "78.233",
      voluntary1: "医学检验技术",
      voluntary2: "护理学",
      voluntary3: "软件工程",
    },
    {
      target: "吉首大学",
      province: "贵州",
      class: "7",
      id: "20222113002",
      name: "玉苏普·吐荪江",
      sex: "男",
      selectSubjects: "生物+地理",
      grades: "78.233",
      voluntary1: "医学检验技术",
      voluntary2: "护理学",
      voluntary3: "软件工程",
    },
    {
      target: "吉首大学",
      province: "贵州",
      class: "7",
      id: "20222113002",
      name: "玉苏普·吐荪江",
      sex: "男",
      selectSubjects: "生物+地理",
      grades: "78.233",
      voluntary1: "医学检验技术",
      voluntary2: "护理学",
      voluntary3: "软件工程",
    },
    {
      target: "吉首大学",
      province: "贵州",
      class: "7",
      id: "20222113002",
      name: "玉苏普·吐荪江",
      sex: "男",
      selectSubjects: "生物+地理",
      grades: "78.233",
      voluntary1: "医学检验技术",
      voluntary2: "护理学",
      voluntary3: "软件工程",
    },
    {
      target: "吉首大学",
      province: "贵州",
      class: "7",
      id: "20222113002",
      name: "玉苏普·吐荪江",
      sex: "男",
      selectSubjects: "生物+地理",
      grades: "78.233",
      voluntary1: "医学检验技术",
      voluntary2: "护理学",
      voluntary3: "软件工程",
    },
    {
      target: "吉首大学",
      province: "贵州",
      class: "7",
      id: "20222113002",
      name: "玉苏普·吐荪江",
      sex: "男",
      selectSubjects: "生物+地理",
      grades: "78.233",
      voluntary1: "医学检验技术",
      voluntary2: "护理学",
      voluntary3: "软件工程",
    },
  ],
});

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